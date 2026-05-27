#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENTRY_DIR="${ROOT_DIR}/entry"

PACKAGES=(
	"components"
	"composables"
	"shared"
)

echo "[build] workspace: ${ROOT_DIR}"

PIDS=()
PID_PACKAGES=()

for pkg in "${PACKAGES[@]}"; do
	echo "[build] start pnpm -C ${pkg} run build"
	pnpm -C "${ROOT_DIR}/${pkg}" run build &
	PIDS+=("$!")
	PID_PACKAGES+=("${pkg}")
done

build_failed=0
for i in "${!PIDS[@]}"; do
	pid="${PIDS[$i]}"
	pkg="${PID_PACKAGES[$i]}"
	if wait "${pid}"; then
		echo "[build] done ${pkg}"
	else
		echo "[error] build failed: ${pkg}" >&2
		build_failed=1
	fi
done

if [[ "${build_failed}" -ne 0 ]]; then
	exit 1
fi

for pkg in "${PACKAGES[@]}"; do
	src_dir="${ROOT_DIR}/${pkg}/dist"
	dest_dir="${ENTRY_DIR}/${pkg}"

	if [[ ! -d "${src_dir}" ]]; then
		echo "[error] dist not found: ${src_dir}" >&2
		exit 1
	fi

	rm -rf "${dest_dir}"
	mkdir -p "${dest_dir}"

	echo "[copy] ${src_dir} -> ${dest_dir}"
	cp -R "${src_dir}/." "${dest_dir}/"
done

echo "[done] entry artifacts prepared in ${ENTRY_DIR}"


# 合并 PACKAGES 各个根下的 .css 组成 index.css 

echo "[css] merge root css to index.css"

node - "${ENTRY_DIR}" "${PACKAGES[@]}" <<'NODE'
const fs = require('node:fs')
const path = require('node:path')

const entryDir = process.argv[2]
const roots = process.argv.slice(3)

const toPosix = p => p.replace(/\\/g, '/')

const cssFiles = []

for (const root of roots) {
	const rootDir = path.join(entryDir, root)
	if (!fs.existsSync(rootDir)) {
		continue
	}

	for (const item of fs.readdirSync(rootDir, { withFileTypes: true })) {
		if (!item.isFile()) {
			continue
		}

		if (!item.name.endsWith('.css')) {
			continue
		}

		const fullPath = path.join(rootDir, item.name)
		cssFiles.push(fullPath)
	}
}

cssFiles.sort((a, b) => a.localeCompare(b))

const entryIndexCss = path.join(entryDir, 'index.css')

if (cssFiles.length === 0) {
	if (fs.existsSync(entryIndexCss)) {
		fs.rmSync(entryIndexCss)
	}
	console.log('[css] no root-level css found under PACKAGES')
	process.exit(0)
}

const mergedCss = cssFiles
	.map((fullPath) => {
		const rel = toPosix(path.relative(entryDir, fullPath))
		const content = fs.readFileSync(fullPath, 'utf8').trim()
		return content
			? `/* ${rel} */\n${content}`
			: `/* ${rel} */`
	})
	.join('\n\n') + '\n'

fs.writeFileSync(entryIndexCss, mergedCss, 'utf8')
console.log(`[css] ${toPosix(path.relative(entryDir, entryIndexCss))}`)
NODE

echo "[pkg] update package.json exports/types"

node - "${ENTRY_DIR}" "${PACKAGES[@]}" <<'NODE'
const fs = require('node:fs')
const path = require('node:path')

const entryDir = process.argv[2]
const roots = process.argv.slice(3)
const pkgFile = path.join(entryDir, 'package.json')

const toPosix = p => p.replace(/\\/g, '/')

function walk(dir, onFile) {
	for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
		const fullPath = path.join(dir, item.name)
		if (item.isDirectory()) {
			walk(fullPath, onFile)
			continue
		}
		onFile(fullPath)
	}
}

const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf8'))
const exportsMap = {}

const entryIndexJs = path.join(entryDir, 'index.js')
if (fs.existsSync(entryIndexJs)) {
	exportsMap['.'] = {
		import: './index.js',
	}

	const entryIndexDts = path.join(entryDir, 'index.d.ts')
	if (fs.existsSync(entryIndexDts)) {
		exportsMap['.'].types = './index.d.ts'
	}
}

const entryIndexCss = path.join(entryDir, 'index.css')
if (fs.existsSync(entryIndexCss)) {
	exportsMap['./index.css'] = {
		import: './index.css',
	}
}

for (const root of roots) {
	const rootDir = path.join(entryDir, root)
	if (!fs.existsSync(rootDir)) {
		continue
	}

	walk(rootDir, (fullPath) => {
		if (!fullPath.endsWith('index.es.js') && !fullPath.endsWith('index.mjs')) {
			return
		}

		const relFile = toPosix(path.relative(entryDir, fullPath))
		const exportKey = `./${relFile.replace(/\/index\.(es\.js|mjs)$/, '')}`
		const typeRelFile = relFile.replace(/\/index\.(es\.js|mjs)$/, '/index.d.ts')
		const typeFullPath = path.join(entryDir, ...typeRelFile.split('/'))

		exportsMap[exportKey] = {
			import: `./${relFile}`,
		}

		if (fs.existsSync(typeFullPath)) {
			exportsMap[exportKey].types = `./${typeRelFile}`
		}
	})
}

pkg.exports = Object.fromEntries(
	Object.entries(exportsMap)
		.sort((a, b) => a[0].localeCompare(b[0])),
)

fs.writeFileSync(pkgFile, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8')

console.log(`[pkg] exports entries: ${Object.keys(pkg.exports).length}`)
NODE

echo "[docs] sync README.md, LICENSE and assets"

node - "${ROOT_DIR}" "${ENTRY_DIR}" <<'NODE'
const fs = require('node:fs')
const path = require('node:path')

const rootDir = process.argv[2]
const entryDir = process.argv[3]

function assertFile(file) {
	if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
		console.error(`[error] file not found: ${file}`)
		process.exit(1)
	}
}

function assertDir(dir) {
	if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
		console.error(`[error] assets dir not found: ${dir}`)
		process.exit(1)
	}
}

for (const file of ['README.md', 'LICENSE']) {
	const srcFile = path.join(rootDir, file)
	const destFile = path.join(entryDir, file)

	assertFile(srcFile)
	fs.copyFileSync(srcFile, destFile)
	console.log(`[docs] ${file}`)
}

const assetsSrcDir = path.join(rootDir, 'assets')
const assetsDestDir = path.join(entryDir, 'assets')

assertDir(assetsSrcDir)
fs.rmSync(assetsDestDir, { recursive: true, force: true })
fs.cpSync(assetsSrcDir, assetsDestDir, { recursive: true, force: true })
console.log('[docs] assets')
NODE


