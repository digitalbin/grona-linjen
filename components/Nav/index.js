import { useState, useEffect } from 'react';
import cx from 'classnames';
import anime from '../../lib/animejs';
import s from './Nav.module.scss';
import getPath from '../../lib/wave';

function getRandom(min, max) {
    const rndm = Math.random() * (max - min) + min;
    return Math.round(rndm);
}

const waveDepth = 50;
const complexity = 10;
const waveDuration = 20000;

const bubbleAmount = 20;

const getPoints = (length = 21) => {
    const arr = Array(length)
        .fill(true)
        .map((f, i, org) => {
            const isFirst = i === 0;
            const x = isFirst ? waveDepth : getRandom(0, waveDepth);
            return [x, i * (1000 / length)];
        });
    return [...arr, [waveDepth, 1000]];
};

const bubbles = Array(bubbleAmount)
    .fill(true)
    .map((b, i) => ({
        r: getRandom(3, 5),
        cx: getRandom(15, 90) + '%'
    }));

const paths = Array(complexity)
    .fill(true)
    .map(() => getPath(getPoints(complexity)));
const paths2 = Array(complexity)
    .fill(true)
    .map(() => getPath(getPoints(complexity)));
const paths3 = Array(complexity)
    .fill(true)
    .map(() => getPath(getPoints(complexity)));

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [anims, setAnims] = useState([]);

    const handleClick = () => setIsOpen((p) => !p);

    const nav = cx(s.nav, { [s.navOpen]: isOpen });
    const sidebar = cx(s.sidebar, { [s.sidebarOpen]: isOpen });

    useEffect(() => {
        const solidWave = anime({
            targets: '.waves',
            d: paths,
            loop: true,
            autoplay: false,
            duration: waveDuration,
            easing: 'linear',
            direction: 'alternate',
        });

        const opacityWave = anime({
            targets: '.waves2',
            d: paths2,
            loop: true,
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            duration: getRandom(waveDuration / 2, waveDuration),
        });

        const opacityWave2 = anime({
            targets: '.waves3',
            d: paths3,
            loop: true,
            autoplay: false,
            easing: 'linear',
            direction: 'alternate',
            duration: getRandom(waveDuration / 2, waveDuration),
        });

        const bubbleAnimation = anime({
            targets: '.bubble',
            autoplay: false,
            translateX: {
                value: [0, '20%', 0],
                easing: 'easeOutQuad',
                duration: 3000,
            },
            translateY: ['10%', '-100%'],
            delay: (e, i) => i * 1000,
            loop: true,
            duration: () => getRandom(3000, 5000),
            easing: 'easeInQuad',
        });
        setAnims([solidWave, opacityWave, opacityWave2, bubbleAnimation]);
    }, []);

    useEffect(() => {
        if (isOpen) {
            anims.forEach((an) => {
                an.play();
            });
        } else {
            anims.forEach((an) => {
                an.pause();
            });
        }
    }, [isOpen]);

    return (
        <nav className={nav}>
            {/* <img src="/logo.png" style={{ opacity: 0 }} /> */}
            <button className="button" onClick={handleClick}>
                <svg viewBox="0 0 385 383" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M289.999 246C298.52 229.858 307.324 224.863 331.999 225C332.83 191.267 342.354 181.989 374.999 182V277.5L374.999 373C342.353 373.011 332.83 363.733 331.999 330C307.324 330.137 298.52 325.142 289.999 309M289.999 246V277.5L289.999 309M289.999 246H213.499M289.999 309H213.499"
                        strokeWidth="20"
                    />
                    <path
                        d="M130.5 246.5H90C45.8172 246.5 10 282.317 10 326.5V373H76V318C76 315.239 78.2386 313 81 313H130.5"
                        strokeWidth="20"
                    />
                    <g id="kran" className="kran">
                        <path
                            d="M151 224L119 86.5C117.629 40.895 124.901 20.7772 162.162 12.0849C169.271 10.4263 176.729 10.4263 183.838 12.0849C221.099 20.7772 228.371 40.895 227 86.5L195 224"
                            strokeWidth="20"
                        />
                        <circle cx="172" cy="278" r="53" strokeWidth="20" />
                    </g>
                </svg>
            </button>
            <div className={sidebar}>
                <svg
                    fill="none"
                    className={s.bubbles}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {bubbles.map((b, i) => (
                        <circle
                            key={i}
                            className="bubble"
                            cx={b.cx}
                            cy="95%"
                            r={b.r}
                            stroke="none"
                        />
                    ))}
                </svg>
                <div>
                    <a href="#about">Om oss</a>
                    <p>Beställ</p>
                    <p>Instagram</p>
                </div>
                <svg
                    viewBox={`0 0 ${waveDepth} 1000`}
                    fill="none"
                    className={s.wavy}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        className="waves"
                        d={paths[paths.length - 1]}
                    />
                    <path
                        className="waves2"
                        opacity="0.7"
                        d={paths2[paths2.length - 1]}
                    />
                    <path
                        className="waves3"
                        opacity="0.5"
                        d={paths3[paths3.length - 1]}
                    />
                </svg>
            </div>
        </nav>
    );
}
