import { Dropbox } from "dropbox";
import fs from "fs";
import path from "path";

const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;

if (!DROPBOX_ACCESS_TOKEN) {
  throw new Error("Dropbox Access Token is not configured");
}

export const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });

export const uploadFileToDropbox = async (
  filePath: string,
  dropboxPath: string
) => {
  const fileContent = fs.readFileSync(filePath);
  try {
    const response = await dbx.filesUpload({
      path: dropboxPath,
      contents: fileContent,
      mode: { ".tag": "overwrite" },
    });
    console.log(`[Dropbox] File uploaded: ${dropboxPath}`);

    removeTempFile(filePath);

    return response.result;
  } catch (error) {
    console.error("[Dropbox] File upload failed:", error);
    throw error;
  }
};

export const deleteFileFromDropbox = async (dropboxPath: string) => {
  try {
    await dbx.filesDeleteV2({ path: dropboxPath });
    console.log(`[Dropbox] File deleted: ${dropboxPath}`);
  } catch (error) {
    console.error("[Dropbox] File deletion failed:", error);
    throw error;
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

export const getFileFromDropbox = async (dropboxPath: string) => {
  try {
    const response = await dbx.filesDownload({ path: dropboxPath });
    return response.result;
  } catch (error) {
    console.error("[Dropbox] File retrieval failed:", error);
    throw error;
  }
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

export const getTemporaryLinkFromDropbox = async (dropboxPath: string) => {
  try {
    const response = await dbx.filesGetTemporaryLink({ path: dropboxPath });
    return response.result.link;
  } catch (error) {
    console.error("[Dropbox] Failed to get temporary link:", error);
    throw new Error("Failed to get temporary link from Dropbox.");
  }
};
