import React, { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { signOut } from '@/utils/auth'

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={menuRef}>
      <img
        className='w-8 h-8 bg-indigo-100 rounded-full cursor-pointer'
        src='https://media.licdn.com/dms/image/v2/C4E03AQFj-bhXZhxHWQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1623740896318?e=1747267200&v=beta&t=TvkVytlFSDhnfMnK2asUK0Zq39YQZFd9Ch1WCr4meO4'
        alt='profile'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-40">
          <div className='flex flex-col gap-2 p-2 text-gray-800 text-sm'>
            <NavItem title='Profile' />
            <NavItem title='Settings' />
            <NavItem title='Sign out' onClick={signOut} className='cursor-pointer' />
          </div>
        </div>
      )}
    </div>
  )
}
