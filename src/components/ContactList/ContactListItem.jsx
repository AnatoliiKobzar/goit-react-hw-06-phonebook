import { useState } from 'react';
import { Button } from 'components/ContactForm/ContactForm.styled';
import { ButtonsWrap, Contact, Info, Wrap } from './ContactList.styled';
import PropTypes from 'prop-types';
import { SlUserUnfollow, SlPhone, SlSocialGithub } from 'react-icons/sl';
import { FiEdit3 } from 'react-icons/fi';
import { BsCheck2Circle } from 'react-icons/bs';
import { Modal } from 'components/Modal/Modal';
import { Formik, Field } from 'formik';
import {
  ErrorMessage,
  Form,
  FormField,
} from '../ContactForm/ContactForm.styled';
import * as Yup from 'yup';

const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){3,14}(\s*)?$/;

const FornSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short Name!')
    .max(20, 'Too Long Name!')
    .required('Required'),
  number: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
});

export const ContactListItem = ({ contact, onDelete, editContact }) => {
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Contact key={contact.id}>
      {isOpenModal && (
        <Modal>
          <Formik
            initialValues={{
              name,
              number,
            }}
            onSubmit={values => {
              setName(values.name);
              setNumber(values.number);
              editContact({
                id: contact.id,
                name: values.name,
                number: values.number,
              });
              closeModal();
            }}
            validationSchema={FornSchema}
          >
            <Form>
              <FormField>
                Name
                <Field name="name" type="text" autoComplete="off" />
                <ErrorMessage name="name" component="div" />
              </FormField>
              <FormField>
                Number
                <Field name="number" type="text" autoComplete="off" />
                <ErrorMessage name="number" component="div" />
              </FormField>
              <Button type="submit">
                <BsCheck2Circle size="18px" />
                Save changes
              </Button>
            </Form>
          </Formik>
        </Modal>
      )}
      <Wrap>
        <Info>
          <SlSocialGithub size="20px" />
          {contact.name}:
        </Info>
        <Info>
          <SlPhone size="20px" />
          {contact.number}
        </Info>
      </Wrap>
      <ButtonsWrap>
        <Button
          type="button"
          onClick={() => {
            onDelete(contact.id);
          }}
        >
          <SlUserUnfollow size="18px" />
        </Button>
        <Button type="button" onClick={openModal}>
          <FiEdit3 size="18px" />
        </Button>
      </ButtonsWrap>
    </Contact>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,
};
