
function truncateToDecimals(num, dec = 2) {
    const calcDec = Math.pow(10, dec);
    return (Math.trunc(num * calcDec)) / calcDec;
}
module.exports.truncateToDecimals = truncateToDecimals
