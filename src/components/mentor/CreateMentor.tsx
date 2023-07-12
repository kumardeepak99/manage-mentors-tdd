import { useForm } from "react-hook-form";
import { Mentor } from "../../models/Model";
import MentorService from "../../apiServices/MentorService";
import { toast } from "react-toastify";
import { MentorToastConstants } from "../../constants/mentorFeatures/AuthToastConstants";
import { API_Response_Status } from "../../apiServices/ApiServicesConstants";
import {
  Buttons,
  Labels,
  TextErrors,
} from "../../constants/mentorFeatures/MentorTexts";
interface CreateMentorProps {
  onCreated: () => void;
  onCancel: () => void;
}

const CreateMentor: React.FC<CreateMentorProps> = ({ onCreated, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Mentor>();

  const onCreateClicked = handleSubmit(async (data: Mentor) => {
    const response = await MentorService.addMentor(data);
    if (
      response &&
      response.data &&
      response.statusText === API_Response_Status.Created
    ) {
      toast.success(MentorToastConstants.mentorCreateSuccess);
      onCreated();
    } else {
      toast.error(MentorToastConstants.internalServer);
    }
  });
  return (
    <div className="container">
      <form onSubmit={onCreateClicked} className="form">
        <label htmlFor="firstName">{Labels.firstNameLabel}</label>
        <input
          id="firstName"
          type="text"
          className="input"
          {...register("firstName", {
            required: TextErrors.firstNameIsRequired,
          })}
        />
        {errors.firstName && (
          <div className="error-message">{errors.firstName.message}</div>
        )}

        <label htmlFor="lastName">{Labels.lastNameLabel}</label>
        <input
          id="lastName"
          type="text"
          className="input"
          {...register("lastName", {
            required: TextErrors.lastNameIsRequired,
          })}
        />
        {errors.lastName && (
          <div className="error-message">{errors.lastName.message}</div>
        )}
        <label htmlFor="age">{Labels.ageLabel}</label>
        <input
          id="age"
          type="number"
          className="input"
          {...register("age", {
            required: TextErrors.ageIsRequired,
            min: 18,
            max: 100,
          })}
        />
        {errors.age && (
          <div className="error-message">{errors.age.message}</div>
        )}
        <label htmlFor="city">{Labels.cityLabel}</label>
        <input
          id="city"
          type="text"
          className="input"
          {...register("city", {
            required: TextErrors.cityIsRequired,
          })}
        />
        {errors.city && (
          <div className="error-message">{errors.city.message}</div>
        )}
        <label htmlFor="about">{Labels.aboutLabel}</label>
        <input
          id="about"
          type="text"
          className="input"
          {...register("about", {
            required: TextErrors.aboutIsRequired,
            minLength: {
              value: 10,
              message: TextErrors.aboutMinLengthIsRequired,
            },
            maxLength: {
              value: 200,
              message: TextErrors.aboutMaxLengthIsRequired,
            },
          })}
        />
        {errors.about && (
          <div className="error-message">{errors.about.message}</div>
        )}
        <button type="submit" className="button">
          {Buttons.createButton}
        </button>
        <button type="submit" onClick={onCancel} className="button">
          {Buttons.cancelButton}
        </button>
      </form>
    </div>
  );
};

export default CreateMentor;
