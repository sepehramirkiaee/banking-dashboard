import { AccountStatCardProps } from "@/types";

export default function AccountStatCard({ title, value, testId }: AccountStatCardProps) {
  return (
    <div className="flex flex-col gap-1 px-5 py-5 md:grow">
      <span className="font-medium text-gray-600">{title}</span>
      <span data-testid={testId} className="text-2xl font-bold text-indigo-600">{value.toFixed(2)}</span>
    </div>
  )
}
