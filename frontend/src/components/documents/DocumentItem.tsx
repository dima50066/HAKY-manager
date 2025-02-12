import React, { useState } from "react";
import { Document } from "../../types";
import DocumentPreview from "./DocumentPreview";
import { useAppDispatch } from "../../redux/store";
import { getDocumentPreview } from "../../redux/documents/operations";

interface DocumentItemProps {
  document: Document;
  onDelete: (documentName: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  const [previewLink, setPreviewLink] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleDelete = () => onDelete(document.name);

  const handlePreview = async () => {
    try {
      const response = await dispatch(
        getDocumentPreview(document.name)
      ).unwrap();
      window.open(response, "_blank");
    } catch (error) {
      console.error("Failed to get preview link:", error);
    }
  };

  const handleClosePreview = () => setPreviewLink(null);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md mb-2">
      <div>
        <p className="font-semibold">{document.name}</p>
        <p className="text-sm text-gray-500">Type: {document.type}</p>
        <p className="text-sm text-gray-500">
          Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handlePreview}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
          Preview
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
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

export default DocumentItem;
