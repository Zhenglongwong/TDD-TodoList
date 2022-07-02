import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "../components/Todo";
import App from "../App";

describe("todo", () => {
	test("should display text passed to the text prop", () => {
		//Given
		const TEXT = "hello world";
		render(<Todo text={TEXT} deleteTodo={() => {}} />);
		//Then
		const todo = screen.getByText(TEXT);
		expect(todo).toHaveTextContent(TEXT);
	});
	test("should be removed when delete button is pressed", async () => {
		const user = userEvent.setup();
		//Given
		const TEXT = "hello world";
		render(<App />);
		const addBtn = screen.getByRole("button", { name: "Add" });
		await user.keyboard(TEXT);
		await user.click(addBtn);
		const todo = screen.getByText(TEXT);
		const deleteBtn = screen.getByRole("button", { name: "Delete" });
		//When
		await user.click(deleteBtn);
		//Then
		expect(todo).not.toBeInTheDocument();
	});
});
