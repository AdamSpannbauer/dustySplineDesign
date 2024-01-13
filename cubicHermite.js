export const calcCubicHermiteY = (x, points) => {
  const n = points.length - 1;
  const i = constrain(floor(x), 0, n - 1);

  const t = x - i;
  const t2 = t * t;
  const t3 = t * t2;

  const p0 = points[i];
  const p1 = points[i + 1];
  const m0 = (p1[1] - (i > 0 ? points[i - 1][1] : 0)) / 2;
  const m1 = ((i < n - 1 ? points[i + 2][1] : 0) - p0[1]) / 2;

  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;

  const y = h00 * p0[1] + h10 * m0 + h01 * p1[1] + h11 * m1;

  return y;
};
