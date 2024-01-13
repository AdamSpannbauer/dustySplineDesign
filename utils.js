export const myRound = (x, ndigits) => {
  if (ndigits >= 0) {
    return Number(x.toFixed(ndigits));
  }

  const factor = 10 ** Math.abs(ndigits);
  return Math.round(x / factor) * factor;
};
