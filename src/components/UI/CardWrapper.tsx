import { ReactNode } from 'react';
import styles from './CardWrapper.module.css';

interface CardWrapperProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const CardWrapper: React.FC<CardWrapperProps> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${styles.card} ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default CardWrapper;
