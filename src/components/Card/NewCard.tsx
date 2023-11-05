import React, { useState } from 'react';
import { CardData } from '../../types';
import { CardSide } from '../../enums';
import styles from './NewCard.module.css';

// components
import Button from '../UI/Button';
import CardWrapper from '../UI/CardWrapper';
import DeleteIcon from '../UI/Icons/DeleteIcon';
import Input from '../UI/Input';

interface NewCardProps {
  onCancelNewCard: () => void;
  onSaveNewCard: (cardData: CardData) => void;
}

const NewCard: React.FC<NewCardProps> = (props) => {
  const [formStep, setFormStep] = useState<CardSide>(CardSide.front);
  const [firstStepInputValue, setFirstStepInputValue] = useState<string>('');
  const [secondStepInputValue, setSecondStepInputValue] = useState<string>('');
  const isFront = formStep === CardSide.front;
  let cardData: CardData;

  const nextStepHandler = () => {
    isValidInputValue(firstStepInputValue) && setFormStep(CardSide.back);
  };

  const prevStepHandler = () => {
    setFormStep(CardSide.front);
  };

  const inputValueHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFront) {
      setFirstStepInputValue(event.target.value);
    } else if (!isFront) {
      setSecondStepInputValue(event.target.value);
    }
  };

  const saveCard = () => {
    if (
      !isValidInputValue(secondStepInputValue) ||
      !isValidInputValue(firstStepInputValue)
    )
      return;

    cardData = {
      id: '',
      front: firstStepInputValue,
      back: secondStepInputValue,
    };

    props.onSaveNewCard(cardData);
  };

  const isValidInputValue = (inputValue: string) => {
    const trimmedInputValue = inputValue.trim();
    if (trimmedInputValue === '') {
      return false;
    } else {
      return true;
    }
  };

  return (
    <CardWrapper>
      <div className={styles.content} data-testid='new-card-form'>
        {!isFront && (
          <DeleteIcon
            className={styles.deleteIcon}
            onClick={props.onCancelNewCard}
          />
        )}

        <div className={styles.textContent}>
          <p className={styles.frontText}>{!isFront && firstStepInputValue}</p>
          <Input
            onChange={inputValueHandler}
            value={isFront ? firstStepInputValue : secondStepInputValue}
          />
        </div>

        <div className={styles.actions}>
          <Button
            onClick={isFront ? props.onCancelNewCard : prevStepHandler}
            variant='secondary'
          >
            {isFront ? 'Cancel' : 'Back'}
          </Button>
          <Button
            disabled={isFront ? !firstStepInputValue : !secondStepInputValue}
            onClick={isFront ? nextStepHandler : saveCard}
            variant='primary'
          >
            {isFront ? 'Next' : 'Save'}
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};

export default NewCard;
