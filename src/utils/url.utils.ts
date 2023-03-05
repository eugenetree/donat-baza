// UrlUrils class was build because native UrlSearchParams can't 
// automatically stringify non-string params which we're passing

import { Injectable } from "@nestjs/common";
import { BuildUrlParams } from "./url.utils.type";

@Injectable()
export class UrlUtils {
  buildUrl = ({ query, url: originalUrl }: BuildUrlParams): string => {
    let preparedQuery: string = '';
    let preparedUrl: string = '';

    if (query) {
      const queryAsObject: Record<string, string> = {};
      Object.entries(query).map(([key, value]) => {
        queryAsObject[key] = String(value);
      })
      preparedQuery = `?${new URLSearchParams(queryAsObject)}`;
    }

    preparedUrl =
      originalUrl.slice(-1) === '?'
        ? originalUrl.slice(0, -1)
        : originalUrl;

    return preparedUrl + preparedQuery;
  }
}
