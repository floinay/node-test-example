import fetch from 'node-fetch';
import {RedditApiItemInterface, RedditApiResponseInterface} from './reddit-api-response.interface';
import {FetchOptionsInterface} from './fetch-options.interface';

export class RedditApiService {

    async fetch(options: FetchOptionsInterface): Promise<RedditApiItemInterface[]> {
        const response = await fetch(this.url(options));
        const data: RedditApiResponseInterface = await response.json();
        return data.data.children.map((item) => ({title: item.data.title, permalink: item.data.permalink}))
    }

    private url({category, after, limit}: FetchOptionsInterface): string {
        return `https://www.reddit.com/r/${category}.json?limit=${limit}&after=${after}`;
    }
}
