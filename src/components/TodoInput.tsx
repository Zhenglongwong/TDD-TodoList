import { useState } from "react";

interface TodoInputProps {
	addTodo: (todo: string) => void;
}

const TodoInput = ({ addTodo }: TodoInputProps) => {
	const [Todo, setTodo] = useState("");

	const handleChange = (event: { target: HTMLInputElement }) => {
		setTodo(event.target.value);
	};

	const handleSubmit = (event: { preventDefault: () => void }, todo: string) => {
		event.preventDefault();
		addTodo(todo);
		setTodo("");
	};

	const isEmpty = (todo: string) => {
		if (todo === "" || todo.match(/^\s+/)) {
			return true;
		}
		return false;
	};

	return (
		<form onSubmit={(e) => handleSubmit(e, Todo)}>
			<label htmlFor="todo">
				Add Todo:
				<input type="text" name="todo" value={Todo} onChange={(e) => handleChange(e)} autoFocus />
			</label>
			<button type="submit" disabled={isEmpty(Todo)}>
				Add
			</button>
		</form>
	);
};

export default TodoInput;
