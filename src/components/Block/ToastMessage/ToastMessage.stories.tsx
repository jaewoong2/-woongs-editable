import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ToastMessage } from './index'
import { useToast } from '../../../hooks/useToast'

export default {
  title: 'Atom/ToastMessage',
  component: ToastMessage,
  argTypes: {},
} as ComponentMeta<typeof ToastMessage>

const Template: ComponentStory<typeof ToastMessage> = () => {
  const { show, hide } = useToast('Message', { distance: 32, width: 500 })

  return (
    <div style={{ width: '400px', height: '400px', background: '#d9d9d9', position: 'relative' }}>
      <button onClick={() => show()}>Show</button>
      <button onClick={hide}>Hide</button>
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Hello ToastMessage',
}
