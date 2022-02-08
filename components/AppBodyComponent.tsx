import Head from 'next/head';
import React, { ReactChild, ReactElement } from 'react';
import Navbar from './NavbarComponent';



export default function AppBodyComponent({ children }: { children: any }) {
    return (
        <div className='content-holder'>
            <Head>
                <title>Sudoku - Matrix</title>
            </Head>

            <Navbar />
            {children}
        </div>
    );
}
