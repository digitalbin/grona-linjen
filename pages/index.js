import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Div100vh from 'react-div-100vh';
import TextContent from '../components/TextContent'
// const TextContent = dynamic(() => import('../components/TextContent'), { ssr: false })
const GreenLine = dynamic(() => import('../components/GreenLine'), { ssr: false })
// const Div100vh = dynamic(() => import('react-div-100vh'), { ssr: false })

export default function Home() {
    const rootRef = useRef(null);

    // console.log(scrollYProgress);
    // useEffect(() => {
    //     // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    //     let vh = window.innerHeight * 0.01;
    //     // Then we set the value in the --vh custom property to the root of the document
    //     document.documentElement.style.setProperty('--vh', `${vh}px`);

    //     // We listen to the resize event
    //     const ls = window.addEventListener('resize', () => {
    //     // We execute the same script as before
    //     let vh = window.innerHeight * 0.01;
    //         document.documentElement.style.setProperty('--vh', `${vh}px`);
    //     });
    //     return () => window.removeEventListener(ls);
    // }, []);
    return (
        <main ref={rootRef}>
            <GreenLine />
            <TextContent root={rootRef} />
            {/* <Div100vh /> */}
        </main>
    );
}
