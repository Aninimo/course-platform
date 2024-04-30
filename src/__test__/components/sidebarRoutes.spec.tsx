import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

import { SidebarRoutes } from '../../components/sidebar-routes'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
    };
  },
}))

describe('SidebarRoutes', () => {
  it('renders sidebar items correctly', () => {
     render(<SidebarRoutes />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('My courses')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
