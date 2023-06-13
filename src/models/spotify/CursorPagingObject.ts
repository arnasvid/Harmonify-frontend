import CursorObject from "./CursorObject";

export interface CursorPagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  cursors: CursorObject;
  total: number;
}

export default CursorPagingObject;
