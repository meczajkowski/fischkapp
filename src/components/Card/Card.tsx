import styles from './Card.module.css';
import { useState } from 'react';
import { CardData } from '../../types';
import { CardSide } from '../../enums';

// components
import CardWrapper from '../UI/CardWrapper';
import EditIcon from '../UI/Icons/EditIcon';
import EditCard from './EditCard';

interface CardProps {
  cardData: CardData;
  onUpdate: (card: CardData) => void;
  onDelete: (cardToRemove: CardData) => void;
}

const Card: React.FC<CardProps> = (props) => {
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
  };

  const saveHandler = (inputValue: string) => {
    const updatedCard = {
      id: props.cardData.id,
      front: isFlipped ? props.cardData.front : inputValue,
      back: isFlipped ? inputValue : props.cardData.back,
    };
    props.onUpdate(updatedCard);
    setIsEditMode(false);
  };

  const removeCardHandler = () => {
    props.onDelete(props.cardData);
    setIsEditMode(false);
  };

  return (
    <CardWrapper
      onClick={flipHandler}
      className={isFlipped ? styles.flipped : ''}
    >
      {isEditMode && (
        <EditCard
          textValue={isFlipped ? props.cardData.back : props.cardData.front}
          className={styles.edit}
          onCancelEdit={editHandler}
          onSaveCard={saveHandler}
          onDeleteCard={removeCardHandler}
        ></EditCard>
      )}
      {!isEditMode && (
        <>
          <div className={styles.content}>
            <EditIcon className={styles.icon} onClick={editHandler} />
            <p className={styles.text}>
              {isFlipped ? props.cardData.back : props.cardData.front}
            </p>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;
