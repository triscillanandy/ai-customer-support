
export const supportOptions = [
  { id: 1, label: 'Order Not Received', description: 'You placed an order but haven\'t received it yet' },
  { id: 2, label: 'Received Wrong Item', description: 'You got a different product than what you ordered' },
  { id: 3, label: 'Damaged / Defective Item', description: 'Item arrived broken or not working' },
  { id: 4, label: 'Payment Failed / Charged Twice', description: 'Issues with payment or refund' },
  { id: 5, label: 'Talk to Human Agent', description: 'Connect with a support agent for complex issues' },
];

export function SupportOptions({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Support Options:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {supportOptions.map(option => (
          <button
            key={option.id}
            className="text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => onSelect(option.id)}
          >
            <span className="font-medium text-blue-600">{option.id}.</span> {option.label}
            <p className="text-xs text-gray-500 mt-1">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}