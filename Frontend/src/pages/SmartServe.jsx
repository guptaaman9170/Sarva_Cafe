import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Mic, MicOff } from "lucide-react";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import { menus } from "../constants"; // ✅ Import menus

// ✅ Parse order text into menu-matching items
const parseOrderText = (text) => {
  const allowedItems = menus.flatMap((menu) =>
    menu.items.map((item) => item.name.toLowerCase())
  );

  const items = [];
  const lower = text.toLowerCase();
  const regex = /([0-9]+)\s([a-zA-Z\s]+)/g;
  let match;

  while ((match = regex.exec(lower)) !== null) {
    let qty = parseInt(match[1]);
    let item = match[2].toLowerCase().trim();
    if (item.endsWith("s") && qty === 1) item = item.slice(0, -1);
    if (item.endsWith("es") && qty === 1) item = item.slice(0, -2);

    if (allowedItems.includes(item)) {
      items.push({ item, qty });
    }
  }

  return items;
};

const SmartServe = () => {
  const [orders, setOrders] = useState([]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const navigate = useNavigate();

  useEffect(() => {
    if (!listening && transcript.trim().length > 0) {
      const parsedItems = parseOrderText(transcript);
      if (parsedItems.length > 0) {
        setOrders((prev) => [...prev, ...parsedItems]);
      } else {
        setOrders((prev) => [...prev, { item: transcript.trim(), qty: 1 }]);
      }
      resetTranscript();
    }
  }, [listening]);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const stopListening = () => SpeechRecognition.stopListening();

  const handleDeleteOrder = (indexToDelete) => {
    setOrders((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center">
        <p>Your browser does not support speech recognition.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white px-6 py-8 relative overflow-y-scroll scrollbar-hide">
      <BackButton />

      <h1 className="text-3xl font-bold mb-4 text-center">🤖 Smart Serve</h1>
      <p className="text-[#aaaaaa] mb-6 text-center">
        Press the mic and speak your order clearly
      </p>

      <div className="flex justify-center mb-6">
        <button
          onClick={listening ? stopListening : startListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            listening ? "bg-red-600 animate-pulse" : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {listening ? <MicOff size={30} /> : <Mic size={30} />}
        </button>
      </div>

      {listening && transcript && (
        <div className="bg-[#222] text-yellow-300 text-center p-3 mb-4 rounded-lg">
          <p className="text-sm italic">🗣️ Listening: "{transcript}"</p>
        </div>
      )}

      <div className="mt-8 pb-24">
        <h2 className="text-xl font-semibold mb-4">🧾 Orders Detected</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400">No orders yet. Speak to place one!</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order, index) => (
              <li
                key={index}
                className="bg-[#262626] px-4 py-3 rounded-xl flex justify-between items-center"
              >
                <span className="text-white">
                  🍽️ {order.qty} x {order.item}
                </span>
                <button
                  onClick={() => handleDeleteOrder(index)}
                  className="text-red-400 hover:text-red-600 text-sm"
                  title="Delete Order"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SmartServe;