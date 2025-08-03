import { render, screen } from '@/test-utils'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the footer content', () => {
    render(<Footer />)
    expect(screen.getByText(/Built with/)).toBeInTheDocument()
    expect(screen.getByText(/Ayodeji Ogundare/)).toBeInTheDocument()
  })

  it('renders the copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 All rights reserved./)).toBeInTheDocument()
  })
}) 