import { useState, useEffect } from "react";

const RANDOM_HANDLES = [
  "velvet_vibe",
  "neon_ninja",
  "silent_storm",
  "golden_hour",
  "pixel_perfect",
  "cosmic_coder",
  "urban_legend",
  "blue_horizon",
  "mystic_meadow",
  "alpha_echo",
];

const Suggestions = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    // Generate 5 random suggestions on refresh
    const shuffled = [...RANDOM_HANDLES].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5).map((handle, index) => ({
      id: index,
      username: handle,
      subtitle: `Followed by user_${Math.floor(Math.random() * 100)}`,
      avatar: `https://i.pravatar.cc/150?u=${handle}`,
    }));
    setSuggestedUsers(selected);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[320px] pt-4">
      {/* CURRENT USER */}
      <div className="flex items-center justify-between w-full mb-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-zinc-800 overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?u=me"
              className="w-full h-full object-cover"
              alt="me"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-white">dhh_hitz</span>
            <span className="text-[14px] text-zinc-500">For the Hip-Hop</span>
          </div>
        </div>
        <button className="text-blue-500 text-[12px] font-bold">Switch</button>
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between w-full mb-4">
        <span className="text-zinc-500 font-bold text-[14px]">
          Suggested for you
        </span>
        <button className="text-white text-[12px] font-bold">See all</button>
      </div>

      {/* DYNAMIC LIST */}
      <div className="flex flex-col gap-3.5">
        {suggestedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                <img
                  src={user.avatar}
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-white">
                  {user.username}
                </span>
                <span className="text-[12px] text-zinc-500">
                  {user.subtitle}
                </span>
              </div>
            </div>
            <button className="text-blue-500 text-[12px] font-bold">
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER (Simplified) */}
      <div className="navbar-div mt-10 text-[11px] text-zinc-500 flex flex-wrap gap-x-1.5 leading-4 uppercase">
        {["About", "Help", "Press", "API", "Jobs", "Privacy", "Terms"].map(
          (l) => (
            <span key={l} className="hover:underline cursor-pointer">
              {l} •
            </span>
          ),
        )}
      </div>
      <p className="mt-6 text-[11px] text-zinc-500 uppercase tracking-widest">
        © 2026 INSTAGRAM FROM META
      </p>
    </div>
  );
};

export default Suggestions;
