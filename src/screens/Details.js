import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const Details = ({ route, navigation }) => {
  const { event } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <ImageBackground
        source={event?.image}
        style={styles.header}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent']}
          style={styles.gradient}
        >
          <IconButton
            icon="arrow-left"
            iconColor="#fff"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
          <Text style={styles.title}>{event?.title}</Text>
        </LinearGradient>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <IconButton icon="clock" size={24} />
            <Text style={styles.infoText}>{event?.time}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <IconButton icon="map-marker" size={24} />
            <Text style={styles.infoText}>
              {`Lat: ${event?.location?.lat}, Lng: ${event?.location?.lng}`}
            </Text>
          </View>

          <Text style={styles.description}>
            Event details will be populated from the database. This is a placeholder description.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    height: 300,
  },
  gradient: {
    flex: 1,
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    margin: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 'auto',
    marginHorizontal: 16,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  infoSection: {
    padding: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
});

export default Details; 