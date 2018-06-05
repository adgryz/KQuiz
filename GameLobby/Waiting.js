import React from 'react';
import { View, Text, Button } from 'react-native';
import { gameService } from '../communication/GameService.js';
import getQuiz from "../QuizStorage";

export default class Waiting extends React.Component {

    constructor(props) {
        super(props);
        const { params } = props.navigation.state;

        this.state = { playerAccepted: false, gameId: params.gameId, quiz: undefined };
    }

    componentDidMount() {
        gameService.joinGame(
            this.state.gameId,
            () => {
                gameService.onGameDetailsReceived(async (quizId) => {
                    console.warn("game details received");

                    const { params } = this.props.navigation.state;
                    const username = params ? params.username : null;
                    const friendname = params ? params.friendname : null;
                    this.setState({ playerAccepted: true });
                    const q = await this.downloadQuiz(quizId);
                    console.log(q);
                    this.props.navigation.navigate('QuizStart', {
                        username: username,
                        quiz: q,
                        friendname: friendname
                    });
                })
            }
        );
    }

    downloadQuiz = async (key) => {
        return await getQuiz(key);
    }

    fakeQuizes = [
        {
            id: 1,
            title: "Favourite meals",
            questions: [
                {
                    text: "What is the best italian dish ?",
                    answers: ["Spaghetti", "Carbonara", "Pizza", "Lazagne"]
                },
                {
                    text: "What is the best polish food ?",
                    answers: ["Bigos", "Pierogi", "Schabowe", "Gołąbki"]
                },
                {
                    text: "Favourite cusine ?",
                    answers: ["Polish", "Italian", "Thai", "French"]
                }
            ]
        },
        {
            id: 2,
            title: "Scary",
            questions: [
                {
                    text: "The most scary are ?",
                    answers: ["clowns", "snakes", "spiders", "debts"]
                },
                {
                    text: "What is you favourite monster ?",
                    answers: ["Alien", "Dracula", "Predator", "Werewolf"]
                }
            ]
        }
    ];

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