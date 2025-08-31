import { MessageSquareTextIcon, BellIcon, UserIcon, HelpCircleIcon } from 'lucide-react';
export function Header() {
  return <header className="bg-white border-b border-gray-200 py-3 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <MessageSquareTextIcon className="h-7 w-7 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">Zazu.AI</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircleIcon className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <BellIcon className="h-5 w-5 text-gray-500" />
          <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
        </button>
        <button className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-blue-600" />
          </div>
        </button>
      </div>
    </header>;
}