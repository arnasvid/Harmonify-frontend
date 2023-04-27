interface RouteItem {
	path: string;
	key: string;
	element: JSX.Element;
	isForEveryone?: boolean;
	isForAuthorized?: boolean;
    isForSpotifyConnected?: boolean;
    isForAdmin?: boolean;
	isLink?: boolean;
}

export default RouteItem;