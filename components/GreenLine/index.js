import { useEffect, useState, useRef } from 'react';
import anime from '../../lib/animejs';
import { containerLetter, containerLine, svg, wrapper } from './GreenLine.module.scss';
import Div100vh from 'react-div-100vh'

const getTransformOrigin = (el, isLinjen) => {
    const { x, y, width, height } = el?.getBBox?.() || {};
    if (!isLinjen) {
        return `${x + width / 2}px ${y + height / 2}px`;
    }
    return `${x}px ${y + height / 2}px`;
};

const Letter = ({ id, d, ...props }) => {
    const ref = useRef({});
    const transformOrigin = getTransformOrigin(ref.current, id === 'LINJEN');
    const style = { transformOrigin };
    return (
        <g className={containerLetter} style={style}>
            <path
                ref={ref}
                d={d}
                id={id}
                style={style}
                fillRule="evenodd"
                clipRule="evenodd"
                {...props}
            />
        </g>
    );
};

const Line = ({ id, d, ...props }) => {
    return (
        <g className={containerLine}>
            <path id={id} d={d} {...props} className="line" stroke="#00F148" strokeWidth="28" />
        </g>
    );
};

const lineAnime = {
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'linear',
    duration: (el) => {
        const distance = anime.setDashoffset(el);
        const speed = 1.5;
        return distance / speed;
    },
};

const letterAnime = {
    scale: [0, 1],
    opacity: 1,
    duration: 200,
    complete: (tlel) => {
        const targets = tlel?.animatables[0]?.target;
        const an = anime({
            targets,
            translateY: [anime.random(-20, 20), 0, anime.random(10, 20)],
            translateX: [anime.random(-20, 20), 0, anime.random(10, 20)],
            rotate: anime.random(-10, -5),
            easing: 'linear',
            direction: 'alternate',
            duration: anime.random(300, 400),
            loop: true,
        });
    },
};

const timelineEnd = (tl) => {
    const easing = 'easeOutBack';
    anime({
        targets: '#LINJEN',
        opacity: 1,
        translateX: [0, 15, 0],
        skew: [5, 0],
        scaleX: [0.8, 1],
        duration: 1000,
        easing,
    });
    anime({
        targets: '#G, #R, #Ö, #N, #A',
        translateX: [0, 15, 0],
        translateY: 0,
        rotate: 0,
        duration: 1000,
        easing,
        complete: ({ animatables }) => animatables.forEach((an) => anime.remove(an.target)),
    });
};

export default function Home() {
    // const path = anime.path('.motion-path');

    const timeline = anime.timeline({
        complete: timelineEnd,
        autoplay: false,
    });

    const targets = [
        '#G',
        '#line-1',
        '#R',
        '#line-2',
        '#Ö',
        '#line-3',
        '#N',
        '#line-4',
        '#A',
        '#line-5',
    ];

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (ready) {
            targets.forEach((target) => {
                const anime = target.includes('line') ? lineAnime : letterAnime;
                timeline.add({
                    targets: target,
                    ...anime,
                });
            });
            timeline.play();
        } else {
            setReady(true);
        }
    }, [ready]);

    return (
        <Div100vh className={wrapper}>
            <svg
                viewBox="0 0 1450 1450"
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={svg}
            >
                <Letter
                    d="M197.25 165.305C200 164.869 202.925 164.417 203.75 164.301C204.575 164.186 209.975 164.155 215.75 164.233C224.165 164.346 227.339 164.593 231.735 165.476C234.752 166.083 239.547 167.357 242.391 168.309C245.236 169.261 249.431 170.927 251.714 172.012C253.998 173.097 257.932 175.341 260.458 176.999C262.983 178.657 267.085 181.977 269.573 184.375C272.061 186.774 275.2 190.202 276.548 191.994C277.896 193.785 279.906 196.985 281.014 199.105C282.123 201.225 283.585 204.437 284.265 206.241L286 211.5L287.5 219.5H248.5C248.5 219.5 246.607 212.976 244.926 210.648C243.246 208.32 240.381 205.181 238.561 203.672C236.74 202.162 233.45 200.053 231.25 198.985C229.05 197.916 225.787 196.697 224 196.275C222.213 195.854 218.613 195.365 216 195.189C213.201 195.001 209.402 195.114 206.75 195.465C204.275 195.793 200.225 196.735 197.75 197.56C195.275 198.385 191.562 200.11 189.5 201.393C187.437 202.677 184.145 205.307 182.184 207.239C180.224 209.17 177.252 212.866 175.581 215.452C173.91 218.039 171.754 222.126 170.789 224.536C169.825 226.946 168.538 231.243 167.929 234.084C167.013 238.361 166.822 240.843 166.822 248.5C166.822 256.168 167.012 258.638 167.933 262.937C168.544 265.79 169.814 270.035 170.756 272.369C171.697 274.704 173.536 278.333 174.842 280.432C176.149 282.532 179.025 286.063 181.234 288.279C183.442 290.494 186.58 293.174 188.206 294.234C189.831 295.294 192.981 296.929 195.206 297.867C197.43 298.806 201.05 300.014 203.25 300.552C205.45 301.09 209.95 301.662 213.25 301.823C216.748 301.993 220.905 301.879 223.219 301.549C225.403 301.238 229.062 300.339 231.35 299.55C233.639 298.761 236.795 297.358 238.363 296.433C239.931 295.507 243.04 292.95 245.271 290.75C247.502 288.55 250.191 285.311 251.245 283.553C252.525 281.415 253.939 278.617 254.094 277L255 271.5H226.5V243.5H305.5V271.5H294C293.452 274.094 292.662 276.632 291.641 279.078L290.464 281.9C290.464 281.9 287.898 288.825 286.721 291.361C285.544 293.897 283.362 297.843 281.872 300.129C280.381 302.416 277.781 305.89 276.095 307.85C274.409 309.809 271.391 312.751 269.389 314.386C267.387 316.021 263.958 318.528 261.768 319.957C259.577 321.387 256.138 323.339 254.123 324.295C252.108 325.251 248.391 326.726 245.861 327.573C243.332 328.421 238.785 329.675 235.757 330.361C230.842 331.474 228.791 331.635 216.684 331.856C205.492 332.06 202.174 331.956 197.716 331.256C194.744 330.79 190.161 329.783 187.531 329.017C184.901 328.251 180.993 326.918 178.846 326.056C176.698 325.193 173.772 323.9 172.346 323.182C170.918 322.464 167.95 320.708 165.75 319.279C163.55 317.85 160.062 315.285 158 313.578C155.937 311.872 152.604 308.625 150.592 306.363C148.58 304.101 145.49 300.095 143.723 297.462C141.957 294.828 139.409 290.328 138.062 287.462C136.714 284.595 134.893 280 134.015 277.25C133.137 274.5 132 270.225 131.488 267.75C130.975 265.275 130.302 260.895 129.991 258.016C129.68 255.137 129.434 250.412 129.445 247.516C129.455 244.62 129.809 239.631 130.232 236.43C130.654 233.23 131.547 228.503 132.216 225.928C132.885 223.353 134.036 219.559 134.773 217.498C135.511 215.437 137.449 211.119 139.082 207.904C140.714 204.689 143.445 200.076 145.15 197.654C146.855 195.232 150.837 190.65 154 187.473C158.08 183.372 161.424 180.583 165.516 177.864C168.688 175.757 173.454 173.019 176.108 171.779C178.761 170.539 183.479 168.753 186.592 167.811C189.704 166.87 194.5 165.742 197.25 165.305Z"
                    id="G"
                />

                <Letter
                    d="M754 357.18V518H790L790.5 473.718H808.5L837 518H880L848 467C848 467 853.949 463.49 856.7 461.295C859.203 459.299 862.688 456.123 864.446 454.238C866.204 452.354 868.647 449.258 869.875 447.36C871.103 445.461 872.967 442.073 874.018 439.829C875.069 437.586 876.399 434.063 876.975 432C877.55 429.938 878.353 426.225 878.758 423.75C879.164 421.275 879.496 417.338 879.496 415C879.496 412.663 879.164 408.725 878.758 406.25C878.353 403.775 877.55 400.063 876.975 398C876.399 395.938 875.045 392.363 873.964 390.056C872.884 387.749 870.711 383.924 869.135 381.556C867.56 379.188 864.692 375.659 862.761 373.715C860.83 371.77 857.763 369.129 855.945 367.846C854.127 366.562 850.865 364.628 848.695 363.546C846.525 362.465 843.323 361.103 841.579 360.519C839.835 359.936 836.235 358.968 833.579 358.369C828.906 357.315 827.664 357.276 795.25 357.18L754 357.18ZM828.25 389.669C826.6 388.799 823.9 387.704 822.25 387.237C819.961 386.588 791 387 791 387V443H821C822.65 442.635 825.418 441.617 827.456 440.648C830.131 439.375 832.087 437.947 834.486 435.514C836.756 433.213 838.379 430.972 839.603 428.447C840.59 426.414 841.684 423.513 842.034 422C842.384 420.488 842.663 417.221 842.654 414.74C842.644 412.001 842.298 409.056 841.774 407.24C841.299 405.596 840.087 402.675 839.082 400.75C838.019 398.715 835.998 395.995 834.252 394.25C832.601 392.6 829.9 390.538 828.25 389.669Z"
                    id="R"
                />

                <Letter
                    d="M394 582V555L498 555V582H394Z M436 591.743C433.937 592.134 430.225 593.035 427.75 593.744C425.275 594.453 420.511 596.37 417.164 598.004C413.525 599.779 409.064 602.49 406.071 604.745C403.318 606.819 399.685 610.032 397.998 611.883C396.312 613.735 393.49 617.401 391.728 620.031C389.965 622.66 387.645 626.712 386.571 629.035C385.498 631.359 384.042 635.086 383.337 637.318C382.632 639.55 381.662 643.373 381.182 645.813C380.612 648.712 380.304 652.677 380.294 657.25C380.282 662.199 380.546 665.495 381.192 668.5C381.695 670.838 382.663 674.55 383.343 676.75C384.024 678.95 385.83 683.312 387.357 686.442C388.914 689.634 391.725 694.246 393.759 696.942C395.754 699.587 398.705 703.005 400.318 704.538C401.93 706.071 405.151 708.733 407.474 710.454C409.797 712.175 414.185 714.794 417.224 716.273C420.263 717.753 424.775 719.546 427.25 720.258C429.725 720.97 434 721.899 436.75 722.324C440.324 722.875 443.746 723.018 448.75 722.827C452.6 722.679 457.437 722.191 459.5 721.741C461.562 721.291 464.937 720.362 467 719.675C469.062 718.989 472.637 717.544 474.944 716.464C477.251 715.384 481.039 713.235 483.362 711.69C485.685 710.144 489.872 706.592 492.668 703.796C495.463 700.999 499.175 696.629 500.918 694.083C502.66 691.537 504.952 687.607 506.01 685.35C507.068 683.092 508.522 679.221 509.242 676.748C509.962 674.274 510.876 670.113 511.272 667.5C511.669 664.888 511.994 660.163 511.994 657C511.994 653.838 511.669 649.094 511.272 646.458C510.875 643.823 509.866 639.533 509.03 636.925C508.195 634.317 506.393 629.986 505.026 627.3C503.658 624.614 501.256 620.634 499.687 618.456C498.119 616.277 494.566 612.295 491.793 609.605C489.019 606.916 484.973 603.532 482.8 602.086C480.628 600.64 477.028 598.582 474.8 597.512C472.573 596.442 469.323 595.093 467.579 594.513C465.835 593.933 462.235 592.991 459.579 592.418C456.27 591.705 452.39 591.324 447.25 591.205C442.174 591.088 438.537 591.262 436 591.743ZM460.75 630.65C459.1 629.79 456.4 628.634 454.75 628.083C453.1 627.531 450.175 626.958 448.25 626.809C446.163 626.648 443.244 626.821 441.021 627.239C438.794 627.658 435.571 628.792 433.022 630.056C429.721 631.691 427.902 633.034 425.001 635.972C422.825 638.178 420.542 641.106 419.564 642.946C418.637 644.691 417.571 647.273 417.195 648.684C416.82 650.096 416.381 652.938 416.22 655C416.034 657.383 416.193 660.209 416.657 662.75C417.059 664.95 417.945 667.988 418.625 669.5C419.305 671.013 420.905 673.657 422.181 675.376C423.456 677.095 425.906 679.538 427.625 680.804C429.344 682.071 431.799 683.639 433.08 684.29C434.362 684.94 437.058 685.928 439.07 686.486C441.169 687.068 444.227 687.497 446.24 687.493C448.17 687.489 451.17 687.151 452.906 686.741C454.641 686.332 457.454 685.307 459.156 684.463C460.857 683.619 463.458 681.996 464.935 680.857C466.411 679.719 468.64 677.541 469.889 676.019C471.137 674.496 472.885 671.675 473.773 669.75C474.661 667.825 475.638 665.058 475.944 663.601C476.25 662.143 476.5 659.198 476.5 657.056C476.5 654.811 476.081 651.521 475.511 649.293C474.967 647.166 473.903 644.261 473.147 642.838C472.391 641.415 469.968 638.442 467.761 636.232C465.326 633.792 462.571 631.599 460.75 630.65Z"
                    id="Ö"
                />

                <Letter
                    d="M953 894V733H992L1051 838.5V733L1087.5 733V894.5H1048.5L990 790V894H953Z"
                    id="N"
                />

                <Letter
                    d="M215 874.5L157 1036.5H197L203 1017H261L267 1036.5H308L249 874.5L215 874.5ZM251.5 987.5L232 922L212.5 987.5H251.5Z"
                    id="A"
                />

                <Letter
                    d="M582.5 1103.5V1265.5H666.5V1232.5H620.5V1103.5H582.5ZM678.5 1103.5V1265.5H716.5V1103.5H678.5ZM730.5 1103.5V1265.5H768.5V1161.5L826.5 1265.5H865.5V1103.5H828.5V1208L770.247 1103.5H730.5ZM953.5 1103.5V1217C953.5 1217 953.677 1217.33 952.807 1220.25C952.315 1221.9 951.23 1224.54 950.394 1226.11C949.558 1227.69 947.666 1230.12 946.189 1231.51C944.711 1232.91 942.321 1234.59 940.876 1235.25C939.432 1235.91 936.781 1236.68 934.986 1236.97C932.857 1237.3 930.714 1237.32 928.825 1237.01C927.232 1236.75 924.715 1235.99 923.23 1235.31C921.746 1234.63 919.364 1232.99 917.937 1231.66C916.51 1230.33 914.695 1228.24 913.904 1227C913.113 1225.76 911.802 1222.61 910.99 1220C910.179 1217.39 910 1213.19 910 1213.19V1209.5H873L874 1218C874 1218 874.832 1223.86 875.685 1227.18C876.453 1230.17 877.817 1234.36 878.717 1236.49C879.617 1238.63 881.589 1242.27 883.1 1244.59C884.611 1246.9 887.23 1250.28 888.92 1252.09C890.611 1253.89 893.687 1256.54 895.757 1257.97C897.827 1259.4 901.445 1261.46 903.797 1262.55C906.149 1263.64 909.915 1265.06 912.165 1265.71C914.415 1266.36 918.468 1267.18 921.171 1267.52C924.34 1267.91 929.131 1268.03 934.667 1267.85C940.577 1267.66 944.807 1267.24 948.25 1266.5C951 1265.92 955.449 1264.56 958.137 1263.49C960.825 1262.41 964.65 1260.48 966.637 1259.2C968.624 1257.91 972.013 1255.15 974.167 1253.06C976.322 1250.96 979.081 1247.75 980.298 1245.92C981.515 1244.09 983.099 1241.28 983.818 1239.67C984.536 1238.07 985.755 1234.9 986.527 1232.63C987.299 1230.37 988.34 1226.66 988.84 1224.38V1224.38C990.275 1217.86 990.501 1211.18 990.483 1204.51C990.396 1172.42 990 1103.5 990 1103.5H953.5ZM1003.5 1103.5V1265.71H1102.5V1235.5H1041.5V1199.5H1102.5V1170.5H1041.5V1133.5H1102.5V1103.5H1003.5ZM1113.5 1103.5V1265.71H1151.5V1162L1209.5 1265.5L1248.5 1265.71V1103.5H1211.5V1209L1152.47 1103.5H1113.5Z"
                    id="LINJEN"
                />

                <Line id="line-1" d="M347 257H725C763.66 257 795 288.34 795 327V328" />

                <Line
                    id="line-2"
                    d="M725 455.5H241C202.34 455.5 171 486.84 171 525.5V554V583.5C171 622.16 202.34 653.5 241 653.5H350"
                />

                <Line
                    id="line-3"
                    d="M539 653.5H1207C1245.66 653.5 1277 684.84 1277 723.5V754.5C1277 793.16 1245.66 824.5 1207 824.5H1118"
                />

                <Line
                    id="line-4"
                    d="M923 824.5H666.5C627.84 824.5 596.5 855.84 596.5 894.5V896C596.5 934.66 565.16 966 526.5 966H327"
                />

                <Line
                    id="line-5"
                    d="M228 1065 L 228 1123 C 228 1161.66 259.34 1193 298 1193 L 553.5 1193"
                />

                {/* <path
                className="motion-path"
                d="M348 257H726C764.66 257 796 288.34 796 327V356V385.5C796 424.16 764.66 455.5 726 455.5H242C203.34 455.5 172 486.84 172 525.5V554V583.5C172 622.16 203.34 653.5 242 653.5H1208C1246.66 653.5 1278 684.84 1278 723.5V754.5C1278 793.16 1246.66 824.5 1208 824.5H667.5C628.84 824.5 597.5 855.84 597.5 894.5V896C597.5 934.66 566.16 966 527.5 966H299C260.34 966 229 997.34 229 1036V1123C229 1161.66 260.34 1193 299 1193H554.5"
                fill="none"
            /> */}
            </svg>
        </Div100vh>
    );
}
