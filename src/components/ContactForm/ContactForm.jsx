import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from 'react';
import * as Yup from "yup";
import "yup-phone-lite";
import { nanoid } from 'nanoid';
import css from "./ContactForm.module.css" 

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
    number: Yup.string().matches(/^\d{3}-\d{2}-\d{2}$/, 'Phone must be in format 000-00-00').required("Required"),
});

//.phone('UA', 'Invalid Ukrainian phone number') Для валідації номера телефона у форматі UA!

export default function ContactForm({onContact}) {
    const nameFieldId = useId();

    const handleSubmit = (values, actions) => {
        const contactId = {
        id: nanoid(),
        ...values
    };
        onContact(contactId)
        actions.resetForm();
         console.log(contactId);
	};
  return (
    <Formik
      initialValues={{
        name: "",
        number: ""
      }}
       onSubmit={handleSubmit} validationSchema={FeedbackSchema}
    >
          <Form className={css.container}>
            <label htmlFor={`${nameFieldId}-name`}>Name</label>
              <Field className={css.field} type="text" name="name" id={`${nameFieldId}-name`} />
              <ErrorMessage name="name" component="span" />
			<label htmlFor={`${nameFieldId}-number`}>Number</label>
              <Field className={css.field} type="tel" name="number" id={`${nameFieldId}-number`} />
              <ErrorMessage name="number" component="span" />
        <button className={css.btnSubmit} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
