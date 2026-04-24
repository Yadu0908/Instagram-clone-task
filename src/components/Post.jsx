import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";

function Post({ username, postImage, initialLikes, caption }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const [comments, setComments] = useState(["Cool, Post!!!", "Love this!"]);
  const [commentInput, setCommentInput] = useState("");

  function handleLike() {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  }

  function addComment(e) {
    e.preventDefault();

    if (commentInput.trim() !== "") {
      setComments([...comments, commentInput]); // Adds new comment to the list
      setCommentInput(""); // Clears the input box
    }
  }

  return (
    <div className="mb-8 border-b border-zinc-800 pb-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
          <span className="font-semibold text-sm">{username}</span>
        </div>
        <MoreHorizontal size={20} />
      </div>

      <div className="rounded border border-zinc-800 overflow-hidden bg-zinc-900">
        <img src={postImage} alt="post" className="w-full object-contain" />
      </div>

      <div className="flex items-center justify-between py-3 px-2">
        <div className="flex items-center gap-4">
          <Heart
            onClick={handleLike}
            className={`cursor-pointer ${isLiked ? "fill-red-500 text-red-500" : ""}`}
          />
          <MessageCircle />
          <Send />
        </div>
        <Bookmark />
      </div>

      {/* Like Count & Caption */}
      <div className="px-2 text-sm">
        <p className="font-bold mb-1">{likes.toLocaleString()} likes</p>
        <p>
          <span className="font-bold mr-2">{username}</span>
          {caption}
        </p>

        {/* Comments List */}
        <div className="mt-2 text-zinc-400">
          {comments.map((c, index) => (
            <p key={index} className="text-white mt-1">
              <span className="font-bold text-zinc-400 mr-2">user</span> {c}
            </p>
          ))}
        </div>

        {/* Add Comment Input */}
        <form
          onSubmit={addComment}
          className="mt-3 flex justify-between border-t border-zinc-800 pt-3"
        >
          <input
            type="text"
            placeholder="Add a comment..."
            className="bg-transparent outline-none text-sm w-full"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button type="submit" className="text-blue-500 font-semibold text-sm">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;
