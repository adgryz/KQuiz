import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { PlayerQuestion } from './PlayerQuestion';
import { FriendQuestion } from './FriendQuestion';
import { Answers } from './Answers';
import { AnswerWaiting } from './AnswerWaiting';
import { gameService } from '../communication/GameService';

export default class Quiz extends React.Component {


    constructor(props) {
        super(props);
        this.state = { phase: "player", questionNo: 0, yourScore: 0, friendScore: 0, receivedAnswers: false }

        gameService.onAnswersReceived((answerId, guessId) => {
            console.warn("answers received");
            const { params } = this.props.navigation.state;
            let currentQuestion = params.quiz.questions[this.state.questionNo];
            this.setState(
                {
                    friendAnswer: currentQuestion.answers[answerId],
                    friendGuess: currentQuestion.answers[guessId],
                    receivedAnswers: true
                });

            if (this.state.phase === "waiting")
                this.changePhase();
        })
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const friendname = params ? params.friendname : null;
        const quiz = params ? params.quiz : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Question {this.state.questionNo + 1}</Text>
                <Text>Your Score : {this.state.yourScore}</Text>
                <Text>Friend's Score: {this.state.friendScore}</Text>
                {
                    this.state.phase === "player" &&
                    <PlayerQuestion
                        question={quiz.questions[this.state.questionNo]}
                        selectedAnswer={this.state.yourAnswer}
                        onSelect={this.onAnswer} />
                }
                {
                    this.state.phase === "friend" &&
                    <FriendQuestion
                        friendname={friendname}
                        question={quiz.questions[this.state.questionNo]}
                        selectedAnswer={this.state.yourGuess}
                        onSelect={this.onGuess} />
                }
                {
                    this.state.phase === "waiting" &&
                    <AnswerWaiting
                        friendname={friendname} />
                }
                {
                    this.state.phase === "answer" &&
                    <Answers
                        question={quiz.questions[this.state.questionNo]}
                        friendname={friendname}
                        yourAnswer={this.state.yourAnswer}
                        yourGuess={this.state.yourGuess}
                        friendAnswer={this.state.friendAnswer}
                        friendGuess={this.state.friendGuess}
                        changeScores={this.changeScores} />
                }
                <View style={{ padding: 10 }}>
                    <Button
                        disabled={this.isNextDisabled()}
                        title="Next"
                        color="#F44336"
                        onPress={this.changePhase} />
                </View>
            </View>
        );
    }

    onAnswer = (answer) => {
        this.setState({ yourAnswer: answer });
    }

    onGuess = (guess) => {
        this.setState({ yourGuess: guess });
    }

    isNextDisabled = () => {
        if (this.state.phase == "player" && !this.state.yourAnswer)
            return true;

        if (this.state.phase == "friend" && !this.state.yourGuess)
            return true;

        return false;
    }

    changePhase = () => {
        const { params } = this.props.navigation.state;
        let currentQuestion = params.quiz.questions[this.state.questionNo];

        if (this.state.questionNo === params.quiz.questions.length - 1 && this.state.phase == "answer") {
            this.props.navigation.navigate('Landing', {});
        }

        else if (this.state.phase == "player")
            this.setState({ phase: "friend" });

        // gameService.onAnswersReceived((answerId, guessId) => {
        //     this.setState({ friendAnswer: currentQuestion.answers[answerId], friendGuess: currentQuestion[guessId], receivedAnswers: true });
        // })

        else if (this.state.phase == "friend" || this.state.phase == "waiting" && !this.state.receivedAnswers) {
            let answerInd = currentQuestion.answers.indexOf(this.state.yourAnswer);
            let guessInd = currentQuestion.answers.indexOf(this.state.yourGuess);
            gameService.sendAnswers(answerInd, guessInd);
            console.warn("answers sent, gonna wait");
            this.setState({ phase: "waiting" });
        }

        else if (this.state.phase == "friend" || this.state.phase == "waiting" && this.state.receivedAnswers) {
            let answerInd = currentQuestion.answers.indexOf(this.state.yourAnswer);
            let guessInd = currentQuestion.answers.indexOf(this.state.yourGuess);
            gameService.sendAnswers(answerInd, guessInd);
            console.warn("answers sent, go to answer");
            this.setState({ phase: "answer" });
        }

        else if (this.state.phase == "answer" && this.state.questionNo !== params.quiz.questions.length - 1)
            this.setState({ phase: "player", questionNo: this.state.questionNo + 1, yourAnswer: undefined, yourGuess: undefined, receivedAnswers: false });
    }

    changeScores = (yourChange, friendChange) => {
        this.setState({
            yourScore: this.state.yourScore + yourChange,
            friendScore: this.state.friendScore + friendChange
        });
    }
}