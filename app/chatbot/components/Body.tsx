"use client";
import getParticularConversation from "@/app/actions/getParticularUserConversation";
import Avatar from "@/app/components/Avatar";
import Header from "@/app/conversations/[conversationId]/components/Header";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { HiPaperAirplane } from "react-icons/hi";

interface IBodyProps {
  currentUser: User;
  conversations: any;
}

const Body: React.FC<IBodyProps> = ({ currentUser, conversations }) => {
  const botUserId = conversations[0]?.users?.find(
    (item: any) => item.id !== currentUser.id
  );
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversations[0]?.messages) {
      setMessages(conversations[0]?.messages);
    }
    bottomRef?.current?.scrollIntoView();
  }, [conversations]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const messageBody = {
      message: inputValue,
      conversationId: conversations[0]?.id,
    };
    axios.post(`/api/messages`, messageBody).then((res) => {
      console.log("message send successfull", res);
    });
    // Add the question to the messages state with an empty answer initially
    setMessages((prev: any) => [
      ...prev,
      {
        body: inputValue,
        sender: {
          id: currentUser.id,
          name: currentUser.name,
          image: currentUser.image,
        },
      },
    ]);

    // Reset accumulatedAnswer for the new question
    let accumulatedAnswer = "";
    setMessages((prev: any) => [
      ...prev,
      {
        body: "",
        sender: {
          id: botUserId,
        },
      },
    ]);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    await fetch("/api/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputValue }),
    });

    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const chunk = data.choices[0]?.delta?.content || "";
      accumulatedAnswer += chunk;

      // Update the last message with the accumulated answer
      setMessages((prev: any) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1].body = accumulatedAnswer;

        return updatedMessages;
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
      const messageBody = {
        message: accumulatedAnswer,
        conversationId: conversations[0]?.id,
        botId: botUserId.id,
      };
      axios.post(`/api/messages`, messageBody).then((res) => {
        console.log("message send successfull", res);
      });
      console.log("EventSource connection closed.", accumulatedAnswer);
    };

    // Clear the input field
    setInputValue("");
  };

  return (
    <>
      {conversations[0]?.id ? (
        <div className=" flex flex-col h-full">
          <Header conversation={conversations?.[0]} />
          <div className="  p-[1rem] flex-grow overflow-auto max-h-[90vh]">
            <div className="flex w-full flex-col">
              {messages.map((msg: any, index: any) => (
                <div key={index} className="chat-message w-full">
                  {msg.sender.id === currentUser.id ? (
                    <div className="flex  justify-end ">
                      <div className="flex gap-x-2 items-center">
                        <p className="mb-[1.25rem] bg-sky-500 p-2 rounded-t-[0.75rem] rounded-bl-[0.75rem] text-white">
                          {msg.body}
                        </p>
                        <div className="flex items-end justify-end">
                          <Avatar user={currentUser} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-start">
                      <div className="flex gap-x-2  max-w-[50%]">
                        <div className="flex items-end justify-end">
                          <Avatar user={{ ...currentUser, image: "" }} />
                        </div>
                        <p className="mb-[1.25rem] bg-[#F3F4F6] p-2 rounded-t-[0.75rem] rounded-br-[0.75rem] text-black ">
                          {msg.body}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div ref={bottomRef} />
          </div>

          <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 ">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 lg:gap-4 w-full"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={"Write a message"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
              >
                <HiPaperAirplane size={18} className="text-white" />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Body;
