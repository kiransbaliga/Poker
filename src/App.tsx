import { useState } from 'react';
import { usePoker, type CardType } from './hooks/usePoker';
import { Card } from './components/Card';
import { CardSelector } from './components/CardSelector';
import { StatsDisplay } from './components/StatsDisplay';
import { HelpModal } from './components/HelpModal';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';
// cn removed

function App() {
  const { holeCards, communityCards, bestHand, toggleCard, reset, selectedCards } = usePoker();
  const [showSelector, setShowSelector] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Helper to render a generic slot
  const CardSlot = ({ card, label }: { card?: CardType, label: string }) => (
    <div
      onClick={() => setShowSelector(true)}
      className="relative group cursor-pointer"
    >
      {card ? (
        <Card card={card} />
      ) : (
        <div className="w-16 h-24 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
          <span className="text-xs text-white/30 font-bold uppercase">{label}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-4 flex flex-col items-center mx-auto relative overflow-hidden w-full max-w-5xl"> {/* Widened max-w */}

      {/* Background Ambience */}
      <div className="fixed -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center w-full max-w-md lg:max-w-full mb-8 z-10 glass px-4 py-3 rounded-full">
        <h1 className="text-xl font-bold tracking-tight">Poker <span className="text-blue-400">Hands</span></h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70"
            title="Help"
          >
            <HelpCircle size={18} />
          </button>
          <button
            onClick={reset}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      {/* Main Game Stage - Responsive Grid */}
      <div className="w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-start lg:mt-12">

        {/* Left Col: The Board */}
        <div className="space-y-8 flex flex-col items-center">
          {/* Hole Cards */}
          <div className="space-y-2 text-center w-full">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2 mb-2">Your Hand</h2>
            <div className="flex gap-4 justify-center">
              <CardSlot card={holeCards[0]} label="Card 1" />
              <CardSlot card={holeCards[1]} label="Card 2" />
            </div>
          </div>

          {/* Community Cards */}
          <div className="space-y-2 text-center w-full">
            <h2 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2 mb-2 flex justify-center gap-2">
              <span>Community Cards</span>
            </h2>
            <div className="flex gap-2 justify-center flex-wrap">
              {[0, 1, 2, 3, 4].map(i => (
                <CardSlot
                  key={i}
                  card={communityCards[i]}
                  label={i === 0 ? "F" : i === 1 ? "F" : i === 2 ? "F" : i === 3 ? "T" : "R"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Stats */}
        <div className="flex flex-col justify-start h-full">
          <StatsDisplay bestHand={bestHand} topPossibilities={usePoker().topPossibilities} />

          {/* Desktop-only: Extra space filler or decorative element? */}
          <div className="hidden lg:block mt-8 p-6 rounded-2xl border border-white/5 bg-white/5 text-center">
            <p className="text-xs text-white/30">
              Pro Tip: Click on any card slot to change or remove a card.
            </p>
          </div>
        </div>

      </div>

      {/* Modals */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 100 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-2xl lg:items-center lg:justify-center"
          >
            <div className="w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-2xl lg:overflow-hidden lg:border lg:border-white/10 lg:bg-[#0a0a0a] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-lg font-bold">Select Card</h2>
                <button
                  onClick={() => setShowSelector(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
                <CardSelector
                  selectedCards={selectedCards}
                  onSelect={(card) => {
                    toggleCard(card);
                  }}
                />
              </div>

              <div className="p-4 border-t border-white/10 bg-black/40 lg:hidden">
                <button
                  onClick={() => setShowSelector(false)}
                  className="w-full py-3 bg-blue-600 rounded-xl font-bold active:scale-95 transition-transform"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      </AnimatePresence>

    </div>
  );
}

export default App;
