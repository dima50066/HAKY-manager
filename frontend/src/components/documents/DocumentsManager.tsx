import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchMyDocuments,
  uploadMyDocument,
  deleteMyDocument,
} from "../../redux/documents/operations";
import {
  selectMyDocuments,
  selectMyDocumentsLoading,
  selectMyDocumentsError,
} from "../../redux/documents/selectors";
import DocumentItem from "./DocumentItem";
import DocumentUploadForm from "./DocumentUploadForm";
import { useTranslation } from "react-i18next";

const DocumentsManager: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const documents = useAppSelector(selectMyDocuments);
  const loading = useAppSelector(selectMyDocumentsLoading);
  const error = useAppSelector(selectMyDocumentsError);

  useEffect(() => {
    dispatch(fetchMyDocuments());
  }, [dispatch]);

  const handleUpload = async (file: File, newDocumentName: string) => {
    const formData = new FormData();
    formData.append("document", file);
    formData.append("newDocumentName", newDocumentName);

    try {
      await dispatch(uploadMyDocument(formData));
    } catch (error) {
      console.error(`Failed to upload ${newDocumentName}:`, error);
    }
  };

  const handleDelete = async (documentName: string) => {
    await dispatch(deleteMyDocument(documentName));
  };

  return (
    <div className="w-full lg:max-w-3xl min-h-[450px] p-6 bg-white rounded-xl flex flex-col">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        {t("documents_manager")}
      </h1>

      <DocumentUploadForm onUpload={handleUpload} />

      {loading && (
        <p className="text-center text-blue-500">{t("loading_documents")}</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className="mt-6 flex flex-col gap-3">
        {documents.length > 0 ? (
          documents.map((doc) => (
            <DocumentItem
              key={doc.name}
              document={doc}
              onDelete={handleDelete}
              onPreview={() => {}}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">{t("no_documents")}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentsManager;
