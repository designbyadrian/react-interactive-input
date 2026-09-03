import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as r}from"./index-AGuS8-Lw.js";import{M as a}from"./index-CkuBRIpo.js";import"./MaskedInput-CJpwGlPr.js";import"./index-DQxMMF7O.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-o2_dnMhB.js";import"./index-DTrdMgma.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function i(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"react-interactive-input-",children:"React Interactive Input 👈"}),`
`,e.jsxs(n.p,{children:["In Blender and similar 3D applications, users can adjust values in numeric input boxes by clicking and dragging horizontally, often referred to as ",e.jsx(n.strong,{children:"scrubbing."})]}),`
`,e.jsx(n.p,{children:"The user typically clicks and holds the mouse over the number, then drags left or right to decrease or increase the value smoothly. This provides quick, precise control over numeric adjustments without needing to type manually or rely on up/down arrows."}),`
`,e.jsx(n.p,{children:"This component is a React implementation of that behavior, with a few additional features and customizations."}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { InteractiveInput } from '@designbyadrian/react-interactive-input';

function MyComponent() {
  return (
    <InteractiveInput
      value={42}
      onChange={(value) => console.log(value)}
    />
  );
}
`})}),`
`,e.jsx(n.h3,{id:"attributes",children:"Attributes"}),`
`,e.jsx(n.p,{children:`The InteractiveInput component accepts all properties of the HTMLInputElement element,
especially the following attributes:`}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"value"}),": The initial value of the input field."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"onChange"}),": A callback function that receives the new value when it changes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"step"}),": The amount to increment or decrement the value when scrubbing."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"min"}),": The minimum value allowed."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"max"}),": The maximum value allowed."]}),`
`]}),`
`,e.jsx(n.h2,{id:"input-masking-for-negative-number-handling",children:"Input Masking for Negative Number Handling"}),`
`,e.jsx(n.p,{children:"This package uses a custom input component featuring input masking specifically designed to address limitations with negative numbers in standard HTML input elements. This component ensures that negative values are properly formatted and accepted by the input field, preventing unexpected behavior or errors when handling signed numbers."}),`
`,e.jsxs(n.p,{children:["The component called ",e.jsx(n.code,{children:"MaskedInput"})," is exported as an extra. You're welcome!"]}),`
`,e.jsx(n.h3,{id:"usage-1",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { MaskedInput } from '@designbyadrian/react-interactive-input';

function MyComponent() {
  return (
    <MaskedInput
      value="-4.2"
      onChange={(e) => console.log(parseFloat(e.target.value))}
    />
  );
}
`})}),`
`,e.jsx(n.p,{children:"You can provide your own masking function to customize the behavior of the input field."}),`
`,e.jsx(n.p,{children:"Example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { MaskedInput } from '@designbyadrian/react-interactive-input';

function MyComponent() {
  return (
    <MaskedInput
      value="-4.2"
      onChange={(e) => console.log(parseFloat(e.target.value))}
      mask={(value) => value.replace(/[^0-9.-]/g, '')}
    />
  );
}
`})})]})}function x(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{x as default};
