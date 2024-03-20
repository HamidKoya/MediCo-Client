import { Link } from "react-router-dom"

function HeaderItem({to,icon}) {
  return (
    <Link className="flex items-center h-full py-1 px-2 rounded-md hover:bg-black/5 select-none text-base font-semibold" to={to}  >
        {icon}
    </Link>
  )
}

export default HeaderItem
