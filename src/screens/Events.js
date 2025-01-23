import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const Events = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Icon name="location" size={20} color="#000" />
          <Text style={styles.locationText}>San Juan</Text>
        </View>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details')}
          style={styles.slide}>
          <ImageBackground
            source={require('../assets/destination1.jpg')}
            style={styles.slideBackground}>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradient}>
              <View style={styles.slideContent}>
                <Text style={styles.slideTitle}>Salsa Night</Text>
                <Text style={styles.slideSubtitle}>
                  Dance the night away
                </Text>
                <View style={styles.controls}>
                  <TouchableOpacity style={styles.controlButton}>
                    <Icon name="heart-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.controlButton}>
                    <Icon name="share-social-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  locationContainer: {
    flexDirection: 'column',
  },
  locationText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  countryText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    height: '100%',
  },
  slideBackground: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  slideContent: {
    width: '100%',
  },
  slideTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '300',
  },
  slideSubtitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Events; 