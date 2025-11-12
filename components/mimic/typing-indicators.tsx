"use client";

import { memo } from "react";

export const TypingIndicator = memo(() => (
  <div className="rounded-2xl p-3 bg-primary text-white flex items-center gap-2 typing-indicator-container">
    <span className="w-2.5 h-2.5 bg-white rounded-full bounce-dot" />
    <span className="w-2.5 h-2.5 bg-white rounded-full bounce-dot" />
    <span className="w-2.5 h-2.5 bg-white rounded-full bounce-dot" />
  </div>
));
TypingIndicator.displayName = "TypingIndicator";

export const BotTypingIndicator = memo(() => (
  <div className="rounded-2xl p-3 bg-default-100 text-foreground flex items-center gap-2 typing-indicator-container">
    <span className="w-2.5 h-2.5 bg-foreground rounded-full bounce-dot" />
    <span className="w-2.5 h-2.5 bg-foreground rounded-full bounce-dot" />
    <span className="w-2.5 h-2.5 bg-foreground rounded-full bounce-dot" />
  </div>
));
BotTypingIndicator.displayName = "BotTypingIndicator";
