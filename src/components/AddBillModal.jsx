import { useState } from 'react'
import Modal from './Modal'

export default function AddBillModal({ groupName, onAdd, onClose }) {
  const today = new Date().toISOString().slice(0, 10)
  const [form, setForm] = useState({ description: '', amount: '', paidBy: 'jeet', date: today })
  const [errors, setErrors] = useState({})

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.description.trim()) errs.description = 'Required'
    const amt = parseFloat(form.amount)
    if (!form.amount || isNaN(amt) || amt <= 0) errs.amount = 'Enter a valid amount'
    if (Object.keys(errs).length) { setErrors(errs); return }
    onAdd(form)
    onClose()
  }

  const half = form.amount && !isNaN(parseFloat(form.amount))
    ? (parseFloat(form.amount) / 2).toFixed(2)
    : null
  const other = form.paidBy === 'jeet' ? 'Tobias' : 'Jeet'

  return (
    <Modal title={`Add to "${groupName}"`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">What for?</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="e.g. Dinner at Nobu"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoFocus
          />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={(e) => set('amount', e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-8 pr-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
          {half && (
            <p className="text-sm text-gray-400 mt-1.5">
              Split equally — <span className="font-medium text-gray-600">{other} owes ${half}</span>
            </p>
          )}
        </div>

        {/* Paid by */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Who paid?</label>
          <div className="flex gap-3">
            {['jeet', 'tobias'].map((person) => (
              <button
                key={person}
                type="button"
                onClick={() => set('paidBy', person)}
                className={`flex-1 py-3 rounded-xl border-2 text-base font-semibold capitalize transition-colors ${
                  form.paidBy === person
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-gray-50 text-gray-500'
                }`}
              >
                {person}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set('date', e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-green-600 active:bg-green-700 text-white font-bold rounded-2xl text-base transition-colors mt-2"
        >
          Add Bill
        </button>
      </form>
    </Modal>
  )
}
