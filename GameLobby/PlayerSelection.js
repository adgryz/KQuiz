import React from 'react';
import { View, Text, Button } from 'react-native';

export default class PlayerSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedPlayer: undefined }
    }

    fakePlayers = ["Wojtek", "Jasiek", "Kinga"];

    render() {
        const { navigate } = this.props.navigation;
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Select Player : </Text>
                {
                    this.fakePlayers.map(player => <View key={player} style={{ padding: 5 }}>
                        <Button
                            color={this.state.selectedPlayer === player ? "#673AB7" : "#2196F3"}
                            title={player}
                            onPress={() => this.selectPlayer(player)} />
                    </View>)
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={!this.state.selectedPlayer}
                        title="Start Game"
                        color="#F44336"
                        onPress={() => navigate('QuizStart', {username: this.props.username})} />
                </View>
            </View>
        );
    }

    selectPlayer = (player) => this.setState({ selectedPlayer: player });
}