import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {
  constructor() {}

  /**
   * A function for all services to take advantage of that will remove any underscores from an object
   * and transform their value to the expected format for the server
   * @param request The general request to transform. This will be especially used for character related objects.
   */
  transform(request: any): any {
    let response = this.removeUnderscore(request);
    response = this.backToArray(response);
    return response;
  }

  /**
   * Function to remove the underscore from object fields. i.e.
   *
   * { _name: 'Jay' }
   * would be transformed into
   *
   * { name: 'Jay' }
   * @param obj The object that is to be transformed
   */
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

  /**
   * Function that takes the return from removeUnderscore and transforms it back to having correct array values.
   * Now instead of having object+array values, it will only be array values.
   * @param obj Object to turn back into a normal object with array values and everything
   */
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
