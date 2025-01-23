import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.7;

const EventCard = ({ event, isActive }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return `${month} ${day}`;
  };

  return (
    <View style={[styles.card, Platform.OS === 'ios' && styles.iosShadow]}>
      <ImageBackground
        source={event.image}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', 'transparent']}
          style={styles.gradient}
        >
          <View style={styles.dateTag}>
            <Text style={styles.dateText}>{formatDate(event.date)}</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.title}>{event.title}</Text>
            
            <View style={styles.detailRow}>
              <Icon name="time-outline" size={20} color="#fff" />
              <Text style={styles.detailText}>{event.time}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Icon name="location-outline" size={20} color="#fff" />
              <Text style={styles.detailText}>{event.location}</Text>
            </View>

            {isActive && (
              <View style={styles.swipeHint}>
                <Text style={styles.swipeText}>Swipe up for details</Text>
                <Icon name="chevron-up" size={20} color="#fff" />
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    ...Platform.select({
      android: {
        elevation: 5,
      },
    }),
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  dateTag: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    marginTop: 'auto',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  swipeText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default EventCard; 