# @jaewoong2/Toast

## Description

### Very Simple & Easy Toast Message For You

### Version
- `0.1.1`
- Be `1.0.0` When This Todo will Be Done.
### Storybook
- `Getting Ready`
---
## Installation

### yarn
```
$ yarn add @jaewoong2/toast
```
### npm

```
$ npm i @jaewoong2/toast
```

---
## Usage

### Declaration

```ts
import { ToastProvider, useToast } from '@jaewoong2/toast'
```

### Provider

```tsx
import { ToastProvider } from '@jaewoong2/toast'

const App = () => {
   return (
      <ToastProvider>
         <RootComponent />
      </ToastProvider>
   )
}
```

### useToast Call
```tsx
import { useToast } from '@jaewoong2/toast'

const ChildrenComponent = () => {
   const { show, hide } = useToast('Toast Message', options);
   
   return (
      <div>
        <button onClick={show}>Show Button</button>
        <button onClick={() => show().top()}>Show Top</button>
        <button onClick={hide}>Hide Button</button>
      </div>
   )
}

```

---
## Toast Options
```ts
type ToastOptionType = {
  // ToastMessage Duration (dfault: 2000ms)
  duration?: number
  // ToastMessage position (default: bottom)
  position?: 'top' | 'bottom'
  // ToastMessage subPosition (default: center)
  subPosition?: 'center' | 'left' | 'right'
  // ToastMessage background-color (default: #71A8EC)
  backgroundColor?: string
  // ToastMessage distance (px) from position (default: 64px)
  distance?: number
  // ToastMessage width (default: 400px)
  width?: number
  // ToastMessage color ["black(default)" || "white"]
  color?: 'black' | 'white'
  // ToastMessage className
  className?: string
  // ToastMessage border-radius
  borderRadius?: number
}

```
---
## Next Todo
1. Deployment / Publish
2. StroyBook Hosting
3. ~~Document Writing~~
4. Options (By Priority)
   1. DarkMode 
   2. Animation Direction: "left to center" | "right to center"
   3. FadeIn, FadeOut: 'slide' | 'fadein'
   4. Type: "Error" | "Normal" | "Warn" | "Loading"
   5. TimeOut Bar
---

### Build by Rollup
### Style by Emotion
### Test by Storybook
### Use For React