import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../../components/Signup/Signup";
import {BrowserRouter as Router} from 'react-router-dom'

describe("Signup", () => {
	const getEleByRole = (role: string, name: string): HTMLElement => {
		return screen.getByRole(role, { name: name });
	};
	describe("user interface should have", () => {
		test("email field", () => {
			render(<Router><Signup /></Router>)
			expect(getEleByRole("textbox", "Email")).toBeInTheDocument();
		});
		test("password field", () => {
			render(<Router><Signup /></Router>);
			expect(getEleByRole("textbox", "Password")).toBeInTheDocument();
		});
		test("password check field", () => {
			render(<Router><Signup /></Router>);
			expect(getEleByRole("textbox", "Password Check")).toBeInTheDocument();
		});
		test("signup button", () => {
			render(<Router><Signup /></Router>);
			expect(getEleByRole("button", "Signup")).toBeInTheDocument();
		});
	});

	describe("email field should show error message if", () => {
		test("clicked and blank", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Email"));
			await user.click(getEleByRole("textbox", "Password"));

			const errorMsg = await screen.findByText("Email is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and not a valid email string", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Email"));
			await user.keyboard("howdy");
			await user.click(getEleByRole("textbox", "Password"));

			const errorMsg = await screen.findByText("Invalid email address", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
	});

	describe("password field should show error message if", () => {
		test("clicked and blank", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Password"));
			await user.click(getEleByRole("textbox", "Email"));

			const errorMsg = await screen.findByText("Password is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and less than 8 characters", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Password"));
			await user.keyboard("1234567");
			await user.click(getEleByRole("textbox", "Email"));

			const errorMsg = await screen.findByText(
				"Password must be at least 8 characters",
				{},
				{ timeout: 50 }
			);
			expect(errorMsg).toBeInTheDocument();
		});
	});

	describe("password check field should show error message if", () => {
		test("clicked and blank", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Password Check"));
			await user.click(getEleByRole("textbox", "Email"));

			const errorMsg = await screen.findByText(
				"Please enter your password again",
				{},
				{ timeout: 50 }
			);
			expect(errorMsg).toBeInTheDocument();
		});
		test("clicked and not equal to password field", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Password"));
			await user.keyboard("123456733");
			await user.click(getEleByRole("textbox", "Password Check"));
			await user.keyboard("123456344");
			await user.click(getEleByRole("textbox", "Password"));

			const errorMsg = await screen.findByText("Passwords must match", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
	});

	describe("button", () => {
		test("disabled if email field is wrong", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Email"));
			await user.keyboard("asdfasd");

			expect(getEleByRole("button", "Signup")).toBeDisabled();
		});
		test("disabled if password field is wrong", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Password"));
			await user.keyboard("123456");
			await user.click(getEleByRole("textbox", "Email"));

			expect(getEleByRole("button", "Signup")).toBeDisabled();
		});
		test("disabled if password check field is wrong", async () => {
			const user = userEvent.setup();
			render(<Router><Signup /></Router>);

			await user.click(getEleByRole("textbox", "Password"));
			await user.keyboard("123456733");
			await user.click(getEleByRole("textbox", "Password Check"));
			await user.keyboard("123456344");
			await user.click(getEleByRole("textbox", "Password"));
			expect(getEleByRole("button", "Signup")).toBeDisabled();
		});
	});
});
