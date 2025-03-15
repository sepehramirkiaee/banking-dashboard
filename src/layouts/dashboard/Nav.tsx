import NavItem from './NavItem'

export default function Nav() {
  return (
    <nav className='mt-6 lg:mt-0 lg:pb-0 pb-4 px-2 border-b lg:border-none border-indigo-700'>
      <ul className='flex flex-col lg:flex-row gap-2 text-white'>
        <NavItem title='Dashboard' />
        <NavItem title='Profile' />
        <NavItem title='Settings' />
      </ul>
    </nav>
  )
}
