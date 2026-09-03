import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as i}from"./index-DQxMMF7O.js";import{M as fe,f as K,g as R,s as _,p as he}from"./MaskedInput-CJpwGlPr.js";import"./_commonjsHelpers-CqkleIqs.js";const ye=["metaKey","ctrlKey","altKey","shiftKey"],ge=3,u=i.forwardRef(({value:a,modifiers:l={altKey:1,ctrlKey:1,metaKey:1,shiftKey:.1},style:d={},onBlur:n,onFocus:v,onKeyDown:b,onPointerCancel:x,onPointerDown:I,onPointerMove:C,onPointerUp:E,...s},ee)=>{const o=i.useRef(null),[te,N]=i.useState(!1),[re,S]=i.useState(!1),M=s.step?+s.step:1,j=s.min!==void 0?+s.min:void 0,X=s.max!==void 0?+s.max:void 0,ae={cursor:te&&!re?void 0:"ew-resize",touchAction:"none",...d};i.useEffect(()=>()=>{const e=o.current;e!=null&&e.scrubbing&&(document.body.style.cursor=e.previousBodyCursor)},[]);const se=e=>{for(const t of ye)if(e[t])return l[t]??1;return 1},V=(e,t,c)=>{if(o.current=null,!!t.scrubbing){S(!1),document.body.style.cursor=t.previousBodyCursor;try{e.releasePointerCapture(t.pointerId)}catch{}c&&_(e,K(t.startValue)),e.blur()}},ne=e=>{if(I==null||I(e),e.defaultPrevented||e.button!==0||s.disabled||s.readOnly)return;const t=e.currentTarget;if(document.activeElement===t)return;let c=he(t.value);Number.isFinite(c)||(c=Number(s.defaultValue??j??0)||0),o.current={pointerId:e.pointerId,startX:e.clientX,lastX:e.clientX,startValue:c,accumulated:c,scrubbing:!1,previousBodyCursor:""}},ce=e=>{C==null||C(e);const t=o.current;if(!t||t.pointerId!==e.pointerId)return;const c=e.currentTarget;if(e.buttons===0){o.current=null;return}if(!t.scrubbing){if(Math.abs(e.clientX-t.startX)<ge)return;t.scrubbing=!0,t.lastX=e.clientX,S(!0),t.previousBodyCursor=document.body.style.cursor,document.body.style.cursor="ew-resize";try{c.setPointerCapture(e.pointerId)}catch{}}const k=se(e),me=M*k,pe=R(M)+R(k);t.accumulated+=(e.clientX-t.lastX)*me,t.lastX=e.clientX,j!==void 0&&(t.accumulated=Math.max(t.accumulated,j)),X!==void 0&&(t.accumulated=Math.min(t.accumulated,X));const H=+t.accumulated.toFixed(pe);Number.isNaN(H)||_(c,K(H))},T=e=>{const t=o.current;!t||t.pointerId!==e.pointerId||V(e.currentTarget,t,!1)},oe=e=>{E==null||E(e),T(e)},ie=e=>{x==null||x(e),T(e)},ue=e=>{const t=o.current;if(e.key==="Escape"&&(t!=null&&t.scrubbing)){e.preventDefault(),V(e.currentTarget,t,!0);return}b==null||b(e)},le=e=>{N(!0),v==null||v(e)},de=e=>{N(!1),n==null||n(e)};return r.jsx(fe,{...s,ref:ee,defaultValue:s.defaultValue??0,style:ae,value:a!==void 0?K(a):void 0,onBlur:de,onFocus:le,onKeyDown:ue,onPointerCancel:ie,onPointerDown:ne,onPointerMove:ce,onPointerUp:oe})});u.__docgenInfo={description:`Main component for the InteractiveInput.

Click and drag horizontally to scrub the value; a plain click focuses the
field for manual text editing (drags while focused select text instead of
scrubbing). Scrubbing works with mouse, touch and pen via Pointer Events,
survives the pointer leaving the element thanks to pointer capture, applies
modifier keys (read live from each pointer event) and can be cancelled with
Escape, restoring the value from before the drag.`,methods:[],displayName:"InteractiveInput",props:{modifiers:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  [key in InputModifier]?: number;
}`,signature:{properties:[{key:{name:"union",raw:"'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey'",elements:[{name:"literal",value:"'shiftKey'"},{name:"literal",value:"'altKey'"},{name:"literal",value:"'ctrlKey'"},{name:"literal",value:"'metaKey'"}],required:!1},value:{name:"number"}}]}},description:"Modifiers to apply to the input value. Defaults to `{ shiftKey: 0.1 }`.",defaultValue:{value:`{
  altKey: 1,
  ctrlKey: 1,
  metaKey: 1,
  shiftKey: 0.1,
}`,computed:!1}},value:{required:!1,tsType:{name:"number"},description:""},style:{defaultValue:{value:"{}",computed:!1},required:!1}}};const je={title:"Components/InteractiveInput",component:u,tags:["autodocs"]},m={args:{onChange:a=>{console.log("handleChange",parseFloat(a.target.value),a)}},render:a=>r.jsx(u,{name:"interactive-input",...a})},p={args:{step:10}},f={args:{min:-100,max:100}},h={render:()=>r.jsx(u,{name:"interactive-input",className:"fancy-input"})},ve=()=>{const[a,l]=i.useState(42);return r.jsxs("div",{children:[r.jsx(u,{name:"controlled-input",value:a,min:-100,max:100,onChange:d=>{const n=parseFloat(d.target.value);Number.isNaN(n)||l(n)}}),r.jsxs("p",{children:["Host state: ",r.jsx("code",{children:a})]}),r.jsxs("p",{children:["Try: clear the field and type ",r.jsx("code",{children:"-10"}),", or type ",r.jsx("code",{children:"0.5"}),". The in-progress text is never stomped by the echoed value."]})]})},y={render:()=>r.jsx(ve,{})},be=()=>{const[a,l]=i.useState(10);return r.jsxs("div",{children:[r.jsx(u,{name:"async-input",value:a,onChange:d=>{const n=parseFloat(d.target.value);Number.isNaN(n)||setTimeout(()=>l(n),200)}}),r.jsxs("p",{children:["Host state (echoed after 200ms): ",r.jsx("code",{children:a})]})]})},g={render:()=>r.jsx(be,{})};var A,w,F;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    onChange: e => {
      console.log('handleChange', parseFloat(e.target.value), e);
    }
  },
  render: args => <InteractiveInput name="interactive-input" {...args} />
}`,...(F=(w=m.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var O,q,D;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    step: 10
  }
}`,...(D=(q=p.parameters)==null?void 0:q.docs)==null?void 0:D.source}}};var z,L,B;f.parameters={...f.parameters,docs:{...(z=f.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    min: -100,
    max: 100
  }
}`,...(B=(L=f.parameters)==null?void 0:L.docs)==null?void 0:B.source}}};var W,G,Y;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <InteractiveInput name="interactive-input" className="fancy-input" />
}`,...(Y=(G=h.parameters)==null?void 0:G.docs)==null?void 0:Y.source}}};var J,P,Q;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <ControlledHostExample />
}`,...(Q=(P=y.parameters)==null?void 0:P.docs)==null?void 0:Q.source}}};var Z,$,U;g.parameters={...g.parameters,docs:{...(Z=g.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <AsyncEchoExample />
}`,...(U=($=g.parameters)==null?void 0:$.docs)==null?void 0:U.source}}};const Ke=["Default","LargeSteps","MinMaxValue","WithCustomClass","ControlledHost","AsyncEchoHost"];export{g as AsyncEchoHost,y as ControlledHost,m as Default,p as LargeSteps,f as MinMaxValue,h as WithCustomClass,Ke as __namedExportsOrder,je as default};
