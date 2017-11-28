import test from './test';
import users from './users';
import { constructPath } from '../util';

let routes = [...test, ...users].map(constructPath.bind({ match: 'v1' }));

export default routes;
