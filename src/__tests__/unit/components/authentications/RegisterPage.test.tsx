import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthenticationTestConstants } from "../../../__utils__/TestConstants";
import userEvent from "@testing-library/user-event";
import { AuthenticationFakeData } from "../../../__fixture__/auth/authentication";
import RegisterPage from "../../../../components/authentication/RegisterPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
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
    const nameElement = screen.getByLabelText(
      AuthenticationTestConstants.nameLabel
    );

    expect(nameElement).toBeInTheDocument();
  });

  it("should have an email input field", () => {
    const emailElement = screen.getByLabelText(
      AuthenticationTestConstants.emailLabel
    );

    expect(emailElement).toBeInTheDocument();
  });

  it("should have a password input field", () => {
    const passwordElement = screen.getByLabelText(
      AuthenticationTestConstants.passwordLabel
    );
    expect(passwordElement).toBeInTheDocument();
  });

  it("should have a register button", () => {
    const registerButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.registerButton,
    });
    expect(registerButtonElement).toBeInTheDocument();
  });

  it("should have text for login page", () => {
    const loginText = screen.getByText(
      AuthenticationTestConstants.LoginPageText
    );
    expect(loginText).toBeInTheDocument();
  });

  it("should renders a link to login page", () => {
    const loginLink = screen.getByRole("link", {
      name: AuthenticationTestConstants.loginLink,
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
      name: AuthenticationTestConstants.registerButton,
    });

    await userEvent.click(registerButtonElement);
    const nameErrorElement = await screen.findByText(
      AuthenticationTestConstants.nameIsRequired
    );
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
      name: AuthenticationTestConstants.registerButton,
    });
    await act(async () => {
      userEvent.click(registerButtonElement);
    });
    const emailErrorElement = await screen.findByText(
      AuthenticationTestConstants.emailIsRequired
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  it("shoud display an error for invalid email format", async () => {
    const emailElement = screen.getByLabelText(
      AuthenticationTestConstants.emailLabel
    );

    fireEvent.change(emailElement, {
      target: { value: AuthenticationFakeData.invalidEmail },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.registerButton,
    });

    await act(async () => {
      userEvent.click(registerButtonElement);
    });

    const emailErrorElement = await screen.findByText(
      AuthenticationTestConstants.invalidEmailFormat
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
      name: AuthenticationTestConstants.registerButton,
    });
    await act(async () => {
      userEvent.click(registerButtonElement);
    });
    const emailErrorElement = await screen.findByText(
      AuthenticationTestConstants.passwordIsRequired
    );
    expect(emailErrorElement).toBeInTheDocument();
  });

  it("shoud display an error when password is less than 8 characters", async () => {
    const passwordElement = screen.getByLabelText(
      AuthenticationTestConstants.passwordLabel
    );

    fireEvent.change(passwordElement, {
      target: { value: AuthenticationFakeData.shortPassword },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.registerButton,
    });

    await act(async () => {
      userEvent.click(registerButtonElement);
    });

    const passwordErrorElement = await screen.findByText(
      AuthenticationTestConstants.passwordLengthError
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });

  it("shoud display an error when password does not follow specified format", async () => {
    const passwordElement = screen.getByLabelText(
      AuthenticationTestConstants.passwordLabel
    );

    fireEvent.change(passwordElement, {
      target: { value: AuthenticationFakeData.invalidPassword },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.registerButton,
    });

    await act(async () => {
      userEvent.click(registerButtonElement);
    });

    const passwordErrorElement = await screen.findByText(
      AuthenticationTestConstants.passwordTypeError
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
      name: AuthenticationTestConstants.registerButton,
    });

    userEvent.click(registerButtonElement);

    const nameErrorElement = screen.queryByText(
      AuthenticationTestConstants.nameIsRequired
    );
    expect(nameErrorElement).not.toBeInTheDocument();
  });

  it("shoud not display any email related error", () => {
    const emailElement = screen.getByLabelText(
      AuthenticationTestConstants.emailLabel
    );

    fireEvent.change(emailElement, {
      target: { value: "Deepak@gamil.com" },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.registerButton,
    });

    userEvent.click(registerButtonElement);

    const emailIsRequiredErrorElement = screen.queryByText(
      AuthenticationTestConstants.emailIsRequired
    );

    const invalidEmailFormatErrorElement = screen.queryByText(
      AuthenticationTestConstants.invalidEmailFormat
    );
    expect(emailIsRequiredErrorElement).not.toBeInTheDocument();
    expect(invalidEmailFormatErrorElement).not.toBeInTheDocument();
  });

  it("shoud not display any password related error", async () => {
    const passwordElement = screen.getByLabelText(
      AuthenticationTestConstants.passwordLabel
    );
    fireEvent.change(passwordElement, {
      target: { value: "Deepak@123456" },
    });

    const registerButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.registerButton,
    });

    act(() => userEvent.click(registerButtonElement));

    const passwordIsRequiredErrorElement = screen.queryByText(
      AuthenticationTestConstants.passwordIsRequired
    );
    const passwordLengthErrorElement = screen.queryByText(
      AuthenticationTestConstants.passwordLengthError
    );

    const passwordTypeErrorElement = screen.queryByText(
      AuthenticationTestConstants.passwordTypeError
    );
    expect(passwordIsRequiredErrorElement).not.toBeInTheDocument();
    expect(passwordLengthErrorElement).not.toBeInTheDocument();
    expect(passwordTypeErrorElement).not.toBeInTheDocument();
  });
});
