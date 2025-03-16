import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";
import Card from "./Card";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ConfirmationDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  isOpen,
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay className="flex items-center justify-center">
      <div ref={dialogRef} className="w-full m-4 md:w-1/2 lg:w-lg">
        <Card>
          <div className="p-6">
            <div className="flex items-center gap-3">
              <ExclamationTriangleIcon className="size-5 text-red-600" />
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-gray-600 mt-2">{message}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">Cancel</button>
              <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium cursor-pointer">Confirm</button>
            </div>
          </div>
        </Card>
      </div>
    </Overlay>,
    document.getElementById("root")!
  );
}