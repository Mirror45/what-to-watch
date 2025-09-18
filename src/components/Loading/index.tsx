import { JSX } from 'react';

import styles from './Loading.module.css';

export function Loading(): JSX.Element {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner} />
      <p className={styles.loading__text}>Loading...</p>
    </div>
  );
}
