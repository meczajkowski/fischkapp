import { ReactNode } from 'react';
import styles from './CardWrapper.module.css';

interface CardWrapperProps {
  children: ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default CardWrapper;
