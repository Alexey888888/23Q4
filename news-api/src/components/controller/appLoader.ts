import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;
    if (apiUrl === undefined) throw new Error();
    if (apiKey === undefined) throw new Error();
    super(apiUrl, {
      apiKey,
    });
  }
}

export default AppLoader;
