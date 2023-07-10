import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../../../../components/authentication/LoginPage";
import { AuthenticationTestConstants } from "../../../__utils__/TestConstants";
import userEvent from "@testing-library/user-event";
import { AuthenticationFakeData } from "../../../__fixture__/auth/authentication";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../../../apiServices/AuthService", () => ({
  getUserByEmailId: jest.fn(),
}));

describe("Login Page component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<LoginPage />, {
      wrapper: MemoryRouter,
    });
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

  it("should have a login button", () => {
    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });
    expect(loginButtonElement).toBeInTheDocument();
  });

  it("should have text for register page", () => {
    const registerText = screen.getByText(
      AuthenticationTestConstants.RegisterPageText
    );
    expect(registerText).toBeInTheDocument();
  });

  it("should renders a link to register page", () => {
    const registerLink = screen.getByRole("link", {
      name: AuthenticationTestConstants.registerLink,
    });

    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute("href")).toBe("/register");
  });
});

describe("Email validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<LoginPage />, {
      wrapper: MemoryRouter,
    });
  });

  it("should display 'Email is required' when email is not provided", async () => {
    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });
    await act(async () => {
      userEvent.click(loginButtonElement);
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

    // fireEvent.change(emailElement, { target: { incorrectEmail } });
    // //screen.debug();   for debbuging the screen content
    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });

    await act(async () => {
      userEvent.click(loginButtonElement);
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
    render(<LoginPage />, {
      wrapper: MemoryRouter,
    });
  });

  it("should display 'Password is required' when password is not provided", async () => {
    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });
    await act(async () => {
      userEvent.click(loginButtonElement);
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

    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });

    await act(async () => {
      userEvent.click(loginButtonElement);
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

    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });

    await act(async () => {
      userEvent.click(loginButtonElement);
    });

    const passwordErrorElement = await screen.findByText(
      AuthenticationTestConstants.passwordTypeError
    );
    expect(passwordErrorElement).toBeInTheDocument();
  });
});

describe("form with valid email and password should not have any error", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: jest.fn(),
    }));

    render(<LoginPage />, { wrapper: MemoryRouter });
  });

  it("shoud not display any password related error", async () => {
    const passwordElement = screen.getByLabelText(
      AuthenticationTestConstants.passwordLabel
    );

    // creating hard coded password as regx is not well supported in faker
    // https://github.com/bchavez/Bogus/issues/219
    fireEvent.change(passwordElement, {
      target: { value: "Deepak@123456" },
    });

    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });

    act(() => userEvent.click(loginButtonElement));

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

  it("shoud not display any email related error", async () => {
    const emailElement = screen.getByLabelText(
      AuthenticationTestConstants.emailLabel
    );

    fireEvent.change(emailElement, {
      target: { value: "Deepak@gamil.com" },
    });

    const loginButtonElement = screen.getByRole("button", {
      name: AuthenticationTestConstants.loginButton,
    });

    act(() => userEvent.click(loginButtonElement));

    const emailIsRequiredErrorElement = screen.queryByText(
      AuthenticationTestConstants.emailIsRequired
    );

    const invalidEmailFormatErrorElement = screen.queryByText(
      AuthenticationTestConstants.invalidEmailFormat
    );
    expect(emailIsRequiredErrorElement).not.toBeInTheDocument();
    expect(invalidEmailFormatErrorElement).not.toBeInTheDocument();
  });
});
