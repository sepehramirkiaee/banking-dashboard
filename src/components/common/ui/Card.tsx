
export default function Card({children}: {children: React.ReactNode}) {
  return (
    <div className=" bg-white rounded-md shadow">
      {children}
    </div>
  )
}
