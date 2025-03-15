export default function NavItem({title}: {title: string}) {
  return (
   <li className='rounded-md px-4 py-2 hover:bg-indigo-700'>{title}</li>
  )
}
