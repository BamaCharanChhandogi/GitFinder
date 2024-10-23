import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Notifications.css'; // Optional: Add custom CSS for notifications styling

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch notifications from the backend when the component mounts
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    // Mark a notification as read
    const markAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/notifications/${id}`);
            setNotifications(notifications.map((notification) =>
                notification._id === id ? { ...notification, isRead: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    return (
        <div className="notifications-container">
            <h2>Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications yet.</p>
            ) : (
                <ul className="notification-list">
                    {notifications.map((notification) => (
                        <li key={notification._id} className={`notification-item ${notification.isRead ? 'read' : ''}`}>
                            <p>{notification.message}</p>
                            {!notification.isRead && (
                                <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
