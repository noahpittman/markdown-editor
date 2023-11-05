"use client";

import { useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import ReactDom from "react-dom";
import Markdown from "react-markdown";

export default function App() {
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
				class: "h-[calc(100vh-2rem)] p-2 overflow-y-scroll rounded-lg",
			},
		},
	});

	return (
		<div className="grid grid-cols-2 gap-4 p-4 break-words whitespace-break-spaces overflow-hidden max-h-100vh">
			<BlockNoteView editor={editor} theme={"dark"} />
			<pre className="bg-gray-700 max-h-[calc(100vh-2rem)] overflow-auto rounded-lg p-4 whitespace-break-spaces">
				{markdown}
			</pre>
		</div>
	);
}
