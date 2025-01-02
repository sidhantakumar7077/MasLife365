import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignIn from '../SignIn/Index';
import SignUp from '../SignUp/Index';

const Index = props => {

  const [checked, setChecked] = React.useState('Login');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
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
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
      <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', backgroundColor: '#141416', marginVertical: 7 }}>
        <TouchableOpacity style={checked === 'Login' ? styles.activeTabBtm : styles.tabBtm} value="Login" onPress={() => setChecked('Login')}>
          <Text style={checked === 'Login' ? styles.activeTabBtmText : styles.tabBtmText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={checked === 'Register' ? styles.activeTabBtm : styles.tabBtm} value="Register" onPress={() => setChecked('Register')}>
          <Text style={checked === 'Register' ? styles.activeTabBtmText : styles.tabBtmText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
        {checked === 'Login' ? <SignIn setChecked={setChecked} /> : <SignUp setChecked={setChecked} />}
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
  tabBtm: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#474747',
    // borderBottomWidth:0.5,
    // marginBottom:4
  },
  activeTabBtm: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#df0225',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  tabBtmText: {
    fontFamily: 'Roboto-Bold',
    color: '#828282',
    fontSize: 18,
  },
  activeTabBtmText: {
    fontFamily: 'Roboto-Bold',
    color: '#fff',
    fontSize: 18,
  },
});
