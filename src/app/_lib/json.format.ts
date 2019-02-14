/*export interface JsonFormat {
    id: number;
    author: string;
    title: string;
    content: string;
    tags: string[];
    categories: string[];
    publishDate: string;
    published: boolean;
}*/

export interface JsonFormat {
    title: string;
    author: {
        _id: string;
        link: string;
        display: string;
    };
    image: {
        path: string;
    };
    content: string;
    tags: string[];
    categories: {
        _id: string;
        link: string;
        display: string
    };
    published: boolean;
    _mby: string;
    _by: string;
    _modified: number;
    _created: number;
    _id: string;
}
