import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Div100vh from 'react-div-100vh';
import TextContent from '../components/TextContent';
import Selection from '../components/Selection';
// const TextContent = dynamic(() => import('../components/TextContent'), { ssr: false })
const GreenLine = dynamic(() => import('../components/GreenLine'), { ssr: false });
// const Div100vh = dynamic(() => import('react-div-100vh'), { ssr: false })

export default function Home() {
    const rootRef = useRef(null);
    return (
        <main ref={rootRef} id="main-container">
            <GreenLine />
            <TextContent root={rootRef} />
            <Selection />
            <Div100vh>
                <div
                    style={{
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <h3>Digitalbin Finity Inc. ®</h3>
                </div>
            </Div100vh>
        </main>
    );
}
