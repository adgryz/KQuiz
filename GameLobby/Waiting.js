import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService.js';
import { quizDatabase } from '../QuizTest';
import NavButton from "../Custom/NavButton";

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
                    //console.warn("game details received");

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#231F20" }}>Waiting for acceptance ...</Text>

                <View style={{ padding: 10, marginTop: 15 }}>
                    <NavButton
                        title="CANCEL"
                        bgColor="#f44336"
                        color="#303030"
                        bgColorDisabled="#231F20"
                        colorDisabled="#303030"
                        disabled={false}
                        onPress={() => this.props.navigation.goBack()} />
                </View>
            </View>
        );
    }


    selectQuiz = (quiz) => this.setState({ selectedQuiz: quiz });
}