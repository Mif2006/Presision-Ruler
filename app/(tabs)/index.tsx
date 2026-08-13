import Slider from '@react-native-community/slider';
import * as Device from 'expo-device';
import React, { useEffect, useState } from 'react';
import { PixelRatio, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { deviceCatalog } from '../../constants/deviceDatabase';

export default function RingSizerApp() {
  const [hardwarePpi, setHardwarePpi] = useState<number | null>(null);
  
  // Standard ring sizes usually fall between 14mm and 23mm. 
  // We'll set a default of 18.1mm (roughly a US Size 8).
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
        <Text style={styles.loadingText}>Calibrating Screen Hardware...</Text>
      </SafeAreaView>
    );
  }

  const currentScale = PixelRatio.get();
  
  /**
   * Converts a real-world millimeter measurement into exactly the required DP.
   */
  const mmToDp = (mm: number) => {
    const physicalPixels = (mm / 25.4) * hardwarePpi;
    return physicalPixels / currentScale;
  };

  const diameterDp = mmToDp(targetMm);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ring Sizer</Text>
        <Text style={styles.subtitle}>Precision Hardware Engine Active</Text>
      </View>
      
      {/* Visual Ring Area */}
      <View style={styles.ringDisplayContainer}>
        <View style={styles.ringWrapper}>
          {/* 
            The width/height define the absolute outer bounds of the circle.
            By using border-box behavior, the outer edge of this digital ring 
            will physically measure exactly targetMm across.
          */}
          <View 
            style={[
              styles.ringCircle, 
              { 
                width: diameterDp, 
                height: diameterDp,
                borderRadius: diameterDp / 2, 
              }
            ]} 
          />
          
          {/* Center Crosshair for visual alignment */}
          <View style={styles.crosshairVertical} />
          <View style={styles.crosshairHorizontal} />
        </View>
        <Text style={styles.instructionText}>
          Place your ring on the screen. Adjust the slider until the blue circle perfectly touches the <Text style={styles.boldText}>inside edge</Text> of your ring.
        </Text>
      </View>

      {/* Controls Section */}
      <View style={styles.controlsSection}>
        <View style={styles.measurementReadout}>
          <Text style={styles.measurementLabel}>Diameter</Text>
          <Text style={styles.measurementValue}>{targetMm.toFixed(1)} mm</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={12} // Minimum reasonable ring diameter
          maximumValue={26} // Maximum reasonable ring diameter
          step={0.1}
          value={targetMm}
          onValueChange={setTargetMm}
          minimumTrackTintColor="#1976D2"
          maximumTrackTintColor="#CFD8DC"
          thumbTintColor="#1976D2"
        />
        
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>12 mm</Text>
          <Text style={styles.sliderLabelText}>26 mm</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#455A64',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#263238',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#78909C',
    marginTop: 4,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  ringDisplayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  ringWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    // A fixed minimum area prevents layout jumps when resizing the ring
    minWidth: 150,
    minHeight: 150, 
  },
  ringCircle: {
    borderWidth: 4,
    borderColor: '#1976D2',
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    position: 'absolute',
    zIndex: 10,
  },
  crosshairVertical: {
    position: 'absolute',
    width: 1,
    height: 40,
    backgroundColor: '#B0BEC5',
    zIndex: 1,
  },
  crosshairHorizontal: {
    position: 'absolute',
    width: 40,
    height: 1,
    backgroundColor: '#B0BEC5',
    zIndex: 1,
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    color: '#546E7A',
  },
  boldText: {
    fontWeight: '700',
    color: '#263238',
  },
  controlsSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 32,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  measurementReadout: {
    alignItems: 'center',
    marginBottom: 24,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#90A4AE',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 42,
    fontWeight: '300',
    color: '#1976D2',
    fontVariant: ['tabular-nums'], // Keeps the width stable while sliding
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  sliderLabelText: {
    fontSize: 12,
    color: '#90A4AE',
    fontWeight: '500',
  }
});