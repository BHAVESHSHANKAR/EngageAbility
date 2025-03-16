import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Gobacktohome from '../components/Gobacktohome';

const MentalDisability = ({ navigation, route }) => {
  const caretakerName = route.params?.caretakerName || 'Caretaker';
  const instituteName = route.params?.instituteName || 'Institute';

  const [personName, setPersonName] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [monitoringData, setMonitoringData] = useState([]);
  const [liveData, setLiveData] = useState({
    temperature: 'N/A',
    heartRate: 'N/A',
    spo2: 'N/A',
  });
  const [error, setError] = useState('');

  const startMonitoring = () => {
    setShowPopup(true);
    setError('');
  };

  const handlePopupSubmit = () => {
    if (!personName.trim()) {
      setError('Please enter a name.');
      return;
    }
    setShowPopup(false);
    setIsMonitoring(true);
    setError('');
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);

    const hr = parseFloat(liveData.heartRate) || 0;
    const temp = parseFloat(liveData.temperature) || 0;
    const spo2 = parseFloat(liveData.spo2) || 0;

    let finalMood = '';
    if (hr < 70) {
      finalMood = 'Relaxed';
    } else if (hr >= 70 && hr <= 90) {
      finalMood = 'Stable';
    } else {
      finalMood = 'Anxious';
    }

    const newEntry = {
      name: personName,
      temperature: temp,
      heartRate: hr,
      spo2: spo2,
      mood: finalMood,
      timestamp: new Date().toLocaleString(),
    };

    setMonitoringData([...monitoringData, newEntry]);
    setPersonName('');
    setLiveData({ temperature: 'N/A', heartRate: 'N/A', spo2: 'N/A' });
  };

  const resetData = () => {
    setMonitoringData([]);
    setPersonName('');
    setIsMonitoring(false);
    setShowPopup(false);
    setLiveData({ temperature: 'N/A', heartRate: 'N/A', spo2: 'N/A' });
    setError('');
  };

  useEffect(() => {
    let interval;
    if (isMonitoring) {
      interval = setInterval(async () => {
        try {
          const response = await fetch('https://engage-ability-api.vercel.app/api/sensor-data');
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setLiveData({
            temperature: data.temperature ?? 'N/A',
            heartRate: data.heartRate ?? 'N/A',
            spo2: data.spo2 ?? 'N/A',
          });
          setError('');
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to fetch sensor data.');
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2b5876" />
      <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.pageWrapper}>
        <Header />
        <ScrollView contentContainerStyle={styles.mentalContainer}>
          <Text style={styles.title}>
            Welcome, {caretakerName}! ({instituteName})
          </Text>

          <View style={styles.monitoringControls}>
            {!isMonitoring ? (
              <TouchableOpacity onPress={startMonitoring} style={styles.startBtn}>
                <Text style={styles.btnText}>Start Monitoring</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={stopMonitoring} style={styles.stopBtn}>
                <Text style={styles.btnText}>Stop Monitoring</Text>
              </TouchableOpacity>
            )}
            {monitoringData.length > 0 && (
              <TouchableOpacity onPress={resetData} style={styles.resetBtn}>
                <Text style={styles.btnText}>Reset Data</Text>
              </TouchableOpacity>
            )}
          </View>

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          {isMonitoring && (
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.2)', 'rgba(195, 207, 226, 0.3)']}
              style={styles.liveData}
            >
              <Text style={styles.liveDataTitle}>Monitoring: {personName}</Text>
              <Text style={styles.liveDataText}>Temperature: {liveData.temperature}°C</Text>
              <Text style={styles.liveDataText}>Heart Rate: {liveData.heartRate} BPM</Text>
              <Text style={styles.liveDataText}>SpO2: {liveData.spo2}%</Text>
            </LinearGradient>
          )}

          {monitoringData.length > 0 && (
            <View style={styles.monitoringTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Name</Text>
                <Text style={styles.tableHeaderText}>Temp (°C)</Text>
                <Text style={styles.tableHeaderText}>HR (BPM)</Text>
                <Text style={styles.tableHeaderText}>SpO2 (%)</Text>
                <Text style={styles.tableHeaderText}>Mood</Text>
                <Text style={styles.tableHeaderText}>Time</Text>
              </View>
              {monitoringData.map((data, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{data.name}</Text>
                  <Text style={styles.tableCell}>{data.temperature}</Text>
                  <Text style={styles.tableCell}>{data.heartRate}</Text>
                  <Text style={styles.tableCell}>{data.spo2}</Text>
                  <Text style={styles.tableCell}>{data.mood}</Text>
                  <Text style={styles.tableCell}>{data.timestamp}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        <Modal visible={showPopup} animationType="slide" transparent>
          <View style={styles.popupOverlay}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(195, 207, 226, 0.8)']}
              style={styles.popupContent}
            >
              <Text style={styles.popupTitle}>Enter Person's Name</Text>
              <TextInput
                placeholder="Name"
                value={personName}
                onChangeText={setPersonName}
                style={[styles.popupInput, error ? styles.inputError : null]}
                placeholderTextColor="#999"
              />
              {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
              <TouchableOpacity
                onPress={handlePopupSubmit}
                style={[styles.btnPrimary, !personName.trim() && styles.btnDisabled]}
                disabled={!personName.trim()}
              >
                <Text style={styles.btnText}>Start Monitoring</Text>
              </TouchableOpacity>
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
  mentalContainer: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    color: '#1a3c5e',
    fontWeight: '700',
    marginBottom: 32,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  monitoringControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 16,
  },
  startBtn: {
    backgroundColor: '#00b4db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  stopBtn: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  resetBtn: {
    backgroundColor: '#f1c40f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 8,
    borderRadius: 10,
  },
  liveData: {
    padding: 20,
    borderRadius: 25,
    marginBottom: 32,
    alignItems: 'center',
  },
  liveDataTitle: {
    fontSize: 24,
    color: '#1a3c5e',
    fontWeight: '600',
    marginBottom: 16,
  },
  liveDataText: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 12,
    fontWeight: '500',
  },
  monitoringTable: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 32,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 180, 219, 0.2)',
    padding: 16,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#34495e',
    textAlign: 'center',
  },
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    padding: 24,
    borderRadius: 25,
    width: '90%',
    maxWidth: 500,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 24,
    color: '#1a3c5e',
    fontWeight: '600',
    marginBottom: 16,
  },
  popupInput: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  inputError: {
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  btnPrimary: {
    backgroundColor: '#00b4db',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  btnDisabled: {
    backgroundColor: '#b0bec5',
  },
});

export default MentalDisability;