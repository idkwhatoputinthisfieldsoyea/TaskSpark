"use client";

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  texts: string[];
  speed?: number;
  delay?: number;
  className?: string;
}

export default function TypingAnimation({ 
  texts, 
  speed = 100, 
  delay = 2000,
  className = "" 
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = texts[currentTextIndex];

    // Keep track of the active timeout so we can clear nested timeouts too
    let activeTimeout: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting) {
      // Prepare next typed string based on current state
      const next = text.substring(0, currentText.length + 1);

      activeTimeout = setTimeout(() => {
        setCurrentText(next);

        // If we've finished typing the full text, wait `delay` then start deleting
        if (next === text) {
          activeTimeout = setTimeout(() => setIsDeleting(true), delay);
        }
      }, speed);
    } else {
      // Prepare next deleted string
      const next = text.substring(0, Math.max(0, currentText.length - 1));

      activeTimeout = setTimeout(() => {
        setCurrentText(next);

        // If fully deleted, advance to the next text and begin typing
        if (next === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, Math.max(20, Math.floor(speed / 2)));
    }

    return () => {
      if (activeTimeout) clearTimeout(activeTimeout);
    };
  }, [currentText, currentTextIndex, isDeleting, texts, speed, delay]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentText}
      <span className={`inline-block w-0.5 h-8 bg-purple-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
    </span>
  );
}