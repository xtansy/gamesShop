export type Game = {
    id: number;
    type: string;
    rating: number;
    name: string;
    count: number;
    price: number;
    imageUrl: string;
    bigImageUrl?: string;
};

export interface IGames {
    games: Game[];
    allGames: Game[];
    searchedStr: string;
    isLoading: boolean;
    paginateCount: number;
}
