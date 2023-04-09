import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { ToastProvider } from '../context/ToastProvider'
import { ToastOptionType, useToast } from '../hooks/useToast'
import '@testing-library/jest-dom'
import { useEffect } from 'react'

const TestBox = ({ message, ...props }: ToastOptionType & { message: string }) => {
  const { show, hide } = useToast('Hello World', { ...props })

  useEffect(() => {
    show()
  }, [])

  return (
    <div>
      <button onClick={() => show()}>Show</button>
      <button onClick={hide}>Hide</button>
    </div>
  )
}

describe('ToastMessage Test', () => {
  it('ToastMessage Render', async () => {
    const MESSAGE = 'Hello World'
    const DURATION = 200

    const { container } = render(
      <ToastProvider>
        <TestBox message={MESSAGE} duration={DURATION} />
      </ToastProvider>,
    )

    expect(container).toBeInTheDocument()

    const toastMessage = screen.getByText(MESSAGE)
    expect(toastMessage).toBeInTheDocument()

    await waitForElementToBeRemoved(toastMessage, { timeout: 3000 })

    expect(toastMessage).not.toBeInTheDocument()
  })

  it('ToastMessage Click Show Button', async () => {
    const MESSAGE = 'Hello World'
    const DURATION = 200

    render(
      <ToastProvider>
        <TestBox message={MESSAGE} duration={DURATION} />
      </ToastProvider>,
    )

    const toastMessage = screen.getByText(MESSAGE)
    expect(toastMessage).toBeInTheDocument()
    await waitForElementToBeRemoved(toastMessage, { timeout: DURATION + 600 })

    const showButton = screen.getByText('Show')
    expect(showButton).toBeInTheDocument()

    fireEvent.click(showButton)
    const toastMessage2 = screen.getByText(MESSAGE)
    expect(toastMessage2).toBeInTheDocument()

    await waitForElementToBeRemoved(toastMessage2, { timeout: DURATION + 600 })
    expect(toastMessage2).not.toBeInTheDocument()
  })

  it('ToastMessage Click Hide Button', async () => {
    const MESSAGE = 'Hello World'
    const DURATION = 2000

    render(
      <ToastProvider>
        <TestBox message={MESSAGE} duration={DURATION} />
      </ToastProvider>,
    )

    const toastMessage = screen.getByText(MESSAGE)
    expect(toastMessage).toBeInTheDocument()
    await waitForElementToBeRemoved(toastMessage, { timeout: DURATION + 600 })
    const hideButton = screen.getByText('Hide')
    expect(hideButton).toBeInTheDocument()
    fireEvent.click(hideButton)
    expect(toastMessage).not.toBeInTheDocument()
  })
})
