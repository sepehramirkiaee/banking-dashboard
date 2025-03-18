import { classNames } from '@/utils/classNames'

type ButtonProps = {
  children: React.ReactNode
  typeVariant: 'primary' | 'secondary'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, typeVariant, ...props }: ButtonProps) {

  const buttonTypeStyle: { [key: string]: string } = {
    "primary": "bg-indigo-700 text-white hover:bg-indigo-800",
    "secondary": "bg-gray-100 border border-gray-200 hover:bg-gray-200 text-gray-800",
  }

  return (
    <button
      {...props}
      className={classNames("w-full text-sm font-medium text-white p-2 rounded cursor-pointer", buttonTypeStyle[typeVariant])}
    >
      {children}
    </button>
  )
}
