import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import db from '../firebase';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';


function UserList() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log("Current user:", user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await db.collection('posts').get();
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        username: doc.data().usernames,
        name: doc.data().name,
        logo: doc.data().logo
      }));
    //   console.log("Fetched users:", userList); 
      // Remove duplicates based on username
      const uniqueUsers = Array.from(new Map(userList.map(item => [item.username, item])).values());
    //   console.log(uniqueUsers);
      setUsers(uniqueUsers.filter(user => user.username !== currentUser?.displayName));
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const startConversation = async (otherUsername) => {
    if (!currentUser) return;
  
    const conversationId = [currentUser.uid, otherUsername].sort().join('_');
    
    try {
      await db.collection('conversations').doc(conversationId).set({
        participants: [currentUser.uid, otherUsername],
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
  
      navigate(`/chat/${conversationId}`);
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };



  return (
    <div className="w-full font-manrope tracking-wide flex flex-row bg-[#1B2430] md:justify-end min-h-screen bg-cover">
    <Sidebar />
    <div className="md:w-4/6  w-full md:ml-20 mx-2 h-auto bg-opacity-20 backdrop-blur-lg rounded-2xl flex flex-col my-3 p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2 flex items-center bg-slate-700 p-3 rounded-lg">
            <img src={user.logo} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
            <span className="text-white">{user.name}</span>
            <button
              onClick={() => startConversation(user.username)}
              className="ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default UserList;