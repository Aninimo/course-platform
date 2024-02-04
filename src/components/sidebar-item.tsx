import { useRouter } from 'next/router'
import { LucideIcon } from 'lucide-react'

interface SidebarItemProps{
  icon: LucideIcon;
  label: string;
  href: string;
}

export function SidebarItem({
  icon: Icon,
  label,
  href
}: SidebarItemProps){
  const router = useRouter()

  const onClick = () => {
    router.push(href)
  }

  return(
    <button onClick={onClick}>
      <div className='flex items-center gap-x-2 py-4'>
        <Icon
          size={22}
        />
        {label}
      </div>
    </button>
  )
}
