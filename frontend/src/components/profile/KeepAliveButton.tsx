import { useState } from "react";
import { useKeepAlive } from "../../hooks/useKeepAlive";

export default function KeepAliveButton() {
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem("keepAlive") === "true";
  });

  const retryCount = useKeepAlive(isActive);

  const toggleKeepAlive = () => {
    const newState = !isActive;
    setIsActive(newState);
    localStorage.setItem("keepAlive", String(newState));
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleKeepAlive}
        className={`mt-2 p-2 rounded-lg text-white transition ${
          isActive
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {isActive ? "✅ Keep-Alive Включено" : "⚪ Увімкнути Keep-Alive"}
      </button>
      {isActive && retryCount > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          🔄 Очікування відповіді... Спроба {retryCount}
        </p>
      )}
    </div>
  );
}
