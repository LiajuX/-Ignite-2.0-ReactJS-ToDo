import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FiPlusCircle } from 'react-icons/fi';
import { ClipboardText } from 'phosphor-react';

import styles from './styles/App.module.css';

import { Header } from './components/Header';
import { Task as TaskComponent } from './components/Task';

interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const isTaskListEmpty = tasks.length === 0;

  const doneTasksCount = tasks.reduce((amountOfTasks, task) => 
    task.isDone ? ++amountOfTasks : amountOfTasks, 0
  );

  function handleCreateNewTask() {
    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isDone: false,
    }

    if (newTaskTitle.trim()) {
      setTasks(oldState => [...oldState, newTask]);
    }

    setNewTaskTitle('');
  }

  function handleDeleteTask(taskId: string) {
    const taskListWithoutDeletedOne = tasks.filter(task => task.id !== taskId);

    setTasks(taskListWithoutDeletedOne);
  }

  function handleToggleTaskStatus(taskId: string) {
    const foundTask = tasks.find(task => task.id === taskId);

    if (!foundTask) {
      return;
    }

    foundTask.isDone = !foundTask.isDone;

    const updatedTaskList = tasks.map(task => ({...task}));

    setTasks(updatedTaskList);
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <div className={styles.createTaskInput}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={event => setNewTaskTitle(event.target.value)}
            onSubmit={handleCreateNewTask}
            placeholder="Adicione uma nova tarefa" 
          />

          <button onClick={handleCreateNewTask}>
            Criar
            <FiPlusCircle size={20} />
          </button>
        </div>

        <div className={styles.taskList}>
          <header>
            <div className={styles.taskCount}>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>

            <div className={styles.doneTasksCount}>
              <strong>Concluídas</strong>
              <span>
                {isTaskListEmpty ? '0' : `${doneTasksCount} de ${tasks.length}`}
              </span>
            </div>
          </header>
          
          <div className={styles.content}>
            {isTaskListEmpty ? ( 
                <div className={styles.emptyList}>
                  <ClipboardText size={60} weight="thin" />

                  <strong>Você ainda não tem tarefas cadastradas</strong>

                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              ) : (
                tasks.map(task =>
                  <TaskComponent 
                    key={task.id} 
                    title={task.title}
                    isDone={task.isDone}
                    onDeleteTask={() => handleDeleteTask(task.id)}
                    onTaskStatusChange={() => handleToggleTaskStatus(task.id)}
                  />
                )
            )}
          </div>
        </div>
      </main>
    </>
  );
}
