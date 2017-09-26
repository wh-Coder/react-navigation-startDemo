# [React-Navigation](https://reactnavigation.org/)

主要有三个功能：

- [StackNavigator](https://reactnavigation.org/docs/navigators/stack)  - 用于各个页面之间的跳转，并且记录了跳转的顺序，存入栈中
- [TabNavigator](https://reactnavigation.org/docs/navigators/tab) - 用于单个页面中标签栏的切换
- [DrawerNavigator](https://reactnavigation.org/docs/navigators/drawer) - 用于从屏幕左边滑出一个抽屉导航菜单

## 栈导航器 StackNavigator

### 一个简单例子

```react
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
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
```

1. 引入主角对象：栈导航器：

   ```react
   import {StackNavigator} from 'react-navigation';
   ```

2. 分别创建两个视图页面：FirstPage 和 SecondPage ：

   ```react
   class FirstPage extends React.Component {}
   class SecondPage extends React.Component {}
   ```

3. 将两个页面注册到栈导航器中，返回的是一个 React 组件，所以可以直接注册到根上

   ```react
   const SimpleApp = StackNavigator({
       FirstPage: {screen: FirstPage},
       SecondPage: {screen: SecondPage},
   });
   AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
   ```

4. 导航的头部在各个组件内部配置，也可以在 StackNavigator 中配置，并且也可以在 StackNavigator 的第二个参数中全局配置。

   ```react
   navigationOptions = {
       title: 'FirstPage',
   };
   ```

5. 每个注册到 StackNavigator 中的视图页面都会注入 navigation 属性，其中包含 navigate 方法可以用于跳转页面，并且可以跟上参数，参数通过navigation上的 state.params 传递

   ```react
   const {navigate, state} = this.props.navigation;
   onPress={() => navigate('SecondPage',{info: 'from First'})}
   <Text>这是来自First的消息：{state.params.info}</Text>
   ```


### API 配置

```react
const BaseComponent = StackNavigator(RouteConfigs, StackNavigatorConfig)
```

#### RouteConfigs 

每个路由的个性化配置

```react
{
  
  // 一个标识符，各个界面的名字
  FirstPage: {
    
  	// FirstComponent 是一个 React 组件，每个注册到这里的组件都被注入了一个 navigation 的属性
    screen: FirstComponent,
    
    // 可选：web 中使用的地址
    path: 'first/:name',
    
    // 可选：覆盖全局的 navigationOptions，下文详细说明此配置
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    }),
  },
  ...MyOtherRoutes,
}
```

#### StackNavigatorConfig

全局可选配置

```react
{
  // 路由方面的配置
  initialRouteName:,// 设置默认初始化界面，如果没有就加在RouteConfigs中注册的第一个
  initialRouteParams:,// 初始化配置的参数
  navigationOptions:,// 所有路由配置的全局配置入口，下文详细介绍
  paths:,// 。。。不明白
  
  // 视图方面的配置
  mode:,// 定义视图渲染和过渡动画
  	// 可选：card, 使用标准转换：iOS上的新页面从右侧滑出，从Android的底部渐隐。
    // 可选：modal, 使IOS的新页面从底部滑入
  headerMode:,// 可选：float / screen / none
  cardStyle:,// 定义全局样式
  
  // 动画方面的配置
  transitionConfig:,// 
  onTransitionStart:,// function
  onTransitionEnd,// function
}
```

#### navigationOptions

在 RouteConfigs 和  StackNavigatorConfig 都有这个字段

因为这个头部 IOS 和 Android 差异过大，一般自定义了，全局配置个 header:null ，不过多介绍

```
{
  title:,// 标题
  header:, // React 组件，设置 null 可以隐藏头部
}
```

#### BaseComponent

BaseComponent 是 StackNavigator 创建返回的，有一个属性

screenProps: 把额外的配置传到子页面中

```react
<SomeStack
  screenProps={/* this prop will get passed to the screen components as this.props.screenProps */}
/>
```

## 标签导航器 TabNavigator

iOS 和 Android 差异太大弃用，采用其他 [react-native-tab-navigator](https://github.com/happypancake/react-native-tab-navigator) 等其他 tab 代替

## 抽屉导航器 DrawerNavigator

用法和 StackNavigator 类似

### 补充简单的例子

```react
import {DrawerNavigator, DrawerItems} from 'react-navigation';
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
```

1. 引入导航器和默认的一个抽屉子项

   ```react
   import {DrawerNavigator, DrawerItems} from 'react-navigation';
   ```

2. 配置抽屉子项，drawerLabel 是显示到抽屉栏的名字

   ```react
   static navigationOptions = {
   	drawerLabel: 'HomePage',
   };
   ```

3. 注册页面到抽屉导航器中

   ```
   const DrawerComponent = DrawerNavigator({
     Home: {screen: HomePage},
     Stack: {
           screen: SimpleApp,
           navigationOptions: {
               drawerLabel: 'StackPage',
           }
       },
   })
   ```

### API 配置

```react
const BaseComponent = DrawerNavigator(RouteConfigs, DrawerNavigatorConfig)
```

#### RouteConfigs

和 StackNavigator 一样 

#### DrawerNavigatorConfig

```react
{
  drawerWidth:,
  drawerPosition:,// 可选：left / right 默认left
  contentComponent:,// 抽屉组件重构，传递的 props 是给抽屉子组件的
  contentOptions:,// 配置抽屉子项，下面详细
  useNativeAnimations:,// 开启动画
  
  initialRouteName:,// 初始化
  order:,// 数组，抽屉子项的顺序
  paths:,// web
  backBehavior:,// 是否可以后退到初始状态，如果可以必须设置initialRouteName
}
```

#### contentOptions

```react
contentOptions = {
  items:,// 所有注册抽屉子组件集合
  activeItemKey:,//
  activeTintColor:,
  activeBackgroundColor:,
  inactiveTintColor:,
  inactiveBackgroundColor:,
  onItemPress(route):,
  style:,
  labelStyle:,
}
```

#### navigationOptions

```react
navigationOptions = {
  title:,// 回退时的通用标题，没明白
  drawerLabel:,// 每个子项的名字
  drawerIcon:,// React 组件
  drawerLockMode,//可选('unlocked', 'locked-closed', 'locked-open')
}
```

#### BaseComponent

和 StackNavigator 一样













