import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './Task.module.scss';
import { useEditTodo, useRemoveTodo } from 'hooks/useFetchTodos';
import { TaskRecord } from 'types/todo';
import {
  CancelIconButton,
  EditIconButton,
  RemoveIconButton,
  SaveIconButton,
} from 'components/IconButton';

export default function Task(props: TaskRecord) {
  const { id, title, done, createdAt, doneAt } = props;

  const [editingTask, setEditingTask] = useState(false);

  const editInputRef = React.createRef<HTMLInputElement>();

  const [updateTodo] = useEditTodo();
  const [removeTodo] = useRemoveTodo();

  const toggleEditMode = () => {
    setEditingTask(!editingTask);
  };

  const handleToggleTask = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const doneDate = checked ? Date.now() : null;
    updateTodo({ id, done: checked, title, createdAt, doneAt: doneDate });
  };

  const handleSaveUpdatedTask = async () => {
    const newTitle = editInputRef.current?.value;
    if (!newTitle) return;

    updateTodo(
      { id, done, title: newTitle, createdAt, doneAt },
      {
        onSuccess: toggleEditMode,
      }
    );
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveUpdatedTask();
    }
  };

  const handleRemoveTask = async () => {
    removeTodo(id);
  };

  const renderEditingTask = () => {
    return (
      <div className={styles.content}>
        <input
          type="text"
          defaultValue={title}
          ref={editInputRef}
          onKeyUp={handleKeyUp}
        />
        <div className={styles.actions}>
          <CancelIconButton onClick={toggleEditMode} />
          <SaveIconButton onClick={handleSaveUpdatedTask} />
        </div>
      </div>
    );
  };

  const renderTaskContent = () => {
    const currentIcon = done ? (
      <RemoveIconButton onClick={handleRemoveTask} />
    ) : (
      <EditIconButton onClick={toggleEditMode} />
    );

    return (
      <div className={`${styles.content} ${done && styles.done}`}>
        <p>{title}</p>
        <div className={styles.actions}>{currentIcon}</div>
      </div>
    );
  };

  return (
    <li className={styles.task}>
      <input type="checkbox" checked={done} onChange={handleToggleTask} />
      {editingTask ? renderEditingTask() : renderTaskContent()}
    </li>
  );
}
