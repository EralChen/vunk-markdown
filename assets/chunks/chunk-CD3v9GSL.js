import{_ as p}from"./chunk-eGpPBMmX.js";import{_ as m,a}from"./chunk-CZ8VjX1X.js";/* empty css              */import{d as s,b as c,h as l,c as u,o as _,w as f,a as i,u as r}from"./chunk-Biui6BxF.js";import"./chunk-CA0-zCqE.js";import"./chunk-SqlbPPT2.js";import"./chunk-C26dHzD_.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */const x=`{
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
`,at=s({__name:"basic",setup(d){const o=`
# ECharts Example

:::echarts
\`\`\`json
${x}
\`\`\`
:::
`,t=c(400),e=l(()=>o.slice(0,t.value)),n=setInterval(()=>{t.value<o.length?t.value+=2:clearInterval(n)},60);return(h,v)=>(_(),u(r(a),{source:e.value,containers:["echarts"]},{default:f(()=>[i(r(m)),i(r(p))]),_:1},8,["source"]))}});export{at as default};
