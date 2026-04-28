import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

const STORAGE_KEY = 'splitwise_jeet_tobias'

const SEED_DATA = {
  groups: [
    {
      id: uuid(),
      name: 'Daily',
      createdAt: new Date().toISOString(),
      bills: [],
    },
  ],
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SEED_DATA
  } catch {
    return SEED_DATA
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

// Returns net balance from Jeet's perspective:
//   positive  → Tobias owes Jeet
//   negative  → Jeet owes Tobias
export function calcBalance(bills) {
  return bills.reduce((sum, bill) => {
    const half = bill.amount / 2
    return sum + (bill.paidBy === 'jeet' ? half : -half)
  }, 0)
}

export function useStore() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  function addGroup(name) {
    setState((prev) => ({
      ...prev,
      groups: [
        ...prev.groups,
        { id: uuid(), name: name.trim(), createdAt: new Date().toISOString(), bills: [] },
      ],
    }))
  }

  function deleteGroup(groupId) {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.filter((g) => g.id !== groupId),
    }))
  }

  function addBill(groupId, { description, amount, paidBy, date }) {
    const bill = {
      id: uuid(),
      description: description.trim(),
      amount: parseFloat(amount),
      paidBy,
      date: date || new Date().toISOString().slice(0, 10),
    }
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId ? { ...g, bills: [...g.bills, bill] } : g,
      ),
    }))
  }

  function deleteBill(groupId, billId) {
    setState((prev) => ({
      ...prev,
      groups: prev.groups.map((g) =>
        g.id === groupId
          ? { ...g, bills: g.bills.filter((b) => b.id !== billId) }
          : g,
      ),
    }))
  }

  const overallBalance = state.groups.reduce(
    (sum, g) => sum + calcBalance(g.bills),
    0,
  )

  return { groups: state.groups, overallBalance, addGroup, deleteGroup, addBill, deleteBill }
}
