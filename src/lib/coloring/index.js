const isSameDomain = (styleSheet) => {
    if (!styleSheet.href) {
        return true;
    }

    return styleSheet.href.indexOf(window.location.origin) === 0;
};

const isStyleRule = (rule) => rule.type === 1;

const getCSSCustomPropIndex = () =>
    [...document.styleSheets].filter(isSameDomain).reduce(
        (finalArr, sheet) =>
            finalArr.concat(
                [...sheet.cssRules]
                    .filter(isStyleRule)
                    .reduce((propValArr, rule) => {
                        const props = [...rule.style]
                            .map((propName) => [
                                propName.trim(),
                                rule.style.getPropertyValue(propName).trim(),
                            ])
                            .filter(
                                ([propName]) => propName.indexOf('--') === 0,
                            );

                        return [...propValArr, ...props];
                    }, []),
            ),
        [],
    );

const hexToRgb = (hex) =>
    hex
        .replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            (m, r, g, b) => '#' + r + r + g + g + b + b,
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));

const addRGBprops = () => {
    const cprops = getCSSCustomPropIndex();
    cprops.forEach(([name, hex]) => {
        const nameRGB = `${name}-rgb`;
        const rgb = hexToRgb(hex);
        document.documentElement.style.setProperty(nameRGB, rgb);
    });
};

export default addRGBprops;