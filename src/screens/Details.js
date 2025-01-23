import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Details = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/architecture.jpg')}
      style={styles.background}>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.9)']}
        style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Salsa Night</Text>
          <Text style={styles.subtitle}>La Placita, San Juan</Text>
          <Text style={styles.description}>
            Join us for an unforgettable night of salsa dancing at the heart of San Juan.
            Live music, professional dancers, and the vibrant atmosphere of Puerto Rico's
            most famous salsa spot.
          </Text>

          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Entry</Text>
              <Text style={styles.price}>$15</Text>
              <Text style={styles.priceUnit}>/person</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  title: {
    fontSize: 42,
    color: '#fff',
    fontWeight: '300',
  },
  subtitle: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  price: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceUnit: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  background: {
    flex: 1,
  },
});

export default Details; 