import React from 'react'

function ConfirmationModal({ modal, movie }) {
  const { isOpen, header, content, onClose, onAction } = modal

  if (!isOpen) return null

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{header}</h3>
          </div>
          <div className="px-6 py-4">
            <p>{content}</p>
          </div>
          <div className="flex justify-end gap-3 px-6 py-4 border-t">
            <button
                onClick={() => onAction(false)}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
            >
              <i className="fa fa-thumbs-down mr-1" /> No
            </button>
            <button
                onClick={() => onAction(true, movie)}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition"
            >
              <i className="fa fa-thumbs-up mr-1" /> Yes
            </button>
          </div>
        </div>

        {/* Close when clicking outside */}
        <div onClick={onClose} className="absolute inset-0 z-40" />
      </div>
  )
}

export default ConfirmationModal
