import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const ExploreScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Reykjavik</Text>
          <Text style={styles.countryText}>Iceland</Text>
        </View>
        <TouchableOpacity>
          <Icon name="paper-plane-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}>
        <View style={styles.slide}>
          <LinearGradient
            colors={['#4b6cb7', '#182848']}
            style={styles.gradient}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Magic</Text>
              <Text style={styles.subtitle}>Dreamland</Text>
              <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton}>
                  <Icon name="play" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Icon name="heart-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Icon name="share-social-outline" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                  <Icon name="bookmark-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
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
  carousel: {
    flex: 1,
  },
  slide: {
    width: width,
    height: '100%',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  contentContainer: {
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '300',
  },
  subtitle: {
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

export default ExploreScreen; 