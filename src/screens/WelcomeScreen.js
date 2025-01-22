import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
        style={styles.gradient}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            {/* Add your logo here */}
          </View>
          <Text style={styles.title}>Unveil the</Text>
          <Text style={styles.subtitle}>Travel Wonders</Text>
          <Text style={styles.location}>NORWAY</Text>
          <Text style={styles.description}>
            Take the first step on an unforgettable journey
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.buttonText}>Discover More</Text>
          </TouchableOpacity>
          <Text style={styles.terms}>
            By joining us, you agree to terms & conditions
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  contentContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
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
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#fff',
    letterSpacing: 4,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});

export default WelcomeScreen; 