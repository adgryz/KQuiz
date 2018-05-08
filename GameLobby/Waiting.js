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
                gameService.onReceivedGameDetails((quizId) => {
                    const { params } = props.navigation.state;
                    const username = params ? params.username : null;
                    const friendname = params ? params.friendname : null;

                    this.setState({ playerAccepted: true });
                    props.navigation.navigate('QuizStart', {
                        username: username,
                        quiz: this.fakeQuizes.filter(quiz => quiz.id === quizId)[0],
                        friendname: friendname
                    });
                })
            }
        );
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