import React, { useState, useRef } from "react";

interface FileWithCustomName {
  file: File;
  customName: string;
}

interface DocumentUploadFormProps {
  onUpload: (file: File, newDocumentName: string) => Promise<void>;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  onUpload,
}) => {
  const [files, setFiles] = useState<FileWithCustomName[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files).map((file) => ({
        file,
        customName: file.name,
      }));
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleUploadAll = async (event: React.FormEvent) => {
    event.preventDefault();
    for (const { file, customName } of files) {
      await onUpload(file, customName.trim());
    }
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleUploadAll} className="mb-4">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-gray-200 border border-gray-400 text-gray-700 py-2 px-4 rounded cursor-pointer inline-block text-center"
          >
            Choose Files
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Files to upload:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {files.map((fileObj, index) => (
                <li
                  key={index}
                  className="flex flex-col bg-gray-100 p-2 rounded-md overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate w-48">
                      {fileObj.file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-red-500 hover:underline ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={files.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Upload All
        </button>
      </div>
    </form>
  );
};

export default DocumentUploadForm;
