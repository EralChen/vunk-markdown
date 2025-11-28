import{_ as c}from"./chunk-BImtMpqp.js";import{_ as d,V as f}from"./chunk-icCS9XUz.js";/* empty css              */import{d as v,f as _,i as h,c as k,o as m,w as i,a as p,u as n,j as w,g as b,k as r,v as s}from"./chunk-AYRxNqGd.js";/* empty css              */import"./chunk-MDMvtqur.js";import"./chunk-B8h3Mgtp.js";/* empty css              */import"./chunk-DCcMeRAK.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              *//* empty css              */const g=`
{
  "tooltip": {
    "trigger": "item",
    "formatter": "{a}<br/>{b}: {c}亩"
  },
  "toolbox": {
    "show": true,
    "feature": {
      "mark": { "show": true },
      "dataView": { "show": true, "readOnly": false },
      "restore": { "show": true },
      "saveAsImage": { "show": true }
    }
  },
  "geo": {
    "map": "china",
    "roam": true,
    "type": "map",
    "emphasis": {
      "itemStyle": {
        "areaColor": "#2a333d"
      }
    },
    "itemStyle": {
      "areaColor": "#319fd0"
    }
  },
  "series": [
    {
      "name": "早稻种植面积",
      "type": "map",
      "data": [
        {"name": "沈荡镇", "value": 434.66},
        {"name": "望海街道", "value": 94.37},
        {"name": "西塘桥街道", "value": 86.01},
        {"name": "武原街道", "value": 146.02}
      ],
      "label": {
        "show": true,
        "formatter": "{b}: {c}亩"
      }
    }
  ]
}
`,x={key:0,class:"vk-template-echarts__error"},_t=v({__name:"error",setup(y){const a=`
# ECharts Example


:::echarts
\`\`\`json
${g}
\`\`\`

:::



`,e=_(10),l=h(()=>a.slice(0,e.value)),u=setInterval(()=>{e.value<a.length?e.value+=10:clearInterval(u)},60);return(C,t)=>(m(),k(n(f),{source:l.value,containers:["echarts","details"]},{default:i(()=>[p(n(d)),p(n(c),null,{default:i(({error:o})=>[o?(m(),w("div",x,[t[0]||(t[0]=r("br",null,null,-1)),r("span",null,s(o.message),1),t[1]||(t[1]=r("br",null,null,-1)),t[2]||(t[2]=r("br",null,null,-1)),r("pre",null,s(o.stack),1)])):b("",!0)]),_:1})]),_:1},8,["source"]))}});export{_t as default};
