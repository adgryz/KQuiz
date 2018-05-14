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
        NearbyConnection.onConnectionInitiatedToEndpoint(({
            endpointId,             // ID of the endpoint wishing to connect
            endpointName,           // The name of the remote device we're connecting to.
            authenticationToken,    // A small symmetrical token that has been given to both devices.
            serviceId,              // A unique identifier for the service
            incomingConnection      // True if the connection request was initated from a remote device.
        }) => {
            console.warn("accept connection to host");
            NearbyConnection.acceptConnection(serviceId, endpointId);
        });

        NearbyConnection.onConnectedToEndpoint(({
            endpointId,             // ID of the endpoint we connected to
            endpointName,           // The name of the service
            serviceId,              // A unique identifier for the service
        }) => {
            console.warn("connected to endpoint");

            this.endpointId = endpointId;
            acceptCallback();
        });

        console.warn("gameId: " + gameId);
        NearbyConnection.connectToEndpoint("KQUIZ", gameId);
    }

    choosePlayer(playerId) {
        console.warn("accept connection from player: " + playerId);
        NearbyConnection.acceptConnection(serviceId, playerId);
        this.endpointId = playerId;
    }

    sendQuizId(quizId) {
        console.warn("sending: " + quizId);
        NearbyConnection.sendBytes(serviceId, this.endpointId, quizId);
    }

    onGameDetailsReceived(callback) {
        console.warn("ongamedetailsreceived");
        NearbyConnection.onReceivePayload(({
            serviceId,              // A unique identifier for the service
            endpointId,             // ID of the endpoint we got the payload from
            payloadType,            // The type of this payload (File or a Stream) [See Payload](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Payload)
            payloadId               // Unique identifier of the payload
        }) => {
            console.warn("onreceivepayload");
            NearbyConnection.readBytes(
                serviceId, 
                endpointId, 
                payloadId
            ).then(({
                type,                    // The Payload.Type represented by this payload
                bytes,                   // \[Payload\.Type\.BYTES\] The bytes string that was sent
                payloadId,               // \[Payload\.Type\.FILE\ or Payload\.Type\.STREAM\] The payloadId of the payload this payload is describing
                filename,                // \[Payload\.Type\.FILE\] The name of the file being sent
                metadata,                // \[Payload\.Type\.FILE\] The metadata sent along with the file
                streamType,              // \[Payload\.Type\.STREAM\] The type of stream this is \[audio or video\]
            }) => {
                console.warn(bytes);
                callback(parseInt(bytes));
            });
        });
    }

    sendAnswers(answerInd, friendAnswerInd) {
        NearbyConnection.onReceivePayload(() => {}); // ignore payload
        NearbyConnection.sendBytes(serviceId, this.endpointId, answerInd.toString() + ":" + friendAnswerInd.toString());
    }

    onAnswersReceived(callback) {
        NearbyConnection.onReceivePayload(({
            serviceId,              // A unique identifier for the service
            endpointId,             // ID of the endpoint we got the payload from
            payloadType,            // The type of this payload (File or a Stream) [See Payload](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Payload)
            payloadId               // Unique identifier of the payload
        }) => {
            console.warn("onreceivepayload");
            NearbyConnection.readBytes(
                serviceId, 
                endpointId, 
                payloadId
            ).then(({
                type,                    // The Payload.Type represented by this payload
                bytes,                   // \[Payload\.Type\.BYTES\] The bytes string that was sent
                payloadId,               // \[Payload\.Type\.FILE\ or Payload\.Type\.STREAM\] The payloadId of the payload this payload is describing
                filename,                // \[Payload\.Type\.FILE\] The name of the file being sent
                metadata,                // \[Payload\.Type\.FILE\] The metadata sent along with the file
                streamType,              // \[Payload\.Type\.STREAM\] The type of stream this is \[audio or video\]
            }) => {
                console.warn(bytes);
                let inds = bytes.split(":");
                callback(parseInt(inds[0]), parseInt(inds[1]));
            });
        });
    }
}

export const gameService = new GameService();