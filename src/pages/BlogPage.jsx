import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import CreateBlogPost from '../Components/Blog/CreateBlogPost';
import BlogPost from '../Components/Blog/BlogPost';
import db from '../firebase';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    db.collection('blogPosts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setBlogPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      }, (error) => {
        console.error("Error fetching blog posts:", error);
      });
  }, []);
  return (
    <div className="flex gap-64 flex-row justify-center md:flex-row bg-[#1B2430] h-auto min-h-screen md:px-40">
        <Sidebar />
      <div className="md:w-7/12 m-3 ml-0 md:m-3 text-white px-4 py-1 rounded-2xl md:ml-14">
        <CreateBlogPost />
        {blogPosts.map(({ id, data }) => (
          <BlogPost key={id} id={id} {...data} />
        ))}
      </div>
    </div>
  );
}

export default Blog;