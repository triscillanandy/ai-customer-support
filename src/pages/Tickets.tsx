import { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';

const statuses = {
  open: { label: 'Open', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'bg-blue-100 text-blue-800' },
  closed: { label: 'Closed', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
};

const tickets = [
  {
    id: 'TKT-1001',
    subject: 'Login issues',
    customer: 'Jane Cooper',
    email: 'jane@example.com',
    status: 'open',
    priority: 'High',
    lastUpdated: '5m ago',
  },
  {
    id: 'TKT-1002',
    subject: 'Billing question',
    customer: 'Alex Morgan',
    email: 'alex@example.com',
    status: 'in-progress',
    priority: 'Medium',
    lastUpdated: '15m ago',
  },
  {
    id: 'TKT-1003',
    subject: 'Feature request',
    customer: 'Michael Scott',
    email: 'michael@example.com',
    status: 'open',
    priority: 'Low',
    lastUpdated: '25m ago',
  },
  {
    id: 'TKT-1004',
    subject: 'Bug report',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'closed',
    priority: 'High',
    lastUpdated: '2h ago',
  },
];

export default function Tickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
  });

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || ticket.status === filters.status;
    const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tickets</h2>
        <div className="mt-4 sm:mt-0">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              {Object.entries(statuses).map(([value, { label }]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => {
              const StatusIcon = statuses[ticket.status as keyof typeof statuses].icon;
              const statusStyle = statuses[ticket.status as keyof typeof statuses].color;
              
              return (
                <li key={ticket.id} className="hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {ticket.id}
                        </p>
                        <div className="ml-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statuses[ticket.status as keyof typeof statuses].label}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.priority}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-800 font-medium">
                          {ticket.subject}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {ticket.customer} • {ticket.email}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <p>Last updated {ticket.lastUpdated}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="py-12 text-center">
              <div className="text-gray-500">No tickets found matching your criteria</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
