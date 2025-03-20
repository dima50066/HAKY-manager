import React, { useEffect } from "react";

interface DocumentPreviewProps {
  previewLink: string;
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  previewLink,
  onClose,
}) => {
  useEffect(() => {
    if (previewLink) {
      window.open(previewLink, "_blank");
      onClose();
    }
  }, [previewLink, onClose]);

  return null;
};

export default DocumentPreview;
