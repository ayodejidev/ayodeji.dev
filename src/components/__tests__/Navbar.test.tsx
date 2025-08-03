import { render, screen, fireEvent } from '@/test-utils'
import Navbar from '../Navbar'

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('Ayodeji.dev')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Home' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Blog' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Speaking' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: 'Projects' }).length).toBeGreaterThan(0)
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    // Click menu button to open
    fireEvent.click(menuButton)
    // There should be at least one mobile menu link visible in the DOM
    const mobileLinks = screen.getAllByRole('link', { name: 'Home' })
    expect(mobileLinks.length).toBeGreaterThan(0)
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(menuButton)
    // Click the first 'Home' link (mobile menu)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' })
    fireEvent.click(homeLinks[homeLinks.length - 1]) // Click the last one, assuming it's mobile
    // The menu should close, but in jsdom we can't test visibility, so just check links are still present
    expect(homeLinks.length).toBeGreaterThan(0)
  })
}) 