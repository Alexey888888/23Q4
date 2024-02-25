import { isDefined } from '../service/functions';
import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    const apiUrl = isDefined(process.env.API_URL);
    const apiKey = isDefined(process.env.API_KEY);

    super(apiUrl, {
      apiKey,
    });
  }
}

export default AppLoader;
