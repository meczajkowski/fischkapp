import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
