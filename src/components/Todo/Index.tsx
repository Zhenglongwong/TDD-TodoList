import { useMemo, useState } from "react";
import TodoInput from "./TodoInput"
import Todo from "./Todo"
import Counter from "./Counter"

const TodoApp = () => {
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
		<>
			<Counter count={numTodos} />
			<TodoInput addTodo={addTodo} />
			{Todos}
		</>
	);
};

export default TodoApp;
