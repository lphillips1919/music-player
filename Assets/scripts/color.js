let complexTransitionTime = 20000;
let angle = 180;
let complexAnDirection = 'forwards';
let element = 'complex-gradient-transition';
let complexIntervalFrame;
let complexCurrentPct = 0;
let complexElapsed = 0;

const complexGradientOne = [
    { pct: 0,  color: { r: 224, g: 65, b: 127 } }, 
    { pct: 33, color: { r: 0, g: 173, b: 255 } },
    { pct: 66, color: { r: 203, g: 252, b: 5 } },
    { pct: 100, color: { r: 98, g: 5, b: 252 } }
];

const complexGradientTwo = [
    { pct: 0,  color: { r: 255, g: 113, b: 71 } },
    { pct: 33,  color: { r: 0, g: 55, b: 255 } },
    { pct: 66, color: { r:30, g: 177, b: 7 } },
    { pct: 100, color: { r:228, g: 44, b: 200 } }
];

const getColor = function(pct, colorSet) {
    for (var i = 1; i < colorSet.length - 1; i++) {
        if (pct < colorSet[i].pct) {
            break;
        }
    }
    var lower = colorSet[i - 1];
    var upper = colorSet[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

const complexGradientAnimation = function() {
    if (complexIntervalFrame === undefined) {
        complexIntervalFrame = setInterval(() => {
            let time = complexTransitionTime / 1000;
            let numberOfFrames = time * 60;

            if (complexCurrentPct >= 100) {
                complexAnDirection = 'backwards';
            } else if (complexCurrentPct <= 0) {
                complexAnDirection = 'forwards';
            }

            if (complexAnDirection === 'forwards') {
                complexElapsed += 1;
                complexCurrentPct = Math.min(complexElapsed / numberOfFrames, 1) * 100;
            } else if (complexAnDirection === 'backwards') {
                complexElapsed -= 1;
                complexCurrentPct = Math.max(complexElapsed / numberOfFrames, 0) * 100;
            }

            let colorOne = getColor(complexCurrentPct, complexGradientOne);
            let colorTwo = getColor(complexCurrentPct, complexGradientTwo);

            let generateGradient = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;

            document.getElementById(element).style.backgroundImage = generateGradient;

        }, 16.667);
    }
};

complexGradientAnimation();
