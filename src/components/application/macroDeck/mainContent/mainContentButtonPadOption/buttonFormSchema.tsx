import * as yup from "yup";

const ButtonFormSchema = yup.object().shape({
  text: yup.string().label("Text"),
  textColor: yup.string().required().length(7),
  icon: yup.string(),
  iconColor: yup.string().required().length(7),
  image: yup.string(),
  bgColor: yup.string().length(7)
});

export default ButtonFormSchema;
