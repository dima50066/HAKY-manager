import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const APP_KEY = process.env.DROPBOX_APP_KEY;
const APP_SECRET = process.env.DROPBOX_APP_SECRET;
const AUTH_CODE = process.env.DROPBOX_AUTH_CODE;

if (!APP_KEY || !APP_SECRET || !AUTH_CODE) {
  console.error("❌ Missing required environment variables.");
  process.exit(1);
}

const getRefreshToken = async (): Promise<void> => {
  try {
    const response = await fetch("https://api.dropbox.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${APP_KEY}:${APP_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: AUTH_CODE,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Refresh Token:", data.refresh_token);
  } catch (error) {
    console.error("❌ Error fetching refresh token:", error);
  }
};

getRefreshToken();
