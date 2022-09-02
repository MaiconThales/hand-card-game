import { Card } from "../card/Card";

export interface Deck {
    id: string;
    nameDeck: string;
    cards: Card[];
}