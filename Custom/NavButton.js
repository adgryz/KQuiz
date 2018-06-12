import React from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class NavButton extends React.Component {

    render() {
        return (
            this.props.disabled ?
                <View style={{
                    minWidth: 150, height: 40, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 150, backgroundColor: "#231F20"
                }}>
                    <Text style={{ fontWeight: 'bold', color: "#303030" }}>
                        {this.props.title}
                    </Text>
                </View>
                :
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); this.props.onPress(); }}>
                    <View style={{
                        minWidth: 150, height: 40, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 150, backgroundColor: '#F2F2F2'
                    }}>
                        <Text style={{ fontWeight: 'bold', color: "#231F20" }}>
                            {this.props.title}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
        );
    }
}