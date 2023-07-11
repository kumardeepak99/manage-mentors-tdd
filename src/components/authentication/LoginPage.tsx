import { useForm } from "react-hook-form";
import "../../global.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../../models/Model";
import { createUser } from "../../store/features/userSlice";
import { useDispatch } from "react-redux";
import AuthService from "../../apiServices/AuthService";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  // validate login user and get user data on login successully
  const onLoginSubmit = handleSubmit(async (data: any) => {
    const response = await AuthService.getUserByEmail(data); //await AuthService.getUserByEmailId(data);
    if (response && response.data) {
      dispatch(createUser(response.data));
      alert("LoggedIn successfully !!");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials Or user does not exist, please try again.");
    }
  });

  return (
    <div className="container">
      <form onSubmit={onLoginSubmit} className="form">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          className="input"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Email should be in format: deepak@example.com",
            },
          })}
        />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          className="input"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least 1 number, lowercase, uppercase and special letter",
            },
          })}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}

        <button type="submit" className="button">
          Login
        </button>
        <div>
          <span>
            Don't have an account?
            <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
