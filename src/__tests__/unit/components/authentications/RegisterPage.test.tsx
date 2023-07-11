import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { AuthenticationFakeData } from "../../../__fixture__/auth/authentication";
import RegisterPage from "../../../../components/authentication/RegisterPage";
import {
  Buttons,
  Labels,
  LinkPageText,
  Links,
  TextErrors,
} from "../../../__utils__/TestConstants";
import { toast } from "react-toastify";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../../../apiServices/AuthService", () => ({
  addUser: jest.fn(),
}));

describe("Register Page component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<RegisterPage />, {
      wrapper: MemoryRouter,
    });
  });

  it("should have a name field", () => {
    const nameElement = screen.getByLabelText(Labels.nameLabel);

    expect(nameElement).toBeInTheDocument();
  });

  it("should have an email input field", () => {
    const emailElement = screen.getByLabelText(Labels.emailLabel);

    expect(emailElement).toBeInTheDocument();
  });

  it("should have a password input field", () => {
    const passwordElement = screen.getByLabelText(Labels.passwordLabel);
    expect(passwordElement).toBeInTheDocument();
  });

  it("should have a register button", () => {
    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });
    expect(registerButtonElement).toBeInTheDocument();
  });

  it("should have text for login page", () => {
    const loginText = screen.getByText(LinkPageText.LoginPageText);
    expect(loginText).toBeInTheDocument();
  });

  it("should renders a link to login page", () => {
    const loginLink = screen.getByRole("link", {
      name: Links.loginLink,
    });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute("href")).toBe("/login");
  });
});

describe("Name validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<RegisterPage />, {
      wrapper: MemoryRouter,
    });
  });
  it("should display 'Name is required' when name is not provided", async () => {
    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    await userEvent.click(registerButtonElement);
    const nameErrorElement = await screen.findByText(TextErrors.nameIsRequired);
    expect(nameErrorElement).toBeInTheDocument();
  });
});

describe("Email validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<RegisterPage />, {
      wrapper: MemoryRouter,
    });
  });

  it("should display 'Email is required' when email is not provided", async () => {
    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });
    await act(async () => {
      userEvent.click(registerButtonElement);
    });
    const emailErrorElement = await screen.findByText(
      TextErrors.emailIsRequired
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  it("shoud display an error for invalid email format", async () => {
    const emailElement = screen.getByLabelText(Labels.emailLabel);

    fireEvent.change(emailElement, {
      target: { value: AuthenticationFakeData.invalidEmail },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    await act(async () => {
      userEvent.click(registerButtonElement);
    });

    const emailErrorElement = await screen.findByText(
      TextErrors.invalidEmailFormat
    );
    expect(emailErrorElement).toBeInTheDocument();
  });
});

describe("Password validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<RegisterPage />, {
      wrapper: MemoryRouter,
    });
  });

  it("should display 'Password is required' when password is not provided", async () => {
    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });
    await act(async () => {
      userEvent.click(registerButtonElement);
    });
    const emailErrorElement = await screen.findByText(
      TextErrors.passwordIsRequired
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  it("shoud display an error when password is less than 8 characters", async () => {
    const passwordElement = screen.getByLabelText(Labels.passwordLabel);

    fireEvent.change(passwordElement, {
      target: { value: AuthenticationFakeData.shortPassword },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    await act(async () => {
      userEvent.click(registerButtonElement);
    });

    const passwordErrorElement = await screen.findByText(
      TextErrors.passwordLengthError
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });

  it("shoud display an error when password does not follow specified format", async () => {
    const passwordElement = screen.getByLabelText(Labels.passwordLabel);

    fireEvent.change(passwordElement, {
      target: { value: AuthenticationFakeData.invalidPassword },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    await act(async () => {
      userEvent.click(registerButtonElement);
    });

    const passwordErrorElement = await screen.findByText(
      TextErrors.passwordTypeError
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });
});

describe("form with valid name, email and password should not have any error", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: jest.fn(),
    }));

    render(<RegisterPage />, { wrapper: MemoryRouter });
  });

  it("should not display name related error", () => {
    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    userEvent.click(registerButtonElement);

    const nameErrorElement = screen.queryByText(TextErrors.nameIsRequired);
    expect(nameErrorElement).not.toBeInTheDocument();
  });

  it("shoud not display any email related error", () => {
    const emailElement = screen.getByLabelText(Labels.emailLabel);

    fireEvent.change(emailElement, {
      target: { value: "Deepak@gamil.com" },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    userEvent.click(registerButtonElement);

    const emailIsRequiredErrorElement = screen.queryByText(
      TextErrors.emailIsRequired
    );

    const invalidEmailFormatErrorElement = screen.queryByText(
      TextErrors.invalidEmailFormat
    );
    expect(emailIsRequiredErrorElement).not.toBeInTheDocument();
    expect(invalidEmailFormatErrorElement).not.toBeInTheDocument();
  });

  it("shoud not display any password related error", async () => {
    const passwordElement = screen.getByLabelText(Labels.passwordLabel);
    fireEvent.change(passwordElement, {
      target: { value: "Deepak@123456" },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: Buttons.registerButton,
    });

    act(() => userEvent.click(registerButtonElement));

    const passwordIsRequiredErrorElement = screen.queryByText(
      TextErrors.passwordIsRequired
    );
    const passwordLengthErrorElement = screen.queryByText(
      TextErrors.passwordLengthError
    );

    const passwordTypeErrorElement = screen.queryByText(
      TextErrors.passwordTypeError
    );
    expect(passwordIsRequiredErrorElement).not.toBeInTheDocument();
    expect(passwordLengthErrorElement).not.toBeInTheDocument();
    expect(passwordTypeErrorElement).not.toBeInTheDocument();
  });
});
