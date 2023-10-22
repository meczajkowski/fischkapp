import styles from './Card.module.css';
import { useState } from 'react';
import { CardData } from '../../types';
import { CardSide } from '../../enums';

// components
import CardWrapper from '../UI/CardWrapper';
import EditIcon from '../UI/Icons/EditIcon';

const Card: React.FC<CardData> = (props) => {
  const [currentSide, setCurrentSide] = useState(CardSide.front);
  let isFlipped = currentSide === CardSide.back;

  const flipHandler = () => {
    console.log(event?.target); //if event.target is EditIcon return
    setCurrentSide((prevSide) =>
      prevSide === CardSide.front ? CardSide.back : CardSide.front
    );
  };

  const editHandler = () => {
    console.log('edit mode');
  };

  return (
    <CardWrapper
      onClick={flipHandler}
      className={isFlipped ? styles.flipped : ''}
    >
      <div className={styles.content}>
        <EditIcon className={styles.icon} onClick={editHandler} />
        <p className={styles.text}>{isFlipped ? props.back : props.front}</p>
      </div>
    </CardWrapper>
  );
};

export default Card;
