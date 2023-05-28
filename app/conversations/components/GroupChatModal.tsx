"use client";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/button";
import Input from "@/app/components/inputs";
import Select from "@/app/components/inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { set } from "lodash";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface IGroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<IGroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const memebers = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Group chats are great for planning a night out, keeping up with
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                errors={errors}
                id="name"
                disabled={isLoading}
                required
                register={register}
                label="Name"
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  label: user.name,
                  value: user.id,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={memebers}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            secondary
            type="button"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={onClose} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
