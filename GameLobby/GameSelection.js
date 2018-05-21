import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService';

export default class GameSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedGame: undefined,
            availableGames: []
        };
    }

    componentDidMount() {
        gameService.searchForGames(({
            gameId,
            gameName,
        }) => {
            // An endpoint has been discovered we can connect to
            console.warn("endpoint discovered: " + gameId + " " + gameName);
            this.state.availableGames.push({ id: gameId, owner: gameName });

            this.setState({
                availableGames: this.state.availableGames
            });
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
i
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
                            this.props.navigation.navigate('Waiting', {
                                username: username,
                                gameId: this.state.selectedGame.id,
                                friendname: this.state.selectedGame.owner
                            });
                        }} />
                </View>
            </View>
        );
    }

    selectGame = (game) => {
        this.setState({ selectedGame: game });
    }
}
