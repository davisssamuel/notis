import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMessage, faBellSlash, faFile } from '@fortawesome/free-regular-svg-icons';
import { faBolt, faUsers, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/core';

//NOTE: the fonts may look strange because these are free. If you want consistent fonts, we may need to find something else or pay
//for a license

const ContactInfoScreen = ({ navigation, route }) => {

  const contact = route.params.contact

  const [dogApiPhoto, setDogApiPhoto] = useState(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        setDogApiPhoto(data.message);
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };

    fetchDogImage();
  }, []);

  const renderButtons = () => (
    <View style={styles.buttonContainer}>
    {/* Rows 1 and 2 */}
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button}>
        <FontAwesomeIcon icon={faMessage} style={styles.icon} size={25} color='rgba(60, 219, 192, 1)'/>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesomeIcon icon={faBolt} style={styles.icon} size={25} color='rgba(241, 190, 72, 1)'/>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesomeIcon icon={faBellSlash} style={styles.icon} size={30} color='rgba(224, 60, 49, 1)'/>
        <Text style={styles.buttonText}>Silence</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button}>
      <FontAwesomeIcon icon={faUsers} style={styles.icon} size={25} color='rgba(34, 125, 118, 1)'/>
        <Text style={styles.buttonText}>Groups</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesomeIcon icon={faFile} style={styles.icon} size={25} color='rgba(21, 45, 81, 1)'/>
        <Text style={styles.buttonText}>Files</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesomeIcon icon={faShieldHalved} style={styles.icon} size={25} color ='rgba(224, 60, 49, 1)'/>
        <Text style={styles.buttonText}>Block</Text>
      </TouchableOpacity>
    </View>

    {/* Additional Button */}
    <TouchableOpacity style={styles.fullWidthButton}>
      <Text style={styles.fullWidthButtonText}>Delete Contact</Text>
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      {/* Dog image section */}
      <View style={styles.dogImageContainer}>
        {dogApiPhoto && (
          <Image source={{ uri: dogApiPhoto }} style={styles.dogImage} resizeMode="cover" />
        )}
      </View>

      {/* Overlay */}
      <View style={styles.overlay}></View>
      <View style={styles.profileName}>
        <Text style={styles.profileNameText}>{contact.name}</Text>
        <Text style={styles.profileStatusText}>{contact.nickname}</Text>
      </View>

      {/* Additional components section */}
      <View style={styles.additionalContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: contact.image,
          }}
        />
      </View>

      {/* Buttons on top of everything */}
      {renderButtons()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dogImageContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'flex-start',
    position: 'relative',
  },
  dogImage: {
    flex: 0.9,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(240, 240, 242, 1)',
    top: '40%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  additionalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    top: '-77%',
    right: '111%',
    width: 115,
    height: 115,
    borderRadius: 10000,
  },
  profileName: {
    alignSelf: "center",
  },
  profileNameText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  profileStatusText: {
    color: 'lightslategrey',
  },
  buttonContainer: {
    position: 'absolute',
    top: '52%',
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2, //space between on y-axis
  },
  button: {
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 20, //how thick button is
    width: '33%', //button width (space between on x-axis)
  },
  buttonText: {
    color: 'lightslategrey',
    fontSize: 12,
    textAlign: 'center',
  },
  fullWidthButtonText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  fullWidthButton: {
    backgroundColor: 'white',
    marginHorizontal: 'auto',
    padding: 20,
    //marginBottom: 10
    width: '90%', // Adjust the width as needed
    borderRadius: 10,
    top: 110,
    alignItems: 'center', // Center the button vertically
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 45,      // Set the font size to make it bigger
    marginBottom: 10,  // Optional: Add margin if needed
    alignSelf: 'center' // Center the icon horizontally
  },
});

export default ContactInfoScreen;