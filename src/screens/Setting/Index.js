import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = props => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
          height: 0.3,
          width: '88%',
          alignSelf: 'center',
        }}></View>
      <View style={{width: '88%', alignSelf: 'center', marginTop: 10}}>
        <Text
          style={{color: '#fff', fontSize: 20, fontFamily: 'Roboto-Regular'}}>
          Settings
        </Text>
      </View>
      <View style={{width: '88%', alignSelf: 'center', marginTop: 40}}>
        <Text
          style={{color: '#fff', fontSize: 18, fontFamily: 'Roboto-Regular'}}>
          Video
        </Text>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#b6b6b6'}}>Autoplay Trailers</Text>
            <Switch
              trackColor={{false: '#767577', true: '#e00024'}}
              thumbColor={isEnabled ? '#fff' : '#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View
            style={{
              backgroundColor: '#88888a',
              height: 0.4,
              width: '80%',
              alignSelf: 'center',
              marginVertical: 10,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#b6b6b6'}}>Preferred Video Quality</Text>
            <Text style={{color: '#b6b6b6'}}>Auto</Text>
          </View>
        </View>
      </View>
      <View style={{width: '88%', alignSelf: 'center', marginTop: 30}}>
        <Text
          style={{color: '#fff', fontSize: 18, fontFamily: 'Roboto-Regular'}}>
          Download
        </Text>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#b6b6b6'}}>Default Download Quality</Text>
            {/* <Text>Autoplay</Text> */}
          </View>
          <View
            style={{
              backgroundColor: '#88888a',
              height: 0.4,
              width: '80%',
              alignSelf: 'center',
              marginVertical: 10,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#b6b6b6'}}>Internal Storage</Text>
            <Text style={{color: '#b6b6b6'}}>Auto</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Progress.Bar
              progress={0.5}
              width={280}
              color={'#e00024'}
              borderColor={'#b6b6b6'}
              borderWidth={0.5}
              height={6}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  box: {
    backgroundColor: '#2f302f',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 0.4,
    borderColor: '#79797a',
  },
});
