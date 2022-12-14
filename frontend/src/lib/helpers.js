export const fromMS = (ms) => {
  const d = new Date(Date.UTC(0, 0, 0, 0, 0, 0, ms));
  // Pull out parts of interest
  let parts = [d.getUTCMinutes(), d.getUTCSeconds()];
  const hours = d.getUTCHours();
  parts = hours === 0 ? parts : [hours, ...parts];
  // Zero-pad
  const formatted = parts.map((s) => String(s).padStart(2, "0")).join(":");
  return formatted;
};
export const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

export const refreshToken = (setToken) => {
  return async function getToken() {
    const response = await fetch(
      "https://sounds-around-us.herokuapp.com/auth/token"
    );
    const json = await response.json();
    setToken(json.access_token);
  };
};
