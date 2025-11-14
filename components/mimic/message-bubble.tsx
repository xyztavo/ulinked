"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export function MessageBubble({
  text,
  onComplete,
}: {
  text: string;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setDisplayed("");
    setShowBubble(false);
  }, [text]);

  useEffect(() => {
    if (!showBubble || !text) return;

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      onCompleteRef.current?.();
      if (i >= text.length) {
        clearInterval(id);
        onCompleteRef.current?.();
      }
    }, 4);

    return () => clearInterval(id);
  }, [text, showBubble]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28 }}
      onAnimationComplete={() => setShowBubble(true)}
    >
      <div className="rounded-2xl p-2 px-3 max-w-[80%] break-words bg-default-100 text-foreground">
        {showBubble ? (
          <ReactMarkdown
            components={{
              a: ({ children, ...props }) => (
                <a
                  className="text-primary underline hover:opacity-80"
                  rel="noopener noreferrer"
                  target="_blank"
                  {...props}
                >
                  {children}
                </a>
              ),
            }}
          >
            {displayed || "..."}
          </ReactMarkdown>
        ) : (
          <div style={{ height: 16 }} />
        )}
      </div>
    </motion.div>
  );
}
