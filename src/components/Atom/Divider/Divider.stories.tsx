import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Divider } from './index'

export default {
  title: 'Atom/Divider',
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = ({ ...args }) => <Divider {...args} />

export const Primary = Template.bind({})
Primary.args = {
  size: 'normal',
}

export const Bold = Template.bind({})
Bold.args = {
  size: 'bold',
}

export const Thin = Template.bind({})
Thin.args = {
  size: 'thin',
}
