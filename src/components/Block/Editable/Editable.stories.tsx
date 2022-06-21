import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Editable } from './index'

export default {
  title: 'Atom/Editable',
  component: Editable,
  argTypes: {},
} as ComponentMeta<typeof Editable>

const Template: ComponentStory<typeof Editable> = () => <Editable />

export const Primary = Template.bind({})
Primary.args = {}
