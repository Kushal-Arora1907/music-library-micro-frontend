// main-app/src/components/Modal.jsx
import { X } from "lucide-react"; // Assuming lucide-react is installed in main-app

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>
        <div className="text-white/80 space-y-4">
          {children} {/* This is where your modal content will go */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
