import { Clock, MessageSquare, UserCheck, AlertCircle } from 'lucide-react';

const stats = [
  { name: 'Total Tickets', value: '1,234', icon: MessageSquare, trend: 'up', change: '12%' },
  { name: 'Open Tickets', value: '156', icon: AlertCircle, trend: 'up', change: '5%' },
  { name: 'Avg. Response', value: '12m', icon: Clock, trend: 'down', change: '2m' },
  { name: 'Satisfaction', value: '94%', icon: UserCheck, trend: 'up', change: '3%' },
];

const recentTickets = [
  { id: 1, customer: 'Jane Cooper', subject: 'Login issues', status: 'Open', time: '5m ago' },
  { id: 2, customer: 'Alex Morgan', subject: 'Billing question', status: 'In Progress', time: '15m ago' },
  { id: 3, customer: 'Michael Scott', subject: 'Feature request', status: 'Open', time: '25m ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <stat.icon className={`h-5 w-5 ${
                stat.trend === 'up' ? 'text-green-500' : 'text-blue-500'
              }`} />
              <span className="ml-2 text-sm text-gray-500">{stat.name}</span>
            </div>
            <div className="mt-2 flex items-baseline">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className={`ml-2 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-blue-600'
              }`}>
                {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Recent Tickets</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{ticket.customer}</p>
                  <p className="text-sm text-gray-500">{ticket.subject}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ticket.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{ticket.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right">
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all tickets →
          </a>
        </div>
      </div>
    </div>
  );
}
