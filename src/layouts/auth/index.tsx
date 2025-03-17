import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="bg-gray-50 h-screen flex flex-col justify-center items-center">
      <Outlet />
    </div>
  )
}
