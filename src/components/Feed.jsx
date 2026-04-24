import Post from "./Post";

function Feed() {
  return (
    <>
      <div className="max-w-[470px] mx-auto">
        {/* Stories (Simplified) */}
        <div className="flex gap-4 overflow-x-auto py-6 no-scrollbar">
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-full border-2 border-pink-500 p-1">
              <div className="w-full h-full bg-zinc-800 rounded-full"></div>
            </div>
            <span className="text-xs">your_story</span>
          </div>
          {/* You can copy-paste the div above a few times for more stories */}
        </div>

        {/* Posts */}
        <Post
          username="vastavikmuhfaad"
          postImage="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17"
          initialLikes={2100}
          caption="This 29.04.26 🗓️"
        />

        <Post
          username="dhh.hitz"
          postImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
          initialLikes={150}
          caption="New music out now! 🔥"
        />
      </div>
    </>
  );
}

export default Feed;
