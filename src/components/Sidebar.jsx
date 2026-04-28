import BalanceBadge from './BalanceBadge'

export default function Sidebar({ groups, overallBalance, selectedGroupId, onSelectGroup, onAddGroup }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Jeet & Tobias</h1>
        <p className="text-xs text-gray-400 mt-0.5">Bill Splitter</p>
      </div>

      {/* Overall balance */}
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Overall</p>
        <BalanceBadge balance={overallBalance} size="lg" />
      </div>

      {/* Groups */}
      <nav className="flex-1 overflow-y-auto py-2">
        <div className="px-4 mb-1 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-400">Groups</span>
        </div>
        {groups.length === 0 && (
          <p className="px-5 py-3 text-sm text-gray-400">No groups yet</p>
        )}
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`w-full text-left px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
              selectedGroupId === group.id ? 'bg-green-50 border-r-2 border-green-500' : ''
            }`}
          >
            <span className={`text-sm font-medium truncate ${selectedGroupId === group.id ? 'text-green-700' : 'text-gray-700'}`}>
              {group.name}
            </span>
          </button>
        ))}
      </nav>

      {/* Add group button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onAddGroup}
          className="w-full py-2 px-4 rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors font-medium"
        >
          + New Group
        </button>
      </div>
    </aside>
  )
}
