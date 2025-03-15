import { classNames } from '@/utils/classNames';
import React from 'react'

interface OverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function Overlay({ children, className }: OverlayProps) {
  return (
    <div className={classNames('z-50 inset-0 h-screen w-screen bg-black/70 absolute top-0 right-0', className)}>
      {children}
    </div>
  )
}
