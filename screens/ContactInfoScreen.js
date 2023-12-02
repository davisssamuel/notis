import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const MyComponent = () => {
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
            <Text style={styles.profileNameText}>Luke Lyall</Text>
            <Text style={styles.profileStatusText}>Sleeping...</Text>
            
          </View>
        <View/>

      {/* Additional components section */}
      <View style={styles.additionalContainer}>

      <Image
            style={styles.profileImage}
            src={"https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg"}
          />

      </View>

      <View style={styles.profileInfo}>
         
      </View>
      

      
      
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
    flex: .9,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    top: '40%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  additionalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    width: "100%",
  },
  profileImage: {
    top: '-77%',
    right: '27%',
    width: 115,
    height: 115,
    borderRadius: 10000,
  },
  profileName: {
    top: '-6%',
    right: '-8%',
  },
  profileNameText: { //text adjusts incorrectly for different names. Gonna need to lock the text
    //to a specific place when pulling json data
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left', //does not work with android
  },
  profileStatusText: {
    color: 'lightslategrey',
  },
  messageButton: { //TODO: currently working on this
    borderRadius: 10000,

  },
});

export default MyComponent;
