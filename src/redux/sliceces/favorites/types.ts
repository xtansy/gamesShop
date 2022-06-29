export type FavoriteItem = {
    id: number;
    name: string;
    count: number;
    price: number;
    imageUrl: string;
    bigImageUrl?: string;
};

export interface IFavorites {
    isLoading: boolean;
    favorites: FavoriteItem[];
}
