
import { assets } from "../assets/admin_assets/assets"

const Navbar = () => {
  return (
    <div className="flex items-center py-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button className="bg-gray-600 text-white py-2 px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
    </div>
  )
}

export default Navbar