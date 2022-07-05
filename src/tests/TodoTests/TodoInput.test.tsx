import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoInput from "../../components/Todo/TodoInput";
import TodoApp from "../../components/Todo/Index";

describe("TodoInput textbox", () => {
	test("matches user input", async () => {
		const user = userEvent.setup();
		//Given
		const TEXT = "new todo";
		render(<TodoInput addTodo={() => {}} />);
		//When
		await user.keyboard(TEXT);
		//Then
		const textField = screen.getByRole("textbox");
		expect(textField).toHaveDisplayValue(TEXT);
	});
	test("clears after add button is clicked", async () => {
		const user = userEvent.setup();
		//Given
		render(<TodoInput addTodo={() => {}} />);
		const TEXT = "new todo";
		const addBtn = screen.getByRole("button", { name: "Add" });
		//When
		await user.keyboard(TEXT);
		await user.click(addBtn);
		//Then
		const TextField = screen.getByRole("textbox");
		expect(TextField).toHaveDisplayValue("");
	});
});

describe("TodoInput add button", () => {
	test("creates a new todo on click using textbox value", async () => {
		const user = userEvent.setup();
		//Given
		render(<TodoApp />);
		const TEXT = "new todo";
		const addBtn = screen.getByRole("button", { name: "Add" });
		//When
		await user.keyboard(TEXT);
		await user.click(addBtn);
		//Then
		const todos = screen.getAllByText(TEXT);
		expect(todos.length).toBe(1);
	});
	test("is disabled if textbox is blank", () => {
		//Given
		render(<TodoInput addTodo={() => {}} />);
		const addBtn = screen.getByRole("button", { name: "Add" });
		//Then
		expect(addBtn).toBeDisabled();
	});
	test("is disabled if textbox contains only spaces", async () => {
		const user = userEvent.setup();
		//Given
		render(<TodoInput addTodo={() => {}} />);
		const addBtn = screen.getByRole("button", { name: "Add" });
		const SPACES = "  ";
		//When
		await user.keyboard(SPACES);
		//Then
		expect(addBtn).toBeDisabled();
	});
});
