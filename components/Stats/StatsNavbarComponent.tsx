import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '@styles/StatsNavbar.module.css';

export default function StatsNavbarComponent() {

    const router = useRouter();

    const { id } = router.query;



    return <div className={styles.navbar}>
        <Link href={`/History/${id}/test`}>
            <a>tests</a>
        </Link>
    </div>;
}
