import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService';
import NavButton from "../Custom/NavButton";
import OptionButton from "../Custom/OptionButton";

export default class PlayerSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            params: props.navigation.state,
            selectedPlayer: undefined,
            players: []
        }

        const { params } = props.navigation.state;
        this.params = params;
    }

    componentDidMount() {
        gameService.createGame(
            this.params.username,
            ({
                playerId,
                playerName
            }) => {
                let players = Array.from(this.state.players);
                players.push({ id: playerId, name: playerName });

                this.setState({
                    players: players
                });
            }
        );
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const quiz = params ? params.quiz : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15, color: '#F2F2F2' }}>Select Friend</Text>
                {
                    this.state.players.map(player => <View key={player.id} style={{ padding: 5 }}>
                        <OptionButton
                            isSelected={this.state.selectedPlayer === player}
                            title={player.name}
                            onPress={() => this.selectPlayer(player)} />
                    </View>)
                }
                {
                    this.state.players.length === 0 &&
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#231F20' }}>NO FRIENDS :(</Text>
                }
                <View style={{ padding: 10, marginTop: 15 }}>
                    <NavButton
                        disabled={!this.state.selectedPlayer}
                        title="START GAME"
                        onPress={() => {
                            gameService.choosePlayer(this.state.selectedPlayer.id);
                            gameService.sendQuizId(quiz.id);

                            this.props.navigation.navigate('QuizStart', {
                                username: username,
                                friendname: this.state.selectedPlayer.name,
                                quiz: quiz
                            });
                        }}
                    />
                </View>
            </View>
        );
    }

    selectPlayer = (player) => this.setState({ selectedPlayer: player });
}