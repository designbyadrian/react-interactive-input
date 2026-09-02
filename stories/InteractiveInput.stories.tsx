import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import InteractiveInput from '../src/InteractiveInput';

const meta = {
  title: 'Components/InteractiveInput',
  component: InteractiveInput,
  tags: ['autodocs'],
} satisfies Meta<typeof InteractiveInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: e => {
      console.log('handleChange', parseFloat(e.target.value), e);
    },
  },

  render: args => <InteractiveInput name="interactive-input" {...args} />,
};

export const LargeSteps: Story = {
  args: {
    step: 10,
  },
};

export const MinMaxValue: Story = {
  args: {
    min: -100,
    max: 100,
  },
};

export const WithCustomClass: Story = {
  render: () => (
    <InteractiveInput name="interactive-input" className="fancy-input" />
  ),
};

/**
 * A fully controlled host that parses every change and echoes the value back
 * into the `value` prop — the pattern that used to cause typing artefacts
 * (injected zeros, vanishing decimal points, broken negative numbers).
 */
const ControlledHostExample = () => {
  const [value, setValue] = useState(42);

  return (
    <div>
      <InteractiveInput
        name="controlled-input"
        value={value}
        min={-100}
        max={100}
        onChange={e => {
          const parsed = parseFloat(e.target.value);
          if (!Number.isNaN(parsed)) setValue(parsed);
        }}
      />
      <p>
        Host state: <code>{value}</code>
      </p>
      <p>
        Try: clear the field and type <code>-10</code>, or type <code>0.5</code>
        . The in-progress text is never stomped by the echoed value.
      </p>
    </div>
  );
};

export const ControlledHost: Story = {
  render: () => <ControlledHostExample />,
};

/**
 * A controlled host that echoes values back asynchronously (200ms delay),
 * simulating hosts that debounce, fetch, or otherwise update state late.
 */
const AsyncEchoExample = () => {
  const [value, setValue] = useState(10);

  return (
    <div>
      <InteractiveInput
        name="async-input"
        value={value}
        onChange={e => {
          const parsed = parseFloat(e.target.value);
          if (!Number.isNaN(parsed)) {
            setTimeout(() => setValue(parsed), 200);
          }
        }}
      />
      <p>
        Host state (echoed after 200ms): <code>{value}</code>
      </p>
    </div>
  );
};

export const AsyncEchoHost: Story = {
  render: () => <AsyncEchoExample />,
};
