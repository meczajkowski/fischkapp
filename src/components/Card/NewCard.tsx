import React, { MouseEventHandler, useState } from 'react';
import { CardData } from '../../types';
import { CardSide } from '../../enums';
import styles from './NewCard.module.css';

// components
import Button from '../UI/Button';
import Card from '../UI/CardWrapper';
import DeleteIcon from '../UI/Icons/DeleteIcon';
import Input from '../UI/Input';

interface NewCardProps {
  onCancelNewCard: MouseEventHandler;
  onSaveNewCard: (cardData: CardData) => void;
}

const NewCard: React.FC<NewCardProps> = (props) => {
  /* start of  displaying flashcards added by user with use of NewCard component*/

  const [formStep, setFormStep] = useState<CardSide>(CardSide.front);
  const [firstStepInputValue, setFirstStepInputValue] = useState<string>('');
  const [secondStepInputValue, setSecondStepInputValue] = useState<string>('');
  const isFront = formStep === CardSide.front;
  const cardData = {
    front: '',
    back: '',
  };

  const nextStepHandler = () => {
    // TODO validation
    setFormStep(CardSide.back);
  };

  const prevStepHandler = () => {
    setFormStep(CardSide.front);
  };

  const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isFront) {
      setFirstStepInputValue(event.target.value);
    } else if (!isFront) {
      setSecondStepInputValue(event.target.value);
    }
  };

  const saveCard = () => {
    // TODO validation
    cardData.front = firstStepInputValue;
    cardData.back = secondStepInputValue;
    props.onSaveNewCard(cardData);
  };

  return (
    <Card>
      <div className={styles.content}>
        {!isFront && (
          <>
            <p className={styles.frontText}>{firstStepInputValue}</p>
            <DeleteIcon
              className={styles.deleteIcon}
              onClick={props.onCancelNewCard}
            />
          </>
        )}
        <Input
          className={styles.input}
          onChange={inputValueHandler}
          value={isFront ? firstStepInputValue : secondStepInputValue}
        />

        <div className={styles.actions}>
          <Button
            onClick={isFront ? props.onCancelNewCard : prevStepHandler}
            variant='secondary'
          >
            {isFront ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={isFront ? nextStepHandler : saveCard}
            variant='primary'
          >
            {isFront ? 'Next' : 'Save'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
