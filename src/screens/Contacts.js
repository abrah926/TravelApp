import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {
  Text,
  IconButton,
  List,
  Avatar,
  Divider,
} from 'react-native-paper';

const CONTACTS = [
  {
    id: 1,
    name: 'La Casa del Son',
    role: 'Dance Studio',
    phone: '+1 (787) 555-0101',
    email: 'info@casadelson.com',
  },
  {
    id: 2,
    name: 'Dance Studio 54',
    role: 'Event Venue',
    phone: '+1 (787) 555-0102',
    email: 'events@studio54.com',
  },
  {
    id: 3,
    name: 'Rhythm & Flow',
    role: 'Dance School',
    phone: '+1 (787) 555-0103',
    email: 'classes@rhythmflow.com',
  },
];

const Contacts = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor="#fff"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.title}>Contacts</Text>
      </View>

      <ScrollView style={styles.content}>
        {CONTACTS.map((contact) => (
          <React.Fragment key={contact.id}>
            <List.Item
              title={contact.name}
              description={contact.role}
              left={props => (
                <Avatar.Text
                  {...props}
                  size={40}
                  label={contact.name.substring(0, 2)}
                />
              )}
              right={props => (
                <View style={styles.contactActions}>
                  <IconButton
                    {...props}
                    icon="phone"
                    onPress={() => {}}
                  />
                  <IconButton
                    {...props}
                    icon="email"
                    onPress={() => {}}
                  />
                </View>
              )}
            />
            <Divider />
          </React.Fragment>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight + 16,
    paddingBottom: 16,
    backgroundColor: '#1a1a1a',
  },
  backButton: {
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  contactActions: {
    flexDirection: 'row',
  },
});

export default Contacts; 