import React from 'react';
import {AppRegistry, View, Button, Text, ScrollView} from 'react-native';
import {StackNavigator, DrawerNavigator, DrawerItems} from 'react-navigation';

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

class HomePage extends React.Component {

    static navigationOptions = {
        drawerLabel: 'HomePage',
    };

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.props.navigation.navigate('Stack')}
                    title="Go to notifications"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    title="DrawerOpen"
                />
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
        // header: null
    },
    onTransitionStart(a) {
        console.log(a)
    }
});

const DrawerComponent = DrawerNavigator({
    Home: {
        screen: HomePage,
    },
    Stack: {
        screen: SimpleApp,
        navigationOptions: {
            drawerLabel: 'StackPage',
        }
    },
}, {
    drawerWidth: 200,
    drawerPosition: 'right',
    contentComponent: props => <ScrollView><DrawerItems {...props} /></ScrollView>,
    contentOptions: {
        activeBackgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('SimpleApp', () => DrawerComponent);