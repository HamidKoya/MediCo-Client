import { Link } from "react-router-dom"

function HeaderItem({to,icon,image}) {
  return (
    <Link className="flex items-center h-full py-2 px-2 rounded-md hover:bg-black/5 select-none text-base font-semibold" to={to}  >
        {icon} <span className="ml-2">{image}</span>
    </Link>
  )
}

export default HeaderItem
