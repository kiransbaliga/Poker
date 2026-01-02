import { useState, useMemo } from 'react';
import { Hand } from 'pokersolver';

export type CardType = string; // "As", "Th", "2d" etc.
export type Stage = 'hole' | 'flop' | 'turn' | 'river';

const SUITS = ['d', 'c', 'h', 's'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export const FULL_DECK = SUITS.flatMap(suit => RANKS.map(rank => `${rank}${suit}`));

export function usePoker() {
    const [holeCards, setHoleCards] = useState<CardType[]>([]);
    const [communityCards, setCommunityCards] = useState<CardType[]>([]);
    // const [activeSelection, setActiveSelection] = useState<'hole' | 'community' | null>(null);

    const selectedCards = useMemo(() => [...holeCards, ...communityCards], [holeCards, communityCards]);

    const bestHand = useMemo(() => {
        if (holeCards.length === 0 && communityCards.length === 0) return null;
        const cards = [...holeCards, ...communityCards];
        if (cards.length === 0) return null;

        // pokersolver needs at least 3-5 cards typically for a "hand" but checks high card for less?
        // Actually Hand.solve needs at least some cards.
        // If < 5 cards, it's partial. pokersolver works best with 5-7 cards.
        // For < 5, we can just show "High Card" or wait.
        // But evaluating "current status" usually implies "at showdown if no more cards came" or "current made hand".
        // For Texas Hold'em, a hand is best 5 of 7.
        // If we have fewer, we can still evaluate.
        try {
            const solved = Hand.solve(cards);
            return solved;
        } catch (e) {
            return null;
        }
    }, [holeCards, communityCards]);

    const topPossibilities = useMemo(() => {
        const currentTotal = holeCards.length + communityCards.length;
        if (currentTotal < 2 || currentTotal >= 7) return [];

        // Simple simulation: What if we add ONE more card?
        // This gives "Next Card Probabilities"
        const availableCards = FULL_DECK.filter(c => !selectedCards.includes(c));
        const counts: Record<string, number> = {};

        // We only simulate the immediate next card for speed and relevance
        // For Flop (5 cards), we look at Turn.
        // For Turn (6 cards), we look at River.
        // For Preflop (2 cards), we look at Flop (too many? 3 cards). 
        // Let's just do single card lookahead for now. 
        // Actually, for Flop, we have 2 cards to come. 
        // Checking just next card is "What is my hand on the Turn?".

        availableCards.forEach(card => {
            try {
                const nextHand = Hand.solve([...holeCards, ...communityCards, card]);
                counts[nextHand.name] = (counts[nextHand.name] || 0) + 1;
            } catch (e) { }
        });

        const totalSims = availableCards.length;
        const probs = Object.entries(counts)
            .map(([name, count]) => ({ name, prob: (count / totalSims) * 100 }))
            .sort((a, b) => b.prob - a.prob)
            .slice(0, 3) // Top 3
            .map(p => `${p.name} (${p.prob.toFixed(1)}%)`);

        return probs;
    }, [holeCards, communityCards, selectedCards]);

    const toggleCard = (card: CardType) => {
        // Logic to add/remove card based on active selection mode or general input?
        // Let's assume user clicks a slot, then clicks a card.
        // Or user just toggles card in/out of "current active slot group".

        if (selectedCards.includes(card)) {
            // Remove
            setHoleCards(prev => prev.filter(c => c !== card));
            setCommunityCards(prev => prev.filter(c => c !== card));
        } else {
            // Add
            // Depends on where we want to add.
            // For simplicity: Fill hole cards first (max 2), then community (max 5).
            if (holeCards.length < 2) {
                setHoleCards(prev => [...prev, card]);
            } else if (communityCards.length < 5) {
                setCommunityCards(prev => [...prev, card]);
            }
        }
    };

    const reset = () => {
        setHoleCards([]);
        setCommunityCards([]);
    };

    return {
        holeCards,
        communityCards,
        bestHand,
        toggleCard,
        reset,
        selectedCards,
        topPossibilities
    };
}
