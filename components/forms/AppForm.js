import React from "react";
import { Formik } from "formik";

//Vastaa html Formia, tämän sisälle tulee input syötteet mitkä voidaan sitten lähettää
function AppForm({ initialValues, onSubmit, validationSchema, onReset, children  }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      onReset={onReset}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
