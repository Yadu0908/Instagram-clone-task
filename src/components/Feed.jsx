import { useState, useEffect, useRef, useCallback } from "react";
import Post from "./Post";

const POST_POOL = [
  {
    username: "encoreabj",
    postImage:
      "https://images.unsplash.com/photo-1584462746497-276f4aeb9fca?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 2100,
    caption: "This 29.04.26 🗓️",
  },
  {
    username: "vastavikmuhfaad",
    postImage:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600",
    likes: 4500,
    caption: "New vibes.",
  },
  {
    username: "carryminati",
    postImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
    likes: 29000,
    caption: "Hum nhi sudhrenge 💀",
    suggested: true,
  },
  {
    username: "sidhu_moosewala",
    postImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
    likes: 14000,
    caption: "EYES ON ME DROPPING IN A FEW DAYS... 👁️",
    suggested: true,
  },
  {
    username: "guftagootumse",
    postImage:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600",
    likes: 45300,
    caption: "Diet coke shortage 🤣🤣",
  },
  {
    username: "krsna.army",
    postImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
    likes: 8900,
    caption: "Late night sessions 🎧",
  },
  {
    username: "divine_official",
    postImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
    likes: 11200,
    caption: "Mere gully mein 🙌",
  },
  {
    username: "thelegacy_india",
    postImage:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
    likes: 3200,
    caption: "The crowd never lies 🔥",
  },
];

// Story usernames for the stories bar
const STORIES = [
  "encoreabj",
  "vastavikmuhfaad",
  "carryminati",
  "sidhu_moosewala",
  "guftagootumse",
  "krsna.army",
  "divine_official",
  "thelegacy_india",
];

const POSTS_PER_LOAD = 3;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Generate next batch cycling through POST_POOL
  function getNextPosts(pageNum) {
    return Array.from({ length: POSTS_PER_LOAD }, (_, i) => {
      const poolIndex = (pageNum * POSTS_PER_LOAD + i) % POST_POOL.length;
      return {
        ...POST_POOL[poolIndex],
        id: `${pageNum}-${i}-${poolIndex}-${Math.random()}`,
      };
    });
  }

  // Load initial posts on mount
  useEffect(() => {
    setPosts(getNextPosts(0));
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    setTimeout(() => {
      setPosts((prev) => [...prev, ...getNextPosts(page)]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
      if (page >= 20) setHasMore(false); // stop after ~60 posts
    }, 800);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="h-full overflow-y-auto no-scrollbar">
      {/* STORIES BAR */}
      <div className="flex gap-4 overflow-x-auto py-4 mb-4 no-scrollbar px-2">
        {STORIES.map((username, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 min-w-[74px] cursor-pointer"
          >
            {/* Gradient ring */}
            <div className="w-[66px] h-[66px] rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-fuchsia-600">
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                <img
                  src={`https://i.pravatar.cc/150?u=${username}`}
                  className="w-full h-full rounded-full object-cover"
                  alt="story"
                />
              </div>
            </div>
            <span className="text-[11px] text-zinc-400 truncate w-full text-center">
              {username}
            </span>
          </div>
        ))}
      </div>

      {/* POSTS */}
      <div className="flex flex-col items-center">
        {posts.map((post) => (
          <div key={post.id} className="w-full max-w-[470px]">
            <Post
              username={post.username}
              postImage={post.postImage}
              initialLikes={post.likes}
              caption={post.caption}
              suggested={post.suggested || false}
            />
          </div>
        ))}
      </div>

      {/* LOADER SENTINEL — IntersectionObserver watches this div */}
      <div ref={loaderRef} className="w-full flex justify-center py-8">
        {isLoading && (
          <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
        )}
        {!hasMore && (
          <p className="text-zinc-600 text-[13px]">You're all caught up ✓</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
