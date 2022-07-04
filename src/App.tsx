import { useMemo, useState } from "react";
import TodoInput from "./components/TodoInput";
import Todo from "./components/Todo";

const App: React.FC = () => {
	const [TodoList, setTodoList] = useState<string[]>([]);

	const addTodo = (todo: string) => {
		setTodoList([...TodoList, todo]);
	};

	const deleteTodo = (todo: string) => {
		const deleteIndex = todo.indexOf(todo);
		setTodoList((TodoList) => {
			return TodoList.slice(0, deleteIndex).concat(TodoList.slice(deleteIndex + 1));
		});
	};
	
	//potentially dangerous
	const [numTodos, Todos] = useMemo(
		() => [
			TodoList.length,
			TodoList.map((todo, i) => <Todo key={i} text={todo} deleteTodo={deleteTodo} />),
		],
		[TodoList]
	);

	return (
		<div className="App">
			<h1>{`Todos: ${numTodos}`}</h1>
			<TodoInput addTodo={addTodo} />
			{Todos}
		</div>
	);
};

export default App;
