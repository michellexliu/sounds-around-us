import { BACKEND_ROOT } from './constants';

export const fromMS = (ms) => {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
  // Pull out parts of interest
  let parts = [d.getUTCMinutes(), d.getUTCSeconds()];
  const hours = d.getUTCHours();
  parts = hours === 0 ? parts : [hours, ...parts];
  // Zero-pad
  const formatted = parts.map((s) => String(s).padStart(2, '0')).join(':');
  return formatted;
};
export const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

export const refreshToken = (setToken) => {
  return async function getToken() {
    const response = await fetch(`${BACKEND_ROOT}/auth/token`);
    const json = await response.json();
    setToken(json.access_token);
  };
};

export const getSize = (str) => {
  if (str == null) return;
  const length = str.length;
  console.log(length);
  if (length <= 100) return 'xs';
  if (length <= 250) return 'sm';
  if (length <= 450) return 'md';
  if (length <= 800) return 'lg';
  return 'xl';
};
