import { faker } from "@faker-js/faker";

describe("Signup", () => {
    const signup = () => {
        cy.findAllByText("Signup failed!").should("not.exist");
        cy.findAllByText("Signup successful!").should('not.exist')
        cy.findByRole("textbox", { name: "Email" }).type(faker.internet.email());
        cy.findByRole("textbox", { name: "Password" }).type("12345678");
        cy.findByRole("textbox", { name: "Password Check" }).type("12345678");
        cy.findByRole("button", {name: "Signup"}).click();
    }
	describe("on receiving response", () => {
		it("should show success alert if signup is successful", () => {
			cy.intercept("POST", "/api/users", { fixture: "success.json" });
		    cy.visit("http://localhost:3000/signup");
		    signup()
		    cy.findAllByText("Signup successful!").should('exist')
		});

		it("should show failure message if signup is unsuccessful", () => {
			cy.intercept("POST", "/api/users", { fixture: "failure.json" });
			cy.visit("http://localhost:3000/signup");
            signup()
			cy.findAllByText("Signup failed!").should("exist");
		});
	});
});
