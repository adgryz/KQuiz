import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService';
import NavButton from "../Custom/NavButton";
import OptionButton from "../Custom/OptionButton";

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
            this.state.availableGames.push({ id: gameId, owner: gameName });

            this.setState({
                availableGames: this.state.availableGames
            });
        });
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15, color: '#F2F2F2' }}>Join Game</Text>
                {
                    this.state.availableGames.map(game => <View key={game.id + game.owner} style={{ padding: 5 }}>
                        <OptionButton
                            isSelected={this.state.selectedGame === game}
                            title={game.owner + "'s quiz"}
                            onPress={() => this.selectGame(game)} />
                    </View>)
                }
                {
                    this.state.availableGames.length === 0 &&
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#231F20' }}>NO GAMES :(</Text>
                }
                <View style={{ padding: 10, marginTop: 15 }}>
                    <NavButton
                        disabled={!this.state.selectedGame}
                        title="Start Game"
                        bgColor="#f44336"
                        onPress={() => {
                            this.props.navigation.navigate('Waiting', {
                                username: username,
                                gameId: this.state.selectedGame.id,
                                friendname: this.state.selectedGame.owner
                            });
                        }}
                        color="#303030"
                        bgColorDisabled="#231F20"
                        colorDisabled="#303030"
                    />
                </View>
            </View>
        );
    }

    selectGame = (game) => {
        this.setState({ selectedGame: game });
    }
}
