import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AdviceDisplayProps {
  content: string;
  loading: boolean;
}

export const AdviceDisplay: React.FC<AdviceDisplayProps> = ({ content, loading }) => {
  if (!content && !loading) return null;

  return (
    <div className="bg-slate-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-slate-800 overflow-hidden mt-8 transition-all duration-500 ease-in-out">
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <h2 className="text-slate-100 font-serif text-lg font-semibold flex items-center gap-2">
          <span className="text-gold-500">✦</span> Transaction Analysis
        </h2>
        {loading && (
            <span className="text-gold-500/80 text-xs uppercase tracking-widest animate-pulse">Processing Case...</span>
        )}
      </div>
      
      <div className="p-8 prose prose-slate prose-invert prose-headings:font-serif prose-headings:text-gold-400 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white max-w-none">
        {content ? (
          <ReactMarkdown 
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-800" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-6 mb-3 text-gold-500" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-4 mb-2 text-gold-400" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-gold-500" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gold-600 pl-4 py-1 italic bg-slate-800/50 my-4 rounded-r text-slate-200" {...props} />
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
           <div className="flex flex-col items-center justify-center py-12 text-slate-500">
             <div className="w-16 h-1 bg-slate-800 rounded mb-4"></div>
             <p className="font-serif italic text-slate-400">Your property guidance will appear here.</p>
           </div>
        )}
      </div>
      
      <div className="bg-slate-900/80 border-t border-slate-800 p-4 text-[10px] text-slate-500 text-center uppercase tracking-widest">
        PawliLaw Real Estate Engine • Preliminary Guidance Only
      </div>
    </div>
  );
};