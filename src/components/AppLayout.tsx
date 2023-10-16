import { ReactNode } from 'react';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC<{ children: ReactNode }> = (props) => (
  <div className={styles.layout}>{props.children}</div>
);
