import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/app/_components/Editor"), {
	ssr: false,
});

const App = () => {
	return <Editor />;
};

export default App;
