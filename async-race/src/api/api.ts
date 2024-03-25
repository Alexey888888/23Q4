const baseUrl = 'http://127.0.0.1:3000';
const keyForTotalCount = 'X-Total-Count';

enum Endpoint {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

export default class Api {
  private static handleFetchError(err: Error) {
    const errorMessage = `Error message: ${err.message}`;
    console.log(errorMessage);
  }

  static async getCars(pageNumber: number, limit: number) {
    let totalNumberCars;
    try {
      const response = await fetch(`${baseUrl}${Endpoint.garage}?_page=${pageNumber}&_limit=${limit}`);
      totalNumberCars = response.headers.get(keyForTotalCount);
    } catch (err) {
      this.handleFetchError(err as Error);
    }
    return totalNumberCars;
  }

  static async getWinners(pageNumber: number, limit: number) {
    let totalNumberWinners;
    try {
      const response = await fetch(`${baseUrl}${Endpoint.winners}?_page=${pageNumber}&_limit=${limit}`);
      totalNumberWinners = response.headers.get(keyForTotalCount);
      console.log(totalNumberWinners);
    } catch (err) {
      this.handleFetchError(err as Error);
    }
    return totalNumberWinners;
  }
}
