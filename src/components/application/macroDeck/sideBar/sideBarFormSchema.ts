import * as yup from "yup";

const sideBarFormSchema = yup.object().shape({
  profileName: yup.string().required().min(3).label("The Profile Name"),
  buttonPads: yup.number().required().positive().integer()
});

export default sideBarFormSchema;
