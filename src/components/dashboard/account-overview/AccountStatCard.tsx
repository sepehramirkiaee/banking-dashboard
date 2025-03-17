import { AccountStatCardProps } from "@/types";
import { classNames } from "@/utils/classNames";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowDownTrayIcon, ArrowUpTrayIcon, WalletIcon } from "@heroicons/react/24/outline";

export default function AccountStatCard({ title, value, testId }: AccountStatCardProps) {
  const iconStyle: { [key: string]: string } = {
    "balance": "bg-indigo-50 border border-indigo-300 p-2 rounded ml-4 text-indigo-600",
    "income": "bg-green-50 border border-green-300 p-2 rounded ml-4 text-green-600",
    "expense": "bg-red-50 border border-red-300 p-2 rounded ml-4 text-red-600",
  }

  const iconType: { [key: string]: string } = {
    "balance": "WalletIcon",
    "income": "ArrowDownTrayIcon",
    "expense": "ArrowUpTrayIcon",
  }

  return (
    <div className="md:grow flex items-start">
      <div className={classNames("bg-indigo-50 mt-5 border border-indigo-300 p-2 rounded ml-4 shrink-0", iconStyle[testId])}>
        {iconType[testId] === "ArrowDownTrayIcon" && <ArrowDownTrayIcon className="size-5" />}
        {iconType[testId] === "ArrowUpTrayIcon" && <ArrowUpTrayIcon className="size-5" />}
        {iconType[testId] === "WalletIcon" && <WalletIcon className="size-5" />}
      </div>
      <div className="flex flex-col gap-1 px-5 py-5">
        <span className="font-medium text-gray-600">{title}</span>
        <span data-testid={testId} className="text-2xl font-bold text-indigo-600">{formatCurrency(value)}</span>
      </div>
    </div>
  )
}
