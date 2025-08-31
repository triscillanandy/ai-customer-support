import { useState } from 'react';
import { Search, BookOpen, Folder, ChevronRight } from 'lucide-react';

const categories = [
  {
    name: 'Getting Started',
    articles: ['Welcome to SupportAI', 'Account Setup', 'First Steps'],
  },
  {
    name: 'Billing',
    articles: ['Payment Methods', 'Subscription Plans', 'Invoicing'],
  },
  {
    name: 'Troubleshooting',
    articles: ['Common Issues', 'Error Messages', 'Contact Support'],
  },
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
        <p className="mt-1 text-sm text-gray-500">Find answers to common questions and learn how to use our platform.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.name} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Folder className="h-5 w-5 text-blue-500 mr-2" />
                {category.name}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {category.articles.map((article) => (
                <a
                  key={article}
                  href="#"
                  className="block px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center justify-between"
                >
                  <span>{article}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Articles</h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[
              'How to reset your password',
              'Understanding your bill',
              'API Documentation',
              'Mobile App Guide',
              'Security Best Practices',
            ].map((title) => (
              <li key={title}>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate">{title}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div className="flex -space-x-1">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
