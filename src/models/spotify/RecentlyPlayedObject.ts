import CursorObject from "./CursorObject";
import PlayHistoryObject from "./PlayHistoryObject";

export interface RecentlyPlayedObject {
  href: string;
  items: PlayHistoryObject[];
  limit: number;
  next: string;
  cursors: CursorObject;
  total: number;
}

export default RecentlyPlayedObject;
