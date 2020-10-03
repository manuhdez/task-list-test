import React from 'react'
import styles from './TaskList.module.scss'

interface TaskListProps {
  title: string;
  tasks: JSX.Element[];
}

export default function TaskList({ title, tasks }: TaskListProps) {
  return (
    <>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.list} hidden={!tasks.length}>
        {tasks}
      </ul>
    </>
  )
}
