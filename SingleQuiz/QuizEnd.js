import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation';
import NavButton from '../Custom/NavButton';

export default class QuizEnd extends React.Component {
    render() {
        const { params } = this.props.navigation.state;
        const friendname = params ? params.friendname : null;
        const friendScore = params ? params.friendScore : null;
        const yourScore = params ? params.yourScore : null;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#303030' }}>
                {
                    yourScore > friendScore ?
                        <Text style={{ fontWeight: 'bold', color: '#0AD560', fontSize: 18 }}>You won, you know {friendname} better</Text>
                        :
                        yourScore === friendScore ?
                            <Text style={{ fontWeight: 'bold', color: '#00E7FF', fontSize: 18 }}>Draw, you know eachother equally</Text>
                            :
                            <Text style={{ fontWeight: 'bold', color: '#ED1C24', fontSize: 18 }}>You lost, {friendname} knows you better</Text>
                }
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15, color: '#F2F2F2' }}>Scores :</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#F2F2F2' }}>You: {yourScore}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#F2F2F2' }}>{friendname}: {friendScore}</Text>
                <View style={{ margin: 30 }}>
                    <NavButton
                        title="GO BACK TO LOBBY"
                        disabled={false}
                        onPress={this.navigate}
                        bgColor="#f44336"
                        color="#303030"
                        bgColorDisabled="#231F20"
                        colorDisabled="#303030"
                    />
                </View>
            </View>
        );
    }

    navigate = () => {
        this.props.navigation.dispatch(NavigationActions.reset(
            {
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Landing',
                        params: {
                            username: this.props.navigation.state.params.username
                        }
                    }),
                ],
            }));
    };

}
