"use client";

import { useEffect, useRef, useState } from "react";
import { Stars, X } from "lucide-react";
import axios from "axios";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Chip, Input } from "@heroui/react";

import config from "@/config/config";
import { UmimicConfig } from "@/config/config.umimic";
import {
  MessageBubble,
  TypingIndicator,
  BotTypingIndicator,
} from "@/components/mimic";

type UmimicResponse = { reply: string };
type ChatMessage = { from: "user" | "bot"; text: string };

export function UMimic(): JSX.Element {
  const {
    isOpen: isMimicOpen,
    onOpen: onMimicOpen,
    onOpenChange: onMimicOpenChange,
  } = useDisclosure();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPulse, setShowPulse] = useState<boolean>(true);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [systemMessage, setSystemMessage] = useState<{
    role: string;
    content: string;
  }>(() => {
    if (typeof window === "undefined")
      return {
        role: "system",
        content: UmimicConfig.personalities?.[0]?.prompt || "",
      };
    const stored = localStorage.getItem("umimic_personality");
    return stored
      ? { role: "system", content: stored }
      : {
          role: "system",
          content: UmimicConfig.personalities?.[0]?.prompt || "",
        };
  });
  const [personalityIndex, setPersonalityIndex] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem("umimic_personality");
    if (!stored) return 0;
    const idx =
      UmimicConfig.personalities?.findIndex((p) => p.prompt === stored) ?? 0;
    return idx >= 0 ? idx : 0;
  });

  const defaultBotMessage: ChatMessage = {
    from: "bot",
    text: UmimicConfig.greeting,
  };

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    try {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior, block: "end" });
      }
    } catch {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lastClearDate = localStorage.getItem("umimic_last_clear");
    const today = new Date().toDateString();

    if (lastClearDate !== today) {
      localStorage.removeItem("umimic_messages");
      localStorage.setItem("umimic_last_clear", today);
      setMessages([defaultBotMessage]);
      return;
    }

    const stored = localStorage.getItem("umimic_messages");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChatMessage[];
        setMessages(parsed.length > 0 ? parsed : [defaultBotMessage]);
      } catch {
        localStorage.removeItem("umimic_messages");
        setMessages([defaultBotMessage]);
      }
    } else {
      setMessages([defaultBotMessage]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("umimic_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    setIsUserTyping(message.trim().length > 0);
    scrollToBottom("smooth");
  }, [message]);

  useEffect(() => {
    if (!isMimicOpen) return;

    setShowPulse(false);
    setTimeout(() => inputRef.current?.focus(), 80);
    setTimeout(() => scrollToBottom("smooth"), 120);
  }, [isMimicOpen]);

  useEffect(() => {
    const timeout = setTimeout(() => scrollToBottom("smooth"), 60);

    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    if (!loading) return;

    scrollToBottom("smooth");
    const timeout = setTimeout(() => scrollToBottom("smooth"), 100);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleSend = async (): Promise<void> => {
    if (!message.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { from: "user", text: message },
    ];

    setMessages(newMessages);
    setMessage("");
    setLoading(true);

    try {
      const history = [
        ...(systemMessage ? [systemMessage] : []),
        ...newMessages.map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
      ];

      const res = await axios.post<UmimicResponse>(
        `${UmimicConfig.apiBaseUrl}/api/message`,
        { message, history },
      );

      const botReply: ChatMessage = { from: "bot", text: res.data.reply };

      setMessages([...newMessages, botReply]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setMessages([
        ...newMessages,
        { from: "bot", text: "Erro ao responder 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {config.options.umimic && (
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="relative inline-flex">
            {showPulse && (
              <span className="absolute -inset-1 rounded-full border-2 border-primary opacity-60 animate-ping pointer-events-none" />
            )}
            <Button
              onPress={onMimicOpen}
              isIconOnly
              className="text-foreground hover:text-white hover:bg-primary bg-transparent shadow-custom relative z-10"
            >
              <Stars />
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isMimicOpen}
        onOpenChange={onMimicOpenChange}
        className="font-mono"
      >
        <ModalContent className="max-h-[80dvh] sm:max-h-[70dvh] h-auto w-full max-w-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex-col gap-2">
                <div className="flex flex-row justify-between w-full px-2">
                  <div>{config.nickname}</div>
                </div>
                {UmimicConfig.personalities && (
                  <div className="flex flex-row gap-2 flex-wrap px-2">
                    {UmimicConfig.personalities.map((personality, index) => (
                      <Chip
                        key={personality.name}
                        variant={personalityIndex === index ? "solid" : "flat"}
                        color="primary"
                        className="cursor-pointer transition-colors"
                        onClick={() => {
                          setPersonalityIndex(index);
                          const newSystemMessage = {
                            role: "system",
                            content: personality.prompt,
                          };
                          setSystemMessage(newSystemMessage);
                          localStorage.setItem(
                            "umimic_personality",
                            personality.prompt,
                          );
                        }}
                      >
                        {personality.name}
                      </Chip>
                    ))}
                  </div>
                )}
              </ModalHeader>
              <ModalBody className="flex-grow overflow-y-auto">
                <div
                  ref={messagesContainerRef}
                  className="flex flex-col gap-3 min-h-full"
                >
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 text-sm">
                      Nenhuma conversa ainda 😶
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.from === "user" ? (
                        <div className="rounded-2xl p-2 px-3 bg-primary text-white break-words max-w-[80%]">
                          {m.text}
                        </div>
                      ) : (
                        <MessageBubble
                          text={m.text}
                          onComplete={() => scrollToBottom("smooth")}
                        />
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <BotTypingIndicator />
                    </div>
                  )}

                  {isUserTyping && (
                    <div className="flex justify-end">
                      <TypingIndicator />
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ModalBody>

              <ModalFooter className="flex flex-row gap-2">
                <Input
                  placeholder="Digite algo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  ref={inputRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button isIconOnly color="danger" onPress={onClose}>
                  <X />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
