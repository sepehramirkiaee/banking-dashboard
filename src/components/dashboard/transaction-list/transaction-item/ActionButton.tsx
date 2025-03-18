interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  testId?: string;
}
export default function ActionButton({ onClick, children, testId }: ActionButtonProps) {
  return (
    <div>
      <button
        data-testid={testId}
        onClick={() => onClick()}
        className="w-full flex items-center gap-2 text-left text-gray-700 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
      >
        {children}
      </button>
    </div>
  )
}
