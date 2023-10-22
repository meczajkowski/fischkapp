import styles from './Card.module.css';
import { useState } from 'react';
import { CardData } from '../../types';
import { CardSide } from '../../enums';

// components
import CardWrapper from '../UI/CardWrapper';
import EditIcon from '../UI/Icons/EditIcon';
import EditCard from './EditCard';

const Card: React.FC<CardData> = (props) => {
  const [currentSide, setCurrentSide] = useState(CardSide.front);
  const [isEditMode, setIsEditMode] = useState(false);
  let isFlipped = currentSide === CardSide.back;

  const flipHandler = () => {
    if (isEditMode) return;
    if (event?.target === document.querySelector(`.${styles.icon}`)) {
      // Click occurred on the EditIcon, do not flip
      return;
    }
    setCurrentSide((prevSide) =>
      prevSide === CardSide.front ? CardSide.back : CardSide.front
    );
  };

  const editHandler = () => {
    setIsEditMode((prevIsEditMode) => !prevIsEditMode);
    console.log('edit mode');
  };

  const saveHandler = () => {};

  return (
    <CardWrapper
      onClick={flipHandler}
      className={isFlipped ? styles.flipped : ''}
    >
      {isEditMode && (
        <EditCard
          textValue={isFlipped ? props.back : props.front}
          className={styles.edit}
          onCancelEdit={editHandler}
          onSaveCard={saveHandler}
        ></EditCard>
      )}
      {!isEditMode && (
        <>
          <div className={styles.content}>
            <EditIcon className={styles.icon} onClick={editHandler} />
            <p className={styles.text}>
              {isFlipped ? props.back : props.front}
            </p>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;
