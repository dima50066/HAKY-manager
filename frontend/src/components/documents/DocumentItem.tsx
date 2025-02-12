import React from "react";
import { Document } from "../../types";

interface DocumentItemProps {
  document: Document;
  onDelete: (documentName: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  const handleDelete = () => onDelete(document.name);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md mb-2">
      <div>
        <p className="font-semibold">{document.name}</p>
        <p className="text-sm text-gray-500">Type: {document.type}</p>
        <p className="text-sm text-gray-500">
          Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default DocumentItem;
