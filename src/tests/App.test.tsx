import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
    test("shows correct number of todos when they are added", async() => {
        const user = userEvent.setup()
        //Given
        render(<App />)
        const TEXT = "new todo";
        const textField = screen.getByRole("textbox");
        const addBtn = screen.getByRole("button", {name: "Add"});
        const counter = screen.getByRole("heading", {level: 1})
        //When
        await user.keyboard(TEXT)
        await user.click(addBtn)
        await user.click(textField)
        await user.keyboard(TEXT)
        await user.click(addBtn)
        //Then
        expect(counter).toHaveTextContent("Todos: 2")
    })
    test("shows correct number of todos when deleted", async() => {
        const user = userEvent.setup()
        //Given
        render(<App />)
        const TEXT = "new todo";
        const textField = screen.getByRole("textbox");
        const addBtn = screen.getByRole("button", {name: "Add"});
        const counter = screen.getByRole("heading", {level: 1})
        //When
        await user.keyboard(TEXT)
        await user.click(addBtn)
        await user.click(textField)
        await user.keyboard(TEXT)
        await user.click(addBtn)
        const deleteBtn = screen.getAllByRole("button", {name: "Delete"})[1]
        await user.click(deleteBtn)
        //Then
        expect(counter).toHaveTextContent("Todos: 1")
    })
})