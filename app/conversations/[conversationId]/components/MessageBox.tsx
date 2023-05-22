"use client";
import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import React from "react";

interface IMessageBoxProps {
  isLast: boolean;
  data: FullMessageType;
}

const MessageBox: React.FC<IMessageBoxProps> = ({ isLast, data }) => {
  const session = useSession();
  return <div>MessageBox</div>;
};

export default MessageBox;
