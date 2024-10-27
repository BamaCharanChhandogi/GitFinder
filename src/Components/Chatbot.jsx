"use client"
import { useEffect } from 'react';

const ChatbotEmbed = () => {
  useEffect(() => {
    const chatbotScript = document.createElement('script');
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.async = true;
    chatbotScript.setAttribute('chatbotId', 'rBXZd9N6Ar66rTTYQ2ywP');
    chatbotScript.setAttribute('domain', 'www.chatbase.co');
    document.body.appendChild(chatbotScript);
  }, []);

  return (
    <script>
      {`
        window.embeddedChatbotConfig = {
          chatbotId: "rBXZd9N6Ar66rTTYQ2ywP",
          domain: "www.chatbase.co"
        };
      `}
    </script>
  );
};

export default ChatbotEmbed;