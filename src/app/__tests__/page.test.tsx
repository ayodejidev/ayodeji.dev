import { render, screen } from '@/test-utils'
import Home from '../page'

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(<Home />)
    expect(screen.getByText(/Ayodeji Ogundare/)).toBeInTheDocument()
    expect(screen.getByText(/passionate about developer experience/i)).toBeInTheDocument()
  })

  it('renders the featured section', () => {
    render(<Home />)
    expect(screen.getByText('Blogs')).toBeInTheDocument()
    expect(screen.getByText('Talks')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })
}) 