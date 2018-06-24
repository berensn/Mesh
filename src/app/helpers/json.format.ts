// Entry format of json files
export interface JsonFormat {
    id: number;             // Entry ID number (primary key)
    author: string;         // Entry author
    title: string;          // Entry title
    content: string;        // Entry
    tags: string[];         // Entry tags
    categories: string[];   // Entry categories
    publishDate: string;    // Entry published date
    published: boolean;     // Flag that determines whether to display entry or not
}
