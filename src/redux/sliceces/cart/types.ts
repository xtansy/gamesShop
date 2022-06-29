import { Game } from "../games/types";

export type CartItem = {
    id: number;
    name: string;
    count: number;
    price: number;
    imageUrl: string;
    bigImageUrl?: string;
};

export interface ICart {
    cart: CartItem[];
    totalPrice: number;
    totalCount: number;
}
