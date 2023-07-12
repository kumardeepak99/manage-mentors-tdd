import { useForm } from "react-hook-form";
import "../../global.css";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../models/Model";
import AuthService from "../../apiServices/AuthService";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/features/userSlice";
import {
  Buttons,
  Labels,
  LinkPageText,
  Links,
  TextErrors,
} from "../../constants/authFroms/AuthenticationText";
import { API_Response_Status } from "../../apiServices/ApiServicesConstants";
import { toast } from "react-toastify";
import { AuthToastConstants } from "../../constants/authFroms/ToastConstants";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  // create user and get user data on user creation succesfully
  const onRegisterClick = handleSubmit(async (data: any) => {
    let req = {
      name: data.name,
      email: data.email,
    };
    const response = await AuthService.addUser(req);
    if (
      response &&
      response.data &&
      response.statusText === API_Response_Status.Created
    ) {
      dispatch(createUser(response.data));
      toast.success(AuthToastConstants.registerSuccess);
      navigate("/dashboard");
    } else {
      toast.error(AuthToastConstants.internalServer);
    }
  });

  return (
    <div className="container">
      <form onSubmit={onRegisterClick} className="form">
        <label htmlFor="name">{Labels.nameLabel}</label>
        <input
          id="name"
          type="text"
          className="input"
          {...register("name", {
            required: TextErrors.nameIsRequired,
          })}
        />
        {errors.name && (
          <div className="error-message">{errors.name.message}</div>
        )}

        <label htmlFor="email">{Labels.emailLabel}</label>
        <input
          id="email"
          type="email"
          className="input"
          {...register("email", {
            required: TextErrors.emailIsRequired,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: TextErrors.invalidEmailFormat,
            },
          })}
        />
        {errors.email && (
          <div className="error-message">{errors.email.message}</div>
        )}

        <label htmlFor="password">{Labels.passwordLabel}</label>
        <input
          id="password"
          type="password"
          className="input"
          {...register("password", {
            required: TextErrors.passwordIsRequired,
            minLength: {
              value: 8,
              message: TextErrors.passwordLengthError,
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: TextErrors.passwordTypeError,
            },
          })}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}

        <button type="submit" className="button">
          {Buttons.registerButton}
        </button>
        <div>
          <span>
            {LinkPageText.LoginPageText}
            <Link to="/login">{Links.loginLink}</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
