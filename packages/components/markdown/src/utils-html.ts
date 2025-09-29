type TagType = -1 | 0 | 1 | false

/**
 * classifyTag
 * 判断一个字符串是否是 HTML 标签，并返回类型
 *
 * @param str 输入的字符串
 * @returns
 *   1   -> 开始标签
 *   0   -> 自闭合标签
 *  -1   -> 结束标签
 *   false -> 不是合法标签
 */
export function classifyTag (str: string): TagType {
  if (typeof str !== 'string')
    return false
  str = str.trim()
  if (!str.startsWith('<') || !str.endsWith('>'))
    return false

  // 1. 结束标签 </div>
  if (str.startsWith('</')) {
    const name = str.slice(2, -1).trim()
    return /^[A-Z][A-Z0-9\-.:]*$/i.test(name) ? -1 : false
  }

  // 2. 排除 <! ...> 或 <? ...?>
  if (str.startsWith('<!') || str.startsWith('<?'))
    return false

  let i = 1 // 跳过 '<'
  const len = str.length

  // 3. 解析 tagName
  let tagName = ''
  while (i < len && /[A-Z0-9\-.:]/i.test(str[i])) {
    tagName += str[i++]
  }
  if (!tagName)
    return false

  // 4. 扫描属性和空格 —— 这里用 i < len 来保证能检查到末尾的 '>'
  while (i < len) {
    // 跳过空白
    while (i < len && /\s/.test(str[i])) i++

    if (i >= len)
      break

    // 自闭合检测： "/>"
    if (str[i] === '/' && i + 1 < len && str[i + 1] === '>')
      return 0

    // 结束标签检测： ">"
    if (str[i] === '>')
      return 1

    // 解析属性名：必须以字母或下划线或冒号开头
    if (!/[A-Z_:]/i.test(str[i]))
      return false
    let _attrName = ''
    while (i < len && /[\w\-.:]/.test(str[i])) {
      _attrName += str[i++]
    }

    // 跳过空白
    while (i < len && /\s/.test(str[i])) i++

    // 属性名后可能直接是 > 或 />（例如单独布尔属性）
    if (i < len && str[i] === '/' && i + 1 < len && str[i + 1] === '>')
      return 0
    if (i < len && str[i] === '>')
      return 1

    // 如果有等号则解析值，否则这是一个布尔属性（合法），继续下一个属性
    if (i < len && str[i] === '=') {
      i++ // skip '='
      while (i < len && /\s/.test(str[i])) i++

      if (i >= len)
        return false

      // 引号值
      if (str[i] === '"' || str[i] === '\'') {
        const quote = str[i++]
        while (i < len && str[i] !== quote) i++
        if (i >= len)
          return false // 引号没闭合
        i++ // 跳过结束引号

        // 引号后的可能是空格、/> 或 >
        continue
      }
      else {
        // 无引号属性值：读到空白或 >
        const start = i
        while (i < len && /[^\s>]/.test(str[i])) i++
        if (i === start)
          return false // 没读到值
        // 读完后继续循环，后续会检测 '>' 或 '/>'
        continue
      }
    }

    // 如果既不是 '=' 也不是 '>'，那就是语法错误
    if (i < len && str[i] !== '>' && str[i] !== '/') {
      // 但允许继续（以防 attr 后接其他属性）：继续循环让 next iteration 检测
      continue
    }
  }

  return false
}
