interface StatusResponse {
    isUserLoggedIn: boolean;
    isUserLoggedInWithSpotify?: boolean;
    isUserAdmin?: boolean;
}

export default StatusResponse;