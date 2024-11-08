import{j as e}from"./jsx-runtime-j_jdvEMj.js";import{M as i}from"./MaskedInput-Csx7HFmL.js";import"./index-B-o1Wr-g.js";import"./_commonjsHelpers-Cpj98o6Y.js";const g={title:"Components/MaskedInput",component:i,tags:["autodocs"]},s={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{children:[e.jsx("p",{children:"The component"}),e.jsx(i,{...r})]}),e.jsxs("div",{children:[e.jsx("p",{children:"A regular, vanilla input element with no masking applied, for comparison."}),e.jsx("input",{type:"number",...r})]})]}),args:{onChange:r=>{console.log(parseFloat(r.target.value))}}},n={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsxs("div",{children:[e.jsx("p",{children:"The component"}),e.jsx(i,{...r})]}),e.jsxs("div",{children:[e.jsx("p",{children:"A regular, vanilla input element with no masking applied, for comparison."}),e.jsx("input",{type:"number",...r})]})]}),args:{step:.1}};var a,t,o;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
    onChange: e => {
      console.log(parseFloat(e.target.value));
    }
  }
}`,...(o=(t=s.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};var p,l,d;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const v=["Default","WithStep"];export{s as Default,n as WithStep,v as __namedExportsOrder,g as default};
