import { motion } from 'framer-motion';
import { Heart, Diamond, Club, Spade } from 'lucide-react';
import { cn } from '../lib/utils'; // Assumes utils.ts exists

type CardProps = {
    card: string; // "As", "Td", etc.
    onClick?: () => void;
    selected?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
};

const SUIT_ICONS = {
    h: Heart,
    d: Diamond,
    c: Club,
    s: Spade,
};

const SUIT_COLORS = {
    h: 'text-red-500',
    d: 'text-red-500',
    c: 'text-slate-200',
    s: 'text-slate-200',
};



export function Card({ card, onClick, selected, className, size = 'md' }: CardProps) {
    const rank = card.slice(0, -1);
    const suitChar = card.slice(-1) as keyof typeof SUIT_ICONS;
    const SuitIcon = SUIT_ICONS[suitChar];
    const colorClass = SUIT_COLORS[suitChar];

    const sizeClasses = {
        sm: 'w-10 h-14 text-xs',
        md: 'w-16 h-24 text-base',
        lg: 'w-24 h-36 text-xl',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center justify-center rounded-lg border border-white/10 shadow-xl select-none cursor-pointer transition-all",
                "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md", // Glass effect
                selected ? "ring-2 ring-blue-500 shadow-blue-500/50" : "hover:bg-white/15",
                sizeClasses[size],
                colorClass,
                className
            )}
        >
            {/* Top Left Rank */}
            <div className="absolute top-1 left-1.5 font-bold leading-none">
                {rank}
            </div>

            {/* Center Suit */}
            <SuitIcon className={cn(size === 'sm' ? "w-4 h-4" : size === 'md' ? "w-8 h-8" : "w-12 h-12")} fill="currentColor" />

            {/* Bottom Right Rank (inverted) */}
            <div className="absolute bottom-1 right-1.5 font-bold leading-none rotate-180">
                {rank}
            </div>
        </motion.div>
    );
}
