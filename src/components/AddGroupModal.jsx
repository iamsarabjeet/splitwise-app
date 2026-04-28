import { useState } from 'react'
import Modal from './Modal'

const SUGGESTIONS = ['Daily', 'Europe Trip', 'Furniture', 'Groceries', 'Rent', 'Dining Out', 'Subscriptions']

export default function AddGroupModal({ existingNames, onAdd, onClose }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Group name is required')
      return
    }
    if (existingNames.map((n) => n.toLowerCase()).includes(trimmed.toLowerCase())) {
      setError('A group with this name already exists')
      return
    }
    onAdd(trimmed)
    onClose()
  }

  return (
    <Modal title="New Group" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Group name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="e.g. Europe Trip"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        <div>
          <p className="text-xs text-gray-500 mb-2">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.filter((s) => !existingNames.map((n) => n.toLowerCase()).includes(s.toLowerCase())).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setName(s); setError('') }}
                className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:border-green-400 hover:text-green-700 transition-colors text-gray-600"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
          >
            Create Group
          </button>
        </div>
      </form>
    </Modal>
  )
}
