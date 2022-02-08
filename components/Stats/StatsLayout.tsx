import AppBodyComponent from '@components/AppBodyComponent';
import StatsNavbarComponent from '@components/Stats/StatsNavbarComponent';
import React from 'react';

export default function StatsLayout({ children }: any) {

    return (
            <div className='row'>
                <StatsNavbarComponent />
                {children}
            </div>

    );
}
