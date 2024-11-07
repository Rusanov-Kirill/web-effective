export interface Post {
    id: number;
    name: string;
    description: string;
    image: string;
    participatingIn: Comic[];
}

interface Comic {
    name: string;
    url: string;
}