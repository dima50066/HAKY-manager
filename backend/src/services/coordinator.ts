import { ProfilesCollection } from "../db/models/profile";
import { Profile } from "../db/models/profile";
import createHttpError from "http-errors";
import {
  createDropboxFilename,
  uploadFileToDropbox,
  deleteFileFromDropbox,
} from "../utils/dropbox";
import path from "path";
import { TEMP_UPLOAD_DIR } from "../constants/constants";
import {
  getTemporaryLinkFromDropbox,
  getFileFromDropbox,
} from "../utils/dropbox";
import { ProductivityRecord } from "../db/models/productivity";
import { Salary } from "../db/models/salary";
import { Calendar } from "../db/models/calendar";
import { SessionsCollection } from "../db/models/session";
import { UsersCollection } from "../db/models/user";
import { deleteFileFromCloudinary } from "../utils/cloudinary";

interface UpdateSalaryInput {
  profileId: string;
  recordId: string;
  additionalHours?: number;
  bonus?: number;
  penalty?: number;
}
export const getAllEmployeeProfiles = async (): Promise<Profile[]> => {
  const profiles = await ProfilesCollection.find({})
    .populate("user", "name email role")
    .exec();
  return profiles;
};

export const getEmployeeProfileById = async (
  profileId: string
): Promise<Profile> => {
  const profile = await ProfilesCollection.findById(profileId)
    .populate("user", "name email role")
    .exec();

  if (!profile) {
    throw createHttpError(404, "Employee profile not found");
  }

  return profile;
};

export const updateEmployeeProfile = async (
  profileId: string,
  updates: Partial<Profile>
): Promise<Profile> => {
  const profile = await ProfilesCollection.findByIdAndUpdate(
    profileId,
    updates,
    { new: true }
  );

  if (!profile) {
    throw createHttpError(404, "Employee profile not found");
  }

  return profile;
};

export const getDocumentsByProfile = async (profileId: string) => {
  const profile = await ProfilesCollection.findById(profileId);
  if (!profile) throw createHttpError(404, "Profile not found");

  return profile.documents;
};

export const uploadDocumentByProfile = async (
  profileId: string,
  file: Express.Multer.File,
  newDocumentName?: string
) => {
  if (!file) {
    throw createHttpError(400, "No file uploaded");
  }

  const tempFilePath = path.join(TEMP_UPLOAD_DIR, file.filename);

  const finalFilename = createDropboxFilename(
    file.originalname,
    newDocumentName
  );

  const dropboxPath = `/HakyManager/${profileId}/${finalFilename}`;

  try {
    const dropboxResult = await uploadFileToDropbox(tempFilePath, dropboxPath);

    const profile = await ProfilesCollection.findById(profileId);
    if (!profile) {
      throw createHttpError(404, "Profile not found");
    }

    const fileType: "pdf" | "image" | "other" = file.mimetype.includes("pdf")
      ? "pdf"
      : file.mimetype.startsWith("image")
      ? "image"
      : "other";

    const document = {
      url: dropboxResult.path_display ?? "",
      type: fileType,
      name: finalFilename,
      uploadedAt: new Date(),
    };

    if (!document.url) {
      throw createHttpError(500, "Failed to get file URL from Dropbox.");
    }

    profile.documents.push(document);
    await profile.save();

    return document;
  } catch (error) {
    throw error;
  }
};

export const deleteDocumentByProfile = async (
  profileId: string,
  documentName: string
) => {
  const profile = await ProfilesCollection.findById(profileId);
  if (!profile) throw createHttpError(404, "Profile not found");

  const documentIndex = profile.documents.findIndex(
    (doc) => doc.name === documentName
  );
  if (documentIndex === -1) throw createHttpError(404, "Document not found");

  const document = profile.documents[documentIndex];
  await deleteFileFromDropbox(document.url);

  profile.documents.splice(documentIndex, 1);
  await profile.save();
};

export const getDocumentPreviewLinkByProfile = async (
  profileId: string,
  documentName: string
) => {
  const profile = await ProfilesCollection.findById(profileId);
  if (!profile) throw createHttpError(404, "Profile not found");

  const document = profile.documents.find((doc) => doc.name === documentName);
  if (!document) throw createHttpError(404, "Document not found");

  const previewLink = await getTemporaryLinkFromDropbox(document.url);
  return previewLink;
};

export const downloadDocumentByProfile = async (
  profileId: string,
  documentName: string
) => {
  const profile = await ProfilesCollection.findById(profileId);
  if (!profile) {
    console.error("[downloadDocumentByProfile] Profile not found");
    throw createHttpError(404, "Profile not found");
  }

  const document = profile.documents.find((doc) => doc.name === documentName);
  if (!document) {
    console.error("[downloadDocumentByProfile] Document not found");
    throw createHttpError(404, "Document not found");
  }

  let dropboxPath = document.url;

  if (!dropboxPath.startsWith("/")) {
    dropboxPath = "/" + dropboxPath;
  }
  try {
    const { fileBuffer, mimeType, name } = await getFileFromDropbox(
      dropboxPath
    );

    return {
      fileBuffer,
      documentName: name,
      mimeType: mimeType || "application/octet-stream",
    };
  } catch (error) {
    console.error(
      "[downloadDocumentByProfile] Failed to retrieve file from Dropbox:",
      error
    );
    throw createHttpError(500, "Failed to retrieve file from Dropbox");
  }
};

export const getEmployeeProductivity = async (
  profileId: string,
  startDate?: string,
  endDate?: string
) => {
  const query: any = { userId: profileId };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  } else if (startDate) {
    query.date = new Date(startDate);
  }

  const records = await ProductivityRecord.find(query)
    .populate("departmentId", "name")
    .populate("userId", "name isStudent")
    .sort({ date: -1 });

  if (!records.length) {
    throw createHttpError(404, "No productivity records found");
  }

  return records;
};

export const getEmployeeSalaryHistory = async (profileId: string) => {
  const salaryHistory = await Salary.find({ userId: profileId }).sort({
    period: -1,
  });

  if (!salaryHistory.length) {
    throw createHttpError(404, "No salary records found for this employee");
  }

  return salaryHistory;
};

export const updateEmployeeSalary = async ({
  profileId,
  recordId,
  additionalHours = 0,
  bonus = 0,
  penalty = 0,
}: UpdateSalaryInput) => {
  const salaryRecord = await Salary.findOne({
    _id: recordId,
    userId: profileId,
  });

  if (!salaryRecord) {
    throw createHttpError(404, "Salary record not found");
  }

  salaryRecord.hoursWorked += additionalHours;
  salaryRecord.totalEarnings += bonus - penalty;

  await salaryRecord.save();

  return salaryRecord;
};

export const deleteEmployeeProfile = async (profileId: string) => {
  const profile = await ProfilesCollection.findById(profileId);
  if (!profile) {
    throw createHttpError(404, "Profile not found");
  }

  const userId = profile.user.toString();

  for (const document of profile.documents) {
    await deleteFileFromDropbox(document.url);
  }

  if (profile.avatar) {
    await deleteFileFromCloudinary(profile.avatar);
  }

  await Promise.all([
    Salary.deleteMany({ userId }),
    ProductivityRecord.deleteMany({ userId }),
    Calendar.deleteMany({ userId }),
    SessionsCollection.deleteMany({ userId }),
    UsersCollection.findByIdAndDelete(userId),
    ProfilesCollection.findByIdAndDelete(profileId),
  ]);

  return { message: "Employee profile and related data deleted successfully" };
};
