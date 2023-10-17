import { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Input from '../UI/Input';

import styles from './FlashCardForm.module.css';
import DeleteIcon from '../UI/DeleteIcon';

const FlashCardForm = () => {
  const [formStep, setFormStep] = useState<number>(1);
  const [firstStepInputValue, setFirstStepInputValue] = useState<string>('');
  const [secondStepInputValue, setSecondStepInputValue] = useState<string>('');

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

  const saveFlashCardHandler = () => {
    console.log('saved');
  };
  const deleteFlashCardHandler = () => {
    console.log('deleted');
  };

  return (
    <Card>
      <div className={styles.content}>
        {formStep == 2 && (
          <>
            <p className={styles['first-side-text']}>{firstStepInputValue}</p>
            <DeleteIcon
              className={styles['delete-icon']}
              onClick={deleteFlashCardHandler}
            />
          </>
        )}
        <Input
          className={styles.input}
          onChange={inputValueHandler}
          value={formStep === 1 ? firstStepInputValue : secondStepInputValue}
        />

        <div className={styles.actions}>
          <Button onClick={prevStepHandler}>
            {formStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={formStep === 1 ? nextStepHandler : saveFlashCardHandler}
            filled={true}
          >
            {formStep === 1 ? 'Next' : 'Save'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FlashCardForm;
