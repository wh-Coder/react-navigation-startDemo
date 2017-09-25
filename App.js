import React from 'react';
import {AppRegistry, View, Button, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

class FirstPage extends React.Component {
    static navigationOptions = {
        title: 'FirstPage',
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('SecondPage', {info: 'from First'})}
                    title="This is FirstPage, tap to SecondPage"
                />
            </View>
        );
    }
}

class SecondPage extends React.Component {

    render() {
        const {navigate, state} = this.props.navigation;
        return (
            <View>
                <Button
                    onPress={() => navigate('FirstPage')}
                    title="This is SecondPage, tap to FirstPage"
                />
                <Text>这是来自First的消息：{state.params.info}</Text>
            </View>
        );
    }
}

const SimpleApp = StackNavigator({
    FirstPage: {screen: FirstPage},
    SecondPage: {
        screen: SecondPage,
        navigationOptions: {
            title: 'SecondPage',
        }
    },
},{
    navigationOptions: {
        title: 'HELLO',
    }
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);