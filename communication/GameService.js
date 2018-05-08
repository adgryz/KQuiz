import NearbyConnection, {CommonStatusCodes, ConnectionsStatusCodes, Strategy, Payload, PayloadTransferUpdate} from 'react-native-google-nearby-connection';
const serviceId = "KQUIZ";

export default class GameService {
    searchForGames(callback) {
        NearbyConnection.onEndpointDiscovered(({
            endpointId,
            endpointName,
        }) => {
            callback({gameId: endpointId, gameName: endpointName});
            NearbyConnection.stopDiscovering(serviceId);
        });

        NearbyConnection.startDiscovering(
            serviceId,
            Strategy.P2P_STAR
        );
    }

    createGame(gameName, playerJoinCallback) {
        NearbyConnection.onConnectionInitiatedToEndpoint(({
            endpointId,             // ID of the endpoint wishing to connect
            endpointName,           // The name of the remote device we're connecting to.
            authenticationToken,    // A small symmetrical token that has been given to both devices.
            serviceId,              // A unique identifier for the service
            incomingConnection      // True if the connection request was initated from a remote device.
        }) => {
            playerJoinCallback({playerId: endpointId, playerName: endpointName});
        });

        NearbyConnection.startAdvertising(
            gameName,
            serviceId,
            Strategy.P2P_STAR
        );
    }

    joinGame(gameId, acceptCallback) {
        NearbyConnection.onConnectedToEndpoint(({
            endpointId,             // ID of the endpoint we connected to
            endpointName,           // The name of the service
            serviceId,              // A unique identifier for the service
        }) => {
            acceptCallback();
        });

        NearbyConnection.connectToEndpoint("KQUIZ", gameId);
    }

    choosePlayer(playerId) {
        NearbyConnection.acceptConnection(serviceId, playerId);
    }
}

export const gameService = new GameService();