import styles from './Card.module.css';
import { useState } from 'react';
import { CardData } from '../../types';
import { CardSide } from '../../enums';

// components
import CardWrapper from '../UI/CardWrapper';
import EditIcon from '../UI/Icons/EditIcon';

const Card: React.FC<CardData> = (props) => {
  const [currentSide, setCurrentSide] = useState(CardSide.front);

  const flipHandler = () => {
    setCurrentSide((prevSide) =>
      prevSide === CardSide.front ? CardSide.back : CardSide.front
    );
  };

  const editHandler = () => {
    console.log('edit mode');
  };

  return (
    <CardWrapper>
      <div onClick={flipHandler} className={styles.content}>
        <EditIcon className={styles.icon} onClick={editHandler} />
        <p className={styles.text}>
          {currentSide === CardSide.front ? props.front : props.back}
        </p>
      </div>
    </CardWrapper>
  );
};

export default Card;
