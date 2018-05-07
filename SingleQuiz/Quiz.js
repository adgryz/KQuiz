import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {phase: "player", questionNo: 0}
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const friendname = params ? params.friendname : null;
        const quiz= params ? params.quiz : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                Question {this.state.questionNo + 1}
                {
                    this.state.phase === "player" && 
                    <PlayerQuestion 
                        question={quiz.questions[this.state.questionNo]}
                        selectedAnswer={this.state.yourAnswer}
                        onSelect={this.onAnswer}/>
                }
                {
                    this.state.phase === "friend" && 
                    <FriendQuestion 
                        friendname={friendname}
                        question={quiz.questions[this.state.questionNo]} 
                        selectedAnswer={this.state.yourGuess}
                        onSelect={this.onGuess}/>
                }
                {
                    this.state.phase === "answer" && 
                    <AnswerQuestion
                        yourAnswer={this.state.yourAnswer}
                        yourGuess={this.state.yourGuess}/>
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
        this.setState({yourAnswer: answer});
    }

    onGuess = (guess) => {
        this.setState({yourGuess: guess});
    }

    isNextDisabled = () => {
        if(this.state.phase == "player" && !this.state.yourAnswer)
            return true;

        if(this.state.phase == "friend" && !this.state.yourGuess)
            return true;

        return false;
    }

    changePhase = () => {
        if(this.state.questionNo == params.quiz.questions.length) {
            // navigate to Finish screen
        }

        if(this.state.phase == "player")
            this.setState({phase: "friend"});

        if(this.state.phase == "friend")
            this.setState({phase: "answer"});

        if(this.state.phase == "answer")
            this.setState({phase: "player", questionNo: this.state.questionNo + 1, yourAnswer: undefined, yourGuess: undefined});
    }
}