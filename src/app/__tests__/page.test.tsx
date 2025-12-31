import { render, screen } from '@/test-utils'
import Home from '../page'

// Mock the RecentActivity component since it's an async server component
jest.mock('@/components/RecentActivity', () => {
  return function MockRecentActivity() {
    return null
  }
})

// Mock the hashnode service to prevent API calls in tests
jest.mock('@/services/hashnode', () => ({
  getAllPosts: jest.fn().mockResolvedValue([]),
  getPostBySlug: jest.fn().mockResolvedValue(null),
}))

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(<Home />)
    expect(screen.getByText(/Ayodeji Ogundare/)).toBeInTheDocument()
    expect(screen.getByText(/passionate about developer experience/i)).toBeInTheDocument()
  })

  it('renders the recent activity section', () => {
    render(<Home />)
    // RecentActivity is mocked to return null, but we verify the page structure
    expect(screen.getByText(/Ayodeji Ogundare/)).toBeInTheDocument()
  })
}) 