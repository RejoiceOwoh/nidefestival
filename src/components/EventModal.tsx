'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Edit, Trash } from 'lucide-react'

export default function EventModal({ event, onClose, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedEvent, setEditedEvent] = useState(event)

  const handleEdit = () => {
    onEdit(editedEvent)
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg p-6 w-full max-w-md relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          {isEditing ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
              <input
                type="text"
                value={editedEvent.title}
                onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <textarea
                value={editedEvent.description}
                onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                value={editedEvent.location}
                onChange={(e) => setEditedEvent({ ...editedEvent, location: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong> {new Date(event.start).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Time:</strong> {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {event.location}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

