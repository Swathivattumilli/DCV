export const API_URL =
  process.env.REACT_APP_API_URL || "https://dcv-backend.vercel.app/api";

export const FILE_BASE_URL = API_URL.replace(/\/api$/, "");