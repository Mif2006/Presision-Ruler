import Slider from '@react-native-community/slider';
import * as Device from 'expo-device';
import React, { useEffect, useState } from 'react';
import { PixelRatio, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { deviceCatalog } from './../../constants/deviceDatabase';

export default function RulerApp() {
  const [hardwarePpi, setHardwarePpi] = useState<number | null>(null);
  // State for the interactive calibration box, defaulting to 18.1 mm
  const [targetMm, setTargetMm] = useState<number>(18.1);

  useEffect(() => {
    const modelId = Device.modelId; 
    const modelName = Device.modelName; 
    
    const matchedDevice = deviceCatalog.find(
      (device) => 
        (modelId && device.modelIds.includes(modelId)) || 
        (modelName && device.modelIds.includes(modelName)) ||
        (modelName && device.modelName === modelName)
    );

    if (matchedDevice) {
      setHardwarePpi(matchedDevice.ppi);
    } else {
      const logicalScale = PixelRatio.get();
      const basePpi = Platform.OS === 'ios' ? 163 : 160;
      setHardwarePpi(basePpi * logicalScale);
    }
  }, []);

  if (!hardwarePpi) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Calibrating Screen Hardware...</Text>
      </SafeAreaView>
    );
  }

  const currentScale = PixelRatio.get();
  
  const mmToDp = (mm: number) => {
    const physicalPixels = (mm / 25.4) * hardwarePpi;
    return physicalPixels / currentScale;
  };

  const rulerMarks = Array.from({ length: 26 }, (_, i) => i);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Precision Engine Active</Text>
        <Text style={styles.subtitle}>Hardware PPI: {hardwarePpi}</Text>
        <Text style={styles.subtitle}>OS Logical Scale: {currentScale}x</Text>
      </View>
      
      {/* 25mm Ruler */}
      <View style={styles.rulerContainer}>
        {rulerMarks.map((mm) => {
          const isFifth = mm % 5 === 0;
          const isTenth = mm % 10 === 0;
          
          let markHeight = 25; 
          if (isFifth) markHeight = 40; 
          if (isTenth) markHeight = 55; 

          return (
            <View 
              key={mm} 
              style={[
                styles.markWrapper, 
                { left: mmToDp(mm) } 
              ]}
            >
              <View 
                style={[
                  styles.markLine, 
                  { 
                    height: markHeight, 
                    backgroundColor: isTenth ? '#D32F2F' : '#333' 
                  }
                ]} 
              />
              {isTenth && (
                <Text style={styles.markText}>{mm}</Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Interactive Calibration Section */}
      <View style={styles.targetSection}>
        <Text style={styles.targetTitle}>
          Dynamic Calibration: {targetMm.toFixed(1)} mm
        </Text>
        
        <View style={styles.targetBox}>
          {/* Dynamically adjusts based on slider input */}
          <View style={[styles.targetFill, { width: mmToDp(targetMm) }]} />
        </View>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={25}
          step={0.1}
          value={targetMm}
          onValueChange={setTargetMm}
          minimumTrackTintColor="#1976D2"
          maximumTrackTintColor="#B0BEC5"
          thumbTintColor="#1976D2"
        />
        
        <Text style={styles.targetSubtitle}>
          Slide to adjust the physical width. Place a ruler against the blue bar above to verify.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  rulerContainer: {
    height: 120,
    backgroundColor: '#FFF',
    position: 'relative',
    marginTop: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  markWrapper: {
    position: 'absolute',
    top: 0,
    width: 20, 
    marginLeft: -10, 
    alignItems: 'center',
  },
  markLine: {
    width: 1.5, 
  },
  markText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
    color: '#D32F2F',
  },
  targetSection: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  targetTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  targetBox: {
    height: 24,
    backgroundColor: '#E3F2FD',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 20,
  },
  targetFill: {
    height: '100%',
    backgroundColor: '#1976D2',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  targetSubtitle: {
    fontSize: 12,
    color: '#757575',
    marginTop: 8,
    fontStyle: 'italic',
  }
});