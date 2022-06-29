export interface IFilter {
    category: null | string;
    sortBy: {
        type: typeOfSort;
        order: string;
    };
}

export type typeOfSort = {
    name: string;
    type: string;
};
