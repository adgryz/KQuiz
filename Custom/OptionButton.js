import React from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

export default class OptionButton extends React.Component {

    render() {
        let bgColor =  this.props.isSelected ? '#0AD560' :'#303030';
        let fontColor = this.props.isSelected ? "#231F20" : '#0AD560';

        return (
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={{
                        minWidth: 150, height: 40, paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', 
                        borderWidth: 2, borderColor: '#0AD560', borderRadius: 4,
                        backgroundColor: bgColor
                    }}>
                        <Text style={{ fontWeight: 'bold', color: fontColor }}>
                            {this.props.title}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
        );
    }
}
