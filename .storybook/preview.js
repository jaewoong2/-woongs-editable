import { ToastProvider } from '@jaewoong2/toast'
import { addDecorator } from '@storybook/react'
// import { ToastProvider } from '../src/context/ToastProvider'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ToastProvider>
      <Story />
    </ToastProvider>
  ),
]
