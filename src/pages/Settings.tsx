import { useState } from 'react';
import { User, Bell, Mail, Lock, Moon } from 'lucide-react';

const tabs = [
  { name: 'Profile', icon: User },
  { name: 'Notifications', icon: Bell },
  { name: 'Email', icon: Mail },
  { name: 'Security', icon: Lock },
  { name: 'Appearance', icon: Moon },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Change photo
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="Doe"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="john@example.com"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div>
                  <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                  <p className="text-sm text-gray-500">Receive {key} notifications</p>
                </div>
                <button
                  onClick={() => setNotifications({...notifications, [key]: !value})}
                  className={`${
                    value ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Toggle {key} notifications</span>
                  <span
                    className={`${
                      value ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </button>
              </div>
            ))}
          </div>
        );
      case 'Appearance':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`${
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle dark mode</span>
                <span
                  className={`${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-500">Select a setting to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`${
                activeTab === tab.name
                  ? 'bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-50 hover:text-blue-700'
                  : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
              } group border-l-4 px-3 py-2 flex items-center text-sm font-medium w-full`}
            >
              <tab.icon
                className={`${
                  activeTab === tab.name ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                } mr-3 h-6 w-6`}
              />
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>

      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <h2 className="text-2xl font-bold text-gray-900">{activeTab} Settings</h2>
        {renderTabContent()}
      </div>
    </div>
  );
}
