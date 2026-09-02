<center>
  <img src="assets/interactive-input-banner.svg" alt="" width="100%" aria-hidden="true" />
  <h1>React Interactive Input</h1>
</center>

![NPM Version](https://img.shields.io/npm/v/%40designbyadrian%2Freact-interactive-input?style=for-the-badge) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40designbyadrian%2Freact-interactive-input?style=for-the-badge&label=size) ![npm bundle size](https://img.shields.io/bundlephobia/min/%40designbyadrian/react-interactive-input/2.0.2?style=for-the-badge&label=minified) ![GitHub License](https://img.shields.io/github/license/designbyadrian/react-interactive-input?style=for-the-badge)

In Blender and similar 3D applications, users can adjust values in numeric input boxes by clicking and dragging horizontally, often referred to as **scrubbing.**

The user typically clicks and holds the mouse over the number, then drags left or right to decrease or increase the value smoothly. This provides quick, precise control over numeric adjustments without needing to type manually or rely on up/down arrows.

This component is a React implementation of that behavior, with a few additional features and customizations.

## Features

- **Interactive Input**: Click and drag to adjust numeric values smoothly.
- **Customizable**: Control the step, min, and max values for the input.
- **Controlled Component**: Fully controlled input field with a callback for value changes.
- **Input Masking**: Custom input component for handling negative numbers.
- **Theming**: Easily customize styles to match your application's look and feel.
- **Accessibility**: Built with accessibility in mind.

## Try it out

You can try out the component in the [Storybook](https://designbyadrian.github.io/react-interactive-input).

🦄🕹️🍕

## Installation

To install the library, use npm or yarn:

```bash
npm install @designbyadrian/react-interactive-input
# or
yarn add @designbyadrian/react-interactive-input
```

## Usage

```jsx
import { InteractiveInput } from '@designbyadrian/react-interactive-input';

function MyComponent() {
  return <InteractiveInput value={42} onChange={value => console.log(value)} />;
}
```

## Attributes

The `InteractiveInput` component accepts all properties of the HTMLInputElement element, especially the following attributes:

- `value`: The controlled numeric value of the input field.
- `onChange`: A callback function that receives a change event when the value changes.
- `step`: The amount to increment or decrement the value when scrubbing.
- `min`: The minimum value allowed.
- `max`: The maximum value allowed.
- `modifiers`: Multipliers applied to `step` while a modifier key is held during scrubbing. Defaults to `{ shiftKey: 0.1, altKey: 1, ctrlKey: 1, metaKey: 1 }`.

## Scrubbing behavior

- A **plain click** focuses the field for manual text editing; scrubbing only starts once the pointer moves more than a few pixels horizontally. While the field is focused, dragging selects text as in a regular input.
- Scrubbing works with mouse, touch and pen (Pointer Events), and keeps working when the pointer leaves the element thanks to pointer capture.
- Modifier keys are read live from the pointer, so pressing or releasing e.g. <kbd>Shift</kbd> mid-drag changes the scrub speed immediately, without value jumps.
- Pressing <kbd>Escape</kbd> during a drag cancels it and restores the value from before the drag.
- After a scrub the field is blurred, so the next click-and-drag scrubs again.

## Change events and controlled usage

All change events delivered to `onChange` — from typing, scrubbing, and arrow-key stepping alike — are **genuine React ChangeEvents**: `event.target` is the real input element and `event.target.value` is always a string in canonical dot-decimal format (a typed `1,5` is delivered as `"1.5"`), mirroring how native number inputs expose a locale-independent DOM value.

In-progress editing states are emitted as-is: an emptied field emits `""` and a lone minus emits `"-"`. Parse with `parseFloat` and decide what to do with `NaN` in your host (typically: keep the previous value). While the field is focused, the component never overwrites the text with values echoed back through the `value` prop, so typing `-10`, `0.5`, or deleting everything and retyping works without artefacts. On blur, the text is normalized (`007` becomes `7`, `1.` becomes `1`, a lone `-` becomes empty) and reconciled with the `value` prop.

## Components

The library exports two components: `InteractiveInput` and `MaskedInput`.

### InteractiveInput

The main component for interactive input behavior.

### MaskedInput

A custom input component featuring input masking specifically designed to address limitations with negative numbers in standard HTML input elements. This component ensures that negative values are properly formatted and accepted by the input field, preventing unexpected behavior or errors when handling signed numbers.

You can provide your own masking function to customize the behavior of the input field. A mask is a pure function `(rawValue: string, previousValue: string) => string` that returns the text to display — return `previousValue` to reject an edit.

Example:

```jsx
import { MaskedInput } from '@designbyadrian/react-interactive-input';

function MyComponent() {
  return (
    <MaskedInput
      value="-4.2"
      onChange={e => console.log(parseFloat(e.target.value))}
    />
  );
}
```

## Running locally

To run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone
```

2. Install the dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The project will be available at `http://localhost:6006`.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
