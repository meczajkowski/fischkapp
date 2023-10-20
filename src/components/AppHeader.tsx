import React, { MouseEventHandler } from 'react';
import styles from './AppHeader.module.css';

// components
import LogoIcon from './UI/Icons/LogoIcon';
import AddIcon from './UI/Icons/AddIcon';

interface AppHeaderProps {
  cardsAmount: number;
  onClick: MouseEventHandler;
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => (
  <header className={styles.header}>
    <div className={styles.heading}>
      <LogoIcon />
      <div>Cards: {props.cardsAmount}</div>
    </div>
    <button onClick={props.onClick} className={styles.button}>
      <AddIcon />
    </button>
  </header>
);
