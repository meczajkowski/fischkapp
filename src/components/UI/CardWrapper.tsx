import { PropsWithChildren } from 'react';
import styles from './CardWrapper.module.css';

const CardWrapper = (props: PropsWithChildren) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default CardWrapper;
