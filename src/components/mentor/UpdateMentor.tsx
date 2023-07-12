import { useForm } from "react-hook-form";
import { Mentor } from "../../models/Model";
import MentorService from "../../apiServices/MentorService";
import { API_Response_Status } from "../../apiServices/ApiServicesConstants";
import { MentorToastConstants } from "../../constants/mentorFeatures/AuthToastConstants";
import { toast } from "react-toastify";

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

  const onSubmit = handleSubmit(async (data: Mentor) => {
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
      <form onSubmit={onSubmit} className="form">
        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          className="input"
          {...register("firstName", {
            required: "First name is required",
          })}
        />
        {errors.firstName && (
          <div className="error-message">{errors.firstName.message}</div>
        )}

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          className="input"
          {...register("lastName", {
            required: "Last name is required",
          })}
        />
        {errors.lastName && (
          <div className="error-message">{errors.lastName.message}</div>
        )}
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          className="input"
          {...register("age", {
            required: "Age can not be empty",
            min: 18,
            max: 100,
          })}
        />
        {errors.age && (
          <div className="error-message">{errors.age.message}</div>
        )}
        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          className="input"
          {...register("city", {
            required: "City is required",
          })}
        />
        {errors.city && (
          <div className="error-message">{errors.city.message}</div>
        )}
        <label htmlFor="about">About:</label>
        <input
          id="about"
          type="text"
          className="input"
          {...register("about", {
            required: "About is required",
            minLength: {
              value: 10,
              message: "About should be at least 10 characters long",
            },
            maxLength: {
              value: 200,
              message: "About can be at max 200 characters long",
            },
          })}
        />
        {errors.about && (
          <div className="error-message">{errors.about.message}</div>
        )}
        <button type="submit" className="button">
          Update
        </button>
        <button type="submit" onClick={onCancel} className="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateMentor;
