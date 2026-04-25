import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Play, MessageCircle } from "lucide-react";

// Pool of images to cycle through
const EXPLORE_POOL = [
  {
    url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17",
    isVideo: true,
  },
  {
    url: "https://images.unsplash.com/photo-1514525253361-bee8718a340b",
    isVideo: true,
  },
  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    isVideo: false,
  },
  {
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    isVideo: true,
  },
  {
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
    isVideo: true,
  },
  {
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    isVideo: false,
  },
  {
    url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    isVideo: true,
  },
  {
    url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    isVideo: false,
  },
];

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  // Function to get a random batch of posts
  const getMorePosts = useCallback(() => {
    return Array.from({ length: 12 }, () => {
      const randomItem =
        EXPLORE_POOL[Math.floor(Math.random() * EXPLORE_POOL.length)];
      return { ...randomItem, id: Math.random() };
    });
  }, []);

  // Initial Load
  useEffect(() => {
    setPosts(getMorePosts());
  }, [getMorePosts]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          // Simulate network delay
          setTimeout(() => {
            setPosts((prev) => [...prev, ...getMorePosts()]);
            setIsLoading(false);
          }, 800);
        }
      },
      { threshold: 0.1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isLoading, getMorePosts]);

  return (
    <div className="search-page w-full flex flex-col items-center">
      {/* 1. STICKY SEARCH BAR */}
      <div className="sticky top-0 bg-black w-full py-4 z-20 flex justify-center px-4">
        <div className="bg-zinc-800/80 w-full max-w-[400px] rounded-lg px-4 py-2 flex items-center gap-3 text-zinc-400">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full text-sm text-white"
          />
        </div>
      </div>

      {/* 2. INFINITE GRID (4 columns as requested) */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[935px]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer group overflow-hidden"
          >
            <img
              src={`${post.url}?w=400&h=400&fit=crop`}
              alt="explore"
              className="w-full h-full object-cover group-hover:brightness-75 transition-all"
            />
            {post.isVideo && (
              <div className="absolute top-2 right-2 text-white drop-shadow-md">
                <Play size={18} fill="white" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* 3. LOADER SENTINEL (IntersectionObserver watches this) */}
      <div ref={loaderRef} className="w-full flex justify-center py-10">
        {isLoading && (
          <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
