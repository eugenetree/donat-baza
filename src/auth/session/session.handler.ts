import { Injectable } from "@nestjs/common";
import { SESSION_KEYS } from "./session.constants";

@Injectable()
export class SessionHandler {
  getUserId(session: any): number | undefined {
    const userId = session?.[SESSION_KEYS.userId];
    return typeof userId === "number" ? userId : undefined;
  }

  setUserId(session: any, id: number) {
    if (session) session[SESSION_KEYS.userId] = id;
  }

  destoySession(session: any) {
    session.destroy();
  }
}