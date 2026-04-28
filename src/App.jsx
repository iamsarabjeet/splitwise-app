import { useState } from 'react'
import { useStore } from './useStore'
import Sidebar from './components/Sidebar'
import GroupView from './components/GroupView'
import AddGroupModal from './components/AddGroupModal'
import AddBillModal from './components/AddBillModal'

export default function App() {
  const { groups, overallBalance, addGroup, deleteGroup, addBill, deleteBill } = useStore()

  const [selectedGroupId, setSelectedGroupId] = useState(() => groups[0]?.id ?? null)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddBill, setShowAddBill] = useState(false)

  // Keep selectedGroupId valid when groups change
  const selectedGroup = groups.find((g) => g.id === selectedGroupId) ?? groups[0] ?? null

  function handleAddGroup(name) {
    addGroup(name)
    // Select the new group after adding
    // It will be the last in the array; we'll select it via a side-effect workaround by storing intent
    setSelectedGroupId(null) // trigger re-select below
  }

  // If selectedGroupId is null but groups exist, auto-select last group (newly added)
  if (selectedGroupId === null && groups.length > 0) {
    setSelectedGroupId(groups[groups.length - 1].id)
  }

  function handleDeleteGroup() {
    if (!selectedGroup) return
    const remaining = groups.filter((g) => g.id !== selectedGroup.id)
    deleteGroup(selectedGroup.id)
    setSelectedGroupId(remaining[0]?.id ?? null)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        groups={groups}
        overallBalance={overallBalance}
        selectedGroupId={selectedGroup?.id}
        onSelectGroup={setSelectedGroupId}
        onAddGroup={() => setShowAddGroup(true)}
      />

      <div className="flex-1">
        {selectedGroup ? (
          <GroupView
            group={selectedGroup}
            onAddBill={() => setShowAddBill(true)}
            onDeleteBill={(billId) => deleteBill(selectedGroup.id, billId)}
            onDeleteGroup={handleDeleteGroup}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-screen text-center py-24">
            <div className="text-6xl mb-4">💸</div>
            <h2 className="text-xl font-semibold text-gray-700">No groups yet</h2>
            <p className="text-gray-400 mt-2 mb-6">Create your first group to start splitting bills</p>
            <button
              onClick={() => setShowAddGroup(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              + Create a Group
            </button>
          </div>
        )}
      </div>

      {showAddGroup && (
        <AddGroupModal
          existingNames={groups.map((g) => g.name)}
          onAdd={handleAddGroup}
          onClose={() => setShowAddGroup(false)}
        />
      )}

      {showAddBill && selectedGroup && (
        <AddBillModal
          groupName={selectedGroup.name}
          onAdd={(bill) => addBill(selectedGroup.id, bill)}
          onClose={() => setShowAddBill(false)}
        />
      )}
    </div>
  )
}
