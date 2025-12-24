
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Zap, Check } from 'lucide-react';
import { ChatMessage, ResumeData } from '../types';
import { getChatResponse } from '../geminiService';
import { parseResumeDataFromText, cleanDisplayContent } from '../utils';

interface Props {
  resumeData: ResumeData;
  chatHistory: ChatMessage[];
  onUpdateData: (data: ResumeData) => void;
  onUpdateHistory: (history: ChatMessage[]) => void;
}

const ChatInterface: React.FC<Props> = ({ resumeData, chatHistory, onUpdateData, onUpdateHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    const newHistory = [...chatHistory, userMessage];
    onUpdateHistory(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const simplifiedHistory = newHistory.map(h => ({ role: h.role, content: h.content }));
      const response = await getChatResponse(input, resumeData, simplifiedHistory);

      const parsed = parseResumeDataFromText(response);
      if (parsed) {
        onUpdateData({ ...resumeData, ...parsed });
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.replace(/\*\*/g, ''), // Strip any unintended markdown bolding
        timestamp: Date.now(),
      };

      onUpdateHistory([...newHistory, assistantMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-10 space-y-10 scrollbar-hide custom-scrollbar"
      >
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div 
              className={`max-w-[85%] rounded-[2.5rem] px-8 py-6 text-[14.5px] leading-relaxed shadow-sm transition-all transform hover:scale-[1.01] ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-tr-none premium-shadow' 
                  : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200/50'
              }`}
            >
              <div className="whitespace-pre-wrap font-medium">
                {cleanDisplayContent(msg.content).replace(/\*\*/g, '')}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-slate-50 border border-slate-200/50 px-8 py-6 rounded-[2.5rem] rounded-tl-none premium-shadow flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full typing-dot"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full typing-dot" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full typing-dot" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-slate-100">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Share your career story..."
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] pl-8 pr-20 py-5 text-sm font-medium text-slate-700 focus:bg-white focus:border-[#667eea] focus:ring-8 focus:ring-blue-500/5 outline-none transition-all resize-none min-h-[70px] max-h-48 scrollbar-hide shadow-inner"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3.5 bottom-3.5 w-14 h-14 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
          >
            <Send size={24} />
          </button>
        </div>
        <div className="flex justify-center gap-6 mt-5">
          <div className="flex items-center gap-2">
            <Bot size={12} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">AI Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">ATS Optimized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
