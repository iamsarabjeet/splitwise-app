import { calcBalance } from '../useStore'
import BalanceBadge from './BalanceBadge'

const AVATARS = {
  jeet: { initials: 'J', color: 'bg-violet-100 text-violet-700' },
  tobias: { initials: 'T', color: 'bg-amber-100 text-amber-700' },
}

function Avatar({ person }) {
  const av = AVATARS[person]
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${av.color}`}>
      {av.initials}
    </span>
  )
}

export default function GroupView({ group, onAddBill, onDeleteBill, onDeleteGroup }) {
  const balance = calcBalance(group.bills)

  const sorted = [...group.bills].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Group header */}
      <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
          <div className="mt-1">
            <BalanceBadge balance={balance} size="lg" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onAddBill}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            + Add Bill
          </button>
          <button
            onClick={onDeleteGroup}
            className="px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm"
            title="Delete group"
          >
            Delete group
          </button>
        </div>
      </header>

      {/* Bills */}
      <main className="flex-1 px-8 py-6">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🧾</div>
            <p className="text-lg font-medium text-gray-500">No bills yet</p>
            <p className="text-sm text-gray-400 mt-1">Add the first bill to get started</p>
          </div>
        ) : (
          <div className="space-y-3 max-w-2xl">
            {sorted.map((bill) => {
              const half = (bill.amount / 2).toFixed(2)
              const owedPerson = bill.paidBy === 'jeet' ? 'tobias' : 'jeet'
              return (
                <div
                  key={bill.id}
                  className="bg-white rounded-xl border border-gray-200 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Avatar person={bill.paidBy} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{bill.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {bill.date} · paid by <span className="capitalize font-medium text-gray-600">{bill.paidBy}</span>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-base font-bold text-gray-900">${bill.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">
                      <span className="capitalize">{owedPerson}</span> owes ${half}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteBill(bill.id)}
                    className="ml-1 p-1.5 text-gray-300 hover:text-red-400 rounded-lg transition-colors"
                    title="Delete bill"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
