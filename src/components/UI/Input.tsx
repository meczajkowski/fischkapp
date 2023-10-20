import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const classNames = [styles.input, props.className].join(' ');

  return (
    <input
      value={props.value}
      onChange={props.onChange}
      className={classNames}
      type='text'
    />
  );
};

export default Input;
