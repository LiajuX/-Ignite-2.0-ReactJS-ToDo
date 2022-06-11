import styles from './styles.module.css';

import toDoLogo from '../../assets/logo.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={toDoLogo} alt="Logotipo do ToDo" />
    </header>
  );
}