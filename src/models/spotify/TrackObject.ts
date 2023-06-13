import ExternalIdObject from "./ExternalIdObject";
import ExternalUrlObject from "./ExternalUrlObject";
import SimplifiedAlbumObject from "./SimplifiedAlbumObject";
import SimplifiedArtistObject from "./SimplifiedArtistObject";

export interface TrackObject {
  album: SimplifiedAlbumObject;
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIdObject;
  external_urls: ExternalUrlObject;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
}

export default TrackObject;
