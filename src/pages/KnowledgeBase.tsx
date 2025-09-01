import { useState } from 'react';
import { Search, BookOpen, Folder, ChevronRight, ArrowLeft, X } from 'lucide-react';

// Sample data structure
const categories = [
  {
    name: 'Getting Started',
    articles: [
      {
        id: 1,
        title: 'Welcome to SupportAI',
        content: 'SupportAI is your intelligent assistant platform designed to help you streamline customer support. This article will guide you through the basic concepts and how to get the most out of our platform.',
        popular: true
      },
      {
        id: 2,
        title: 'Account Setup',
        content: 'To set up your account: 1. Log in with your credentials 2. Complete your profile information 3. Configure your preferences 4. Invite team members (optional) 5. Connect your communication channels',
        popular: false
      },
      {
        id: 3,
        title: 'First Steps',
        content: 'After setting up your account, we recommend: 1. Taking the interactive tour 2. Setting up your first automated response 3. Exploring the analytics dashboard 4. Integrating with your website 5. Testing the system with sample queries',
        popular: true
      },
    ],
  },
  {
    name: 'Billing',
    articles: [
      {
        id: 4,
        title: 'Payment Methods',
        content: 'We accept various payment methods: Credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. You can update your payment method at any time in the Billing section of your account.',
        popular: false
      },
      {
        id: 5,
        title: 'Subscription Plans',
        content: 'We offer three subscription tiers: 1. Basic: $29/month - includes core features 2. Professional: $79/month - adds advanced analytics 3. Enterprise: $199/month - includes all features and priority support',
        popular: true
      },
      {
        id: 6,
        title: 'Invoicing',
        content: 'Invoices are generated monthly on your billing date. You can download PDF copies of all invoices from your account dashboard. For custom billing cycles or annual plans, please contact our sales team.',
        popular: false
      },
    ],
  },
  {
    name: 'Troubleshooting',
    articles: [
      {
        id: 7,
        title: 'Common Issues',
        content: 'Common issues and solutions: 1. Slow response times - check your internet connection 2. Login problems - try resetting your password 3. Notification issues - verify your notification settings 4. Integration errors - check API keys and permissions',
        popular: true
      },
      {
        id: 8,
        title: 'Error Messages',
        content: 'Frequent error messages: 1. "Authentication failed" - check your login credentials 2. "Permission denied" - contact your account administrator 3. "Server timeout" - try again in a few minutes 4. "Invalid format" - check your input data',
        popular: false
      },
      {
        id: 9,
        title: 'Contact Support',
        content: 'For additional help, contact our support team: Email: support@example.com Phone: +1 (555) 123-4567 Live chat: Available 24/7 from your account dashboard Response time: Typically within 2 hours for priority issues.',
        popular: true
      },
    ],
  },
];

// Flatten all articles for search
const allArticles = categories.flatMap(category => 
  category.articles.map(article => ({
    ...article,
    category: category.name
  }))
);

// Popular articles (flagged as popular)
const popularArticles = allArticles.filter(article => article.popular);

type Article = {
  id: number;
  title: string;
  content: string;
  popular: boolean;
  category: string;
};

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [view, setView] = useState<'categories' | 'article' | 'search'>('categories');

  // Filter articles based on search query
  const filteredArticles = searchQuery
    ? allArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setView('article');
  };

  const handleBackToCategories = () => {
    setView('categories');
    setSelectedArticle(null);
    setSearchQuery('');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setView('search');
    } else {
      setView('categories');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setView('categories');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {view === 'article' && selectedArticle ? (
          // Article Detail View
          <div className="bg-white rounded-lg shadow-md p-6">
            <button 
              onClick={handleBackToCategories}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Knowledge Base
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedArticle.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Folder className="h-4 w-4 text-blue-500 mr-1" />
              <span>{selectedArticle.category}</span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{selectedArticle.content}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Related Articles</h3>
              <ul className="space-y-2">
                {allArticles
                  .filter(article => 
                    article.category === selectedArticle.category && 
                    article.id !== selectedArticle.id
                  )
                  .slice(0, 3)
                  .map(article => (
                    <li key={article.id}>
                      <button
                        onClick={() => handleArticleClick(article)}
                        className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                      >
                        {article.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          // Main Categories View or Search Results
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
              <p className="mt-1 text-sm text-gray-500">Find answers to common questions and learn how to use our platform.</p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {view === 'search' && (
              <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Search Results for "{searchQuery}"
                  </h3>
                  <span className="text-sm text-gray-500">
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
                {filteredArticles.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredArticles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => handleArticleClick(article)}
                        className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <span className="font-medium">{article.title}</span>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Folder className="h-3 w-3 text-blue-500 mr-1" />
                            <span>{article.category}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try different search terms or browse the categories below.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Categories (only shown when not in search view or when search is empty) */}
            {(view === 'categories' || !searchQuery) && (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                  {categories.map((category) => (
                    <div key={category.name} className="bg-white rounded-lg shadow overflow-hidden transition-shadow hover:shadow-md">
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                          <Folder className="h-5 w-5 text-blue-500 mr-2" />
                          {category.name}
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {category.articles.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => handleArticleClick({...article, category: category.name})}
                            className="block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 flex items-center justify-between transition-colors"
                          >
                            <span>{article.title}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </button>
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
                      {popularArticles.map((article) => (
                        <li key={article.id}>
                          <button 
                            onClick={() => handleArticleClick(article)}
                            className="block w-full text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="px-4 py-4 flex items-center sm:px-6">
                              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                <div className="truncate">
                                  <div className="flex text-sm">
                                    <p className="font-medium text-blue-600 truncate">{article.title}</p>
                                  </div>
                                  <div className="flex items-center mt-1 text-xs text-gray-500">
                                    <Folder className="h-3 w-3 text-blue-500 mr-1" />
                                    <span>{article.category}</span>
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
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}