import React, { useState } from 'react';
import { Sparkles, Send, Loader2, X } from 'lucide-react';
import { getBakingAdvice } from '../services/gemini';

interface AiAssistantProps {
  recipeName: string;
}

export function AiAssistant({ recipeName }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer(null);
    try {
      const response = await getBakingAdvice(recipeName, question);
      setAnswer(response);
    } catch (error) {
      setAnswer("Sajnálom, hiba történt. Kérlek próbáld újra.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-print">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center gap-2 group"
        >
          <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
            Sütési tanácsadó
          </span>
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col">
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-bold">AI Sütési Tanácsadó</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 flex-grow max-h-96 overflow-y-auto space-y-4 custom-scrollbar">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Kérdezz bármit a(z) <span className="text-black font-bold">{recipeName}</span> kapcsán!
            </p>
            
            {answer && (
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm leading-relaxed whitespace-pre-wrap">
                {answer}
              </div>
            )}
            
            {isLoading && (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Hogyan lesz omlósabb?..."
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-xl disabled:opacity-30 transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
