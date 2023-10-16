import React from 'react';
import styles from './AppHeader.module.css';

// components
import LogoIcon from './UI/LogoIcon';
import AddIcon from './UI/AddIcon';

interface AppHeaderProps {
  cardsAmount: number;
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => (
  <header className={styles.header}>
    <div className={styles.heading}>
      <LogoIcon />
      <div>Cards: {props.cardsAmount}</div>
    </div>
    <button className={styles.button}>
      <AddIcon />
    </button>
  </header>
);

// suggested by chatgpt. is this better?
// import PropTypes from 'prop-types';

// export const AppHeader: React.FC<AppHeaderProps> = (props) => (
//   <header className={styles.header}>
//     <LogoIcon />
//     Cards: {props.cardsAmount}
//   </header>
// );

// AppHeader.propTypes = {
//   cardsAmount: PropTypes.number.isRequired,
// };
