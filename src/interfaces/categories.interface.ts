export interface Category {
    _id: string;
    name: string;
    slug: string;
    status: 'active' | 'inactive';
}