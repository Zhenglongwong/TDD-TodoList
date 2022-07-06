import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoApp from "./components/Todo";
import Signup from "./components/Signup/Signup";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TodoApp />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
