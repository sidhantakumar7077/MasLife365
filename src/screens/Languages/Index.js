import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Index = props => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languageOptions = [
    'English',
    'French',
    'Russian',
    'Spanish',
    'Chinese',
    'Arabic',
  ];

  const handleLanguageSelect = language => {
    setSelectedLanguage(language);
  };

  const firstRowLanguages = languageOptions.slice(0, 3);
  const secondRowLanguages = languageOptions.slice(3);

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
          width: '88%',
          alignSelf: 'center',
          backgroundColor: '#88888a',
          height: 0.3,
          marginHorizontal: 10,
        }}></View>
      <View style={{width: '88%', marginTop: 20, alignSelf: 'center'}}>
        <Text
          style={{
            color: '#d1d1d1',
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
          }}>
          Choose Your Language
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          {firstRowLanguages.map(language => (
            <TouchableOpacity
              key={language}
              onPress={() => handleLanguageSelect(language)}
              style={
                language === selectedLanguage
                  ? styles.activeLanguagrBtn
                  : styles.languagrBtn
              }>
              <Text
                style={{
                  color: language === selectedLanguage ? '#000' : '#d1d1d1',
                  fontSize: 16,
                  fontFamily: 'Roboto-Regular',
                }}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 22,
          }}>
          {secondRowLanguages.map(language => (
            <TouchableOpacity
              key={language}
              onPress={() => handleLanguageSelect(language)}
              style={
                language === selectedLanguage
                  ? styles.activeLanguagrBtn
                  : styles.languagrBtn
              }>
              <Text
                style={{
                  color: language === selectedLanguage ? '#000' : '#d1d1d1',
                  fontSize: 16,
                  fontFamily: 'Roboto-Regular',
                }}>
                {language}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={{
            borderColor: '#88888a',
            borderWidth: 1,
            alignItems: 'center',
            alignSelf: 'center',
            paddingVertical: 7,
            paddingHorizontal: 28,
            borderRadius: 20,
            marginTop: 35,
          }}>
          <Text
            style={{color: '#d1d1d1', fontSize: 16, fontFamily: 'Roboto-Bold'}}>
            VIEW ALL
          </Text>
        </TouchableOpacity>
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
  languagrBtn: {
    backgroundColor: '#333334',
    width: '30%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  activeLanguagrBtn: {
    backgroundColor: '#a4a4a4',
    width: '30%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});
