import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import CommentModal from "./CommentComp";

function Post({
  username,
  postImage,
  initialLikes,
  caption,
  suggested = false,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function handleLike() {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  }

  return (
    <>
      <div className="feed-div mb-16 w-full max-w-[470px] mx-auto border-b border-zinc-800 pb-10">
        {/* HEADER */}
        <div className="post-header flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex-shrink-0">
              <img
                src={`https:i.pravatar.cc/150?u=${username}`}
                className="w-full h-full object-cover"
                alt="avatar"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[14px]">{username}</span>
                <CheckCircle2 size={14} className="fill-blue-500 text-black" />
                <span className="text-zinc-500 text-[14px]">• 4w</span>
              </div>
              {suggested && (
                <span className="text-zinc-500 text-[12px] leading-none mt-0.5">
                  Suggested for you
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {suggested && !following && (
              <button
                onClick={() => setFollowing(true)}
                className="text-blue-500 font-semibold text-[14px] hover:text-blue-400"
              >
                Follow
              </button>
            )}
            <MoreHorizontal
              size={20}
              className="text-zinc-400 cursor-pointer"
            />
          </div>
        </div>

        {/* IMAGE */}
        <div className="overflow-hidden bg-black">
          <img
            src={postImage}
            className="w-full h-auto object-cover min-h-[400px]"
            alt="post"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="post-actions flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
            <Heart
              size={24}
              onClick={handleLike}
              className={`cursor-pointer transition-transform active:scale-125 ${isLiked ? "fill-red-500 text-red-500" : "hover:text-zinc-500"}`}
            />
            {/* 👇 Click opens modal */}
            <MessageCircle
              size={24}
              className="cursor-pointer hover:text-zinc-500"
              onClick={() => setShowComments(true)}
            />
            <Send size={24} className="cursor-pointer hover:text-zinc-500" />
          </div>
          <Bookmark size={24} className="cursor-pointer hover:text-zinc-500" />
        </div>

        {/* LIKES + CAPTION only — no comments here anymore */}
        <div className="px-1">
          <p className="font-bold text-[14px] mb-1">
            {likes.toLocaleString()} likes
          </p>
          <div className="text-[14px] leading-5">
            <span className="font-bold mr-2">{username}</span>
            <span>{caption}</span>
          </div>
          {/* 👇 Clickable "View all comments" to open modal */}
          <button
            onClick={() => setShowComments(true)}
            className="text-zinc-500 text-[14px] mt-1 hover:text-zinc-400 block"
          >
            View all comments
          </button>
        </div>
      </div>

      {/* COMMENT MODAL */}
      <CommentModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={{ username, postImage, initialLikes: likes, caption }}
      />
    </>
  );
}

export default Post;
