import { useState } from 'react'
import { useStore } from './useStore'
import GroupsList from './components/GroupsList'
import GroupView from './components/GroupView'
import AddGroupModal from './components/AddGroupModal'
import AddBillModal from './components/AddBillModal'

export default function App() {
  const { groups, overallBalance, addGroup, deleteGroup, addBill, deleteBill } = useStore()
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [showAddGroup, setShowAddGroup] = useState(false)
  const [showAddBill, setShowAddBill] = useState(false)

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) ?? null

  function handleDeleteGroup() {
    deleteGroup(selectedGroup.id)
    setSelectedGroupId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      {selectedGroup ? (
        <GroupView
          group={selectedGroup}
          onBack={() => setSelectedGroupId(null)}
          onAddBill={() => setShowAddBill(true)}
          onDeleteBill={(billId) => deleteBill(selectedGroup.id, billId)}
          onDeleteGroup={handleDeleteGroup}
        />
      ) : (
        <GroupsList
          groups={groups}
          overallBalance={overallBalance}
          onSelectGroup={setSelectedGroupId}
          onAddGroup={() => setShowAddGroup(true)}
        />
      )}

      {showAddGroup && (
        <AddGroupModal
          existingNames={groups.map((g) => g.name)}
          onAdd={(name) => addGroup(name)}
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
