import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Waiting extends React.Component {

    constructor(props) {
        super(props);
        this.state = { playerAccepted: false };
    }

    componentDidMount() {
        gameService.joinGame(
            this.state.selectedGame.id,
            () => {
                const { params } = props.navigation.state;
                const username = params ? params.username : null;
                const quiz = params ? params.quiz : null;
                const friendname = params ? params.friendname : null;

                this.setState({ playerAccepted: true });
                props.navigation.navigate('QuizStart', {
                    username: username,
                    quiz: quiz,
                    friendname:friendname
                });
            }
        );
    }

    fakeQuizes = ["Favourite meals", "Scary", "Dreams", "Disgusting", "Songs"];

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const quiz = params ? params.quiz : null;
        const friendname = params ? params.friendname : null;
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Waiting for acceptance ...</Text>
            
                <View style={{ padding: 10 }}>
                    <Button
                        title="Cancel"
                        color="#F44336"
                        onPress={() => this.props.navigation.goBack()} />
                </View>
            </View>
        );
    }

    selectQuiz = (quiz) => this.setState({ selectedQuiz: quiz });
}