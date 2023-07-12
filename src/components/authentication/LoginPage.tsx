import { useForm } from "react-hook-form";
import "../../global.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../../models/Model";
import { createUser } from "../../store/features/userSlice";
import { useDispatch } from "react-redux";
import AuthService from "../../apiServices/AuthService";
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

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  // validate login user and get user data on login successully
  const onLoginClick = handleSubmit(async (data: any) => {
    const response = await AuthService.getUserByEmailId(data);
    if (
      response &&
      response.data &&
      response.status === API_Response_Status.OK
    ) {
      dispatch(createUser(response.data));
      toast.success(AuthToastConstants.loginSuccess);
      navigate("/dashboard");
    } else {
      toast.error(AuthToastConstants.invalidCredentials);
    }
  });

  return (
    <div className="container">
      <form onSubmit={onLoginClick} className="form">
        <label htmlFor="email">{Labels.emailLabel}</label>
        <input
          id="email"
          type="text"
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
          {Buttons.loginButton}
        </button>
        <div>
          <span>
            {LinkPageText.RegisterPageText}
            <Link to="/register">{Links.registerLink}</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
