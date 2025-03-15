import BrandLogo from '@/components/common/ui/BrandLogo'
import { Outlet } from 'react-router-dom'
import CompactSidebar from './CompactSidebar'
import Nav from './Nav'

export default function DashboardLayout() {
  return (
    <div className='h-screen bg-gray-100 flex flex-col'>
      <header className='bg-indigo-600 py-3 px-2 flex justify-between lg:justify-start items-center'>
        <div className='ml-2 mr-10'>
          <BrandLogo />
        </div>
        <div className='hidden lg:block lg:grow'>
          <Nav />
        </div>
        <div className='text-white mr-2 hidden lg:flex gap-3 items-center ml-4'>
          <img className='w-8 h-8 bg-indigo-100 rounded-full' src='https://media.licdn.com/dms/image/v2/C4E03AQFj-bhXZhxHWQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623740896318?e=1747267200&v=beta&t=TvkVytlFSDhnfMnK2asUK0Zq39YQZFd9Ch1WCr4meO4' alt='profile' />
        </div>
        <div className='block lg:hidden'>
          <CompactSidebar />
        </div>
      </header>
      <div className='bg-white p-4 text-2xl font-bold shadow-xs border-b border-gray-200'>Dashboard</div>
      <div className='p-4 flex-1 overflow-y-auto'>
        <Outlet />
      </div>
      <div id="notification-root" className='fixed bottom-0 right-0 left-0 z-50'></div>
    </div>
  )
}
