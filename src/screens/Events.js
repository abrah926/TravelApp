import React, { useState, useRef } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Animated,
  PanResponder,
} from 'react-native';
import { Text, IconButton, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

// Sample data - replace with DB data later
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: 'Salsa Night\nFever',
    date: new Date(2024, 0, 15),
    time: '20:00',
    location: { lat: 18.4655, lng: -66.1057 },
    image: require('../assets/destination1.jpg'),
  },
  {
    id: 2,
    title: 'Bachata Under\nStars',
    date: new Date(2024, 0, 18),
    time: '21:00',
    location: { lat: 18.4571, lng: -66.1185 },
    image: require('../assets/destination1.jpg'),
  },
  {
    id: 3,
    title: 'Latin Dance\nSocial',
    date: new Date(2024, 0, 20),
    time: '19:30',
    location: { lat: 18.4499, lng: -66.0988 },
    image: require('../assets/destination1.jpg'),
  },
];

const formatDate = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return `${days[date.getDay()]} ${date.getDate()}`;
};

const Events = ({ navigation }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const nextScale = useRef(new Animated.Value(0.9)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
        const yDelta = Math.abs(dy);
        const newScale = Math.max(0.9, 1 - yDelta / 500);
        scale.setValue(newScale);
        rotate.setValue(dy / 15);
        nextScale.setValue(Math.min(1, 0.9 + yDelta / 500));
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (Math.abs(dy) > 60) {
          // Swipe threshold met - animate card away
          Animated.parallel([
            Animated.timing(position, {
              toValue: { x: 0, y: -height },
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0.5,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(rotate, {
              toValue: -30,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(nextScale, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            const newIndex = (currentIndex + 1) % SAMPLE_EVENTS.length;
            setCurrentIndex(newIndex);
            position.setValue({ x: 0, y: 0 });
            scale.setValue(1);
            rotate.setValue(0);
            nextScale.setValue(0.9);
          });
        } else {
          // Return to center
          Animated.parallel([
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
            }),
            Animated.spring(rotate, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.spring(nextScale, {
              toValue: 0.9,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  const handleLocationPress = (location) => {
    // Will implement Google Maps integration later
    console.log('Location pressed:', location);
  };

  const renderEventCard = (event, index) => {
    const isCurrentCard = index === currentIndex;
    const isNextCard = index === (currentIndex + 1) % SAMPLE_EVENTS.length;
    
    if (!isCurrentCard && !isNextCard) return null;

    const cardStyle = isCurrentCard ? {
      transform: [
        ...position.getTranslateTransform(),
        { scale },
        { rotate: rotate.interpolate({
          inputRange: [-100, 0, 100],
          outputRange: ['-30deg', '0deg', '30deg']
        })},
      ],
      zIndex: 1,
    } : {
      transform: [
        { scale: nextScale },
      ],
      zIndex: 0,
    };

    return (
      <Animated.View
        key={event.id}
        style={[styles.card, cardStyle]}
        {...(isCurrentCard ? panResponder.panHandlers : {})}
      >
        <View style={styles.cardContent}>
          {/* Image Section */}
          <View style={styles.imageContainer}>
            <ImageBackground
              source={event.image}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.locationButton}>
                <IconButton
                  icon="map-marker"
                  size={20}
                  iconColor="#fff"
                  onPress={() => handleLocationPress(event.location)}
                  style={styles.iconButton}
                />
              </View>
            </ImageBackground>
          </View>

          {/* Event Info */}
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
          </View>

          {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <IconButton
              icon="binoculars"
              size={20}
              iconColor="#fff"
              onPress={() => navigation.navigate('Details')}
              style={styles.navButton}
            />
            <IconButton
              icon="help-circle"
              size={20}
              iconColor="#fff"
              onPress={() => navigation.navigate('Details', { event })}
              style={styles.navButton}
            />
            <IconButton
              icon="adjust"
              size={20}
              iconColor="#fff"
              onPress={() => navigation.navigate('Contacts')}
              style={styles.navButton}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.calendarContainer}>
          <Icon name="calendar-outline" size={24} color="#fff" />
          <Icon 
            name={isCalendarVisible ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#fff"
            style={styles.chevron}
          />
        </View>
        <Text style={styles.title}>Salsa Events</Text>
        <Surface style={styles.customIconContainer}>
          <View style={styles.iconPlaceholder} />
        </Surface>
      </View>

      {/* Calendar Section - Will be implemented later */}
      {isCalendarVisible && (
        <View style={styles.calendarSection}>
          {/* Calendar component will go here */}
        </View>
      )}

      {/* Event Cards */}
      <View style={styles.cardsContainer}>
        {SAMPLE_EVENTS.map((event, index) => renderEventCard(event, index))}
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 8,
  },
  chevron: {
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  customIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  iconPlaceholder: {
    width: '100%',
    height: '100%',
  },
  calendarSection: {
    height: height * 0.4,
    backgroundColor: '#000',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: height * 0.7,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '75%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 20,
  },
  locationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  iconButton: {
    margin: 0,
  },
  eventInfo: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    gap: 24,
  },
  navButton: {
    margin: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default Events; 