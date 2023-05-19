import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface IUserBoxProps {
  user: User;
}

const UserBox: React.FC<IUserBoxProps> = ({ user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    axios.post("/api/conversations", { userId: user.id }).then((res) => {
      router
        .push(`/conversations/${res.data.id}`)
        //@ts-expect-error
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [user.id, router]);

  return (
    <div
      onClick={handleClick}
      className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg cursor-pointer transition duration-200 ease-in-out"
    >
      <Avatar user={user} />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900 ">{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
