import { faker } from "@faker-js/faker";

describe("Todo App", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
  });
  
	const NUMTODOS = 3;
	const addTodos = (times: number) => {
		for (let i = 0; i < times; i++) {
			cy.findByRole("textbox").type(faker.word.noun());
			cy.findByRole("button", { name: "Add" }).click();
		}
	};

	it("shows correct number of added todos", () => {
		addTodos(NUMTODOS);
    cy.findAllByRole("button", { name: "Delete" })
	});

	it("counter shows correct number of added todos", () => {
		addTodos(NUMTODOS);
		cy.findByRole("heading", { level: 1 }).should("have.text", `Todos: ${NUMTODOS}`);
	});

	it("shows correct number of todos after a deletion", () => {
		addTodos(NUMTODOS);
		cy.findAllByRole("button", { name: "Delete" }).first().click();
		cy.findAllByRole("button", { name: "Delete" }).should("have.length", NUMTODOS - 1);
  });
  
  it("counter shows correct number of todos after a deletion", () => {
		addTodos(NUMTODOS);
		cy.findAllByRole("button", { name: "Delete" }).first().click();
		cy.findByRole("heading", { level: 1 }).should("have.text", `Todos: ${NUMTODOS - 1}`);
	});
});
