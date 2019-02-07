import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {
  constructor() {}

  transform(request: any): any {
    let response = this.removeUnderscore(request);
    response = this.backToArray(response);
    return response;
  }

  private removeUnderscore(obj: object): object {
    const returnObj = {};
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object' && typeof obj[key] !== null) {
        returnObj[key.replace('_', '')] = this.removeUnderscore(obj[key]);
      } else {
        returnObj[key.replace('_', '')] = obj[key];
      }
    }
    return returnObj;
  }

  private backToArray(obj: object): object {
    const returnObj = {};
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        returnObj[key] = [];
        for (const value of Object.values(obj[key])) {
          returnObj[key].push(value);
        }
      } else {
        returnObj[key] = obj[key];
      }
    }
    return returnObj;
  }
}
