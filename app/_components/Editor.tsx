"use client";

import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Editor() {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const [markdown, setMarkdown] = useState<string>("");

	const editor: BlockNoteEditor = useBlockNote({
		onEditorContentChange: (editor) => {
			const saveBlocksAsMarkdown = async () => {
				const markdown: string = await editor.blocksToMarkdown(
					editor.topLevelBlocks
				);
				setMarkdown(markdown);
			};
			saveBlocksAsMarkdown();
		},
		domAttributes: {
			editor: {
				class: "h-[calc(100vh-2rem)] p-4 overflow-y-scroll rounded-lg",
			},
		},
	});

	async function ExportToMD() {
		try {
			await fetch("/api", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					// filename: nameInput,
					filedata: markdown,
				}),
			})
				.then((response) => {
					console.log(response.status);
					return response.json();
				})
				.then((data) => console.log(data));
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="grid grid-cols-2 gap-4 p-4 break-words whitespace-break-spaces overflow-hidden max-h-100vh">
			<BlockNoteView editor={editor} theme={"dark"} />
			<pre className=" bg-zinc-900 max-h-[calc(100vh-2rem)] overflow-auto rounded-lg p-2 whitespace-break-spaces grid grid-rows-[1fr]">
				<textarea
					className="h-full w-full resize-none bg-zinc-900 focus:outline focus:outline-zinc-700 rounded-md py-2 px-4"
					value={markdown}
					onChange={() => {}}
				/>
				<div className="h-16 flex gap-8 justify-center items-center">
					<Button size={"lg"} onClick={ExportToMD} variant={"secondary"}>
						Export
					</Button>
					<Button size={"lg"} variant={"secondary"}>
						Preview
					</Button>
				</div>
				<Button
					asChild
					size={"lg"}
					className="text-muted-foreground max-w-xs mx-auto"
					variant={"ghost"}
				>
					<Link target="_blank" href={"https://noahpittman.xyz"}>
						by: Noah Pittman
					</Link>
				</Button>
			</pre>
		</div>
	);
}
