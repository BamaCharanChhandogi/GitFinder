import React, { useState } from "react";
import db from "../../firebase";
import firebase from "firebase/compat/app";
function CreatePost(props) {
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input == "") {
      alert("Please enter something");
    } else {
      db.collection("posts").add({
        // logo: props.avatar,
        // name: props.name,
        // usernames: props.login,
        // bio: props.bio,
        like: 0,
        likeBy: [],
        commentCnt: 0,
        commentObj: [],
        description: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto bg-black bg-opacity-20 backdrop-blur-lg rounded-2xl px-4 py-2 flex flex-col"
      >
        <h1>Home</h1>
        <div>
          <div className="flex w-full items-center">
            <img
              src={props.avatar}
              alt="user"
              className="w-12 h-12 rounded-[50%]"
            />

            <textarea
              className="w-full rounded-md bg-blue-400 bg-opacity-10 m-3 p-2"
              placeholder="What is on your mind?"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="flex w-full justify-end items-center">
            <button
              type="submit"
              className="bg-black p-2 mx-3 bg-opacity-80 rounded-s-lg text-pink-500 hover:text-pink-600 hover:bg-opacity-100 font-bold"
            >
              Post
            </button>
            {/* <button type='button' className='bg-black'></button> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
