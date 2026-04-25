import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  X,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";
import { useState, useEffect } from "react";

function CommentComp({ isOpen, onClose, post }) {
  const [comments, setComments] = useState(
    post?.comments
      ? post.comments.map((c) => ({ text: c, replies: [] }))
      : [
          { text: "Cool, Post!!!", replies: [] },
          { text: "Love this!", replies: [] },
        ],
  );
  const [commentInput, setCommentInput] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post?.initialLikes || 0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  const [expandedReplies, setExpandedReplies] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function handleAddComment() {
    if (commentInput.trim() !== "") {
      setComments([...comments, { text: commentInput, replies: [] }]);
      setCommentInput("");
    }
  }

  function handleAddReply(commentIndex) {
    if (replyInput.trim() !== "") {
      const updated = [...comments];
      updated[commentIndex] = {
        ...updated[commentIndex],
        replies: [...updated[commentIndex].replies, replyInput],
      };
      setComments(updated);
      setReplyInput("");
      setReplyingTo(null);
      setExpandedReplies((prev) => ({ ...prev, [commentIndex]: true }));
    }
  }

  function handleLike() {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  }

  if (!isOpen) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className="relative flex w-[90vw] max-w-[1000px] h-[85vh] bg-zinc-900 rounded-xl overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 text-white hover:text-zinc-400 transition-colors"
          >
            <X size={24} />
          </button>

          {/* LEFT — IMAGE centered */}
          <div className="w-[55%] bg-black flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={post?.postImage}
              alt="post"
              className="w-full h-full object-contain"
            />
          </div>

          {/* RIGHT — COMMENTS PANEL */}
          <div className="right-comment flex flex-col flex-1 min-w-0 border-l border-zinc-800">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                  <img
                    src={`https://i.pravatar.cc/150?u=${post?.username}`}
                    className="w-full h-full object-cover"
                    alt="avatar"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[14px] text-white">
                    {post?.username}
                  </span>
                  <CheckCircle2
                    size={13}
                    className="fill-blue-500 text-black"
                  />
                </div>
              </div>
              <MoreHorizontal
                size={20}
                className="text-zinc-400 cursor-pointer"
              />
            </div>

            {/* Scrollable area — scrollbar-hide via app.css */}
            <div className="flex-1 overflow-y-auto px-4 flex flex-col scrollbar-hide">
              {/* Caption */}
              <div className="flex items-start gap-3 py-4 border-b border-zinc-800">
                <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0 mt-0.5">
                  <img
                    src={`https://i.pravatar.cc/150?u=${post?.username}`}
                    className="w-full h-full object-cover"
                    alt="avatar"
                  />
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="comment-text">
                    <span className="comment-username">{post?.username}</span>
                    {post?.caption}
                  </p>
                  <p className="text-zinc-500 text-[12px] mt-1.5">4w</p>
                </div>
              </div>

              {/* Comments List */}
              <div className="flex flex-col gap-5 py-4">
                {comments.map((comment, index) => (
                  <div key={index}>
                    {/* Main comment row */}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                        <img
                          src={`https://i.pravatar.cc/150?u=user${index}`}
                          className="w-full h-full object-cover"
                          alt="avatar"
                        />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className="comment-text">
                          <span className="comment-username">user</span>
                          {comment.text}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-zinc-500 text-[12px]">1d</span>
                          <button
                            className="text-zinc-500 text-[12px] font-semibold hover:text-zinc-300 transition-colors"
                            onClick={() => {
                              setReplyingTo(
                                replyingTo === index ? null : index,
                              );
                              setReplyInput("");
                            }}
                          >
                            Reply
                          </button>
                        </div>

                        {/* Inline reply input */}
                        {replyingTo === index && (
                          <div className="flex items-start gap-2 mt-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0 mt-0.5">
                              <img
                                src="https://i.pravatar.cc/150?u=me"
                                className="w-full h-full object-cover"
                                alt="you"
                              />
                            </div>
                            <input
                              autoFocus
                              type="text"
                              placeholder="Reply to user..."
                              className="bg-transparent outline-none text-[13px] flex-1 text-white placeholder:text-zinc-500 border-b border-zinc-700 pb-1 caret-white"
                              value={replyInput}
                              onChange={(e) => setReplyInput(e.target.value)}
                              onKeyDown={(e) =>
                                e.key === "Enter" && handleAddReply(index)
                              }
                            />
                            {replyInput.trim() && (
                              <button
                                onClick={() => handleAddReply(index)}
                                className="text-blue-500 font-bold text-[13px] hover:text-blue-400 transition-colors flex-shrink-0 mt-0.5"
                              >
                                Post
                              </button>
                            )}
                          </div>
                        )}

                        {/* View / Hide replies toggle */}
                        {comment.replies.length > 0 && (
                          <button
                            className="flex items-center gap-2 mt-3 group"
                            onClick={() =>
                              setExpandedReplies((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                          >
                            <span className="inline-block w-6 h-px bg-zinc-500 group-hover:bg-zinc-300 transition-colors" />
                            <span className="text-zinc-500 text-[12px] font-semibold group-hover:text-zinc-300 transition-colors">
                              {expandedReplies[index]
                                ? "Hide replies"
                                : `View replies (${comment.replies.length})`}
                            </span>
                          </button>
                        )}
                      </div>
                      <Heart
                        size={13}
                        className="text-zinc-600 hover:text-white cursor-pointer mt-1 flex-shrink-0 transition-colors"
                      />
                    </div>

                    {/* Nested replies */}
                    {expandedReplies[index] && comment.replies.length > 0 && (
                      <div className="ml-[48px] mt-4 flex flex-col gap-4 pl-3 border-l-2 border-zinc-800">
                        {comment.replies.map((reply, rIndex) => (
                          <div key={rIndex} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-zinc-700 overflow-hidden flex-shrink-0">
                              <img
                                src={`https://i.pravatar.cc/150?u=reply${rIndex}`}
                                className="w-full h-full object-cover"
                                alt="avatar"
                              />
                            </div>
                            <div className="flex-1 pt-0.5">
                              <p className="reply-text">
                                <span className="comment-username">user</span>
                                {reply}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-zinc-500 text-[11px]">
                                  Now
                                </span>
                                <button className="text-zinc-500 text-[11px] font-semibold hover:text-zinc-300 transition-colors">
                                  Reply
                                </button>
                              </div>
                            </div>
                            <Heart
                              size={12}
                              className="text-zinc-600 hover:text-white cursor-pointer mt-1 flex-shrink-0 transition-colors"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-zinc-800 px-4 pt-3 pb-2 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                  <Heart
                    size={24}
                    onClick={handleLike}
                    className={`cursor-pointer transition-all active:scale-125 ${
                      isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-white hover:text-zinc-400"
                    }`}
                  />
                  <MessageCircle
                    size={24}
                    className="text-white cursor-pointer hover:text-zinc-400 transition-colors"
                  />
                  <Send
                    size={24}
                    className="text-white cursor-pointer hover:text-zinc-400 transition-colors"
                  />
                </div>
                <Bookmark
                  size={24}
                  className="text-white cursor-pointer hover:text-zinc-400 transition-colors"
                />
              </div>
              <p className="font-bold text-[14px] text-white">
                {likes.toLocaleString()} likes
              </p>
              <p className="text-zinc-500 text-[11px] uppercase tracking-wide mt-0.5 mb-1">
                1 day ago
              </p>
            </div>

            {/* Add Comment */}
            <div className="border-t border-zinc-800 px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <span className="text-xl cursor-pointer select-none">😊</span>
              <input
                type="text"
                placeholder="Add a comment..."
                className="bg-transparent outline-none text-[14px] flex-1 text-white placeholder:text-zinc-500 caret-white"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              {commentInput.trim() ? (
                <button
                  onClick={handleAddComment}
                  className="text-blue-500 font-bold text-[14px] hover:text-blue-400 transition-colors flex-shrink-0"
                >
                  Post
                </button>
              ) : (
                <span className="w-[34px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentComp;
