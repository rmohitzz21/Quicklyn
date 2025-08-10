import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ cancel, confirm, close }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white w-full max-w-sm rounded-xl shadow-xl p-6 animate-fadeUp">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-2 border-b">
          <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            ⚠️ Permanent Delete
          </h1>
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-red-50 transition"
            aria-label="Close confirmation"
          >
            <IoClose size={22} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
        
        {/* Message */}
        <p className="mt-5 mb-6 text-base text-gray-700 font-medium">
          Are you sure you want to permanently delete?
        </p>
        
        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={cancel}
            className="px-5 py-2 rounded-md border border-red-600 text-red-600 font-semibold
              transition-all hover:bg-red-600 hover:text-white active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-5 py-2 rounded-md border border-green-600 text-green-600 font-semibold
              transition-all hover:bg-green-600 hover:text-white active:scale-95"
          >
            Confirm
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px) scale(0.96);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-fadeUp {
            animation: fadeUp 0.33s cubic-bezier(.34,1.56,.64,1) forwards;
          }
        `}
      </style>
    </div>
  )
}

export default ConfirmBox
