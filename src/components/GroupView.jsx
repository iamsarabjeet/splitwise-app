import { calcBalance } from '../useStore'

const AVATARS = {
  jeet: { initials: 'J', color: 'bg-violet-100 text-violet-700' },
  tobias: { initials: 'T', color: 'bg-amber-100 text-amber-700' },
}

export default function GroupView({ group, onBack, onAddBill, onDeleteBill, onDeleteGroup }) {
  const balance = calcBalance(group.bills)
  const settled = Math.abs(balance) < 0.01
  const jeetOwes = balance < -0.01
  const sorted = [...group.bills].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center px-2 py-3">
        <button
          onClick={onBack}
          className="p-3 text-gray-600 font-medium text-lg"
          aria-label="Back"
        >
          ←
        </button>
        <h1 className="flex-1 font-bold text-lg text-gray-900 truncate">{group.name}</h1>
        <button
          onClick={onDeleteGroup}
          className="p-3 text-gray-300 active:text-red-400 text-base"
          aria-label="Delete group"
        >
          🗑
        </button>
      </header>

      {/* Balance card */}
      <div className="px-4 mt-4">
        <div className={`rounded-3xl p-5 ${settled ? 'bg-gray-100' : jeetOwes ? 'bg-red-50 border border-red-100' : 'bg-green-50 border border-green-100'}`}>
          {settled ? (
            <p className="text-base font-semibold text-gray-500 text-center">All settled up ✓</p>
          ) : (
            <>
              <p className={`text-xs font-bold uppercase tracking-wider ${jeetOwes ? 'text-red-500' : 'text-green-600'}`}>
                {jeetOwes ? 'Jeet owes Tobias' : 'Tobias owes Jeet'}
              </p>
              <p className={`text-3xl font-bold mt-1 ${jeetOwes ? 'text-red-600' : 'text-green-700'}`}>
                ${Math.abs(balance).toFixed(2)}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Bills list */}
      <div className="flex-1 px-4 mt-5 pb-36">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-5xl mb-3">🧾</p>
            <p className="font-semibold text-gray-500 text-lg">No bills yet</p>
            <p className="text-sm text-gray-400 mt-1">Tap the button below to add one</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((bill) => {
              const half = (bill.amount / 2).toFixed(2)
              const owedPerson = bill.paidBy === 'jeet' ? 'Tobias' : 'Jeet'
              const av = AVATARS[bill.paidBy]
              return (
                <div
                  key={bill.id}
                  className="bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${av.color}`}>
                    {av.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{bill.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5 capitalize">
                      {bill.date} · {bill.paidBy} paid
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">${bill.amount.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{owedPerson} owes ${half}</p>
                  </div>
                  <button
                    onClick={() => onDeleteBill(bill.id)}
                    className="p-2 text-gray-200 active:text-red-400 shrink-0"
                    aria-label="Delete bill"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Floating Add Bill button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-8 pt-4 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none">
        <button
          onClick={onAddBill}
          className="w-full py-4 bg-green-600 active:bg-green-700 text-white font-bold rounded-2xl text-base shadow-lg transition-colors pointer-events-auto"
        >
          + Add Bill
        </button>
      </div>
    </div>
  )
}
