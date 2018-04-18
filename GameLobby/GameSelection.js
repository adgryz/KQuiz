import React from 'react';
import { View, Text, Button } from 'react-native';

export default class GameSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedGame: undefined }
    }

    fakeGames = ["Favourite meals by Kinga", "Scary by Adam"];

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Join Game : </Text>
                {
                    this.fakeGames.map(game => <View key={game} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedGame === game ? "#673AB7" : "#2196F3"}
                            title={game}
                            onPress={() => this.selectGame(game)} />
                    </View>)
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={!this.state.selectedGame}
                        title="Start Game"
                        color="#F44336"
                        onPress={() => navigate('Waiting')} />
                </View>
            </View>
        );
    }

    selectGame = (game) => this.setState({ selectedGame: game });
    
}
