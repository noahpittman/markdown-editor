import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/Editor"), { ssr: false });

const App = () => {
	return <Editor />;
};

export default App;
