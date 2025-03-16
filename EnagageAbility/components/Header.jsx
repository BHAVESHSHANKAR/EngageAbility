// components/Header.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background

const Header = () => {
  return (
    <LinearGradient
      colors={['#2b5876', '#4e4376']} // Gradient from CSS
      start={{ x: 0, y: 0 }} // 90deg (left to right)
      end={{ x: 1, y: 0 }}
      style={styles.homeContainer}
    >
      <View style={styles.siteHeader}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/img1.webp')} // Adjust path to your logo
            style={styles.siteLogo}
            resizeMode="contain"
            alt="Logo"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.siteTitle}>EngageAbility</Text>
            <Text style={styles.siteCaption}>An Inclusive Activity Platform</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    width: '100%',
    paddingVertical: 15, // padding: 15px 0
    shadowColor: '#000', // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1)
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  siteHeader: {
    flexDirection: 'row', // display: flex
    justifyContent: 'center', // justify-content: center
    alignItems: 'center', // align-items: center
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row', // display: flex
    alignItems: 'center', // align-items: center
    gap: 15, // gap: 15px (React Native uses margin or padding instead)
  },
  siteLogo: {
    width: 60, // width: 60px
    height: 60, // height: auto approximated
    borderRadius: 30, // border-radius: 50% (half of width/height)
  },
  titleContainer: {
    flexDirection: 'column', // flex-direction: column
  },
  siteTitle: {
    fontSize: 24, // font-size: 24px
    color: '#fff', // color: white
    fontWeight: 'bold', // font-weight: bold
    margin: 0, // margin: 0
  },
  siteCaption: {
    fontSize: 14, // font-size: 14px
    color: '#dcdcdc', // color: #dcdcdc
    marginTop: 2, // margin: 2px 0 0 2px (approximated)
    marginLeft: 2,
  },
});

export default Header;