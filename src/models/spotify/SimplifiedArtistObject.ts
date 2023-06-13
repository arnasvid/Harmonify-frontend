import ExternalUrlObject from "./ExternalUrlObject";

export interface SimplifiedArtistObject {
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export default SimplifiedArtistObject;
