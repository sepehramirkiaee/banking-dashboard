
export default function Label({ children, ...props }: React.PropsWithChildren<React.LabelHTMLAttributes<HTMLLabelElement>>) {
  return (
    <label {...props} className="block text-gray-800 text-sm font-medium">{children}</label>
  )
}
