import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ToastMessage } from './index'
import { useToast } from '../../../hooks/useToast'

export default {
  title: 'Block/ToastMessage',
  component: ToastMessage,
  argTypes: {},
} as ComponentMeta<typeof ToastMessage>

const Template: ComponentStory<typeof ToastMessage> = ({ ...options }) => {
  const message = { ...options }.children as string
  const { show, hide } = useToast(message, { ...options })

  return (
    <div style={{ width: '400px', height: '400px', background: '#d9d9d9', position: 'relative' }}>
      <button onClick={() => show()}>Show</button>
      <button onClick={hide}>Hide</button>
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Toast Message',
  className: 'toastMessage',
  distance: 32,
  color: 'black',
  borderRadius: 8,
  subPosition: 'center',
  duration: 2000,
  backgroundColor: undefined,
  width: 400,
  position: 'bottom',
}

export const Top = Template.bind({})
Top.args = {
  children: 'Toast Message',
  position: 'top',
}

export const TopPretty = Template.bind({})
TopPretty.args = {
  children: 'Toast Message',
  position: 'top',
  distance: 20,
  width: 200,
  borderRadius: 4,
  color: 'white',
}

export const BottomLeft = Template.bind({})
BottomLeft.args = {
  subPosition: 'left',
  children: 'Toast Message',
  distance: 20,
  width: 200,
  borderRadius: 4,
  color: 'white',
}

export const BottomRight = Template.bind({})
BottomRight.args = {
  subPosition: 'right',
  children: 'Toast Message',
  distance: 20,
  width: 200,
  borderRadius: 4,
  color: 'white',
}
