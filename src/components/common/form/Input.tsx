export default function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full p-2 border rounded border-gray-300 text-sm"
    />
  )
}
