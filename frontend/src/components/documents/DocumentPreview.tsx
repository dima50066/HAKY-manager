import React from "react";
import { useTranslation } from "react-i18next";

interface DocumentPreviewProps {
  previewLink: string;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  previewLink,
  onClose,
}) => {
  const { t } = useTranslation();

  const isImage = previewLink.match(/\.(jpeg|jpg|png|gif|svg)$/i);
  const isPdf = previewLink.match(/\.pdf$/i);
  const isText = previewLink.match(/\.(txt|json|csv)$/i);

  const imageUrl = `${previewLink}?raw=1`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-1 rounded-md float-right"
        >
          {t("close")}
        </button>
        <div className="mt-4">
          {isImage ? (
            <img
              src={imageUrl}
              alt="Document Preview"
              className="w-full h-auto rounded-md"
            />
          ) : isPdf ? (
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                previewLink
              )}&embedded=true`}
              width="100%"
              height="500px"
              title="PDF Preview"
              className="border border-gray-300 rounded-md"
            />
          ) : isText ? (
            <iframe
              src={previewLink}
              width="100%"
              height="500px"
              title="Text File Preview"
              className="border border-gray-300 rounded-md"
            />
          ) : (
            <p className="text-center">
              <strong>{t("unsupported_file")}</strong>
              <br />
              <a
                href={previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("download_file")}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
