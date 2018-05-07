import React from 'react';

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
      
    }

    render() {
        const { params } = this.props.navigation.state;
        const username = params ? params.username : null;
        const friendname = params ? params.friendname : null;
        const quiz= params ? params.quiz : null;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                Quiz
            </View>
        );
    }