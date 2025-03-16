import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import HomePageImage from '../assets/homeimage.webp';

const { width } = Dimensions.get('window'); // Get screen width for responsive sizing

const HomePage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <View style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Welcome to the EngageAbility Platform</Text>
              <Text style={styles.heroDescription}>
                EngageAbility is an Activity Engagement Platform that provides interactive and
                stimulating activities designed for Deaf & Dumb individuals and people with mental
                disabilities.
              </Text>
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => navigation.navigate('CareTaker')}
              >
                <Text style={styles.buttonText}>Start Activities</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heroIllustration}>
              <Image
                source={HomePageImage}
                style={styles.heroImage}
                resizeMode="contain"
                alt="EngageAbility Illustration"
              />
            </View>
          </View>

          {/* Mission Section */}
          <View style={styles.missionSection}>
            <Text style={styles.missionTitle}>Our Mission</Text>
            <Text style={styles.missionDescription}>
              Our platform is dedicated to enhancing the lives of Deaf & Dumb individuals and
              mentally disabled people by offering activities that promote cognitive, physical, and
              emotional well-being.
            </Text>
            <Text style={styles.featuresTitle}>Key Features:</Text>
            <View style={styles.featuresList}>
              {['Enjoyable', 'Stress Relief', 'Interactive', 'Stimulating'].map((feature, index) => (
                <Text key={index} style={styles.featureItem}>
                  • {feature}
                </Text>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text style={styles.footerLink}>About This Platform</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerIcons}>
              <Icon name="linkedin" size={24} color="#fff" />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#c3cfe2',
  },
  scrollContent: {
    padding: 20,
  },
  // Hero Section
  heroSection: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 34,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 27,
    marginBottom: 16,
    textAlign: 'center',
    width: '90%',
  },
  ctaButton: {
    backgroundColor: '#00b4db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#00b4db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroIllustration: {
    width: '100%',
    alignItems: 'center',
  },
  heroImage: {
    width: width * 0.8, // 80% of screen width
    height: width * 0.6, // Maintain a 4:3 aspect ratio (adjust as needed)
    maxWidth: 400, // Cap the max width
    maxHeight: 300, // Cap the max height
    borderRadius: 8, // Small border-radius
  },
  // Mission Section
  missionSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 24,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
    marginVertical: 16,
  },
  missionTitle: {
    fontSize: 22,
    color: '#1a3c5e',
    fontWeight: '600',
    marginBottom: 12,
  },
  missionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 27,
    marginBottom: 16,
    textAlign: 'center',
    width: '90%',
  },
  featuresTitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 12,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  featureItem: {
    backgroundColor: '#ecf0f1',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    textAlign: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    minWidth: 150,
  },
  // Footer
  footer: {
    backgroundColor: '#1a3c5e',
    padding: 24,
    alignItems: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footerLink: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 8,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HomePage;