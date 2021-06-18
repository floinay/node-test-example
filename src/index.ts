import {RedditParserService} from './reddit-parser/reddit-parser.service';

const parser = new RedditParserService();
parser.parse({category: 'facepalm', step: 20, count: 200}).then();
