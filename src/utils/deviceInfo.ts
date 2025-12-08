/**
 * Device information utilities for login
 */

export interface DeviceInfo {
  device_unique_id: string;
  device_name: string;
  device_location: string;
}

/**
 * Generate a unique device ID (or retrieve existing from localStorage)
 */
const getOrCreateDeviceId = (): string => {
  const storedId = localStorage.getItem('device_unique_id');
  if (storedId) return storedId;

  // Generate a new unique ID
  const newId = `web_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  localStorage.setItem('device_unique_id', newId);
  return newId;
};

/**
 * Get device name from user agent
 */
const getDeviceName = (): string => {
  const ua = navigator.userAgent;
  
  // Detect browser
  let browser = 'Unknown Browser';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';

  // Detect OS
  let os = 'Unknown OS';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return `${browser} on ${os}`;
};

/**
 * Get device location (simplified - timezone based)
 */
const getDeviceLocation = (): string => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone || 'Unknown';
  } catch {
    return 'Unknown';
  }
};

/**
 * Get all device information for login
 */
export const getDeviceInfo = (): DeviceInfo => {
  return {
    device_unique_id: getOrCreateDeviceId(),
    device_name: getDeviceName(),
    device_location: getDeviceLocation(),
  };
};
