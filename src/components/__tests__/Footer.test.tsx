import { render, screen } from '@/test-utils'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders the about section heading', () => {
    render(<Footer />)
    // The heading 'About' should be present
    const aboutHeadings = screen.getAllByText('About')
    // There should be at least one heading with role 'heading'
    expect(aboutHeadings.some(el => el.tagName.toLowerCase() === 'h3')).toBe(true)
  })

  it('renders the about section description', () => {
    render(<Footer />)
    expect(screen.getByText(/Developer Advocate & Fullstack Software Engineer/)).toBeInTheDocument()
  })

  it('renders all quick links', () => {
    render(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'About' }).length).toBeGreaterThan(0)
  })

  it('renders all social links with correct hrefs', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
    const twitterLink = screen.getByRole('link', { name: 'Twitter' })
    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' })

    expect(githubLink).toHaveAttribute('href', 'https://github.com/ayodeji-dev')
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/ayodeji_dev')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/ayodeji-dev')
  })

  it('renders the copyright notice with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Ayodeji. All rights reserved.`)).toBeInTheDocument()
  })
}) 