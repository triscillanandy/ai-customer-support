import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  Bookmark, 

  ChevronDown,
  ChevronRight,
  HelpCircle as HelpCircleIcon // <-- Add this import
} from 'lucide-react';

const navigation = [

  { name: 'Customer Support', href: '/', icon: HelpCircleIcon },
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { 
    name: 'Tickets', 
    href: '/tickets', 
    icon: MessageSquare,
    count: 5,
    subItems: [
      { name: 'Open', href: '/tickets?status=open' },
      { name: 'In Progress', href: '/tickets?status=in-progress' },
      { name: 'Closed', href: '/tickets?status=closed' },
    ]
  },
  { name: 'FAQs', href: '/knowledge-base', icon: Bookmark },
  // <-- Added link

];

export function Sidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (name: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
        </div>
        
     
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              <div className="flex items-center">
                <Link
                  to={item.href}
                  onClick={() => item.subItems && toggleItem(item.name)}
                  className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      location.pathname === item.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                  {item.count && (
                    <span className="ml-auto inline-block py-0.5 px-2.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {item.count}
                    </span>
                  )}
                  {item.subItems && (
                    <span className="ml-auto">
                      {expandedItems[item.name] ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </span>
                  )}
                </Link>
              </div>
              
              {/* Sub-items */}
              {item.subItems && expandedItems[item.name] && (
                <div className="mt-1 ml-8 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className={`block px-3 py-2 text-sm font-medium rounded-md ${
                        location.pathname + location.search === subItem.href
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <Link to="/settings" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">MT</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Maria Triscy</p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}