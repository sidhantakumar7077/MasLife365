import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import SignIn from '../SignIn/Index';
import SignUp from '../SignUp/Index';

const Sign_in = () => {
  return (
    <View style={{backgroundColor: '#141416', flex: 1}}>
      <SignIn />
    </View>
  );
};

const Register = () => {
  return (
    <View style={{backgroundColor: '#141416', flex: 1}}>
      <SignUp />
    </View>
  );
};

const Index = props => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'SIGN IN'},
    {key: 'second', title: 'REGISTER'},
  ]);

  const renderScene = SceneMap({
    first: Sign_in,
    second: Register,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={'#fff'}
      inactiveColor={'#a1a1a1'}
      labelStyle={{textTransform: 'capitalize', fontSize: 18}}
      indicatorStyle={{backgroundColor: '#cb0222'}}
      style={{backgroundColor: '#141416'}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            width: '15%',
            marginVertical: 7,
            marginTop: 18,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{color: '#b6b6b6', fontSize: 18, marginLeft: 10}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#88888a',
          height: 0.4,
          width: '90%',
          alignSelf: 'center',
        }}></View>
      <TabView
        style={{width: '90%', alignSelf: 'center'}}
        navigationState={{index, routes}}
        swipeEnabled={false}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
});
