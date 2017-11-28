import v1 from './v1';
import { constructPath } from './util';

let routes = [...v1].map(constructPath.bind({ match: 'api' }));

export default routes;
