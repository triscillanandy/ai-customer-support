import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Tickets from './pages/Tickets';
import KnowledgeBase from './pages/KnowledgeBase';
import Settings from './pages/Settings';

// shadcn/ui uses Tailwind, so ensure your project is set up for it.

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Support />} />
                <Route path="/dashboard" element={<Dashboard />} />
             
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;