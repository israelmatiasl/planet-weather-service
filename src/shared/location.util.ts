export class LocationUtil {
  static getLocationName = (lat: number, lon: number): string => {
  if (lat === -12.0464 && lon === -77.0428) return 'Lima';
  if (lat === 35.6762 && lon === 139.6503) return 'Tokyo';
  if (lat === 40.7128 && lon === -74.0060) return 'New York';
  if (lat === 51.5074 && lon === -0.1278) return 'London';
  if (lat === -33.8688 && lon === 151.2093) return 'Sydney';
  if (lat === 30.0444 && lon === 31.2357) return 'Cairo';
  if (lat === 64.1466 && lon === -21.9426) return 'Reykjavik';
  if (lat === 19.076 && lon === 72.8777) return 'Mumbai';
  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
}

static getRandomLocation = () => {
  const locations = [
    { name: 'Lima', lat: -12.0464, lon: -77.0428 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
    { name: 'Reykjavik', lat: 64.1466, lon: -21.9426 },
    { name: 'Mumbai', lat: 19.076, lon: 72.8777 }
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

}