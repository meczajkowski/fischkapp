import React, { useLayoutEffect, useState } from 'react';
import styles from './Input.module.css';

interface InputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
}

const Input: React.FC<InputProps> = (props) => {
  const classNames = [styles.input, props.className].join(' ');
  const [hasMounted, setHasMounted] = useState(false);

  useLayoutEffect(() => {
    if (hasMounted && props.inputRef && props.inputRef.current) {
      props.inputRef.current.style.height = 'auto'; // Reset the height to auto
      props.inputRef.current.style.height =
        props.inputRef.current.scrollHeight + 'px'; // Set the height based on the content
    } else {
      // Mark the component as mounted after the first render
      setHasMounted(true);
    }
  }, [props.value, hasMounted]);

  return (
    <textarea
      rows={1}
      ref={props.inputRef}
      value={props.value}
      onChange={props.onChange}
      className={classNames}
    />
  );
};

export default Input;
