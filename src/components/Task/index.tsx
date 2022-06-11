import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { TbTrash } from 'react-icons/tb';

import styles from './styles.module.css';

interface TaskProps {
  title: string;
  isDone: boolean;
  onDeleteTask: () => void;
  onTaskStatusChange: () => void;
}

export function Task({ 
  title, 
  isDone, 
  onDeleteTask,
  onTaskStatusChange,
}: TaskProps) {
  return (
    <div className={isDone ? styles.doneTask : styles.task}>
      <div 
        className={isDone ? styles.checkedBox : styles.checkbox} 
        onClick={onTaskStatusChange}
      >
        {isDone && <BiCheck size={18} />}
      </div> 

      <p className={styles.taskTitle}>{title}</p>

      <button
        className={styles.deleteButton}
        onClick={onDeleteTask}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
