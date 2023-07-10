import { useForm } from "react-hook-form";
import "../../global.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../models/Model";
import AuthService from "../../apiServices/AuthService";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/features/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  // create user and get user data on user creation succesfully
  const onSubmit = handleSubmit(async (data: any) => {
    let req = {
      name: data.name,
      email: data.email,
    };
    const response = await AuthService.addUser(req);
    if (response && response.status === 201) {
      // console.log(response.data);
      dispatch(createUser(response.data));
      alert("Registered successfully !!");
      navigate("/dashboard");
    } else {
      alert("Something went wrong while creating user, please try again.");
    }
  });

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="form">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          className="input"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && (
          <div className="error-message">{errors.name.message}</div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
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
          Register
        </button>
        <div>
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
