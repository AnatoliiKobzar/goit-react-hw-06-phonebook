import { FormField } from 'components/ContactForm/ContactForm.styled';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterValue } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

export const Filter = () => {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handelSetFilter = event => {
    dispatch(setFilterValue(event.target.value));
  };

  return (
    <FormField>
      Find contacts by name
      <input type="text" value={value} onChange={handelSetFilter} />
    </FormField>
  );
};
