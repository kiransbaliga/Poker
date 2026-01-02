import { motion } from 'framer-motion';
import { X, Trophy, TrendingUp, Hand } from 'lucide-react';

type HelpModalProps = {
    onClose: () => void;
};

export function HelpModal({ onClose }: HelpModalProps) {
    const steps = [
        {
            title: "Your Hand",
            icon: Hand,
            desc: "Start by selecting your two 'Hole Cards' by clicking the empty card slots."
        },
        {
            title: "Community Cards",
            icon: Trophy,
            desc: "As the game progresses, add the Flop (3 cards), Turn (1 card), and River (1 card)."
        },
        {
            title: "Real-time Stats",
            icon: TrendingUp,
            desc: "View your current best hand immediately. On the Flop & Turn, see the top 3 best possible hands you could make next."
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass p-6 rounded-2xl w-full max-w-md relative overflow-hidden bg-[#1a1a1a]/90 border border-white/10 shadow-2xl"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        How to Play
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-white/70" />
                    </button>
                </div>

                {/* Steps */}
                <div className="space-y-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <step.icon size={18} className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white/90 text-sm mb-1">{step.title}</h3>
                                <p className="text-xs text-white/50 leading-relaxed font-medium">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-bold text-white shadow-lg active:scale-95 transition-transform"
                    >
                        Got it!
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
