import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const GreenLine = dynamic(() => import('../components/GreenLine'), { ssr: false })

export default function Home() {

    return (
        <main className="main">
            <GreenLine />
            <div style={{
                backgroundColor: 'purple',
                height: '100vh',
            }} />
        </main>
    );
}
