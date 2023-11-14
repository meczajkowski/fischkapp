import styles from './Card.module.css';
import { useRef, useState } from 'react';
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

  const cardContentRef = useRef<HTMLDivElement | null>(null);

  const playAnimationOnce = () => {
    const cardContentElement = cardContentRef.current;
    if (cardContentElement) {
      cardContentElement.classList.add(styles.fadeAnimation);
      cardContentElement.addEventListener('animationend', () => {
        cardContentElement.classList.remove(styles.fadeAnimation);
      });
    }
  };

  const flipHandler = () => {
    if (isEditMode) return;

    playAnimationOnce();
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
          <div
            data-testid='card'
            className={styles.content}
            ref={cardContentRef}
          >
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
