import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Animated,
  PanResponder,
  Easing,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, IconButton, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const formatTitle = (title) => {
  // If title is longer than 20 chars, reduce font size
  return {
    text: title.replace(/\n/g, ' '), // Remove any line breaks
    fontSize: title.length > 20 ? 28 : 32
  };
};

// Sample data - replace with DB data later
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: 'Salsa Night Fever',
    date: '2024-01-15',
    time: '20:00',
    location: { lat: 18.4655, lng: -66.1057 },
    image: require('../assets/bio_beach.jpg'),
  },
  {
    id: 2,
    title: 'Bachata Under Stars',
    date: '2024-01-18',
    time: '21:00',
    location: { lat: 18.4571, lng: -66.1185 },
    image: require('../assets/mountain.jpg'),
  },
  {
    id: 3,
    title: 'Latin Dance Social',
    date: '2024-01-20',
    time: '19:30',
    location: { lat: 18.4499, lng: -66.0988 },
    image: require('../assets/architecture.jpg'),
  },
];

const formatDate = (date) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const d = new Date(date);
  return `${days[d.getDay()]} ${d.getDate()}`;
};

const generateCalendarDays = (currentDate = new Date()) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  let calendarDays = [];
  let dayCount = 1;
  
  // Add empty spaces for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    calendarDays.push('');
  }
  
  // Add all days of the month
  while (dayCount <= lastDay.getDate()) {
    calendarDays.push(dayCount);
    dayCount++;
  }
  
  return { days, calendarDays };
};

const Events = ({ navigation }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date(SAMPLE_EVENTS[0].date));
  const position = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const nextScale = useRef(new Animated.Value(0.9)).current;

  // Create marked dates object for calendar
  const markedDates = SAMPLE_EVENTS.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: '#E94560',
      selected: event.date === selectedDate.toISOString().split('T')[0],
      selectedColor: '#E94560',
    };
    return acc;
  }, {});

  const { days, calendarDays } = useMemo(() => generateCalendarDays(selectedDate), [selectedDate]);

  const handleDateSelect = (day) => {
    if (!day) return;
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(date);
    const eventIndex = SAMPLE_EVENTS.findIndex(
      event => new Date(event.date).toDateString() === date.toDateString()
    );
    if (eventIndex !== -1) {
      setCurrentIndex(eventIndex);
    }
  };

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
    const formattedTitle = formatTitle(event.title);
    
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
            <Text 
              style={[
                styles.eventTitle,
                { fontSize: formattedTitle.fontSize }
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formattedTitle.text}
            </Text>
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
              icon="information-outline"
              size={20}
              iconColor="#fff"
              onPress={() => navigation.navigate('Details', { event })}
              style={styles.navButton}
            />
            <IconButton
              icon="account-group"
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
        <TouchableOpacity 
          style={styles.calendarContainer}
          onPress={() => setIsCalendarVisible(!isCalendarVisible)}
        >
          <Image 
            source={require('../assets/calendar.png')} 
            style={styles.calendarIcon}
          />
          <Image 
            source={require('../assets/chevron.png')} 
            style={[
              styles.chevronIcon,
              { transform: [{ rotate: isCalendarVisible ? '180deg' : '0deg' }] }
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Salsa Events</Text>
        <Surface style={styles.customIconContainer}>
          <View style={styles.iconPlaceholder} />
        </Surface>
      </View>

      {/* Calendar Section */}
      {isCalendarVisible && (
        <View style={styles.calendarSection}>
          <View style={styles.monthHeader}>
            <Text style={styles.monthText}>
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Text>
          </View>
          <View style={styles.daysHeader}>
            {days.map((day, index) => (
              <Text key={index} style={styles.dayText}>{day}</Text>
            ))}
          </View>
          <View style={styles.datesGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCell,
                  day && selectedDate.getDate() === day && styles.selectedDate,
                  SAMPLE_EVENTS.some(event => 
                    new Date(event.date).getDate() === day && 
                    new Date(event.date).getMonth() === selectedDate.getMonth()
                  ) && styles.eventDate
                ]}
                onPress={() => handleDateSelect(day)}
              >
                <Text style={[
                  styles.dateText,
                  day && selectedDate.getDate() === day && styles.selectedDateText,
                  SAMPLE_EVENTS.some(event => 
                    new Date(event.date).getDate() === day && 
                    new Date(event.date).getMonth() === selectedDate.getMonth()
                  ) && styles.eventDateText
                ]}>
                  {day || ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
    backgroundColor: '#1A1A2E', // Rich dark blue background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.03)', // Subtle glass effect
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  customIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
    paddingBottom: 16,
    paddingTop: 26,
  },
  card: {
    position: 'absolute',
    width: width * 0.85,
    height: height * 0.62,
    backgroundColor: '#16213E', // Rich dark blue for cards
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 6,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: '65%',
    borderRadius: 25,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 25,
  },
  locationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    elevation: 3,
  },
  iconButton: {
    margin: 0,
  },
  eventInfo: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(22, 33, 62, 0.95)', // Slightly transparent
    height: 80,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  eventTitle: {
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  eventDate: {
    fontSize: 20,
    color: '#E94560', // Accent color for dates
    letterSpacing: 2,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: 'rgba(22, 33, 62, 0.98)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  navButton: {
    margin: 0,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  calendarSection: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  dayText: {
    color: '#E94560',
    width: (width - 24) / 7,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  datesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateCell: {
    width: (width - 24) / 7,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  dateText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    width: (width - 24) / 7,
    height: 36,
    lineHeight: 36,
    paddingHorizontal: 0,
  },
  selectedDate: {
    backgroundColor: 'transparent',
  },
  selectedDateText: {
    color: '#E94560',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 36,
  },
  eventDate: {
    // Remove any border or underline styles
  },
  eventDateText: {
    color: '#E94560',
  },
});

export default Events; 