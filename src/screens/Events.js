import React, { useState, useRef } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Animated,
  PanResponder,
  Easing,
} from 'react-native';
import { Text, IconButton, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

// Sample data - replace with DB data later
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: 'Salsa Night Fever',
    date: new Date(2024, 0, 15),
    time: '20:00',
    location: { lat: 18.4655, lng: -66.1057 },
    image: require('../assets/destination1.jpg'),
  },
  {
    id: 2,
    title: 'Bachata Under Stars',
    date: new Date(2024, 0, 18),
    time: '21:00',
    location: { lat: 18.4571, lng: -66.1185 },
    image: require('../assets/destination1.jpg'),
  },
  {
    id: 3,
    title: 'Latin Dance Social',
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
  const rotateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const nextScale = useRef(new Animated.Value(0.9)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dy }) => {
        // Only allow vertical upward movement
        return dy < 0;
      },
      onPanResponderMove: (_, { dy }) => {
        // Only allow upward movement (negative dy)
        if (dy < 0) {
          position.setValue({ x: 0, y: dy });
          const yDelta = Math.abs(dy);
          // Smooth scale transition
          const newScale = Math.max(0.8, 1 - yDelta / 600);
          scale.setValue(newScale);
          // Move next card up slightly with easing
          translateY.setValue(-dy * 0.08);
          nextScale.setValue(Math.min(1, 0.9 + yDelta / 600));
        }
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy < -40) { // Only trigger on upward swipe
          // Professional smooth transition
          Animated.parallel([
            Animated.timing(position, {
              toValue: { x: 0, y: -height },
              duration: 400,
              useNativeDriver: true,
              easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Material Design easing
            }),
            Animated.timing(scale, {
              toValue: 0.7,
              duration: 400,
              useNativeDriver: true,
              easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
              easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }),
            Animated.timing(nextScale, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
              easing: Easing.bezier(0.4, 0.0, 0.2, 1),
            }),
          ]).start(() => {
            const newIndex = (currentIndex + 1) % SAMPLE_EVENTS.length;
            setCurrentIndex(newIndex);
            // Reset animations
            position.setValue({ x: 0, y: 0 });
            scale.setValue(1);
            translateY.setValue(0);
            nextScale.setValue(0.9);
          });
        } else {
          // Smooth spring return animation
          Animated.parallel([
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
              tension: 40,
              friction: 7,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true,
              tension: 40,
              friction: 7,
            }),
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 40,
              friction: 7,
            }),
            Animated.spring(nextScale, {
              toValue: 0.9,
              useNativeDriver: true,
              tension: 40,
              friction: 7,
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
        { 
          rotateX: rotateX.interpolate({
            inputRange: [-45, 0, 45],
            outputRange: ['-45deg', '0deg', '45deg']
          })
        },
      ],
      zIndex: 1,
    } : {
      transform: [
        { scale: nextScale },
        { translateY: translateY },
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
    backgroundColor: '#333',
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
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  card: {
    position: 'absolute',
    width: width * 0.85,
    height: height * 0.62,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    bottom: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '65%',
    borderRadius: 20,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
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
    paddingVertical: 8,
    backgroundColor: '#1a1a1a',
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
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
    paddingVertical: 8,
    gap: 32,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 4,
    borderRadius: 15,
  },
  navButton: {
    margin: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  calendarSection: {
    position: 'absolute',
    top: StatusBar.currentHeight + 60,
    left: 0,
    right: 0,
    height: height * 0.35,
    backgroundColor: '#1a1a1a',
    zIndex: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default Events; 