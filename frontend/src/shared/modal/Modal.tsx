import { useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import Icon from "../icon/Icon";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  classNameWrapper?: string;
  btnClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
  classNameWrapper,
  btnClassName,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "relative bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full p-6",
          classNameWrapper
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={clsx(
            "absolute top-4 right-4 text-gray-600 hover:text-red-500 transition",
            btnClassName
          )}
          onClick={onClose}
        >
          <Icon id="x-close" className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
