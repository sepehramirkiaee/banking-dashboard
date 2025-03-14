import { AccountStatCardProps } from "@/types";

export default function AccountStatCard({ title, value }: AccountStatCardProps) {
  return (
    <div className="flex justify-between text-lg font-medium">
      <span>{title}:</span>
      <span>{value.toFixed(2)}</span>
    </div>
  )
}
