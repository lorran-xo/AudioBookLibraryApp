import metrics from './metrics';

const size = {
    font12: metrics.screenWidth * (12 / 365),
    font13: metrics.screenWidth * (13 / 365),
    font14: metrics.screenWidth * (14 / 365),
    font15: metrics.screenWidth * (15 / 365),
    font16: metrics.screenWidth * (16 / 365),
    font18: metrics.screenWidth * (18 / 365),
    font22: metrics.screenWidth * (22 / 365),
    font24: metrics.screenWidth * (24 / 365),
    font30: metrics.screenWidth * (30 / 365),
    font32: metrics.screenWidth * (32 / 365),
};

const weight = {
    bold: '700',
    semi: '600',
    medium: '500',
    regular: '400',
    light: '300',
};

export default {
    size,
    weight,
};
