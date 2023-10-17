import { MouseEventHandler } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  filled?: boolean;
  children: string;
  onClick?: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.button}  ${
        props.filled && styles['button--filled']
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
