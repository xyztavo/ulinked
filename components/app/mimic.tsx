"use client";

import { useEffect, useRef, useState } from "react";
import config from "@/config";
import { UmimicConfig } from "@/config.umimic";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Input } from "@heroui/react";
import axios from "axios";
import { Stars } from "lucide-react";
import ReactMarkdown from "react-markdown";

type UmimicResponse = {
  reply: string;
};

type ChatMessage = {
  from: "user" | "bot";
  text: string;
};

export function UMimic(): JSX.Element {
  const {
    isOpen: isMimicOpen,
    onOpen: onMimicOpen,
    onOpenChange: onMimicOpenChange,
  } = useDisclosure();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const defaultBotMessage: ChatMessage = {
    from: "bot",
    text: `eai irmao tranquilo? eu sou o ${config.nickname}, qual a boa de hoje?`,
  };

  // Load messages from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

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

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("umimic_messages", JSON.stringify(messages));
  }, [messages]);

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
      // Prepare conversation history for backend
      const history = newMessages.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await axios.post<UmimicResponse>(
        `${UmimicConfig.apiBaseUrl}/api/message`,
        {
          message,
          history,
        }
      );

      const botReply: ChatMessage = { from: "bot", text: res.data.reply };
      setMessages([...newMessages, botReply]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { from: "bot", text: "Erro ao responder 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fixed scroll behavior for mobile
  useEffect(() => {
    if (!messagesContainerRef.current || !messagesEndRef.current) return;

    const container = messagesContainerRef.current;
    const isMobile = window.innerWidth < 768;

    const timeout = setTimeout(() => {
      const scrollBehavior = isMobile ? "auto" : "smooth";
      messagesEndRef.current?.scrollIntoView({
        behavior: scrollBehavior,
        block: "end",
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <>
      {/* mimic trigger */}
      {config.options.umimic && (
        <div className="flex flex-row items-center justify-center gap-2">
          <Button
            onPress={onMimicOpen}
            isIconOnly
            className="text-foreground hover:text-white hover:bg-primary bg-transparent shadow-custom"
          >
            <Stars />
          </Button>
        </div>
      )}

      {/* mimic modal */}
      <Modal
        isOpen={isMimicOpen}
        onOpenChange={onMimicOpenChange}
        className="font-mono"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{config.nickname}</ModalHeader>
              <ModalBody
                ref={messagesContainerRef}
                className="flex flex-col gap-3 h-[60vh] sm:max-h-[400px] overflow-y-auto"
              >
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm">
                    Nenhuma conversa ainda 😶
                  </div>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-2xl p-2 px-3 max-w-[80%] break-words ${
                        m.from === "user"
                          ? "bg-primary text-white"
                          : "bg-default-100 text-foreground"
                      }`}
                    >
                      {m.from === "bot" ? (
                        <ReactMarkdown
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                className="text-primary underline hover:opacity-80"
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            ),
                          }}
                        >
                          {m.text}
                        </ReactMarkdown>
                      ) : (
                        m.text
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start text-sm text-gray-400">
                    {config.nickname} está digitando...
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="flex flex-row gap-2">
                <Input
                  placeholder="Digite algo..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                />
                <Button color="primary" onPress={handleSend}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
