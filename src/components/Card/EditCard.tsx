import React, { useEffect, useRef, useState } from 'react';
import styles from './NewCard.module.css';

// components
import Button from '../UI/Button';
import DeleteIcon from '../UI/Icons/DeleteIcon';
import Input from '../UI/Input';

interface EditCardProps {
  className?: string;
  textValue: string;
  onCancelEdit: () => void;
  onSaveCard: (inputValue: string) => void;
  onDeleteCard: () => void;
}

const EditCard: React.FC<EditCardProps> = (props) => {
  const [inputValue, setInputValue] = useState(props.textValue);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const inputValueHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const saveEditedCard = () => {
    props.onSaveCard(inputValue);
  };

  return (
    <>
      <div
        data-testid='edit-form'
        className={`${styles.content} ${props.className}`}
      >
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={props.onDeleteCard}
        />
        <Input
          inputRef={inputRef}
          className={styles.inputEditMode}
          onChange={inputValueHandler}
          value={inputValue}
        />

        <div className={styles.actions}>
          <Button onClick={props.onCancelEdit} variant='secondary'>
            Cancel
          </Button>
          <Button
            onClick={saveEditedCard}
            variant='primary'
            disabled={!inputValue.trim()}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditCard;
