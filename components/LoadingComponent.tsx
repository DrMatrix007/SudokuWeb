import React from 'react';
import styles from '@styles/Loading.module.css'

export default function LoadingComponent() {
  return <div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div>;
}
