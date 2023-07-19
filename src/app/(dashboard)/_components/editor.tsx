"use client";

import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/navigation";
import {Code} from "@/app/_components/code";
import {Preview} from "@/app/_components/code/preview";

export interface EditorProps {
  title: string;
  description: string;
  id: string;
}

export default function Editor({description, title, id}: EditorProps) {
  const [data, setData] = useState<string | undefined>(description);
  const [questionTitle, setQuestionTitle] = useState<string | undefined>(title);
  const [view, setView] = useState(false);
  const router = useRouter();

  interface AlertProps {
    status: boolean;
    type?: "successful" | "error";
  }

  const [alert, setAlert] = useState<AlertProps>({
    status: false,
    type: undefined,
  });

  async function onSaveHandler() {
    const resPrommis = await fetch("/api/questions/edit", {
      method: "POST",
      body: JSON.stringify({question: data, id, title: questionTitle}),
    });

    if (resPrommis.ok) return router.push("/dashboard");
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
        {!view ? (
          <>
            <Code onChange={(e) => setData(e.target.value)} value={data}/>
          </>
        ) : (
          <Preview
            description={data}
          />
        )}
        <button
          className={twMerge(
            "bg-teritary hover:bg-teritary-hover rounded transition-colors duration-150 p-1 px-4"
          )}
          onClick={() => setView((e) => !e)}
        >
          {!view ? "View" : "Edit"}
        </button>
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
