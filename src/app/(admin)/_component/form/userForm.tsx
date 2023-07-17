"use client"

import {twMerge} from "tailwind-merge";
import {useForm} from "react-hook-form";
import {User} from ".prisma/client";
import Input from "@/app/_components/input"
import {useRouter} from "next/navigation";

interface FormProps {
  user: User
  allUser: { username: string }[]
}

export default function UserForm({user, allUser}: FormProps) {
  const {register, handleSubmit, formState: {errors}} = useForm<User>({
    defaultValues: user
  })

  const router = useRouter()

  const onSubmitHandler = handleSubmit(async (data, event) => {
    const resPrommiss = await fetch("", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        username: data.username,
        discordId: data.discordId,
        lineId: data.lineId,
      })
    })

    if (resPrommiss.ok) return router.push(`/admin/user/${data.id}`)
  })
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <Input
          label={"Name *"}
          error={errors.name?.message}
          show={true}
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        <Input
          label={"Username *"}
          error={errors.username?.message}
          show={true}
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
            minLength: {
              value: 5,
              message: "username invalid",
            },
            validate: (value = "", formValues) => {
              const test = allUser.includes({username: value});
              if (value == user.username) return true
              return test ? "This username was taken" : true;
            },
          })}
        />
        <Input
          label={"Discord ID"}
          error={errors.discordId?.message}
          show={true}
          {...register("discordId")}
        />
        <Input
          label={"Line ID"}
          error={errors.lineId?.message}
          show={true}
          {...register("lineId")}
        />
        <button
          className={twMerge("p-2 px-4 bg-teritary hover:bg-teritary-hover rounded transition-all ease-in-out duration-150")}>Save
        </button>
      </form>
    </>
  )
}
