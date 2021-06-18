export interface RedditApiResponseInterface {
    data: {
        children: { data: RedditApiItemInterface }[];
    }
}

export interface RedditApiItemInterface {
    title: string;
    permalink: string;
}
