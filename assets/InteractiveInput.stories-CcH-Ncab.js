import{j as p}from"./jsx-runtime-j_jdvEMj.js";import{r}from"./index-B-o1Wr-g.js";import{g as Z,M as $}from"./MaskedInput-DZdqp46F.js";import"./_commonjsHelpers-Cpj98o6Y.js";function f({value:a,modifiers:h={altKey:1,ctrlKey:1,metaKey:1,shiftKey:.1},style:O={},...e}){const[K,v]=r.useState(String(a||0)),[y,o]=r.useState(""),[,x]=r.useState([0,0]),E=r.useRef(0),M=e.step?+e.step:1,U={cursor:"ew-resize",...O},A=t=>{var s;v(t.target.value),t.target.value!=="-"&&((s=e.onChange)==null||s.call(e,t))},i=r.useCallback(t=>{const s=t.target;x(S=>{const{clientX:L,clientY:G}=t,[b,H]=S,w=b-L,V=H-G;let k=1;y&&(k=h[y]||1);const D=M*k,J=Z(D);let g=Math.sqrt(w*w+V*V)*D;L<b&&(g=-g);let n=E.current+g;if(e.min&&(n=Math.max(n,+e.min)),e.max&&(n=Math.min(n,+e.max)),n=+n.toFixed(J),n&&v(String(n)),n&&e.onChange){const Q={...new Event("change",{bubbles:!0}),target:{...s,value:n,name:s.name}};e.onChange(Q)}return S})},[y,e.max,e.min,M,h]),u=r.useCallback(()=>{document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",u)},[i]),B=r.useCallback(t=>{let s=+K;isNaN(s)&&(s=+(e.defaultValue||e.min||0)),E.current=s,x([t.clientX,t.clientY]),document.addEventListener("mousemove",i),document.addEventListener("mouseup",u)},[i,u,a,e.min,e.defaultValue]),C=t=>{t.metaKey?o("metaKey"):t.ctrlKey?o("ctrlKey"):t.altKey?o("altKey"):t.shiftKey&&o("shiftKey")},I=()=>{o("")};return r.useEffect(()=>{v(String(a||0))},[a]),r.useEffect(()=>(document.addEventListener("keydown",C),document.addEventListener("keyup",I),()=>{document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",u),document.removeEventListener("keydown",C),document.removeEventListener("keyup",I)}),[]),p.jsx($,{...e,style:U,onChange:A,onMouseDown:B,value:K})}f.__docgenInfo={description:"Main component for the InteractiveInput",methods:[],displayName:"InteractiveInput",props:{modifiers:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [key in InputModifier]?: number;
}`,signature:{properties:[{key:{name:"union",raw:"'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey'",elements:[{name:"literal",value:"'shiftKey'"},{name:"literal",value:"'altKey'"},{name:"literal",value:"'ctrlKey'"},{name:"literal",value:"'metaKey'"}],required:!1},value:{name:"number"}}]}},description:"Modifiers to apply to the input value. Defaults to `{ shiftKey: 0.1 }`.",defaultValue:{value:`{
  altKey: 1,
  ctrlKey: 1,
  metaKey: 1,
  shiftKey: 0.1,
}`,computed:!1}},value:{required:!1,tsType:{name:"number"},description:""},style:{defaultValue:{value:"{}",computed:!1},required:!1}}};const re={title:"Components/InteractiveInput",component:f,tags:["autodocs"]},c={args:{onChange:a=>{console.log("handleChange",parseFloat(a.target.value),a)}},render:a=>p.jsx(f,{name:"interactive-input",...a})},l={args:{step:10}},m={args:{min:-100,max:100}},d={render:()=>p.jsx(f,{name:"interactive-input",className:"fancy-input"})};var j,q,N;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    onChange: e => {
      console.log('handleChange', parseFloat(e.target.value), e);
    }
  },
  render: args => <InteractiveInput name="interactive-input" {...args} />
}`,...(N=(q=c.parameters)==null?void 0:q.docs)==null?void 0:N.source}}};var _,F,P;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    step: 10
  }
}`,...(P=(F=l.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var R,T,W;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    min: -100,
    max: 100
  }
}`,...(W=(T=m.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var X,Y,z;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <InteractiveInput name="interactive-input" className="fancy-input" />
}`,...(z=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:z.source}}};const oe=["Default","LargeSteps","MinMaxValue","WithCustomClass"];export{c as Default,l as LargeSteps,m as MinMaxValue,d as WithCustomClass,oe as __namedExportsOrder,re as default};
