import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import db from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

function Chat() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null); // New state for the chat user
  const { conversationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!conversationId || !user) return;

    const unsubscribe = db
      .collection("conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot(
        (snapshot) => {
          const messageList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(messageList);
        },
        (error) => {
          console.error("Error fetching messages:", error);
        }
      );
      

    // Fetch the other user's details for the header
    const fetchChatUser = async () => {
      const conversation = await db.collection("conversations").doc(conversationId).get();
      if (conversation.exists) {
        const participants = conversation.data().participants;
        const otherUserId = participants.find((id) => id !== user.uid);   
        const userDoc = await db.collection("users").doc(otherUserId).get();
        if (userDoc.exists) {
          setChatUser(userDoc.data());
        }
      }
    };

    fetchChatUser();

    return unsubscribe;
  }, [conversationId, user]);

  // Redirect to /chat if no conversationId is present
  useEffect(() => {
    if (!conversationId) {
      navigate("/chat");
    }
  }, [conversationId, navigate]);

  if (!conversationId) {
    return (
      <div className="w-full font-manrope tracking-wide flex flex-row bg-[#1B2430] md:justify-end min-h-screen bg-cover">
        <Sidebar />
        <div className="md:w-5/6 w-full md:ml-20 mx-2 h-auto bg-opacity-20 backdrop-blur-lg rounded-2xl flex flex-col my-3 p-6">
          <p className="text-white text-xl">Select a user to start chatting</p>
        </div>
      </div>
    );
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user || !message.trim() || !conversationId) return;

    try {
      await db
        .collection("conversations")
        .doc(conversationId)
        .collection("messages")
        .add({
          text: message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          userId: user.uid,
          displayName: user.displayName,
        });

      await db.collection("conversations").doc(conversationId).update({
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full font-manrope tracking-wide flex flex-row bg-[#1B2430] md:justify-end min-h-screen bg-cover">
      <Sidebar />

      
      <div className="md:w-4/6 w-full md:ml-20 mx-2 h-auto bg-opacity-20 backdrop-blur-lg rounded-2xl flex flex-col my-3  bg-gray-500">
        
        {/* Header Section */}
        <div className="bg-gray-900 p-4 rounded-t-xl">
          {chatUser && (
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="userImage" className="h-10 w-10 rounded-full"/>
              <h2 className="text-2xl text-white">{chatUser.name}</h2>
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto p-4 mb-16 md:mb-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-2  p-2 rounded-lg max-w-[70%] ${
                msg.userId === user?.uid
                  ? "bg-pink-500 text-white ml-auto"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p className="font-bold text-sm">{msg.displayName}</p>
              <p className="text-base">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <form
          onSubmit={sendMessage}
          className="p-8 bg-slate-600 bg-opacity-10 backdrop-blur-lg fixed bottom-0 left-0 right-0 rounded-b-2xl"
        >
          <div className="flex">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2  rounded-lg border bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
