import React from 'react'

export default function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full p-2 border rounded border-gray-300 text-sm"
    >
      {children}
    </select>
  )
}
