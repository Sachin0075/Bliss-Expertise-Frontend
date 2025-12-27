import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import axios from "axios";

// ---------- mocks ----------

// mock axios
jest.mock("axios");

// mock react-router navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ children }) => <div>{children}</div>,
}));

// mock toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}));

// mock CartContext
const mockSetUserData = jest.fn();
jest.mock("../context/CartContext", () => ({
  useCart: () => ({
    setUserData: mockSetUserData,
  }),
}));

// mock framer-motion (important)
jest.mock("framer-motion", () => ({
  motion: {
    section: ({ children }) => <section>{children}</section>,
    div: ({ children }) => <div>{children}</div>,
    img: (props) => <img {...props} />,
    input: (props) => <input {...props} />,
    button: ({ children, ...rest }) => <button {...rest}>{children}</button>,
    svg: (props) => <svg {...props} />,
  },
}));

// ---------- tests ----------

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form", () => {
    render(<Login />);

    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("user can type email and password", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByLabelText(/your email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  test("successful login navigates to home", async () => {
    const user = userEvent.setup();

    // first API call → verify user
    axios.get.mockResolvedValueOnce({
      data: {
        message: "User verified successfully",
        email: "test@example.com",
      },
    });

    // second API call → user details
    axios.get.mockResolvedValueOnce({
      data: {
        name: "Sachin",
        email: "test@example.com",
        address: "India",
        phone: "1234567890",
        cart: [],
      },
    });

    render(<Login />);

    await user.type(screen.getByLabelText(/your email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(axios.get).toHaveBeenCalled();
    expect(mockSetUserData).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("shows warning toast on invalid login", async () => {
    const user = userEvent.setup();

    axios.get.mockResolvedValueOnce({
      data: {
        message: "Invalid credentials",
      },
    });

    const { toast } = require("react-toastify");

    render(<Login />);

    await user.type(screen.getByLabelText(/your email/i), "wrong@example.com");
    await user.type(screen.getByLabelText(/password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(toast.warning).toHaveBeenCalledWith("Invalid credentials");
  });

  test("shows error toast on API failure", async () => {
    const user = userEvent.setup();

    axios.get.mockRejectedValueOnce(new Error("Network error"));
    const { toast } = require("react-toastify");

    render(<Login />);

    await user.type(screen.getByLabelText(/your email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(toast.error).toHaveBeenCalled();
  });
});
