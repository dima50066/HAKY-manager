import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  fetchDocumentsById,
  uploadDocumentById,
  deleteDocumentById,
  getDocumentPreviewById,
} from "../../redux/documents/operations";
import { selectDocumentsById } from "../../redux/documents/selectors";
import { AppDispatch } from "../../redux/store";
import DocumentUploadForm from "../documents/DocumentUploadForm";
import DocumentItem from "../documents/DocumentItem";
import DocumentPreview from "../documents/DocumentPreview";

interface EmployeeDocumentsProps {
  profileId: string;
}

export const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({
  profileId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const documents = useSelector(selectDocumentsById(profileId));

  const [previewLink, setPreviewLink] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchDocumentsById(profileId));
  }, [dispatch, profileId]);

  const handleUploadDocument = async (file: File, newDocumentName: string) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("newDocumentName", newDocumentName);
    await dispatch(uploadDocumentById({ profileId, file: formData }));
  };

  const handleDeleteDocument = async (documentName: string) => {
    await dispatch(deleteDocumentById({ profileId, documentName }));
  };

  const handlePreviewDocument = async (documentName: string) => {
    try {
      const response = await dispatch(
        getDocumentPreviewById({ profileId, documentName })
      ).unwrap();
      setPreviewLink(response);
    } catch (error) {
      console.error("Failed to get document preview:", error);
    }
  };

  const handleClosePreview = () => setPreviewLink(null);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold pb-5">{t("documents")}</h3>

      <DocumentUploadForm onUpload={handleUploadDocument} />

      <div className="mt-4">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <DocumentItem
              key={doc.name}
              document={doc}
              onDelete={handleDeleteDocument}
              onPreview={handlePreviewDocument}
            />
          ))
        ) : (
          <p>{t("no_documents")}</p>
        )}
      </div>

      {previewLink && (
        <DocumentPreview
          previewLink={previewLink}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};
