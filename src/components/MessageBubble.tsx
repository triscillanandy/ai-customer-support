import { BotIcon, UserIcon, FileIcon } from 'lucide-react';

interface MessageBubbleProps {
  message: string;
  isAi: boolean;
  timestamp: string;
  file?: {
    name: string;
    url: string;
    type: string;
  };
}

export function MessageBubble({ message, isAi, timestamp, file }: MessageBubbleProps) {
  return (
    <div className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}>
      {isAi && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
          <BotIcon className="h-5 w-5 text-blue-600" />
        </div>
      )}

      <div className={`max-w-[75%] ${isAi ? 'bg-white border border-gray-200' : 'bg-blue-600 text-white'} rounded-lg px-4 py-2 shadow-sm`}>
        <div className="text-sm">{message}</div>

        {file && (
          <div className="mt-2">
            {file.type.startsWith('image/') ? (
              <img src={file.url} alt={file.name} className="max-w-xs max-h-40 rounded border border-gray-200" />
            ) : (
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-200 underline">
                <FileIcon className="h-4 w-4" />
                {file.name}
              </a>
            )}
          </div>
        )}

        <div className={`text-xs mt-1 ${isAi ? 'text-gray-500' : 'text-blue-200'}`}>
          {timestamp}
        </div>
      </div>

      {!isAi && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 flex-shrink-0">
          <UserIcon className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}
