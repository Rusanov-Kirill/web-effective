export interface Post {
    id: number;
    name: string;
    description: string;
    image: string;
    participatingIn: Comic[];
}

interface Comic {
    id: number;
    name: string;
}