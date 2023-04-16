export function computeMidCountry(object) {
  const first = object.geometry.coordinates[0].map(([left]) => left);
  const second = object.geometry.coordinates[0].map(([, right]) => right);

  return [computeGeometryAverage(first), computeGeometryAverage(second)];
}

function computeGeometryAverage(geometry) {
  const sum = geometry.reduce((a, b) => a + b, 0);
  return sum / geometry.length || 0;
}
