
import React from 'react';
import { geminiService } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

interface AISummaryProps {
  content: string;
}

const AISummary: React.FC<AISummaryProps> = ({ content }) => {
  const [summary, setSummary] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const generateSummary = async () => {
    setLoading(true);
    const result = await geminiService.summarizePost(content);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="my-6 p-4 bg-gray-50 border border-gray-100">
      {!summary && !loading && (
        <button 
          onClick={generateSummary}
          className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-gray-600 transition-colors"
        >
          <Sparkles size={14} />
          <span>Generate AI Summary</span>
        </button>
      )}

      {loading && (
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Loader2 size={14} className="animate-spin" />
          <span>Gemini is reading...</span>
        </div>
      )}

      {summary && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-500">
          <div className="flex items-center space-x-2 text-[10px] font-bold uppercase text-gray-400 tracking-tighter">
            <Sparkles size={10} />
            <span>AI Summary</span>
          </div>
          <p className="text-sm italic text-gray-600 leading-relaxed font-light">
            "{summary}"
          </p>
          <button 
            onClick={() => setSummary(null)}
            className="text-[10px] uppercase underline text-gray-300 hover:text-black"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default AISummary;
