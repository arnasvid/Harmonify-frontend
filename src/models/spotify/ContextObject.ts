import ExternalUrlObject from "./ExternalUrlObject";

export interface ContextObject {
  external_urls: ExternalUrlObject;
  href: string;
  type: "artist" | "playlist" | "album";
  uri: string;
}

export default ContextObject;
