import React from "react";
import { Document } from "../../types";

interface DocumentItemProps {
  document: Document;
  onDelete: (documentName: string) => void;
  onPreview: (documentName: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-4">
      <div className="w-full sm:w-2/3">
        <p className="text-md font-medium text-gray-900 truncate w-full">
          {document.name}
        </p>
        <p className="text-sm text-gray-500">Type: {document.type}</p>
        <p className="text-sm text-gray-500">
          Uploaded: {new Date(document.uploadedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
        <button
          onClick={() => window.open("#", "_blank")}
          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition"
        >
          Preview
        </button>
        <button
          onClick={() => onDelete(document.name)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DocumentItem;
