import {
  Settings,
  Plus,
  Grid,
  Film,
  Bookmark,
  RotateCcw,
  ChevronDown,
  Heart,
  MessageCircle,
} from "lucide-react";

import "../App.css";

const MY_POSTS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
    isVideo: true,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1514525253361-bee8718a340b",
    isVideo: true,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    isVideo: true,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    isVideo: false,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
    isVideo: false,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    isVideo: false,
  },
];

const ProfilePage = () => {
  return (
    <div className="w-full max-w-[935px] mx-auto px-4 pt-8 flex flex-col min-h-screen">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20 mb-12">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-zinc-800 p-1">
            <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden">
              <img
                src="https://i.pravatar.cc/150?u=me"
                className="w-full h-full object-cover"
                alt="profile"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 flex-1">
          <div className="flex items-center gap-5">
            <h2 className="text-xl font-normal">dhh.hitz</h2>
            <div className="flex gap-2">
              <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors">
                Edit profile
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors">
                View archive
              </button>
            </div>
            <Settings size={24} className="cursor-pointer" />
          </div>

          <div className="flex gap-10 text-[16px]">
            <span>
              <b className="text-white">15</b> posts
            </span>
            <span>
              <b className="text-white">500K</b> followers
            </span>
            <span>
              <b className="text-white">26</b> following
            </span>
          </div>

          <div className="text-sm leading-relaxed">
            <p className="font-bold">Dhh Hits</p>
            <p className="text-white">Voice of the Underground.</p>
            <p className="text-white">Free Music Promotion | Limited Time</p>
            <p className="text-white">
              For collabs & submissions: DM / Contact us now.
            </p>
          </div>
        </div>
      </div>

      {/* 2. HIGHLIGHTS */}
      <div className="flex flex-col items-center w-fit mb-12 ml-4">
        <div className="w-20 h-20 rounded-full border border-zinc-800 flex items-center justify-center cursor-pointer hover:bg-zinc-900 transition-colors bg-zinc-900/30">
          <Plus size={32} className="text-zinc-500" />
        </div>
        <span className="text-xs font-semibold mt-2">New</span>
      </div>

      {/* 3. TABS */}
      <div className="tabs-div border-t border-zinc-800 flex justify-center gap-16">
        <TabItem icon={<Grid size={16} />} label="Posts" active />
        <TabItem icon={<Film size={16} />} label="Reels" />
        <TabItem icon={<Bookmark size={16} />} label="Saved" />
        <TabItem icon={<RotateCcw size={16} />} label="Tagged" />
      </div>

      {/* 4. POSTS GRID with New Hover Effect */}
      <div className="grid grid-cols-3 gap-1 md:gap-1.5">
        {MY_POSTS.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer group overflow-hidden bg-zinc-900"
          >
            <img
              src={`${post.url}?w=500&h=500&fit=crop`}
              className="w-full h-full object-cover"
              alt="post"
            />

            {/* --- NEW HOVER OVERLAY --- */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-4 z-10">
              {/* Top Section */}
              <div className="flex justify-between w-full items-center">
                <Film size={18} className="text-white opacity-80" />
              </div>

              {/* Center Section: Stats */}
              <div className="flex items-center gap-8 text-white">
                <div className="flex items-center gap-2 font-bold text-lg">
                  <Heart size={24} fill="white" /> 10
                </div>
                <div className="flex items-center gap-2 font-bold text-lg">
                  <MessageCircle size={24} fill="white" /> 1
                </div>
              </div>

              {/* Bottom Section: Boost Button */}
              <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-[13px] hover:bg-zinc-200 transition-colors shadow-lg">
                Boost reel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. FOOTER SECTION with Increased Margin */}
      <footer className="navbar-div mt-32 py-12 flex flex-col items-center gap-4 border-t border-zinc-900">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-zinc-500">
          {[
            "Meta",
            "About",
            "Blog",
            "Jobs",
            "Help",
            "API",
            "Privacy",
            "Terms",
            "Locations",
            "Popular",
            "Instagram Lite",
            "Threads",
            "Contact Uploading & Non-Users",
            "Meta Verified",
          ].map((link) => (
            <span key={link} className="hover:underline cursor-pointer">
              {link}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-[12px] text-zinc-500">
          <div className="flex items-center gap-1 cursor-pointer">
            <span>English</span>
            <ChevronDown size={14} />
          </div>
          <span>© 2026 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
};

// Helper for Tabs
const TabItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-2 py-4 cursor-pointer transition-all ${active ? "border-t border-white -mt-[1px] text-white" : "text-zinc-500 hover:text-zinc-300"}`}
  >
    {icon}
    <span className="text-[12px] font-bold uppercase tracking-[1.5px]">
      {label}
    </span>
  </div>
);

export default ProfilePage;
