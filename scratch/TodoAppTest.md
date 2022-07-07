import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup";
import TodoApp from "../../components/Todo";

describe("TodoApp", () => {
	const mockAddTodos = async (
		user: UserEvent,
		btn: HTMLElement,
		textfield: HTMLElement,
		text: string,
		times: number = 1
	) => {
		for (let i = 0; i < times; i++) {
			await user.click(textfield);
			await user.keyboard(text);
			await user.click(btn);
		}
	};
	const mockDeleteTodos = async (user: UserEvent, times: number) => {
		for (let i = 0; i < times; i++) {
			const deleteBtn = screen.getAllByRole("button", { name: "Delete" });
			await user.click(deleteBtn[0]);
		}
	};
	test("shows correct number of todos when they are added", async () => {
		const user = userEvent.setup();
		//Given
		render(<TodoApp />);
		const TEXT = "new todo";
		const textField = screen.getByRole("textbox");
		const addBtn = screen.getByRole("button", { name: "Add" });
		const counter = screen.getByRole("heading", { level: 1 });
		//When
		await mockAddTodos(user, addBtn, textField, TEXT, 2);
		//Then
		expect(counter).toHaveTextContent("Todos: 2");
		await mockDeleteTodos(user, 2);
		expect(counter).toHaveTextContent("Todos: 0");
	});
	test("shows correct number of todos when deleted", async () => {
		const user = userEvent.setup();
		//Given
		render(<TodoApp />);
		const TEXT = "new todo";
		const textField = screen.getByRole("textbox");
		const addBtn = screen.getByRole("button", { name: "Add" });
		const counter = screen.getByRole("heading", { level: 1 });
		//When
		await mockAddTodos(user, addBtn, textField, TEXT, 2);
		expect(counter).toHaveTextContent("Todos: 2");
		await mockDeleteTodos(user, 1);
		//Then
		expect(counter).toHaveTextContent("Todos: 1");
	});
});
