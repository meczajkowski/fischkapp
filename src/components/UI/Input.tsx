import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const classNames = [styles.input, props.className].join(' ');

  return (
    <textarea
      value={props.value}
      onChange={props.onChange}
      className={classNames}
    />
  );
};

export default Input;
