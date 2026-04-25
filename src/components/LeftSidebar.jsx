import { Component } from "react";
import { Link } from "react-router-dom";

import {
  Home,
  Search,
  MessageCircle,
  Heart,
  PlusSquare,
  Menu,
  LayoutGrid,
  Film,
  BarChart3,
} from "lucide-react";
import "../App.css";

export class LeftSidebar extends Component {
  render() {
    return (
      /* Keeping your exact CSS classes and width logic */
      <div className="siderbar-div group flex flex-col justify-between h-screen pl-5 pr-3 pb-6 border-r border-zinc-800 sticky top-0 bg-black transition-all duration-300 ease-in-out w-[74px] hover:w-56 z-50">
        <div className="flex flex-col">
          {/* LOGO SECTION: Keeping your exact logo logic */}
          <div className="pt-10 mb-10 h-10 flex items-center">
            <h1 className="logo-font text-3xl tracking-wide whitespace-nowrap">
              Instagram
            </h1>
          </div>
        </div>

        {/* NAVIGATION ITEMS: Updated to exact Instagram order and icons */}
        <div className="flex flex-col gap-6 justify-center flex-1">
          <Link to="/">
            <SiderbarItem logo={<Home size={26} />} label="Home" />
          </Link>

          {/* Added Reels */}
          <Link to="/reels">
            <SiderbarItem logo={<Film size={26} />} label="Reels" />
          </Link>

          <SiderbarItem logo={<MessageCircle size={26} />} label="Messages" />

          <Link to="/explore">
            <SiderbarItem logo={<Search size={26} />} label="Search" />
          </Link>

          <SiderbarItem logo={<Heart size={26} />} label="Notifications" />

          <SiderbarItem logo={<PlusSquare size={26} />} label="Create" />

          {/* Added Dashboard */}
          <SiderbarItem logo={<BarChart3 size={26} />} label="Dashboard" />

          {/* PROFILE ITEM: Keeping your exact profile structure */}
          <Link to="/profile">
            <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 px-3 py-3 rounded-lg transition-colors overflow-hidden">
              {/* Added w-[26px] and flex-shrink-0 to lock the size */}
              <div className="w-[26px] h-[26px] flex-shrink-0 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                <img
                  src="https://images.unsplash.com/photo-1584462746497-276f4aeb9fca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-contain"
                  alt="profile"
                />
              </div>
              {/* Only this span will animate/appear on hover */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap">
                Profile
              </span>
            </div>
          </Link>
        </div>

        {/* BOTTOM SECTION: Keeping your exact gap-5 */}
        <div className="flex flex-col gap-5">
          <SiderbarItem logo={<Menu size={26} />} label="More" />
          <SiderbarItem
            logo={<LayoutGrid size={26} />}
            label="Also from Meta"
          />
        </div>
      </div>
    );
  }
}

function SiderbarItem({ logo, label }) {
  /* Keeping your exact px-3 py-4 and opacity logic */
  return (
    <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 px-3 py-4 rounded-lg transition-all overflow-hidden">
      <div className="min-w-[26px] flex justify-center">{logo}</div>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default LeftSidebar;
