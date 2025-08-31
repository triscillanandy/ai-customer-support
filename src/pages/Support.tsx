import React from 'react';
import { ChatInterface } from '../components/ChatInterface';

const Support: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Chat Interface - Remove overflow-hidden to allow scrolling */}
            <div className="flex-1">
                <ChatInterface />
            </div>
        </div>
    );
};

export default Support;