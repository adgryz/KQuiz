import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';

export default class QuizStart extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedQuiz: undefined }

        setTimeout(() => {
            const { params } = props.navigation.state;
            const username = params ? params.username : null;
            const friendname = params ? params.friendname : null;
            const quiz = params ? params.quiz : null;
            this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 1,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Landing',
                                params: {
                                    username: username
                                }
                            }),
                            NavigationActions.navigate(
                                {
                                    routeName: 'Quiz',
                                    params: {
                                        username: username,
                                        friendname: friendname,
                                        quiz: quiz
                                    }
                                }
                            )
                        ],
                    }));
        }, 3500);

    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const friendname = params ? params.friendname : null;
        const quiz = params ? params.quiz : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: '#F2F2F2' }}>Quiz &nbsp;
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: '#0AD560' }}>
                        {quiz.title}
                    </Text>
                    , started</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18 , color: '#F2F2F2'}}>{username}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#F2F2F2'}}>&</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#F2F2F2'}}>{friendname}</Text>
            </View>
        );
    }


}
