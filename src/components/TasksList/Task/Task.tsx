import useFetch from 'hooks/useFetch';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './Task.module.scss';

export interface TaskData {
  title: string;
  done: boolean;
  // createdAt and doneAt saved as a timestamp
  createdAt: number;
  doneAt: number | null;
}

export interface TaskRecord extends TaskData {
  id: number;
}

export interface TaskProps extends TaskRecord {
  onUpdatedTask: () => Promise<void>;
}

export default function Task(props: TaskProps) {
  const { id, title, done, createdAt, doneAt, onUpdatedTask } = props;

  const [editingTask, setEditingTask] = useState(false);

  const editInputRef = React.createRef<HTMLInputElement>();

  const [updateTask, , isUpdatingTask, errorUpdatingTask] = useFetch<
    TaskRecord,
    TaskData
  >({ url: `/tasks/${id}`, method: 'PUT' });

  const [removeTask, , , errorRemovingTask] = useFetch<TaskRecord>({
    url: `/tasks/${id}`,
    method: 'DELETE',
  });

  const handleToggleTask = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const doneDate = checked ? Date.now() : null;
    await updateTask({ done: checked, title, createdAt, doneAt: doneDate });

    if (!errorUpdatingTask) {
      onUpdatedTask();
    }
  };

  const handleSaveUpdatedTask = async () => {
    const newTitle = editInputRef.current?.value;
    // should show a validation message
    if (!newTitle) return;

    await updateTask({ done, title: newTitle, createdAt, doneAt });
    if (!errorUpdatingTask) {
      await onUpdatedTask();
      setEditingTask(false);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveUpdatedTask();
    }
  };

  const handleRemoveTask = async () => {
    await removeTask();
    if (!errorRemovingTask) {
      onUpdatedTask();
    }
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
          <button onClick={() => setEditingTask(!editingTask)}>
            <span role="img" aria-label="Cancel" title="Cancel">
              ❌
            </span>
          </button>
          <button onClick={handleSaveUpdatedTask}>
            <span role="img" aria-label="Save" title="Save">
              💾
            </span>
          </button>
        </div>
      </div>
    );
  };

  const renderTaskContent = () => {
    return (
      <div className={`${styles.content} ${done && styles.done}`}>
        <p>{title}</p>
        <div className={styles.actions}>
          {done ? (
            <button onClick={handleRemoveTask}>
              <span role="img" aria-label="Remove" title="Remove task">
                🗑
              </span>
            </button>
          ) : (
            <button onClick={() => setEditingTask(!editingTask)}>
              <span role="img" aria-label="Edit" title="Edit">
                ✏️
              </span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <li className={styles.task}>
      <input
        type="checkbox"
        checked={done}
        disabled={isUpdatingTask}
        onChange={handleToggleTask}
      />
      {editingTask ? renderEditingTask() : renderTaskContent()}
    </li>
  );
}
