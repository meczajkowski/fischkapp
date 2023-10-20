import { MouseEventHandler } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: string;
  onClick?: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = (props) => {
  const isPrimary = props.variant === 'primary';

  return (
    <button
      onClick={props.onClick}
      className={`${styles.button}  ${isPrimary && styles.primary}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
