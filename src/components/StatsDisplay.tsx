import { motion } from 'framer-motion';

type StatsDisplayProps = {
    bestHand: any; // Type from pokersolver
    topPossibilities?: string[]; // Placeholder for now
};

export function StatsDisplay({ bestHand, topPossibilities }: StatsDisplayProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-2xl w-full max-w-md mx-auto text-center space-y-2 mt-4"
        >
            <h2 className="text-white/50 text-sm uppercase tracking-widest font-bold">Current Hand</h2>

            {bestHand ? (
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        {bestHand.name}
                    </h1>
                    <p className="text-white/70 text-sm font-medium">{bestHand.descr}</p>
                </div>
            ) : (
                <div className="text-white/30 italic">Select cards to analyze</div>
            )}

            {topPossibilities && topPossibilities.length > 0 && (
                <div className="pt-4 border-t border-white/10 mt-4">
                    <h3 className="text-white/50 text-xs uppercase tracking-wider mb-2">Next Card Probabilities</h3>
                    <div className="space-y-1">
                        {topPossibilities.map((p, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span className="text-white/80">{p.split('(')[0]}</span>
                                <span className="text-blue-400 font-bold">{p.split('(')[1]?.replace(')', '')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
