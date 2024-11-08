import{j as z}from"./jsx-runtime-j_jdvEMj.js";import{r as s}from"./index-B-o1Wr-g.js";import{g as Q,M as Z}from"./MaskedInput-Csx7HFmL.js";import"./_commonjsHelpers-Cpj98o6Y.js";function g({value:u,modifiers:p={altKey:1,ctrlKey:1,metaKey:1,shiftKey:.1},style:F={},...e}){const[h,f]=s.useState(String(u||0)),[y,r]=s.useState(""),[,K]=s.useState([0,0]),x=s.useRef(0),E=e.step?+e.step:1,O={cursor:"ew-resize",...F},U=t=>{var n;f(t.target.value),t.target.value!=="-"&&((n=e.onChange)==null||n.call(e,t))},o=s.useCallback(t=>{K(n=>{const{clientX:C,clientY:B}=t,[S,G]=n,L=S-C,b=G-B;let w=1;y&&(w=p[y]||1);const V=E*w,H=Q(V);let v=Math.sqrt(L*L+b*b)*V;C<S&&(v=-v);let a=x.current+v;if(e.min&&(a=Math.max(a,+e.min)),e.max&&(a=Math.min(a,+e.max)),a=+a.toFixed(H),a&&f(String(a)),a&&e.onChange){const J={...new Event("change",{bubbles:!0}),target:{...t.target,value:a}};e.onChange(J)}return n})},[y,e.max,e.min,E,p]),i=s.useCallback(()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i)},[o]),A=s.useCallback(t=>{let n=+h;isNaN(n)&&(n=+(e.defaultValue||e.min||0)),x.current=n,K([t.clientX,t.clientY]),document.addEventListener("mousemove",o),document.addEventListener("mouseup",i)},[o,i,u,e.min,e.defaultValue]),M=t=>{t.metaKey?r("metaKey"):t.ctrlKey?r("ctrlKey"):t.altKey?r("altKey"):t.shiftKey&&r("shiftKey")},I=()=>{r("")};return s.useEffect(()=>{f(String(u||0))},[u]),s.useEffect(()=>(document.addEventListener("keydown",M),document.addEventListener("keyup",I),()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",i),document.removeEventListener("keydown",M),document.removeEventListener("keyup",I)}),[]),z.jsx(Z,{className:e.className,onChange:U,onMouseDown:A,value:h,style:O})}g.__docgenInfo={description:"Main component for the InteractiveInput",methods:[],displayName:"InteractiveInput",props:{modifiers:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [key in InputModifier]?: number;
}`,signature:{properties:[{key:{name:"union",raw:"'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey'",elements:[{name:"literal",value:"'shiftKey'"},{name:"literal",value:"'altKey'"},{name:"literal",value:"'ctrlKey'"},{name:"literal",value:"'metaKey'"}],required:!1},value:{name:"number"}}]}},description:"Modifiers to apply to the input value. Defaults to `{ shiftKey: 0.1 }`.",defaultValue:{value:`{
  altKey: 1,
  ctrlKey: 1,
  metaKey: 1,
  shiftKey: 0.1,
}`,computed:!1}},value:{required:!1,tsType:{name:"number"},description:""},style:{defaultValue:{value:"{}",computed:!1},required:!1}}};const se={title:"Components/InteractiveInput",component:g,tags:["autodocs"]},c={args:{}},l={args:{step:10}},m={args:{min:-100,max:100}},d={render:()=>z.jsx(g,{className:"fancy-input"})};var k,D,N;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {}
}`,...(N=(D=c.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var j,q,_;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    step: 10
  }
}`,...(_=(q=l.parameters)==null?void 0:q.docs)==null?void 0:_.source}}};var P,R,T;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    min: -100,
    max: 100
  }
}`,...(T=(R=m.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var W,X,Y;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <InteractiveInput className="fancy-input" />
}`,...(Y=(X=d.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const re=["Default","LargeSteps","MinMaxValue","WithCustomClass"];export{c as Default,l as LargeSteps,m as MinMaxValue,d as WithCustomClass,re as __namedExportsOrder,se as default};
