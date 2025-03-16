import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Gobacktohome from '../components/Gobacktohome';
import ActivitiesIllustration from '../assets/startactivitiesimage.webp';

const StartActivities = ({ navigation, route }) => {
  const caretakerName = route.params?.caretakerName || 'Caretaker';
  const instituteName = route.params?.instituteName || 'Institute';

  const handleButton1 = () => {
    alert('Deaf and Dumb Activities');
    navigation.navigate('DeafandDumb', { caretakerName, instituteName });
  };

  const handleButton2 = () => {
    alert('Mental Disability Activities');
    navigation.navigate('mentaldisability', { caretakerName, instituteName });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2b5876" />
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.pageWrapper}>
        <Header />
        <ScrollView contentContainerStyle={styles.activitiesContainer}>
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.title}>
              Welcome, {caretakerName}! ({instituteName})
            </Text>
            <View style={styles.activitiesIllustration}>
              <Image
                source={ActivitiesIllustration}
                style={styles.illustrationImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Options Container */}
          <View style={styles.optionsContainer}>
            {/* Deaf and Dumb Section */}
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>
                Empowering Communication for the Deaf and Dumb
              </Text>
              <Text style={styles.headerDescription}>
                Communication is a fundamental right, but for individuals who are deaf and dumb,
                expressing their thoughts and understanding others can be challenging. Our
                platform bridges this gap by providing an{' '}
                <Text style={styles.boldText}>interactive and accessible solution</Text> for
                communication.
              </Text>
              <Text style={styles.subHeader}>Text to Sign Images Tool</Text>
              <Text style={styles.headerDescription}>
                Our <Text style={styles.boldText}>Text to Sign Images</Text> tool helps caretakers
                convert written words into{' '}
                <Text style={styles.boldText}>American Sign Language (ASL) images</Text>. This
                enables individuals with hearing and speech impairments to understand messages
                visually, improving communication.
              </Text>
              <Text style={styles.subHeader}>Why This Matters?</Text>
              <Text style={styles.headerDescription}>
                - 🌍 Bridging the communication gap between caretakers and individuals with
                disabilities.{'\n'}- 🔥 Encouraging caretakers to actively use tools that enhance
                accessibility.{'\n'}- 💡 Making communication inclusive and empowering for the deaf
                and dumb community.
              </Text>
              <Text style={styles.headerDescription}>
                <Text style={styles.boldText}>
                  Join us in creating a more inclusive world where no one is left unheard.
                </Text>
              </Text>
              <LinearGradient
                colors={['#00b4db', '#0083b0']}
                style={styles.activityButtonGradient}
              >
                <TouchableOpacity onPress={handleButton1}>
                  <Text style={styles.activityButtonText}>Deaf and Dumb</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            {/* Mental Disability Section */}
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>
                Empowering Lives for Individuals with Mental Disabilities
              </Text>
              <Text style={styles.headerDescription}>
                Mental disabilities can make it difficult for individuals to express their
                emotions, needs, and behaviors effectively. Our platform leverages{' '}
                <Text style={styles.boldText}>advanced hardware sensors and AI-driven insights</Text>{' '}
                to understand their behavior and provide tailored suggestions and activities to
                improve their quality of life.
              </Text>
              <Text style={styles.subHeader}>Behavior Monitoring and Analysis Tool</Text>
              <Text style={styles.headerDescription}>
                Our <Text style={styles.boldText}>Behavior Monitoring and Analysis</Text> tool uses
                hardware sensors to track and analyze the behavior of individuals with mental
                disabilities. By collecting data on movement, emotional responses, and daily
                patterns, we generate{' '}
                <Text style={styles.boldText}>personalized recommendations</Text> to support their
                well-being.
              </Text>
              <Text style={styles.subHeader}>Why This Matters?</Text>
              <Text style={styles.headerDescription}>
                - 🌍 Bridging the gap between understanding and supporting individuals with mental
                disabilities.{'\n'}- 🔥 Encouraging caretakers to adopt technology-driven solutions
                for better care.{'\n'}- 💡 Providing personalized activities and suggestions to
                enhance emotional and behavioral well-being.
              </Text>
              <Text style={styles.headerDescription}>
                <Text style={styles.boldText}>
                  Join us in creating a more inclusive world where everyone receives the care and
                  support they deserve.
                </Text>
              </Text>
              <LinearGradient
                colors={['#00b4db', '#0083b0']}
                style={styles.activityButtonGradient}
              >
                <TouchableOpacity onPress={handleButton2}>
                  <Text style={styles.activityButtonText}>Mental Disability</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
        <Gobacktohome navigation={navigation} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  pageWrapper: {
    flex: 1,
    width: '100%',
  },
  activitiesContainer: {
    padding: 20,
    width: '100%',
  },
  // Welcome Section
  welcomeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  activitiesIllustration: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: 200,
    borderRadius: 8, // Small border-radius, no shadow
  },
  // Options Container
  optionsContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  headerContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    color: '#34495e',
    marginVertical: 12,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 27,
    marginBottom: 8,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  activityButtonGradient: {
    borderRadius: 30,
    shadowColor: '#00b4db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
    marginTop: 16,
  },
  activityButtonText: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StartActivities;