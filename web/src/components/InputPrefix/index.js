import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useField } from '@rocketseat/unform';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export default function InputPrefix({
  name,
  onChange,
  prefix,
  maxLength,
  thousandSeparator,
  suffix,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState();

  useMemo(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <NumberFormat
        id={name}
        prefix={`${prefix} `}
        decimalSeparator=","
        thousandSeparator={thousandSeparator}
        decimalScale={2}
        suffix={suffix}
        ref={ref}
        value={value}
        maxLength={maxLength}
        onValueChange={values => {
          setValue(values.floatValue);
          if (onChange) onChange(values.floatValue);
        }}
        {...rest}
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputPrefix.propTypes = {
  name: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  thousandSeparator: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

InputPrefix.defaultProps = {
  onChange: null,
  prefix: '',
  suffix: '',
  maxLength: 20,
  thousandSeparator: '.',
};
