import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
import Login from '../assets/homeimage.webp'; // Direct import

const CareTakerSig = ({ navigation }) => {
  const [name, setName] = useState('');
  const [institute, setInstitute] = useState('');

  const handleAccess = () => {
    if (name.trim() && institute.trim()) {
      alert(`Welcome, ${name} from ${institute}!`);
      navigation.navigate('Activities', { caretakerName: name, instituteName: institute });
    } else {
      alert('Please provide both your name and institute name.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2b5876" />
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Caretaker Access Section */}
          <View style={styles.caretakerAccessContainer}>
            <Text style={styles.caretakerInstructions}>
              Read below instructions before accessing activities
            </Text>
            <Text style={styles.caretakerAccessTitle}>Caretaker Access</Text>
            <View style={styles.caretakerLoginSection}>
              <View style={styles.caretakerAccessForm}>
                <TextInput
                  placeholder="Enter Your Name"
                  value={name}
                  onChangeText={setName}
                  style={styles.caretakerInputField}
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                />
                <TextInput
                  placeholder="Enter Your Institute Name"
                  value={institute}
                  onChangeText={setInstitute}
                  style={styles.caretakerInputField}
                  placeholderTextColor="#999"
                  autoCapitalize="words"
                />
                <LinearGradient
                  colors={['#00b4db', '#0083b0']}
                  style={styles.caretakerBtnPrimaryGradient}
                >
                  <TouchableOpacity onPress={handleAccess}>
                    <Text style={styles.caretakerBtnPrimaryText}>Access Activities</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Caretaker Header Content */}
          <View style={styles.caretakerHeaderContent}>
            <View style={styles.headerWithIllustration}>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Welcome to the Inclusive Care Platform</Text>
                <Text style={styles.headerDescription}>
                  This platform is designed to assist caretakers in communicating and engaging with{' '}
                  <Text style={styles.boldText}>deaf, dumb, and mentally disabled individuals.</Text>{' '}
                  Below are the detailed guidelines for effectively using our tools and ensuring
                  meaningful interactions.
                </Text>
              </View>
            </View>

            {/* Supporting Deaf and Dumb */}
            <View style={styles.caretakerSection}>
              <Text style={styles.sectionTitle}>👐 Supporting Deaf and Dumb Individuals</Text>
              <Text style={styles.sectionDescription}>
                Our platform includes a <Text style={styles.boldText}>Text-to-Sign Tool</Text> that
                helps caretakers convert words into{' '}
                <Text style={styles.boldText}>American Sign Language (ASL) images</Text> to
                facilitate communication.
              </Text>
              <Text style={styles.subSectionTitle}>How to Use the Text-to-Sign Tool:</Text>
              {[
                '✅ Enter a word or phrase in the input field.',
                '✅ Click the "Get Sign Language" button.',
                '✅ The tool will generate ASL images for easy communication.',
                '✅ Show the ASL images to the individual for better understanding.',
              ].map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  {item}
                </Text>
              ))}
              <Text style={styles.subSectionTitle}>Engagement Tips:</Text>
              {[
                '👀 Maintain eye contact and use clear facial expressions.',
                '👐 Use hand gestures and visual aids to make communication easier.',
                '🗣️ Speak clearly while signing (for those who can lip-read).',
              ].map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>

            {/* Supporting Mentally Disabled */}
            <View style={styles.caretakerSection}>
              <Text style={styles.sectionTitle}>🧠 Supporting Mentally Disabled Individuals</Text>
              <Text style={styles.sectionDescription}>
                Caretakers play a crucial role in helping mentally disabled individuals engage in
                daily activities and develop social and cognitive skills.
              </Text>
              <Text style={styles.subSectionTitle}>Best Practices for Engagement:</Text>
              {[
                '✅ This tool is Integrated With IoT',
                '✅ Used to monitor the Mentally ill People',
                '✅ Use the Sensors Correctly to the Mentally ill People',
              ].map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  {item}
                </Text>
              ))}
              <Text style={styles.subSectionTitle}>Interactive Activities:</Text>
              <Text style={styles.sectionDescription}>
                Based on the Person's Heart rate and behaviour our tool will provide some
                Activities. Below are some Activities
              </Text>
              {[
                '🎶 Music Therapy - Helps with relaxation and emotional expression.',
                '🎨 Art and Craft - Boosts creativity and hand-eye coordination.',
                '🧩 Puzzle Games - Enhances problem-solving skills.',
                '🏃 Physical Activities - Helps improve motor skills and coordination.',
              ].map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>

            {/* Caretaker Guidelines */}
            <View style={styles.caretakerSection}>
              <Text style={styles.sectionTitle}>💡 Caretaker Guidelines</Text>
              <Text style={styles.sectionDescription}>
                As a caretaker, your patience and support can create a more inclusive and positive
                environment for those in your care.
              </Text>
              {[
                '❤️ Be kind and understanding – Empathy is key.',
                '👂 Listen and observe – Understand their needs and comfort levels.',
                '📝 Use assistive tools – Our platform provides tools to ease communication.',
                '🤝 Encourage social interactions – Foster friendships and group activities.',
                '💬 Create a positive environment – Avoid frustration and use positive reinforcement.',
              ].map((item, index) => (
                <Text key={index} style={styles.listItem}>
                  {item}
                </Text>
              ))}
            </View>
          </View>

          <Gobacktohome navigation={navigation} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  // Caretaker Access Section
  caretakerAccessContainer: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  caretakerInstructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  caretakerAccessTitle: {
    fontSize: 28,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  caretakerLoginSection: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  caretakerAccessForm: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 500,
    marginBottom: 16,
  },
  caretakerInputField: {
    padding: 12,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  caretakerBtnPrimaryGradient: {
    borderRadius: 30,
    shadowColor: '#00b4db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 5,
  },
  caretakerBtnPrimaryText: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caretakerLoginIllustration: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  loginImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  // Caretaker Header Content
  caretakerHeaderContent: {
    padding: 20,
    width: '100%',
  },
  headerWithIllustration: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 28,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 27,
    width: '90%',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  caretakerSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#34495e',
    marginBottom: 8,
  },
  subSectionTitle: {
    fontSize: 18,
    color: '#2c3e50',
    marginVertical: 12,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 27,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    paddingLeft: 24,
  },
});

export default CareTakerSig;