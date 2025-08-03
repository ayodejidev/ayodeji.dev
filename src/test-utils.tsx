import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from './components/ThemeProvider'

function render(ui: React.ReactElement, { ...renderOptions } = {}) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render } 