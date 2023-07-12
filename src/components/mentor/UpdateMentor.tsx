import { useForm } from "react-hook-form";
import { Mentor } from "../../models/Model";
import MentorService from "../../apiServices/MentorService";
import { API_Response_Status } from "../../apiServices/ApiServicesConstants";
import { MentorToastConstants } from "../../constants/mentorFeatures/AuthToastConstants";
import { toast } from "react-toastify";
import {
  Buttons,
  Labels,
  TextErrors,
} from "../../constants/mentorFeatures/MentorTexts";

interface UpdateMentorProps {
  mentorData: Mentor;
  onUpdated: () => void;
  onCancel: () => void;
}

const UpdateMentor: React.FC<UpdateMentorProps> = ({
  mentorData,
  onUpdated,
  onCancel,
}) => {
  const methods = useForm<Mentor>({
    defaultValues: mentorData ?? {
      id: "",
      firstName: "",
      lastName: "",
      age: 18,
      city: "",
      about: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onUpdateClicked = handleSubmit(async (data: Mentor) => {
    const response = await MentorService.updateMentor(data);
    if (
      response &&
      response.data &&
      response.statusText === API_Response_Status.OK
    ) {
      toast.success(MentorToastConstants.mentorUpdateSuccess);
      onUpdated();
    } else {
      toast.error(MentorToastConstants.internalServer);
    }
  });

  return (
    <div className="container">
      <form onSubmit={onUpdateClicked} className="form">
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
          {Buttons.updateButton}
        </button>
        <button type="submit" onClick={onCancel} className="button">
          {Buttons.cancelButton}
        </button>
      </form>
    </div>
  );
};

export default UpdateMentor;
