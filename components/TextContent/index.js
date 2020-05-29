import { useRef, useEffect, useState } from 'react';
import { useScrollPercentage } from 'react-scroll-percentage';
import Div100vh from 'react-div-100vh';
import s from './TextContent.module.scss';
import useWindowSize from '../../hooks/useWindowSize';
import anime from '../../lib/animejs';

const r = 30;

const SVG = ({ coords, width, height, root }) => {
    if (!coords) return null;
    const [ref, percent] = useScrollPercentage({ threshold: .5, root: root.current });
    const speed = 0.1
    const anim = anime.timeline({
        easing: 'linear',
        autoplay: false,
    })

    useEffect(() => {
        anim.add({
            targets: '#t1',
            opacity: [0, 1],
            scale: [0, 1.1, 1],
            duration: 1000,
        })
        .add({
            targets: '#path1',
            duration: (el) => {
                const distance = anime.setDashoffset(el);
                return distance / speed;
            },
            strokeDashoffset: [anime.setDashoffset, 0],
        })
        .add({
            targets: '#t2',
            opacity: [0, 1],
            scale: [0, 1.1, 1],
            duration: 1000,
        })
        .add({
            targets: '#path2',
            duration: (el) => {
                const distance = anime.setDashoffset(el);
                return distance / speed;
            },
            strokeDashoffset: [anime.setDashoffset, 0],
        })
        .add({
            targets: '#t3',
            opacity: [0, 1],
            scale: [0, 1.1, 1],
            duration: 1000,
        })
        .add({
            targets: '#body',
            opacity: [0, 1],
            // scale: [0, 1.1, 1],
            duration: 1000,
        });
        anim.seek(anim.duration * (percent * 2))
        console.log(percent)
    }, [percent])

    return coords && (
        <svg ref={ref} fill="none" viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
            <path
                id="path1"
                strokeWidth="10"
                strokeDashoffset="152.00558471679688"
                strokeDasharray="152.00558471679688"
                d={`
                    M ${coords.t1.x + coords.t1.width} ${coords.t1.y + coords.t1.height / 2}
                    H ${coords.t2.x + coords.t2.width / 2 - r}
                    a ${r} ${r} 0 0 1 ${r} ${r}
                    V ${coords.t2.y}
                `}
            />
            <path
                id="path2"
                strokeWidth="10"
                strokeDashoffset="521.2130126953125"
                strokeDasharray="521.2130126953125"
                d={`
                    M ${coords.t2.x} ${coords.t2.y + coords.t2.height / 2}
                    H ${coords.t1.x + r * 2}
                    a ${-r} ${-r} 0 0 0 ${0} ${r * 2}
                    H ${coords.t2.x - r - 10}
                    a ${r} ${-r} 0 0 1 ${0} ${r * 2}
                    H ${coords.t3.x + coords.t3.width / 2 + r}
                    a ${-r} ${r} 0 0 0 ${-r} ${r}
                    V ${coords.t3.y}
                `}
            />
        </svg>
    )
}

const bcr = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

const initC = {
    t1: bcr,
    t2: bcr,
    t3: bcr,
}

export default function TextContent({ root }) {

    const t1Ref = useRef();
    const t2Ref = useRef();
    const t3Ref = useRef();
    // const [t1Ref, t1 = bcr] = useBoundingclientrectRef();
    // const [t2Ref, t2 = bcr] = useBoundingclientrectRef();
    // const [t3Ref, t3 = bcr] = useBoundingclientrectRef();


    const [c, setC] = useState(null);

    const { width, height } = useWindowSize();

    useEffect(() => {
        const coords = {
            t1: t1Ref.current.getBoundingClientRect(),
            t2: t2Ref.current.getBoundingClientRect(),
            t3: t3Ref.current.getBoundingClientRect(),
        }
        setC(coords);
    }, [t1Ref.current]);
    
    return (
        <Div100vh className={s.wrapper} id="about">
            <div className={s.textContainer}>
                <div className={s.textLeft}>
                    <h3 ref={t1Ref} id="t1" className={s.t1}>Vissa saker går <br /> som på räls.</h3>
                    <br />
                    <h3 ref={t3Ref} id="t3" className={s.t3}>är inte <br /> en av dem.</h3>
                </div>
                <div className={s.textRight}>
                    <h3 className={s.t2} id="t2" ref={t2Ref}>Vår brygg- <br />process till exempel</h3>
                    <div id="body">
                        <p>
                            Vi krånglar till det på alla möjliga sätt för att få till den perfekta ölen.
                            Och vi kan liksom inte koppla av förrän vi har hittat receptet.
                        </p>
                        <p>
                            Kanske kommer vi rentav aldrig att hitta det. Men vi tror att vi har kommit
                            en liten bit på vägen.
                        </p>
                        <p>Prova vårt senaste experiment på RacaMaca.</p>
                    </div>
                </div>
            </div>
            <SVG coords={c} width={width} height={height} root={root} />
        </Div100vh>
    );
}
