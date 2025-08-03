'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
  pauseTime?: number;
}

export default function TypingAnimation({ 
  text, 
  speed = 100, 
  delay = 0,
  className = "",
  loop = false,
  pauseTime = 2000
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const phrases = Array.isArray(text) ? text : [text];
  const currentPhrase = phrases[currentPhraseIndex];

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
      setIsVisible(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (isDeleting) {
      // Deleting text
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, speed / 2);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
        setCurrentIndex(0);
      }
    } else {
      // Typing text
      if (currentIndex < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + currentPhrase[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        // Finished typing current phrase
        if (loop && phrases.length > 1) {
          // Wait, then start deleting
          const timer = setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [currentIndex, currentPhrase, speed, isTyping, isDeleting, displayText, loop, phrases, pauseTime]);

  return (
    <span className={`${className} transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {displayText}
      <span 
        className={`inline-block w-0.5 h-6 bg-brand dark:bg-brand-light ml-1 animate-cursor-blink ${
          isTyping ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          verticalAlign: 'middle',
          marginTop: '-2px'
        }}
      />
    </span>
  );
} 