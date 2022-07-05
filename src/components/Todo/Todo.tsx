interface TodoProps {
	text: string;
	deleteTodo: (todo: string) => void;
}

const Todo = ({ text, deleteTodo }: TodoProps) => {
	const handleClick = (todo: string) => {
		deleteTodo(todo);
	};

	return (
		<div>
			<p>{text}</p>
			<button onClick={() => handleClick(text)}>Delete</button>
		</div>
	);
};

export default Todo;
