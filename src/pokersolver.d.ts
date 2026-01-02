declare module 'pokersolver' {
    export class Hand {
        static solve(cards: string[]): any;
        name: string;
        descr: string;
        rank: number;
    }
}
