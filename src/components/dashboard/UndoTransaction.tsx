import { useTransactionStore } from '@/store/useTransactionStore'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function UndoTransaction() {
  const { lastAddedTransaction, undoLastTransaction, clearLastAddedTransaction } = useTransactionStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!lastAddedTransaction) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearUndoNotification()
          return 100
        }
        return prev + 10
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [lastAddedTransaction])

  const clearUndoNotification = () => {
    clearLastAddedTransaction()
  }

  if (!lastAddedTransaction) return null

  return createPortal(
    <div className='relative m-4 bg-indigo-700 text-white p-4 rounded-lg shadow-2xl text-sm'>
      <div className='bg-indigo-600 transition-all absolute inset-0 rounded-lg z-10'
        style={{ width: `${progress}%` }}
      ></div>
      <div className='z-20 relative flex items-center gap-4'>
        <button onClick={clearUndoNotification} className="cursor-pointer">
          <XMarkIcon className="size-5" />
        </button>
        <p className='grow'>You can undo the last transaction</p>
        <button
          onClick={undoLastTransaction}
          className="text-indigo-200 hover:underline cursor-pointer"
        >
          Undo
        </button>
      </div>

      
    </div>,
    document.getElementById('notification-root')!
  )
}
