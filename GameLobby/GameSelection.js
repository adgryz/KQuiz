import React from 'react';
import { View, Text, Button } from 'react-native';

export default class GameSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedGame: undefined }
    }

    fakeGames = [{quiz: "Favourite meals", owner: "Kinga"}, {quiz: "Scary", owner: "Adam"}];

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Join Game : </Text>
                {
                    this.fakeGames.map(game => <View key={game.quiz + game.owner} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedGame === game ? "#673AB7" : "#2196F3"}
                            title={game.quiz + " by " + game.owner}
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
                              quiz: this.state.selectedGame.quiz,
                              friendname: this.state.selectedGame.owner
                            });
                          }}/>
                </View>
            </View>
        );
    }

    selectGame = (game) => this.setState({ selectedGame: game });
    
}
