// Shared balance display used in sidebar and group view
export default function BalanceBadge({ balance, size = 'sm' }) {
  const isSettled = Math.abs(balance) < 0.01
  const jeetOwes = balance < -0.01
  const tobiasOwes = balance > 0.01

  const textSize = size === 'lg' ? 'text-base font-semibold' : 'text-sm font-medium'

  if (isSettled) {
    return (
      <span className={`${textSize} text-gray-500`}>Settled up</span>
    )
  }

  return (
    <span className={`${textSize} ${jeetOwes ? 'text-red-600' : 'text-green-600'}`}>
      {jeetOwes
        ? `Jeet owes Tobias $${Math.abs(balance).toFixed(2)}`
        : `Tobias owes Jeet $${balance.toFixed(2)}`}
    </span>
  )
}
