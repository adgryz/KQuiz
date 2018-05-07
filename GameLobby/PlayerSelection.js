import React from 'react';
import { View, Text, Button } from 'react-native';
import NearbyConnection, {CommonStatusCodes, ConnectionsStatusCodes, Strategy, Payload, PayloadTransferUpdate} from 'react-native-google-nearby-connection';

export default class PlayerSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            params: props.navigation.state,    
            selectedPlayer: undefined,
            players: []
        }
    }

    componentDidMount() {
        NearbyConnection.onConnectionInitiatedToEndpoint(({
            endpointId,             // ID of the endpoint wishing to connect
            endpointName,           // The name of the remote device we're connecting to.
            authenticationToken,    // A small symmetrical token that has been given to both devices.
            serviceId,              // A unique identifier for the service
            incomingConnection      // True if the connection request was initated from a remote device.
        }) => {
            // Connection has been initated

            this.state.players.push({id: endpointId, name: endpointName});

            this.setState({
                players: this.state.players
            });
        });
        
        NearbyConnection.startAdvertising(
            this.state.params.username,               // This nodes endpoint name
            "KQUIZ",              // A unique identifier for the service
            Strategy.P2P_STAR     // The Strategy to be used when discovering or advertising to Nearby devices [See Strategy](https://developers.google.com/android/reference/com/google/android/gms/nearby/connection/Strategy)
        );
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const quiz= params ? params.quiz : null;
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Select Player : </Text>
                {
                    this.state.players.map(player => <View key={player.id} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedPlayer === player ? "#673AB7" : "#2196F3"}
                            title={player.name}
                            onPress={() => this.selectPlayer(player)} />
                    </View>)
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={!this.state.selectedPlayer}
                        title="Start Game"
                        color="#F44336"
                        onPress={() => {
                            this.props.navigation.navigate('QuizStart', {
                              username: username,
                              friendname: this.state.selectedPlayer.name,
                              quiz: quiz
                            });
                          }} />
                </View>
            </View>
        );
    }

    selectPlayer = (player) => this.setState({ selectedPlayer: player });
}