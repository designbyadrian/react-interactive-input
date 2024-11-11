import{j as e}from"./jsx-runtime-j_jdvEMj.js";import{M as s}from"./MaskedInput-DZdqp46F.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const h={title:"Components/MaskedInput",component:s,tags:["autodocs"]},r={render:n=>e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{children:[e.jsx("p",{children:"The component"}),e.jsx(s,{name:"default-input",...n})]}),e.jsxs("div",{children:[e.jsx("p",{children:"A regular, vanilla input element with no masking applied, for comparison."}),e.jsx("input",{type:"number",...n})]})]}),args:{onChange:n=>{console.log("handleChange",parseFloat(n.target.value),n)}}},a={render:n=>e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{children:[e.jsx("p",{children:"The component"}),e.jsx(s,{...n})]}),e.jsxs("div",{children:[e.jsx("p",{children:"A regular, vanilla input element with no masking applied, for comparison."}),e.jsx("input",{type:"number",...n})]})]}),args:{step:.1}};var i,t,o;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
      <div>
        <p>The component</p>
        <MaskedInput name="default-input" {...args} />
      </div>
      <div>
        <p>
          A regular, vanilla input element with no masking applied, for
          comparison.
        </p>
        <input type="number" {...args} />
      </div>
    </div>,
  args: {
    onChange: e => {
      console.log('handleChange', parseFloat(e.target.value), e);
    }
  }
}`,...(o=(t=r.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var p,l,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
      <div>
        <p>The component</p>
        <MaskedInput {...args} />
      </div>
      <div>
        <p>
          A regular, vanilla input element with no masking applied, for
          comparison.
        </p>
        <input type="number" {...args} />
      </div>
    </div>,
  args: {
    step: 0.1
  }
}`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const x=["Default","WithStep"];export{r as Default,a as WithStep,x as __namedExportsOrder,h as default};
