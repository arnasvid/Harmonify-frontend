import ContextObject from "./ContextObject";
import TrackObject from "./TrackObject";

export interface PlayHistoryObject {
  track: TrackObject;
  played_at: string;
  context: ContextObject;
}

export default PlayHistoryObject;
