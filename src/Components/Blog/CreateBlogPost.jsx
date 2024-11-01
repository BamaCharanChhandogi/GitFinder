import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import MDEditor from '@uiw/react-md-editor';
import TurndownService from 'turndown';
import showdown from 'showdown';
import 'react-quill/dist/quill.snow.css';
import db from '../../firebase';
import firebase from 'firebase/compat/app';
import '../../App.css';

function CreateBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editorType, setEditorType] = useState('rich');
  
  const turndownService = new TurndownService();
  const converter = new showdown.Converter();

  const handleEditorTypeChange = (newType) => {
    if (newType === 'markdown' && content) {
      const markdown = turndownService.turndown(content);
      setContent(markdown);
    } else if (newType === 'rich' && content) {
      const html = converter.makeHtml(content);
      setContent(html);
    }
    setEditorType(newType);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || content === '') {
      alert('Please fill in all fields');
      return;
    }

    const finalContent = editorType === 'markdown' 
      ? converter.makeHtml(content)  // Convert markdown to HTML for storage
      : content;

    db.collection('blogPosts').add({
      title,
      content: finalContent,
      contentFormat: 'html', // Always store as HTML
      originalFormat: editorType,
      author: document.cookie,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: [],
      likedBy: []
    });

    setTitle('');
    setContent('');
  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full h-auto bg-black bg-opacity-20 rounded-2xl px-4 py-2 flex flex-col mb-6">
      <h2 className="text-2xl mb-4 text-white">Create a Blog Post</h2>
      
      <div className="flex items-center mb-4">
        <label className="text-white mr-4">Editor Type:</label>
        <select 
          value={editorType} 
          onChange={(e) => handleEditorTypeChange(e.target.value)}
          className="bg-blue-400 bg-opacity-10 text-white p-2 rounded-md"
        >
          <option value="rich">Rich Text Editor</option>
          <option value="markdown">Markdown Editor</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-md bg-blue-400 bg-opacity-10 mb-2 p-2 text-white"
      />

      {editorType === 'rich' ? (
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="Write your blog post here..."
          className="bg-slate-800 rounded-md mb-4 p-2"
        />
      ) : (
        <div className="markdown-container">
          <MDEditor
            value={content}
            onChange={setContent}
            preview="edit"
            height={400}
            className="bg-slate-800 rounded-md mb-4"
          />
        </div>
      )}

      <button type="submit" className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 self-end mt-4">
        Publish Post
      </button>
    </form>
  );
}

export default CreateBlogPost;