import { Callback, requestData } from '../service/types';

export enum errorStatus {
  Unauthorized = 401,
  NotFound = 404,
}

export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

class Loader {
  private baseLink: Endpoint | string;
  private options: Record<string, string>;
  constructor(baseLink: Endpoint | string, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<Data>(
    { endpoint, options }: requestData,
    callback: Callback<Data> = () => {
      console.error('No callback for GET response');
    },
  ) {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === errorStatus.Unauthorized || res.status === errorStatus.NotFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Record<string, string>, endpoint: Endpoint) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<Data>(method: string, endpoint: Endpoint, callback: Callback<Data>, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
