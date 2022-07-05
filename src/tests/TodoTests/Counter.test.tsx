import { render, screen } from "@testing-library/react";
import Counter from "../../components/Todo/Counter";

describe("Counter", () => {
	test("should indicate correct number of todos", () => {
		render(<Counter count={3} />);
		const counterText = screen.getByRole("heading", { level: 1 });
		expect(counterText).toHaveTextContent("Todos: 3");
	});
});
