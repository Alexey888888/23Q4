const baseUrl = 'http://127.0.0.1:3000';
const keyForTotalCount = 'X-Total-Count';

enum Endpoint {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

export interface CarObjProps {
  name: string;
  color: string;
  id: number;
}

interface GetCarsResponse {
  totalNumberCars: string | null;
  carsArr: CarObjProps[];
}

export class Api {
  private static handleFetchError(err: Error) {
    const errorMessage = `Error message: ${err.message}`;
    console.log(errorMessage);
  }

  static async getCars(pageNumber: number, limit: number) {
    const responseObj: GetCarsResponse = {
      totalNumberCars: null,
      carsArr: [],
    };
    try {
      const response = await fetch(`${baseUrl}${Endpoint.garage}?_page=${pageNumber}&_limit=${limit}`);
      responseObj.totalNumberCars = response.headers.get(keyForTotalCount);
      responseObj.carsArr = await response.json();
    } catch (err) {
      this.handleFetchError(err as Error);
    }
    return responseObj;
  }

  static async getWinners(pageNumber: number, limit: number) {
    let totalNumberWinners;
    try {
      const response = await fetch(`${baseUrl}${Endpoint.winners}?_page=${pageNumber}&_limit=${limit}`);
      totalNumberWinners = response.headers.get(keyForTotalCount);
    } catch (err) {
      this.handleFetchError(err as Error);
    }
    return totalNumberWinners;
  }

  static async createCar(name: string, color: string) {
    try {
      await fetch(`${baseUrl}${Endpoint.garage}`, {
        method: 'POST',
        body: JSON.stringify({ name, color }),
      });
    } catch (err) {
      this.handleFetchError(err as Error);
    }
  }

  static deleteCar(id: number) {
    let response;
    try {
      response = fetch(`${baseUrl}${Endpoint.garage}/${id}`, { method: 'DELETE' });
    } catch (err) {
      this.handleFetchError(err as Error);
    }
    return response;
  }
}
