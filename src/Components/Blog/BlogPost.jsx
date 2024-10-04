import React, { useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import db from '../../firebase';

function BlogPost({ id, title, content, author, timestamp, likes, comments }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
    setLikeCount(newLikeCount);
    db.collection('blogPosts').doc(id).update({ likes: newLikeCount });
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [...comments, { author: document.cookie, content: newComment }];
      db.collection('blogPosts').doc(id).update({ comments: updatedComments });
      setNewComment('');
    }
  };

  // Format the timestamp, handling null case
  const formattedDate = timestamp ? timestamp.toDate().toLocaleString() : 'Date unavailable';

  return (
    <div className="bg-black bg-opacity-20 rounded-2xl p-4 mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="text-sm text-gray-400 mb-4">By 
        <a href={`https://gitfinder-psi.vercel.app/profile/${author}`} className=" mx-1 hover:underline">
            {author}
        </a> 
        on {formattedDate}
      </div>

      {/* Replace the plain text content with dangerouslySetInnerHTML */}
      <div className="mb-4 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={handleLike} className="mr-2">
            {liked ? <FaHeart className="text-red-500" /> : <FiHeart />}
          </button>
          <span>{likeCount} likes</span>
        </div>
        <button onClick={() => setShowComments(!showComments)} className="text-blue-400">
          {showComments ? 'Hide Comments' : `Show Comments (${comments.length})`}
        </button>
      </div>
      {showComments && (
        <div className="mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-800 rounded p-2 mb-2">
              <div className="text-sm text-gray-400"> <a href={`https://gitfinder-psi.vercel.app/profile/${author}`} className=" mx-1 hover:underline">
            {comment.author}</a> </div>
              <p>{comment.content}</p>
            </div>
          ))}
          <div className="flex mt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow bg-gray-700 rounded-l p-2"
            />
            <button onClick={handleAddComment} className="bg-blue-500 text-white rounded-r px-4">
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;