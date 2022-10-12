import * as yup from "yup";

export const yupUrl = yup.object().required().shape({
    url: yup.string().required().url(),
});
