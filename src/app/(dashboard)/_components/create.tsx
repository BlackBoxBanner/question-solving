"use client";

import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/navigation";
import {Code} from "@/app/_components/code";

export interface EditorProps {
  id: string;
}

export default function Editor({id}: EditorProps) {
  const [data, setData] = useState<string | undefined>("");
  const [questionTitle, setQuestionTitle] = useState<string | undefined>();

  const router = useRouter();

  async function onSaveHandler() {
    if (!questionTitle) return;
    const resPrommis = await fetch("/api/questions/create", {
      method: "POST",
      body: JSON.stringify({question: data, title: questionTitle, id}),
    });

    if (resPrommis.ok) router.push("/dashboard");
  }

  return (
    <>
      <div className={twMerge("flex flex-col gap-4")}>
        <input
          className={"text-2xl bg-primary-light rounded p-1 px-2"}
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder={"Title"}
        />
        <Code
          value={data}
          onChange={(e) => {
            setData(e.target.value)
          }}
        />
        <button
          className={twMerge(
            "bg-teritary hover:bg-teritary-hover rounded transition-colors duration-150 p-1 px-4"
          )}
          onClick={onSaveHandler}
        >
          Save
        </button>
      </div>
    </>
  );
}
