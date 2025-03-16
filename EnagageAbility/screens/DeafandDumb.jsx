// screens/DeafandDumb.js
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
  ActivityIndicator,
  Modal,
  Linking, // Added for opening URL
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Gobacktohome from '../components/Gobacktohome';

const DeafandDumb = ({ navigation }) => {
  const [word, setWord] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gamePopup, setGamePopup] = useState(null);

  // Fetch ASL Image as Base64
  const fetchASL = async () => {
    if (!word) {
      setError('Please enter a word.');
      return;
    }
    setError('');
    setImageBase64('');
    setIsLoading(true);

    const url = `https://american-sign-language-spelling-tool.p.rapidapi.com/${encodeURIComponent(word)}?scale=2`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '9b06821156mshb276c6dbbc2e4c6p138fccjsn56a7ca33b952',
        'x-rapidapi-host': 'american-sign-language-spelling-tool.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const blob = await response.blob();

      // Convert Blob to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log('Base64 Length:', base64data.length);
        setImageBase64(base64data);
        setIsLoading(false);
      };
      reader.onerror = () => {
        throw new Error('Failed to convert blob to base64');
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  // Function to open website URL
  const openWebsite = () => {
    const url = 'https://engage-ability.vercel.app'; // Replace with your actual website URL
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URL: ${url}`);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  // Game Logic
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const playRockPaperScissors = (choice) => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomChoice = choices[Math.floor(Math.random() * 3)];
    setUserChoice(choice);
    setComputerChoice(randomChoice);
    if (choice === randomChoice) setResult("It's a tie!");
    else if (
      (choice === 'rock' && randomChoice === 'scissors') ||
      (choice === 'paper' && randomChoice === 'rock') ||
      (choice === 'scissors' && randomChoice === 'paper')
    ) {
      setResult('You win!');
    } else {
      setResult('Computer wins!');
    }
  };

  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [guessResult, setGuessResult] = useState('');

  const playGuessTheNumber = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 10) {
      setGuessResult('Please enter a number between 1 and 10.');
    } else if (num === targetNumber) {
      setGuessResult('Correct! You guessed the number!');
      setTargetNumber(Math.floor(Math.random() * 10) + 1);
    } else if (num < targetNumber) {
      setGuessResult('Too low! Try again.');
    } else {
      setGuessResult('Too high! Try again.');
    }
    setGuess('');
  };

  const [colors] = useState(['red', 'blue', 'green', 'yellow']);
  const [targetColor, setTargetColor] = useState(colors[Math.floor(Math.random() * 4)]);
  const [colorResult, setColorResult] = useState('');

  const playColorMatch = (color) => {
    if (color === targetColor) {
      setColorResult('Correct! You matched the color!');
      setTargetColor(colors[Math.floor(Math.random() * 4)]);
    } else {
      setColorResult('Wrong! Try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2b5876" />
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.pageWrapper}>
        <Header />
        <ScrollView contentContainerStyle={styles.deafAndDumb}>
          {/* Text-to-Sign Section */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(195, 207, 226, 0.3)']}
            style={styles.signToText}
          >
            <Text style={styles.heading}>Text-to-Sign</Text>
            <TextInput
              placeholder="Enter a word"
              value={word}
              onChangeText={setWord}
              style={styles.signInput}
              placeholderTextColor="#999"
            />
            <LinearGradient
              colors={['#00b4db', '#0083b0']}
              style={styles.getSignImageGradient}
            >
              <TouchableOpacity onPress={fetchASL}>
                <Text style={styles.getSignImageText}>Get Sign Language</Text>
              </TouchableOpacity>
            </LinearGradient>
            {isLoading && <ActivityIndicator size="large" color="#00b4db" />}
            {imageBase64 ? (
              <View style={styles.result}>
                <Image
                  source={{ uri: imageBase64 }}
                  style={styles.imageOfSign}
                  resizeMode="contain"
                  onError={(e) => console.log('Image Error:', e.nativeEvent.error)}
                />
              </View>
            ) : null}
            {error && <Text style={styles.error}>{error}</Text>}
          </LinearGradient>

          {/* Website Link Section */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(195, 207, 226, 0.3)']}
            style={styles.websiteSection}
          >
            <Text style={styles.websiteTitle}>Watch Sign Language Videos</Text>
            <TouchableOpacity onPress={openWebsite} style={styles.watchButton}>
              <Text style={styles.watchButtonText}>Visit Our Website</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Games Section */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(195, 207, 226, 0.3)']}
            style={styles.gamesSection}
          >
            <Text style={styles.gamesTitle}>Simple Games for Deaf and Dumb</Text>
            <View style={styles.gamesContainer}>
              <View style={styles.gameCard}>
                <Text style={styles.gameCardTitle}>Rock Paper Scissors</Text>
                <Text style={styles.gameCardText}>Play the classic game with visual choices.</Text>
                <TouchableOpacity
                  onPress={() => setGamePopup('rock-paper-scissors')}
                  style={styles.gameButton}
                >
                  <Text style={styles.gameButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gameCard}>
                <Text style={styles.gameCardTitle}>Guess the Number</Text>
                <Text style={styles.gameCardText}>Guess a number between 1 and 10.</Text>
                <TouchableOpacity
                  onPress={() => setGamePopup('guess-the-number')}
                  style={styles.gameButton}
                >
                  <Text style={styles.gameButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gameCard}>
                <Text style={styles.gameCardTitle}>Color Match</Text>
                <Text style={styles.gameCardText}>Match the color shown!</Text>
                <TouchableOpacity
                  onPress={() => setGamePopup('color-match')}
                  style={styles.gameButton}
                >
                  <Text style={styles.gameButtonText}>Play Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>

        {/* Game Modal */}
        <Modal visible={!!gamePopup} animationType="slide" transparent>
          <View style={styles.gamePopup}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(195, 207, 226, 0.8)']}
              style={styles.gamePopupContent}
            >
              <TouchableOpacity
                onPress={() => setGamePopup(null)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
              {gamePopup === 'rock-paper-scissors' && (
                <>
                  <Text style={styles.gamePopupTitle}>Rock Paper Scissors</Text>
                  <Text style={styles.gamePopupText}>Choose your move!</Text>
                  <View style={styles.gameArea}>
                    {['rock', 'paper', 'scissors'].map((choice) => (
                      <TouchableOpacity
                        key={choice}
                        onPress={() => playRockPaperScissors(choice)}
                        style={styles.gameButton}
                      >
                        <Text style={styles.gameButtonText}>{choice}</Text>
                      </TouchableOpacity>
                    ))}
                    {userChoice && computerChoice && (
                      <View>
                        <Text style={styles.gameResultText}>You chose: {userChoice}</Text>
                        <Text style={styles.gameResultText}>Computer chose: {computerChoice}</Text>
                        <Text style={styles.gameResultText}>{result}</Text>
                      </View>
                    )}
                  </View>
                </>
              )}
              {gamePopup === 'guess-the-number' && (
                <>
                  <Text style={styles.gamePopupTitle}>Guess the Number</Text>
                  <Text style={styles.gamePopupText}>Guess a number between 1 and 10!</Text>
                  <View style={styles.gameArea}>
                    <TextInput
                      value={guess}
                      onChangeText={setGuess}
                      placeholder="Enter your guess"
                      keyboardType="numeric"
                      style={styles.gameInput}
                    />
                    <TouchableOpacity onPress={playGuessTheNumber} style={styles.gameButton}>
                      <Text style={styles.gameButtonText}>Submit Guess</Text>
                    </TouchableOpacity>
                    {guessResult && <Text style={styles.gameResultText}>{guessResult}</Text>}
                  </View>
                </>
              )}
              {gamePopup === 'color-match' && (
                <>
                  <Text style={styles.gamePopupTitle}>Color Match</Text>
                  <Text style={styles.gamePopupText}>Click the button that matches this color:</Text>
                  <View style={styles.gameArea}>
                    <View style={[styles.colorBox, { backgroundColor: targetColor }]} />
                    {colors.map((color) => (
                      <TouchableOpacity
                        key={color}
                        onPress={() => playColorMatch(color)}
                        style={[styles.gameButton, { backgroundColor: color }]}
                      >
                        <Text style={styles.gameButtonText}>{color}</Text>
                      </TouchableOpacity>
                    ))}
                    {colorResult && <Text style={styles.gameResultText}>{colorResult}</Text>}
                  </View>
                </>
              )}
            </LinearGradient>
          </View>
        </Modal>

        <Gobacktohome navigation={navigation} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  pageWrapper: { flex: 1, width: '100%' },
  deafAndDumb: { padding: 24 },
  // Text-to-Sign
  signToText: {
    padding: 20,
    borderRadius: 25,
    marginBottom: 32,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  signInput: {
    width: '100%',
    maxWidth: 400,
    padding: 12,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  getSignImageGradient: { borderRadius: 50 },
  getSignImageText: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  result: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  imageOfSign: {
    width: 300,
    height: 200,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  error: {
    color: '#ff6b6b',
    fontSize: 16,
    marginTop: 12,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 8,
    borderRadius: 10,
  },
  // Website Section
  websiteSection: {
    padding: 20,
    borderRadius: 25,
    marginBottom: 32,
    alignItems: 'center',
  },
  websiteTitle: {
    fontSize: 28,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 16,
  },
  watchButton: {
    backgroundColor: '#00b4db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  watchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Games Section
  gamesSection: {
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  gamesTitle: {
    fontSize: 28,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 16,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gameCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 16,
    borderRadius: 20,
    width: 280,
    margin: 8,
    alignItems: 'center',
  },
  gameCardTitle: {
    fontSize: 20,
    color: '#34495e',
    fontWeight: '600',
    marginBottom: 8,
  },
  gameCardText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  gameButton: {
    backgroundColor: '#00b4db',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    margin: 4,
  },
  gameButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Game Modal
  gamePopup: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gamePopupContent: {
    padding: 24,
    borderRadius: 25,
    width: '90%',
    maxWidth: 700,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#ff6b6b',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  gamePopupTitle: {
    fontSize: 28,
    color: '#1a3c5e',
    marginBottom: 16,
    textAlign: 'center',
  },
  gamePopupText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  gameArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  gameInput: {
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: 150,
    textAlign: 'center',
  },
  colorBox: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 10,
  },
  gameResultText: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default DeafandDumb;