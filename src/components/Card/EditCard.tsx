import React, { MouseEventHandler } from 'react';
import styles from './NewCard.module.css';

// components
import Button from '../UI/Button';
import DeleteIcon from '../UI/Icons/DeleteIcon';
import Input from '../UI/Input';

interface EditCardProps {
  className?: string;
  textValue: string;
  onCancelEdit: MouseEventHandler;
  onSaveCard: MouseEventHandler;
}

const EditCard: React.FC<EditCardProps> = (props) => {
  const inputValueHandler = () => {};
  return (
    <>
      <div className={`${styles.content} ${props.className}`}>
        <DeleteIcon
          className={styles.deleteIcon}
          onClick={props.onCancelEdit}
        />
        <Input
          className={styles.input}
          onChange={inputValueHandler}
          value={props.textValue}
        />

        <div className={styles.actions}>
          <Button onClick={props.onCancelEdit} variant='secondary'>
            Cancel
          </Button>
          <Button onClick={props.onSaveCard} variant='primary'>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditCard;
