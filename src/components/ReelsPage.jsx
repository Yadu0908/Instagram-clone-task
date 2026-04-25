import { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Music,
  CheckCircle2,
} from "lucide-react";

// Pool of random data for infinite scrolling
const REELS_POOL = [
  {
    user: "luffy.thehamster",
    likes: "194K",
    comments: "477",
    shares: "7,199",
    caption: "Bohot confusion hai 😟",
    music: "Lutiya (feat. Apache Indian)",
    video: "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
  },
  {
    user: "nature.clips",
    likes: "50K",
    comments: "120",
    shares: "1,200",
    caption: "Beautiful morning! ☀️",
    music: "Nature Sounds - Relax",
    video: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  {
    user: "urban.vibes",
    likes: "12K",
    comments: "89",
    shares: "400",
    caption: "City lights ✨",
    music: "Lo-fi Beats",
    video: "https://images.unsplash.com/photo-1514525253361-bee8718a340b",
  },
];

const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // Function to generate a batch of reels
  const getMoreReels = useCallback(() => {
    return Array.from({ length: 3 }, () => {
      const random = REELS_POOL[Math.floor(Math.random() * REELS_POOL.length)];
      return { ...random, id: Math.random() };
    });
  }, []);

  // Initial Load
  useEffect(() => {
    setReels(getMoreReels());
  }, [getMoreReels]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setReels((prev) => [...prev, ...getMoreReels()]);
            setIsLoading(false);
          }, 800);
        }
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoading, getMoreReels]);

  return (
    <div className="relative h-screen w-full flex justify-center bg-black overflow-hidden">
      {/* 1. VERTICAL SCROLL CONTAINER (Snap points are key here) */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide w-full flex flex-col items-center">
        {reels.map((reel) => (
          <ReelItem key={reel.id} data={reel} />
        ))}

        {/* LOADER SENTINEL */}
        <div
          ref={loaderRef}
          className="h-10 w-full flex justify-center items-center shrink-0"
        >
          {isLoading && (
            <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
          )}
        </div>
      </div>

      {/* 2. NAVIGATION ARROWS (Floating on the right) */}
      <div className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button className="p-2.5 bg-zinc-800/60 rounded-full hover:bg-zinc-700 transition-all text-white shadow-lg">
          <ChevronUp size={24} />
        </button>
        <button className="p-2.5 bg-zinc-800/60 rounded-full hover:bg-zinc-700 transition-all text-white shadow-lg">
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

const ReelItem = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    // h-full + snap-start: This makes each reel fill the screen and "snap" into place
    <div className="h-full w-full min-h-screen snap-start flex items-center justify-center relative py-6">
      {/* THE VIDEO BOX (9:16 Aspect Ratio) */}
      <div className="relative h-[92%] aspect-[9/16] bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border border-zinc-800">
        <img
          src={data.video}
          className="w-full h-full object-cover"
          alt="reel"
        />

        {/* INFO OVERLAY (Inside Video) */}
        <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden">
              <img
                src={`https://i.pravatar.cc/150?u=${data.user}`}
                alt="avatar"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white">{data.user}</span>
              <CheckCircle2 size={14} className="fill-blue-500 text-black" />
              <span className="text-white text-sm mx-1">•</span>
              <button className="text-sm font-bold text-white hover:text-zinc-300">
                Follow
              </button>
            </div>
          </div>

          <p className="text-sm text-white mb-2 font-medium">{data.caption}</p>

          <div className="flex items-center gap-2 text-xs text-zinc-200 bg-black/20 w-fit px-2 py-1 rounded-full backdrop-blur-sm">
            <Music size={12} />
            <span className="truncate max-w-[150px]">{data.music}</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE ACTIONS (Outside Video) */}
      <div className="flex flex-col gap-6 ml-4 mt-auto mb-12 items-center">
        <div className="flex flex-col items-center gap-1.5">
          <Heart
            size={28}
            onClick={() => setIsLiked(!isLiked)}
            className={`cursor-pointer transition-all active:scale-125 ${isLiked ? "fill-red-500 text-red-500" : "text-white hover:text-zinc-400"}`}
          />
          <span className="text-xs font-semibold text-white">{data.likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <MessageCircle
            size={28}
            className="text-white cursor-pointer hover:text-zinc-400"
          />
          <span className="text-xs font-semibold text-white">
            {data.comments}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <Send
            size={28}
            className="text-white cursor-pointer hover:text-zinc-400"
          />
          <span className="text-xs font-semibold text-white">
            {data.shares}
          </span>
        </div>

        <Bookmark
          size={28}
          className="text-white cursor-pointer hover:text-zinc-400"
        />
        <MoreHorizontal size={24} className="text-white cursor-pointer" />

        <div className="w-7 h-7 rounded-md border-2 border-white overflow-hidden mt-2 animate-pulse">
          <img
            src="https://i.pravatar.cc/150?u=music"
            className="w-full h-full object-cover"
            alt="audio"
          />
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;
