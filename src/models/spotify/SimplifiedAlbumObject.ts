import ExternalUrlObject from "./ExternalUrlObject";
import ImageObject from "./ImageObject";
import RestrictionsObject from "./RestrictionsObject";
import SimplifiedArtistObject from "./SimplifiedArtistObject";

export interface SimplifiedAlbumObject {
  album_type: string;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: RestrictionsObject;
  type: "album";

  uri: string;
}

export default SimplifiedAlbumObject;
