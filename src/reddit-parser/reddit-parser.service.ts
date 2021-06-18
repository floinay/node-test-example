import {RedditApiService} from '../reddit-api/reddit-api.service';
import {ParseOptionsInterface} from './parse-options.interface';
import {RedditApiItemInterface} from '../reddit-api/reddit-api-response.interface';
import * as fs from 'fs';


export class RedditParserService {
    private apiService = new RedditApiService();

    async parse(options: ParseOptionsInterface) {
        let result: RedditApiItemInterface[] = [];
        const queries = this.generateQueries(options);
        for await (let items of queries) {
            result = [...result, ...items];
        }
        await this.putResponse(options.category, result);
    }

    private async putResponse(category: string, data: RedditApiItemInterface[]) {
        await fs.writeFile(`./data/${category}.json`, JSON.stringify(data), err => console.error(err));
    }

    private generateQueries({count, step, category}: ParseOptionsInterface): Promise<RedditApiItemInterface[]>[] {
        const queries: Promise<RedditApiItemInterface[]>[] = [];
        for (let i = 0; i < count; i += step) {
            queries.push(this.apiService.fetch({category, after: i, limit: step - 1}));
        }

        return queries;
    }
}
