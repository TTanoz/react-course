import { useState } from "react";
import { Chatbot } from "supersimpledev";
import LoadingImage from "../assets/loading-spinner.gif";

import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];
    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-image" src={LoadingImage} />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setInputText("");
    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }

  return (
    <div className="chat-input-container">
      <input
        disabled={isLoading}
        placeholder="Send a Message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={handleKeyDown}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>
    </div>
  );
}
