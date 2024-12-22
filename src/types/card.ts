interface CardProps {
    id: number;
    image: string;
    name: string;
    description: string;
    link: string;
    participatingIn?: string[];
}

interface CardComponentProps extends CardProps {
    onFavoriteUpdate?: (id: number) => void;
}

export default CardComponentProps