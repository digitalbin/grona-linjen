import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

interface IOpts {
    offset?: number;
    onStart?: (e: PointerEvent) => void;
    onEnd?: (e: PointerEvent) => void;
}

export default function scrollIntoView(node, opts: IOpts = {}) {
    const el = document.querySelector(node.getAttribute('href')) as HTMLAnchorElement;
    if (!el) return;

    const { offset = 0, onStart, onEnd } = opts;

    function handleClick(e) {
        if (e.cancelable) e.preventDefault();
        if (onStart) onStart(e);

        window.scrollTo({
            top: el.offsetTop + offset,
            behavior: 'smooth',
        })
        
        if (onEnd) onEnd(e);
    }
    
    node.addEventListener('click', handleClick)
    // node.addEventListener('click', handleClick)

    return {
        destroy() {
            node.removeEventListener('click', handleClick);
        }
    }
}