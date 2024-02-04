import { GraduationCap, Home, NotebookPen, Settings } from 'lucide-react'

import { SidebarItem } from './sidebar-item'

const guestRoutes = [
  {
    icon: Home,
    label: 'Home',
    href: '/'
  },
  {
    icon: GraduationCap,
    label: 'My courses',
    href: '/course/myCourses'
  },
  {
    icon: NotebookPen,
    label: 'Notes',
    href: '/notes'
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/user-profile'
  }
]

export function SidebarRoutes(){
  const routes = guestRoutes

  return(
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
