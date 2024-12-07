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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
          style={{
            color: '#b6b6b6',
            fontSize: 20,
            fontFamily: 'Roboto-Regular',
          }}>
          Downloads
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons name="cloud-download-outline" color={'#555755'} size={130} />
        <Text
          style={{
            color: '#b3b3b3',
            fontSize: 20,
            fontFamily: 'Roboto-Regular',
          }}>
          No Download Yet
        </Text>
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
});
