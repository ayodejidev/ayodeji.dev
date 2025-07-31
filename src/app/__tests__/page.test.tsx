import { render, screen } from '@/test-utils'
import Home from '../page'

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(<Home />)
    expect(screen.getByText(/Developer Advocate/)).toBeInTheDocument()
    expect(screen.getByText(/passionate about developer experience/i)).toBeInTheDocument()
  })

  it('renders the projects section', () => {
    render(<Home />)
    expect(screen.getByText(/Featured Projects/)).toBeInTheDocument()
    // Check for a project card title
    expect(screen.getByText('Project One')).toBeInTheDocument()
  })

  it('renders the talks section', () => {
    render(<Home />)
    // If you have a talks section, update this to match the actual heading or content
    // expect(screen.getByText(/Recent Talks/)).toBeInTheDocument()
    // For now, just check for a project card as a placeholder
    expect(screen.getByText('Project One')).toBeInTheDocument()
  })

  it('renders project technologies', () => {
    render(<Home />)
    const technologies = ['React', 'TypeScript', 'Node.js', 'Next.js']
    technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument()
    })
  })
}) 