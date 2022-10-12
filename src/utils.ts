import * as yup from "yup";

export const yupUrl = yup.string().required().url();
