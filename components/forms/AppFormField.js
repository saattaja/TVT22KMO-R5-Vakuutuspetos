import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";

//vastaa html inputtia, voi määritellä minkälaisesta inputista on kyse, tulostaa error viestin myös tarvittaessa
function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={text => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;

