"use client";

import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {MdEditor} from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import {useRouter} from "next/navigation";

export interface EditorProps {
  id: string;
}

export default function Editor({id}: EditorProps) {
  const [data, setData] = useState<string>("");
  const [questionTitle, setQuestionTitle] = useState<string | undefined>();

  const router = useRouter();

  async function onSaveHandler() {
    if (!questionTitle) return;
    const resPrommis = await fetch("/api/questions/create", {
      method: "POST",
      body: JSON.stringify({question: data, title: questionTitle, id}),
    });

    if (resPrommis.ok) router.push("/user");
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
        <MdEditor
          modelValue={data}
          onChange={setData}
          theme="dark"
          language="en-US"
          previewTheme="github"
          codeTheme="github"
          showCodeRowNumber={true}
          onSave={onSaveHandler}
          htmlPreview={false}
          preview={false}
          noMermaid={true}
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
