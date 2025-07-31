import { render, screen, fireEvent } from '@/test-utils'
import ThemeToggle from '../ThemeToggle'

describe('ThemeToggle', () => {
  it('renders the theme toggle button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('toggles between light and dark mode icons', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    
    // Initial state (light mode)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
    
    // Click to toggle to dark mode
    fireEvent.click(button)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
    
    // Click to toggle back to light mode
    fireEvent.click(button)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })
}) 