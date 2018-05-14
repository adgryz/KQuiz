import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService';

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
                players.push({id: playerId, name: playerName});
                
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
                        disabled={this.state.selectedPlayer === undefined}
                        title="Start Game"
                        color="#F44336"
                        onPress={() => {
                            console.warn("asd");
                            gameService.choosePlayer(this.state.selectedPlayer.id);
                            gameService.sendQuizId(quiz.id);

                            this.props.navigation.navigate('QuizStart', {
                                username: username,
                                // friendname: this.state.selectedPlayer.name,
                                friendname: "someFriend",
                                quiz: quiz
                            });
                        }} />
                </View>
            </View>
        );
    }

    selectPlayer = (player) => this.setState({ selectedPlayer: player });
}