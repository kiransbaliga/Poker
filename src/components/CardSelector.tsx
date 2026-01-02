import { Card } from './Card';
import { cn } from '../lib/utils';

type CardSelectorProps = {
    selectedCards: string[];
    onSelect: (card: string) => void;
    className?: string;
};

const SUITS = ['s', 'h', 'c', 'd'];
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export function CardSelector({ selectedCards, onSelect, className }: CardSelectorProps) {
    return (
        <div className={cn("grid grid-cols-1 gap-4 p-4 glass rounded-2xl", className)}>
            {SUITS.map(suit => (
                <div key={suit} className="flex flex-wrap gap-2 justify-center">
                    {RANKS.map(rank => {
                        const card = `${rank}${suit}`;
                        const isSelected = selectedCards.includes(card);
                        return (
                            <div key={card} className={cn("relative", isSelected && "opacity-50 grayscale")}>
                                <Card
                                    card={card}
                                    onClick={() => onSelect(card)}
                                    size="sm"
                                />
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    );
}
