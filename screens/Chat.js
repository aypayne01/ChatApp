import React, { useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch or set initial messages here
    const initialMessages = [
      {
        _id: 1,
        text: "Hello!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
    ];

    setMessages(initialMessages);
  }, []); // Ensure the dependency array is empty to run the effect only once

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return <GiftedChat messages={messages} onSend={onSend} />;
}
