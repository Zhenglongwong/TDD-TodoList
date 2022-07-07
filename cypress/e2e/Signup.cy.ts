import { faker } from "@faker-js/faker";

describe("Signup", () => {
	const PASSWORD = "12345678";
	const signup = (email: string) => {
		cy.findByRole("textbox", { name: "Email" }).type(email);
		cy.findByRole("textbox", { name: "Password" }).type(PASSWORD);
		cy.findByRole("textbox", { name: "Password Check" }).type(PASSWORD);
		cy.findByRole("button", { name: "Signup" }).click();
	};

	describe("on submit", () => {
		it("should post correct form values", () => {
			cy.intercept("POST", "/api/users", { fixture: "failure.json" }).as("postSignup");
			const EMAIL = faker.internet.email();
			cy.visit("http://localhost:3000/signup");
			signup(EMAIL);
			cy.wait("@postSignup")
				.get("@postSignup")
				.its("request.body")
				.should("deep.equal", {
				email: EMAIL,
				password: PASSWORD,
				passwordCheck: PASSWORD,
			});
		});
	});

	describe("on receiving response", () => {
		it("should show success message if signup is successful", () => {
			cy.intercept("POST", "/api/users", { fixture: "success.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Signup successful!").should("not.exist");
			signup(faker.internet.email());
			cy.findAllByText("Signup successful!").should("exist");
		});

		it("should show failure message if signup is unsuccessful", () => {
			cy.intercept("POST", "/api/users", { fixture: "failure.json" });
			cy.visit("http://localhost:3000/signup");
			cy.findAllByText("Signup failed!").should("not.exist");
			signup(faker.internet.email());
			cy.findAllByText("Signup failed!").should("exist");
		});

		it("should redirect to todoApp if successful", () => {
			cy.intercept("POST", "/api/users", { fixture: "success.json" });
			cy.visit("http://localhost:3000/signup");
			signup(faker.internet.email());
			cy.url().should("be.equal", "http://localhost:3000/");
		});
	});
});
