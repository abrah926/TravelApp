import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const DetailScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2c3e50', '#3498db']}
        style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Icon name="moon" size={24} color="#fff" />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Places With</Text>
          <Text style={styles.subtitle}>Stories.</Text>
          <Text style={styles.location}>WROCLAW</Text>
          
          <Text style={styles.description}>
            Every place has a story. Uncover yours in our carefully curated collection of unique stays. Each space invites you through a journey of discovery, one step at a time.
          </Text>
          
          <View style={styles.footer}>
            <View>
              <Text style={styles.priceLabel}>Buy</Text>
              <Text style={styles.price}>$1,290.99</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reserve</Text>
            </TouchableOpacity>
          </View>
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
});

export default DetailScreen; 