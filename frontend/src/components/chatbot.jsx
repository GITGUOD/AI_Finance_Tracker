import { useState } from "react";
import "./chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Lägg till användarens meddelande
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const res = await fetch("http://localhost:5001/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });


      const data = await res.json();
      console.log("Svar från backend:", data);


      // Lägg till svaret från botten
      setMessages((prev) => [...prev, { sender: "bot", text: data.response || data.answer || "Inget svar." }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Något gick fel..." }]);
    }

    setInput(""); // töm inputfältet
  };

  return <>
    (
      <p>Här är min chatbot! Skriv något i fältet nedan.</p>
      <div className="chatbot-container">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Skriv något..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Skicka</button>
        </div>
      </div>
    );
    </>
}

export default Chatbot;
