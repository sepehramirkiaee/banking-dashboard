import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import NavItem from './NavItem'
import { useState } from 'react'
import Overlay from '@/components/common/ui/Overlay'
import Nav from './Nav'

export default function CompactSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className='flex items-center'>
      <button className='p-2 rounded-md hover:bg-indigo-500 cursor-pointer' onClick={toggleOpen}>
        <Bars3Icon className='size-6 text-indigo-100' />
      </button>
      {isOpen && (
        <Overlay>
          <div className='bg-indigo-600 h-screen w-4/5 md:w-96 absolute top-0 right-0'>
            <button className='right-full mt-3 ml-4 p-2 rounded-md hover:bg-indigo-500 cursor-pointer' onClick={toggleOpen}>
              <XMarkIcon className='size-6 text-indigo-100' />
            </button>

            <Nav />

            <div className='px-2 mt-5'>
              <div className='text-white mb-6 flex gap-3 items-center ml-4'>
                <img className='w-10 h-10 bg-indigo-100 rounded-full' src='https://media.licdn.com/dms/image/v2/C4E03AQFj-bhXZhxHWQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623740896318?e=1747267200&v=beta&t=TvkVytlFSDhnfMnK2asUK0Zq39YQZFd9Ch1WCr4meO4' alt='profile' />
                <div>
                  <p className='font-medium'>Sepehr Amirkiaee</p>
                  <p className='text-sm text-indigo-300'>sepehr.amirkiaee@gmail.com</p>
                </div>
              </div>
              <ul className='flex flex-col gap-2 text-white'>
                <NavItem title='Profile' />
                <NavItem title='Settings' />
                <NavItem title='Sign out' />
              </ul>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  )
}
