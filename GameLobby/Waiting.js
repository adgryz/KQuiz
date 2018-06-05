import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService.js';
import { quizDatabase} from '../QuizTest';

export default class Waiting extends React.Component {

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;

        this.state = { playerAccepted: false, gameId: params.gameId, username: params.username };
    }

    componentDidMount() {
        gameService.joinGame(
            this.state.gameId,
            this.state.username,
            () => {
                gameService.onGameDetailsReceived(async (quizId) => {
                    console.warn("game details received");

                    const { params } = this.props.navigation.state;
                    const username = params ? params.username : null;
                    const friendname = params ? params.friendname : null;
                    this.setState({ playerAccepted: true });
                    this.props.navigation.navigate('QuizStart', {
                        username: username,
                        quiz: quizDatabase.quizzes.find(quiz => quiz.id === quizId),
                        friendname: friendname
                    });
                })
            }
        );
    }
   
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