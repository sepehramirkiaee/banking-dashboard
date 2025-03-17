import { classNames } from "@/utils/classNames";

type NavItemProps = {
  title: string;
  onClick?: () => void;
  className?: string;
}
export default function NavItem({title, onClick, className}:NavItemProps) {
  return (
   <button onClick={onClick} className={classNames('rounded-md px-4 py-2 hover:bg-indigo-700 text-left hover:text-white',className)}>{title}</button>
  )
}
