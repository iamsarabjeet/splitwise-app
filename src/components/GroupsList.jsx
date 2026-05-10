import { calcBalance } from '../useStore'

function groupBalanceText(balance) {
  if (Math.abs(balance) < 0.01) return { text: 'Settled up', color: 'text-gray-400' }
  if (balance > 0) return { text: `Tobias owes $${balance.toFixed(2)}`, color: 'text-green-600' }
  return { text: `Jeet owes $${Math.abs(balance).toFixed(2)}`, color: 'text-red-500' }
}

export default function GroupsList({ groups, overallBalance, onSelectGroup, onAddGroup }) {
  const settled = Math.abs(overallBalance) < 0.01
  const jeetOwes = overallBalance < -0.01

  return (
    <div className="flex flex-col min-h-screen pb-8">
      {/* Header */}
      <header className="px-5 pt-14 pb-5">
        <p className="text-sm font-medium text-gray-400 mb-0.5">Bill Splitter</p>
        <h1 className="text-3xl font-bold text-gray-900">Jeet & Tobias</h1>
      </header>

      {/* Overall balance card */}
      <div className="px-4 mb-6">
        <div className={`rounded-3xl p-5 ${settled ? 'bg-gray-100' : jeetOwes ? 'bg-red-500' : 'bg-green-600'}`}>
          <p className={`text-sm font-medium ${settled ? 'text-gray-500' : 'text-white/70'}`}>
            Overall Balance
          </p>
          {settled ? (
            <p className="text-xl font-bold text-gray-500 mt-1">All settled up ✓</p>
          ) : (
            <>
              <p className="text-3xl font-bold text-white mt-1">
                ${Math.abs(overallBalance).toFixed(2)}
              </p>
              <p className="text-sm text-white/80 mt-1">
                {jeetOwes ? 'Jeet owes Tobias' : 'Tobias owes Jeet'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Groups list */}
      <div className="px-4 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 px-1">
          Groups
        </p>

        {groups.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
            <p className="text-3xl mb-2">📂</p>
            <p className="font-medium text-gray-500">No groups yet</p>
            <p className="text-sm text-gray-400 mt-1">Tap the button below to get started</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {groups.map((group, i) => {
              const balance = calcBalance(group.bills)
              const { text, color } = groupBalanceText(balance)
              const isLast = i === groups.length - 1
              return (
                <button
                  key={group.id}
                  onClick={() => onSelectGroup(group.id)}
                  className={`w-full flex items-center px-5 py-4 text-left active:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-100' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-base">{group.name}</p>
                    <p className={`text-sm mt-0.5 ${color}`}>{text}</p>
                  </div>
                  <span className="text-gray-300 text-xl ml-2">›</span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Add group button */}
      <div className="px-4 pt-6">
        <button
          onClick={onAddGroup}
          className="w-full py-4 bg-green-600 active:bg-green-700 text-white font-bold rounded-2xl text-base shadow-sm transition-colors"
        >
          + New Group
        </button>
      </div>
    </div>
  )
}
