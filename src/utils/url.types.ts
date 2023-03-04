import { string } from "joi";


export abstract class UrlUtils {
  abstract buildUrl: (
    params: { url: string, query: Record<string, unknown>, path?: string }
  ) => string;
}