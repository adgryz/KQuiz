import React from 'react';
import { View, Text, Button } from 'react-native';
import NearbyConnection, {CommonStatusCodes, ConnectionsStatusCodes, Strategy, Payload, PayloadTransferUpdate} from 'react-native-google-nearby-connection';

export default class GameSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            selectedGame: undefined, 
            availableGames: [] }
    }

    componentDidMount() {
        NearbyConnection.onEndpointDiscovered(({
            endpointId,             // ID of the endpoint wishing to connect
            endpointName,           // The name of the remote device we're connecting to.
            serviceId               // A unique identifier for the service
        }) => {
            // An endpoint has been discovered we can connect to
            console.warn("endpoint discovered: " + endpointId + " " + endpointName);
            this.state.availableGames.push({ id: endpointId, owner: endpointName });
            
            this.setState({
                availableGames: this.state.availableGames 
            });
        });

        NearbyConnection.startDiscovering(
            "KQUIZ",
            Strategy.P2P_STAR                // A unique identifier for the service
        );
    }

    //fakeGames = [{quiz: "Favourite meals", owner: "Kinga"}, {quiz: "Scary", owner: "Adam"}];

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Join Game : </Text>
                {
                    this.state.availableGames.map(game => <View key={game.id + game.owner} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedGame === game ? "#673AB7" : "#2196F3"}
                            title={game.id + " by " + game.owner}
                            onPress={() => this.selectGame(game)} />
                    </View>)
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={!this.state.selectedGame}
                        title="Start Game"
                        color="#F44336"
                        onPress={() => {
                            NearbyConnection.connectToEndpoint("KQUIZ", this.state.selectedGame.id);

                            this.props.navigation.navigate('Waiting', {
                              username: username,
                              quiz: this.state.selectedGame.quiz,
                              friendname: this.state.selectedGame.owner
                            });
                          }}/>
                </View>
            </View>
        );
    }

    selectGame = (game) => {
        this.setState({ selectedGame: game });
    }
}
