import React, { ChangeEvent } from 'react';
import styles from '../TaskForm.module.scss';

interface TaskInputProps {
  task: string;
  inputId: string;
  buttonText: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export default function TaskInput({
  task,
  inputId,
  handleInputChange,
  buttonText,
  disabled,
}: TaskInputProps) {
  return (
    <div className={styles.form_input}>
      <input
        type="text"
        id={inputId}
        value={task}
        onChange={handleInputChange}
        disabled={disabled}
      />
      <button>{disabled ? 'Saving todo...' : buttonText}</button>
    </div>
  );
}
