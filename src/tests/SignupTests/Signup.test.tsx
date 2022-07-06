import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../../components/Signup/Signup";
// import axios from "axios";

describe("Signup", () => {
	const getEleByRole = (role: string, name: string): HTMLElement => {
		return screen.getByRole(role, { name: name });
	};

	describe("user interface should have", () => {
		test("email field field", () => {
			render(<Signup />);
			expect(getEleByRole("textbox", "Email")).toBeInTheDocument();
		});
		test("password field", () => {
			render(<Signup />);
			expect(getEleByRole("textbox", "Password")).toBeInTheDocument();
		});
		test("password check field", () => {
			render(<Signup />);
			expect(getEleByRole("textbox", "Password Check")).toBeInTheDocument();
		});
		test("signup button", () => {
			render(<Signup />);
			expect(getEleByRole("button", "Signup")).toBeInTheDocument();
		});
	});

	describe("email field should show error message if", () => {
		test("touched and blank", async () => {
			const user = userEvent.setup();
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Email"));
			await user.click(getEleByRole("textbox", "Password"));

			const errorMsg = await screen.findByText("Email is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("touched and not a valid email string", async () => {
			const user = userEvent.setup();
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Email"));
			await user.keyboard("howdy");
			await user.click(getEleByRole("textbox", "Password"));

			const errorMsg = await screen.findByText("Invalid email address", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
	});

	describe("Password field should show error message if", () => {
		test("touched and blank", async () => {
			const user = userEvent.setup();
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Password"));
			await user.click(getEleByRole("textbox", "Email"));

			const errorMsg = await screen.findByText("Password is required", {}, { timeout: 50 });
			expect(errorMsg).toBeInTheDocument();
		});
		test("touched and less than 8 characters", async () => {
			const user = userEvent.setup();
			render(<Signup />);

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

	describe("Password field check should show error message if", () => {
		test("touched and blank", async () => {
			const user = userEvent.setup();
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Password Check"));
			await user.click(getEleByRole("textbox", "Email"));

			const errorMsg = await screen.findByText(
				"Please enter your password again",
				{},
				{ timeout: 50 }
			);
			expect(errorMsg).toBeInTheDocument();
		});
		test("touched and not equal to password field", async () => {
			const user = userEvent.setup();
			render(<Signup />);

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
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Email"));
			await user.keyboard("asdfasd");

			expect(getEleByRole("button", "Signup")).toBeDisabled();
		});
		test("disabled if password field is wrong", async () => {
			const user = userEvent.setup();
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Password"));
			await user.keyboard("123456");
			await user.click(getEleByRole("textbox", "Email"));

			expect(getEleByRole("button", "Signup")).toBeDisabled();
		});
		test("disabled if password check field is wrong", async () => {
			const user = userEvent.setup();
			render(<Signup />);

			await user.click(getEleByRole("textbox", "Password"));
			await user.keyboard("123456733");
			await user.click(getEleByRole("textbox", "Password Check"));
			await user.keyboard("123456344");
			await user.click(getEleByRole("textbox", "Password"));
			expect(getEleByRole("button", "Signup")).toBeDisabled();
		});
		// test.todo("will send get request with form values");
	});
	// describe("on receiving response", () => {
    //     test.todo("will show success alert message if successful", async () => {
    //         render(<Signup />);
	// 		jest.mock("axios");
	// 		const mockedAxios = axios as jest.Mocked<typeof axios>;
	// 		mockedAxios.get.mockResolvedValue({
	// 			data: {
	// 				status: "success",
	// 			},
    //         });
            


	// 	});
	// 	test.todo("will show failure alert message if unsuccessful");
	// });
});
