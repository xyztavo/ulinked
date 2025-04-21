export interface BlogProps {
    title?: string;
    posts?: Post[];
}

interface Post {
    title: string;
    description: string;
    footer: string;
}