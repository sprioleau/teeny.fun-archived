const deployedUrl = "http://localhost:3000";

export const ROOT_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : deployedUrl;
