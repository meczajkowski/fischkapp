import React, { MouseEventHandler, useState } from 'react';
import styles from './NewCard.module.css';

// components
import Button from '../UI/Button';
import Card from '../UI/CardWrapper';
import DeleteIcon from '../UI/Icons/DeleteIcon';
import Input from '../UI/Input';

interface NewCardProps {
  onCancelNewCard: MouseEventHandler;
  onSaveNewCard: Function;
}

const NewCard: React.FC<NewCardProps> = (props) => {
  const [formStep, setFormStep] = useState<number>(1);
  const [firstStepInputValue, setFirstStepInputValue] = useState<string>('');
  const [secondStepInputValue, setSecondStepInputValue] = useState<string>('');
  const cardData = {
    firstPage: '',
    secondPage: '',
  };

  const nextStepHandler = () => {
    setFormStep(2);
  };

  const prevStepHandler = () => {
    setFormStep(1);
  };

  const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formStep === 1) {
      setFirstStepInputValue(event.target.value);
    } else if (formStep === 2) {
      setSecondStepInputValue(event.target.value);
    }
  };

  const saveCard = () => {
    cardData.firstPage = firstStepInputValue;
    cardData.secondPage = secondStepInputValue;
    props.onSaveNewCard(cardData);
  };

  return (
    <Card>
      <div className={styles.content}>
        {formStep == 2 && (
          <>
            <p className={styles['first-side-text']}>{firstStepInputValue}</p>
            <DeleteIcon
              className={styles['delete-icon']}
              onClick={props.onCancelNewCard}
            />
          </>
        )}
        <Input
          className={styles.input}
          onChange={inputValueHandler}
          value={formStep === 1 ? firstStepInputValue : secondStepInputValue}
        />

        <div className={styles.actions}>
          <Button
            onClick={formStep === 1 ? props.onCancelNewCard : prevStepHandler}
          >
            {formStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={formStep === 1 ? nextStepHandler : saveCard}
            filled={true}
          >
            {formStep === 1 ? 'Next' : 'Save'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewCard;
