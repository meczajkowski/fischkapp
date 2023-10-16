import styles from './Button.module.css';

interface ButtonProps {
  filled?: boolean;
  children: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`${styles.button}  ${
        props.filled && styles['button--filled']
      }`}
    >
      {props.children}
    </button>
  );
};

export default Button;
