"use client";

import { useState, useEffect } from "react";

const models = [
  { name: "OpenRouter Free", value: "openrouter/free" },
  { name: "Gemini 2.5 Flash", value: "google/gemini-2.5-flash" },
  { name: "DeepSeek V3", value: "deepseek/deepseek-chat" },
];

export default function ModelSelector() {
  const [model, setModel] = useState("openrouter/free");

  useEffect(() => {
    const saved = localStorage.getItem("selected-model");
    if (saved) {
      setModel(saved);
    }
  }, []);

  const handleChange = (value: string) => {
    setModel(value);
    localStorage.setItem("selected-model", value);
  };

  return (
    <select
      value={model}
      onChange={(e) => handleChange(e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm"
    >
      {models.map((m) => (
        <option key={m.value} value={m.value}>
          {m.name}
        </option>
      ))}
    </select>
  );
}