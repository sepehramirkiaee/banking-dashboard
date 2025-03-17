import BrandLogo from '@/components/common/ui/BrandLogo'
import { Outlet } from 'react-router-dom'
import CompactSidebar from './CompactSidebar'
import Nav from './Nav'
import NotificationContainer from '@/components/common/ui/NotificationContainer'
import UserMenu from './UserMenu'

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
        <div className='text-white mr-2 hidden lg:flex gap-3 items-center ml-4 relative'>
          <UserMenu />
        </div>
        <div className='block lg:hidden'>
          <CompactSidebar />
        </div>
      </header>
      <div className='bg-white p-4 text-2xl font-bold shadow-xs border-b border-gray-200'>Dashboard</div>
      <div className='p-4 flex-1 overflow-y-auto'>
        <Outlet />
      </div>

      {/* Notification Container */}
      <div className='fixed bottom-0 right-0 left-0 z-50 lg:left-auto min-w-96'>
        <NotificationContainer />
      </div>
    </div>
  )
}
