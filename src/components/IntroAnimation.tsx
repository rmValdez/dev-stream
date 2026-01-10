"use client";

import React, { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [text, setText] = useState("");
  const fullText = "INITIALIZING DEV-STREAM PROTOCOLS...";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800); // Wait a bit before finishing
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono">
      <div className="text-primary text-xl tracking-widest animate-pulse">
        {text}
        <span className="inline-block w-3 h-5 bg-primary ml-1 animate-blink"></span>
      </div>
      <div className="mt-4 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/50 transition-all duration-300 ease-out"
          style={{ width: `${(text.length / fullText.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
