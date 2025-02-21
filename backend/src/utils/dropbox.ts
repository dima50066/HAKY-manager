import { Dropbox } from "dropbox";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import createHttpError from "http-errors";

const DROPBOX_APP_KEY = process.env.DROPBOX_APP_KEY;
const DROPBOX_APP_SECRET = process.env.DROPBOX_APP_SECRET;
const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;

if (!DROPBOX_APP_KEY || !DROPBOX_APP_SECRET || !DROPBOX_REFRESH_TOKEN) {
  throw new Error("Dropbox credentials are not configured properly");
}

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number | null = null;

const getNewAccessToken = async (): Promise<string> => {
  if (
    cachedAccessToken !== null &&
    tokenExpiresAt !== null &&
    Date.now() < tokenExpiresAt
  ) {
    return cachedAccessToken;
  }

  try {
    const response = await fetch("https://api.dropbox.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: DROPBOX_REFRESH_TOKEN!,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const data = await response.json();
    cachedAccessToken = data.access_token;
    tokenExpiresAt = Date.now() + 14400 * 1000;

    return cachedAccessToken!;
  } catch (error) {
    console.error("[Dropbox] Failed to refresh access token:", error);
    throw new Error("Failed to refresh Dropbox access token");
  }
};

export const createDropboxInstance = async (): Promise<Dropbox> => {
  const accessToken = await getNewAccessToken();
  return new Dropbox({ accessToken, fetch });
};

export const uploadFileToDropbox = async (
  filePath: string,
  dropboxPath: string
) => {
  const fileContent = fs.readFileSync(filePath);
  try {
    const dbx = await createDropboxInstance();
    const response = await dbx.filesUpload({
      path: dropboxPath,
      contents: fileContent,
      mode: { ".tag": "overwrite" },
    });

    removeTempFile(filePath);

    return response.result;
  } catch (error) {
    console.error("[Dropbox] File upload failed:", error);
    throw error;
  }
};

export const deleteFileFromDropbox = async (dropboxPath: string) => {
  try {
    const dbx = await createDropboxInstance();
    await dbx.filesDeleteV2({ path: dropboxPath });
  } catch (error) {
    console.error("[Dropbox] File deletion failed:", error);
    throw error;
  }
};

export const getFileFromDropbox = async (dropboxPath: string) => {
  try {
    const dbx = await createDropboxInstance();
    const response = await dbx.filesDownload({ path: dropboxPath });

    if (!response.result || !("fileBinary" in response.result)) {
      console.error("[getFileFromDropbox] Invalid response format:", response);
      throw createHttpError(500, "Invalid file format in Dropbox response");
    }

    const fileBuffer = Buffer.from(
      (response.result as any).fileBinary as ArrayBuffer
    );

    return {
      fileBuffer,
      mimeType:
        (response.result as any).mime_type || "application/octet-stream",
      name: response.result.name,
    };
  } catch (error) {
    console.error("[getFileFromDropbox] File retrieval failed:", error);
    throw createHttpError(500, "Failed to retrieve file from Dropbox");
  }
};

export const getTemporaryLinkFromDropbox = async (dropboxPath: string) => {
  try {
    const dbx = await createDropboxInstance();
    const response = await dbx.filesGetTemporaryLink({ path: dropboxPath });
    return response.result.link;
  } catch (error) {
    console.error("[Dropbox] Failed to get temporary link:", error);
    throw new Error("Failed to get temporary link from Dropbox.");
  }
};

const removeTempFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("[Dropbox] Failed to delete temp file:", filePath, err);
    } else {
      console.log("[Dropbox] Temp file deleted:", filePath);
    }
  });
};

export const getFileExtension = (filename: string) => path.extname(filename);

export const createDropboxFilename = (
  originalName: string,
  newName?: string
) => {
  const extension = getFileExtension(originalName);
  if (!newName) return originalName;
  return newName.endsWith(extension) ? newName : `${newName}${extension}`;
};
