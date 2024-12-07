import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Index = props => {
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
          width: '90%',
          alignSelf: 'center',
        }}></View>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
        <Text
          style={{color: '#fff', fontSize: 18, fontFamily: 'Roboto-Regular'}}>
          Surprises
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', top: '20%'}}>
        <MaterialCommunityIcons
          name="gift-open-outline"
          color={'#2b2a2b'}
          size={90}
        />
        <Text
          style={{
            color: '#6d6c6d',
            fontSize: 20,
            fontFamily: 'Roboto-Regular',
            width: '60%',
            textAlign: 'center',
            marginVertical: 10,
          }}>
          Your Coupon Code For The Next Watch
        </Text>
        <TouchableOpacity style={styles.mas365Btn}>
          <Text
            style={{
              color: '#a9a9a9',
              fontSize: 18,
              fontFamily: 'Roboto-Regular',
            }}>
            Mas365
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'center', marginVertical: 15, marginBottom: 50 }}>
                <Text style={{ color: '#555755', fontSize: 12, fontWeight: '800', marginRight: 10 }}>Rate us</Text>
                <Text style={{ color: '#555755', fontSize: 12, fontWeight: '800', marginRight: 10 }}>|</Text>
                <Text style={{ color: '#555755', fontSize: 12, fontWeight: '800', marginRight: 10 }}>Privacy Policy</Text>
                <Text style={{ color: '#555755', fontSize: 12, fontWeight: '800', marginRight: 10 }}>|</Text>
                <Text style={{ color: '#555755', fontSize: 12, fontWeight: '800', marginRight: 10 }}>Terms & Condition</Text>
            </View> */}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  mas365Btn: {
    backgroundColor: '#222224',
    marginTop: 15,
    width: 180,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#353537',
  },
});
