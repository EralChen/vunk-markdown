import{_ as p}from"./chunk-B8P_GTog.js";import{_ as m,a}from"./chunk-50xLZI31.js";/* empty css              */import{d as s,t as c,g as l,c as u,o as _,w as f,a as i,u as r}from"./chunk-DyqHK6XP.js";import"./chunk-DdpZcm2P.js";import"./chunk-B8h3Mgtp.js";import"./chunk-Bfzl22zW.js";import"./chunk-Dix477Sg.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */const x=`{
  "title": {
    "text": "基础柱状图示例",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "type": "shadow"
    }
  },
  "xAxis": {
    "type": "category",
    "data": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "销量",
      "type": "bar",
      "data": [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}
`,st=s({__name:"basic",setup(d){const o=`
# ECharts Example

:::echarts
\`\`\`json
${x}
\`\`\`
:::
`,t=c(400),e=l(()=>o.slice(0,t.value)),n=setInterval(()=>{t.value<o.length?t.value+=2:clearInterval(n)},60);return(v,h)=>(_(),u(r(a),{source:e.value,containers:["echarts"]},{default:f(()=>[i(r(m)),i(r(p))]),_:1},8,["source"]))}});export{st as default};
