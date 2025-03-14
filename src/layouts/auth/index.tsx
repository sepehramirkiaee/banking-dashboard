import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div>
      <div>Auth Layout</div>
      <Outlet />
    </div>
  )
}
