import { useState } from 'react'
import Modal from './Modal'

const SUGGESTIONS = ['Daily', 'Europe Trip', 'Furniture', 'Groceries', 'Rent', 'Dining Out', 'Subscriptions', 'Utilities']

export default function AddGroupModal({ existingNames, onAdd, onClose }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const lowerExisting = existingNames.map((n) => n.toLowerCase())

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) { setError('Enter a group name'); return }
    if (lowerExisting.includes(trimmed.toLowerCase())) { setError('Group already exists'); return }
    onAdd(trimmed)
    onClose()
  }

  const available = SUGGESTIONS.filter((s) => !lowerExisting.includes(s.toLowerCase()))

  return (
    <Modal title="New Group" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Group name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError('') }}
            placeholder="e.g. Europe Trip"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        {available.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick picks</p>
            <div className="flex flex-wrap gap-2">
              {available.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setName(s); setError('') }}
                  className="px-4 py-2 text-sm rounded-full border border-gray-200 bg-gray-50 text-gray-600 active:border-green-400 active:text-green-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-green-600 active:bg-green-700 text-white font-bold rounded-2xl text-base transition-colors"
        >
          Create Group
        </button>
      </form>
    </Modal>
  )
}
