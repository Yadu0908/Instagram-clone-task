import { Component } from "react";
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
} from "lucide-react";

import "../App.css";

export class LeftSidebar extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col gap-8 p-10">
          <div className="mb-4 px-2">
            <h1 className="logo-font text-4xl tracking-wide">Instagram</h1>
          </div>

          <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
            <Home /> <span>Home</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
            <Search /> <span>Search</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
            <Compass /> <span>Explore</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
            <MessageCircle /> <span>Messages</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
            <Heart /> <span>Notifications</span>
          </div>

          <div className="flex items-center gap-4 cursor-pointer hover:bg-zinc-900 p-2 rounded">
            <PlusSquare /> <span>Create</span>
          </div>
        </div>
      </>
    );
  }
}

export default LeftSidebar;
