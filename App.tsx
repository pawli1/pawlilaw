import React, { useState, useRef, useEffect } from 'react';
import { streamLegalAdvice } from './services/gemini';
import { EXAMPLES } from './constants';
import { LoadingState } from './types';
import { DynamicIcon, Icons } from './components/Icons';
import { AdviceDisplay } from './components/AdviceDisplay';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'up' | 'down'>('idle');
  
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    if (loadingState !== LoadingState.IDLE && loadingState !== LoadingState.COMPLETE && loadingState !== LoadingState.ERROR) return;

    setLoadingState(LoadingState.THINKING);
    setAdvice('');
    setError(null);
    setFeedbackStatus('idle');
    
    setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      setLoadingState(LoadingState.STREAMING);
      const stream = streamLegalAdvice(query);
      
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk;
        setAdvice(prev => prev + chunk);
      }
      
      setLoadingState(LoadingState.COMPLETE);
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing your property case. Please try again.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-legal-950 text-slate-300 pb-20 selection:bg-gold-500/30">
      {/* Premium Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-gold-500 p-2.5 rounded-xl text-slate-900 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                    <Icons.Scale size={26} strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-2xl font-serif font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">PawliLaw</h1>
                    <p className="text-[10px] text-gold-500 uppercase tracking-[0.2em] font-semibold hidden sm:block">Real Estate AI Assistant</p>
                </div>
            </div>
            <button 
              className="text-xs sm:text-sm font-medium text-slate-400 hover:text-gold-500 transition-all border border-slate-700 px-4 py-1.5 rounded-full hover:border-gold-500/50"
              onClick={() => setShowAbout(true)}
            >
                About AI
            </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8 sm:pt-12">
        
        {/* Real Estate Specific Disclaimer */}
        <div className="bg-slate-900/40 border border-slate-800 p-4 mb-10 rounded-xl flex items-start gap-4 backdrop-blur-sm">
            <div className="bg-gold-500/10 p-2 rounded-lg">
                <Icons.AlertCircle className="text-gold-500" size={20} />
            </div>
            <div className="text-sm text-slate-400 leading-relaxed">
                <strong className="text-slate-100">Pro-Tip:</strong> Buying or selling a home is one of life's largest financial decisions. PawliLaw analyzes contracts and state laws to give you leverage, but never skip professional counsel for final signatures.
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Input & Scenarios */}
            <div className="lg:col-span-5 space-y-10">
                
                <div className="bg-slate-900/60 p-7 rounded-2xl shadow-xl border border-slate-800/50 backdrop-blur-md">
                    <h2 className="text-lg font-serif font-semibold text-slate-100 mb-5 flex items-center gap-3">
                        <Icons.MessageSquare size={20} className="text-gold-500" />
                        Case Details
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="w-full h-44 p-4 bg-slate-950/50 border border-slate-800 rounded-xl focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all resize-none text-slate-200 placeholder-slate-600 text-sm leading-relaxed"
                            placeholder="Describe your transaction hurdle (e.g., 'The buyer wants a $5k credit for the roof, but my listing said as-is...') "
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loadingState === LoadingState.STREAMING || loadingState === LoadingState.THINKING}
                        />
                        <div className="mt-5">
                            <button
                                type="submit"
                                disabled={!query.trim() || loadingState === LoadingState.STREAMING || loadingState === LoadingState.THINKING}
                                className={`
                                    w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all
                                    ${!query.trim() || loadingState === LoadingState.STREAMING || loadingState === LoadingState.THINKING
                                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                                        : 'bg-gold-500 text-slate-950 hover:bg-gold-400 shadow-[0_5px_15px_rgba(212,175,55,0.2)] active:scale-[0.98]'
                                    }
                                `}
                            >
                                {loadingState === LoadingState.THINKING ? (
                                    <>
                                        <Icons.Loader2 className="animate-spin" size={18} />
                                        Reviewing Property Law...
                                    </>
                                ) : loadingState === LoadingState.STREAMING ? (
                                    <>
                                        <Icons.Loader2 className="animate-spin" size={18} />
                                        Drafting Analysis...
                                    </>
                                ) : (
                                    <>
                                        Analyze Transaction
                                        <Icons.ChevronRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-5 px-1">
                        Common Property Hurdles
                    </h3>
                    <div className="space-y-4">
                        {EXAMPLES.map((ex) => (
                            <button
                                key={ex.id}
                                onClick={() => handleExampleClick(ex.prompt)}
                                disabled={loadingState === LoadingState.STREAMING || loadingState === LoadingState.THINKING}
                                className="w-full text-left bg-slate-900/40 hover:bg-slate-800/60 p-5 rounded-2xl border border-slate-800 hover:border-gold-500/50 transition-all group shadow-sm flex items-start gap-5"
                            >
                                <div className="bg-slate-800 text-gold-500 p-3 rounded-xl group-hover:bg-gold-500 group-hover:text-slate-900 transition-all">
                                    <DynamicIcon name={ex.iconName} className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-100 text-sm group-hover:text-gold-400 transition-colors">{ex.title}</div>
                                    <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{ex.category}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Output Column */}
            <div className="lg:col-span-7" ref={outputRef}>
                {error && (
                     <div className="bg-red-900/20 border border-red-900 text-red-400 px-5 py-4 rounded-2xl mb-6 flex items-center gap-4 animate-shake">
                        <Icons.AlertCircle size={24} />
                        <span className="text-sm font-medium">{error}</span>
                     </div>
                )}
                
                <AdviceDisplay 
                    content={advice} 
                    loading={loadingState === LoadingState.THINKING || loadingState === LoadingState.STREAMING} 
                />

                {loadingState === LoadingState.COMPLETE && advice && (
                    <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {feedbackStatus === 'idle' ? (
                            <div className="flex items-center gap-5 bg-slate-900/80 px-6 py-4 rounded-2xl shadow-2xl border border-slate-800 backdrop-blur-md">
                                <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Helpful Insight?</span>
                                <div className="w-px h-6 bg-slate-800"></div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => setFeedbackStatus('up')}
                                        className="p-2.5 hover:bg-green-500/10 text-slate-500 hover:text-green-500 rounded-xl transition-all border border-transparent hover:border-green-500/20"
                                    >
                                        <Icons.ThumbsUp size={20} />
                                    </button>
                                    <button 
                                        onClick={() => setFeedbackStatus('down')}
                                        className="p-2.5 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                                    >
                                        <Icons.ThumbsDown size={20} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                             <div className="text-center text-xs font-bold text-gold-500 bg-gold-500/10 px-8 py-3 rounded-full border border-gold-500/20 tracking-widest uppercase">
                                Feedback Recorded
                             </div>
                        )}
                    </div>
                )}

                {loadingState === LoadingState.IDLE && !advice && (
                    <div className="hidden lg:flex flex-col items-center justify-center h-full text-slate-600 min-h-[500px] border-2 border-dashed border-slate-800 rounded-3xl bg-slate-950/50">
                        <div className="bg-slate-900 p-6 rounded-full mb-6 border border-slate-800 shadow-inner">
                            <Icons.BookOpen size={48} className="opacity-20 text-gold-500" />
                        </div>
                        <p className="font-serif text-xl text-slate-400">Awaiting Transaction Data</p>
                        <p className="text-sm mt-3 text-slate-600 max-w-xs text-center leading-relaxed">Describe your contract dispute or property hurdle to receive expert AI guidance.</p>
                    </div>
                )}
            </div>
        </div>
      </main>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
            <div className="bg-slate-900 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-md w-full overflow-hidden relative border border-slate-800 animate-in fade-in zoom-in duration-300">
                <button 
                    onClick={() => setShowAbout(false)}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-2"
                >
                    <Icons.X size={24} />
                </button>
                
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-10 text-center">
                    <div className="w-24 h-24 bg-gold-500 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-950 shadow-[0_10px_30px_rgba(212,175,55,0.4)] rotate-3">
                        <Icons.Bot size={50} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white tracking-tight">PawliLaw</h2>
                    <p className="text-gold-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">Specialized Real Estate Engine</p>
                </div>
                
                <div className="p-10 space-y-6 text-slate-400 leading-relaxed text-sm">
                    <p>
                        <strong className="text-slate-100 italic">"I am an AI app. Treat me well, and I will protect your property interests."</strong>
                    </p>
                    <p>
                        Specifically trained for the real estate industry, I serve as a 24/7 preliminary counsel for buyers and sellers navigating complex contracts, disclosures, and closing disputes.
                    </p>
                    <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                         <ul className="space-y-3 text-xs">
                             <li className="flex gap-3"><span className="text-gold-500">✔</span> Contract Clause Analysis</li>
                             <li className="flex gap-3"><span className="text-gold-500">✔</span> Disclosure Obligation Audit</li>
                             <li className="flex gap-3"><span className="text-gold-500">✔</span> Closing Dispute Resolution</li>
                         </ul>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-800 flex flex-col items-center">
                        <button 
                            onClick={() => setShowAbout(false)}
                            className="text-sm font-bold text-slate-100 hover:text-gold-500 transition-all uppercase tracking-widest"
                        >
                            Return to Dashboard
                        </button>
                        <p className="text-[10px] text-slate-600 mt-6">Powered by Gemini Real Estate Logic • v2.0 Dark</p>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;