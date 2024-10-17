// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import db from '../../firebase';
// import firebase from 'firebase/compat/app';
// import '../../App.css';

// function CreateBlogPost() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title === '' || content === '') {
//       alert('Please fill in all fields');
//     } else {
//       db.collection('blogPosts').add({
//         title,
//         content,
//         author: document.cookie, // Assuming cookie contains username
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         likes: 0,
//         comments: [],
//         likedBy: []
//       });
//       setTitle('');
//       setContent('');
//     }
//   };
  

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
//   ];

//   return (
//     <form onSubmit={handleSubmit} className="w-full h-auto bg-black bg-opacity-20 rounded-2xl px-4 py-2 flex flex-col mb-6">
//       <h2 className="text-2xl mb-4 text-white">Create a Blog Post</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="w-full rounded-md bg-blue-400 bg-opacity-10 mb-2 p-2 text-white"
//       />
//       <ReactQuill
//         theme="snow"
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         formats={formats}
//         placeholder="Write your blog post here..."
//         className="bg-slate-800  rounded-md mb-4 p-2"
//       />
//       <button type="submit" className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 self-end mt-4">
//         Publish Post
//       </button>
//     </form>
//   );
// }

// export default CreateBlogPost;