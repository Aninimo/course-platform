import { Brain } from 'lucide-react'

import { SidebarRoutes } from './sidebar-routes'

export function Sidebar(){
  return(
    <div className='h-full flex flex-col overflow-y-auto'>
      <div className='p-6'>
        <Brain size={52} color='white'/>
      </div>
      <div className='flex flex-col w-full'>
        <SidebarRoutes/>
      </div>
    </div>
  )
}
