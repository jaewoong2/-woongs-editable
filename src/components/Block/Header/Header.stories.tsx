import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Header } from './index'

export default {
  title: 'Atom/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => {
  return (
    <div style={{ width: '450px' }}>
      <Header {...args} />
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  menu: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Bold', 'Italic', 'Underline', 'Monospace'],
}
