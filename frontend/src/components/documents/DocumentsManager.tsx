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

const DocumentsManager: React.FC = () => {
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Documents Manager</h1>
      <DocumentUploadForm onUpload={handleUpload} />
      {loading && (
        <p className="text-center text-blue-500">Loading documents...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <div className="mt-6">
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
          <p className="text-center text-gray-500">No documents available.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentsManager;
