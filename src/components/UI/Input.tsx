import React, { useEffect, useRef } from 'react';
import styles from './Input.module.css';

interface InputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const classNames = [styles.input, props.className].join(' ');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset the height to auto
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px'; // Set the height based on the content
    }
  }, [props.value]);

  return (
    <textarea
      rows={1}
      ref={textareaRef}
      value={props.value}
      onChange={props.onChange}
      className={classNames}
    />
  );
};

export default Input;
