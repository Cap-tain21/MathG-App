import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Complete game levels data - ALL 50 LEVELS
const gameLevels = [
  // Beginner 1-10
  { level: 1, name: "Beginner 1", target: 10, numbers: 2, numbersPool: [1,2,3,4,5], coins: 5 },
  { level: 2, name: "Beginner 2", target: 15, numbers: 2, numbersPool: [1,2,3,4,5,6], coins: 5 },
  { level: 3, name: "Beginner 3", target: 20, numbers: 2, numbersPool: [2,3,4,5,6,7], coins: 5 },
  { level: 4, name: "Beginner 4", target: 25, numbers: 2, numbersPool: [3,4,5,6,7,8], coins: 5 },
  { level: 5, name: "Beginner 5", target: 30, numbers: 2, numbersPool: [4,5,6,7,8,9], coins: 5 },
  { level: 6, name: "Beginner 6", target: 35, numbers: 3, numbersPool: [1,2,3,4,5,6], coins: 8 },
  { level: 7, name: "Beginner 7", target: 40, numbers: 3, numbersPool: [2,3,4,5,6,7], coins: 8 },
  { level: 8, name: "Beginner 8", target: 45, numbers: 3, numbersPool: [3,4,5,6,7,8], coins: 8 },
  { level: 9, name: "Beginner 9", target: 50, numbers: 3, numbersPool: [4,5,6,7,8,9], coins: 8 },
  { level: 10, name: "Beginner 10", target: 60, numbers: 3, numbersPool: [5,6,7,8,9,10], coins: 8 },
  
  // Explorer 11-20
  { level: 11, name: "Explorer 1", target: 75, numbers: 3, numbersPool: [6,7,8,9,10,12], coins: 12 },
  { level: 12, name: "Explorer 2", target: 90, numbers: 3, numbersPool: [7,8,9,10,12,15], coins: 12 },
  { level: 13, name: "Explorer 3", target: 100, numbers: 4, numbersPool: [4,5,6,7,8,9], coins: 12 },
  { level: 14, name: "Explorer 4", target: 120, numbers: 4, numbersPool: [5,6,7,8,9,10], coins: 12 },
  { level: 15, name: "Explorer 5", target: 150, numbers: 4, numbersPool: [6,7,8,9,10,12], coins: 12 },
  { level: 16, name: "Explorer 6", target: 180, numbers: 4, numbersPool: [7,8,9,10,12,15], coins: 12 },
  { level: 17, name: "Explorer 7", target: 200, numbers: 4, numbersPool: [8,9,10,12,15,20], coins: 12 },
  { level: 18, name: "Explorer 8", target: 240, numbers: 4, numbersPool: [9,10,12,15,20,25], coins: 12 },
  { level: 19, name: "Explorer 9", target: 300, numbers: 4, numbersPool: [10,12,15,20,25,30], coins: 12 },
  { level: 20, name: "Explorer 10", target: 360, numbers: 4, numbersPool: [12,15,20,25,30,36], coins: 12 },
  
  // Strategist 21-30
  { level: 21, name: "Strategist 1", target: 420, numbers: 4, numbersPool: [15,20,25,30,35,42], coins: 18 },
  { level: 22, name: "Strategist 2", target: 500, numbers: 4, numbersPool: [20,25,30,35,40,50], coins: 18 },
  { level: 23, name: "Strategist 3", target: 600, numbers: 4, numbersPool: [25,30,35,40,50,60], coins: 18 },
  { level: 24, name: "Strategist 4", target: 720, numbers: 4, numbersPool: [30,35,40,45,60,72], coins: 18 },
  { level: 25, name: "Strategist 5", target: 840, numbers: 4, numbersPool: [35,40,45,50,70,84], coins: 18 },
  { level: 26, name: "Strategist 6", target: 1000, numbers: 5, numbersPool: [40,50,60,70,80,100], coins: 18 },
  { level: 27, name: "Strategist 7", target: 1200, numbers: 5, numbersPool: [50,60,70,80,90,120], coins: 18 },
  { level: 28, name: "Strategist 8", target: 1500, numbers: 5, numbersPool: [60,70,80,90,100,150], coins: 18 },
  { level: 29, name: "Strategist 9", target: 1800, numbers: 5, numbersPool: [70,80,90,100,120,180], coins: 18 },
  { level: 30, name: "Strategist 10", target: 2000, numbers: 5, numbersPool: [80,90,100,120,150,200], coins: 18 },
  
  // Master 31-40
  { level: 31, name: "Master 1", target: 2500, numbers: 5, numbersPool: [100,120,150,200,250], coins: 25 },
  { level: 32, name: "Master 2", target: 3000, numbers: 5, numbersPool: [120,150,200,250,300], coins: 25 },
  { level: 33, name: "Master 3", target: 3600, numbers: 5, numbersPool: [150,200,250,300,360], coins: 25 },
  { level: 34, name: "Master 4", target: 4200, numbers: 5, numbersPool: [200,250,300,350,420], coins: 25 },
  { level: 35, name: "Master 5", target: 5000, numbers: 5, numbersPool: [250,300,400,500], coins: 25 },
  { level: 36, name: "Master 6", target: 6000, numbers: 5, numbersPool: [300,400,500,600], coins: 25 },
  { level: 37, name: "Master 7", target: 7200, numbers: 5, numbersPool: [400,500,600,720], coins: 25 },
  { level: 38, name: "Master 8", target: 8400, numbers: 5, numbersPool: [500,600,700,840], coins: 25 },
  { level: 39, name: "Master 9", target: 10000, numbers: 5, numbersPool: [600,700,800,1000], coins: 25 },
  { level: 40, name: "Master 10", target: 12000, numbers: 5, numbersPool: [700,800,900,1200], coins: 25 },
  
  // Impossible 41-50
  { level: 41, name: "Impossible 1", target: 15000, numbers: 5, numbersPool: [800,1000,1200,1500], coins: 50 },
  { level: 42, name: "Impossible 2", target: 18000, numbers: 5, numbersPool: [900,1200,1500,1800], coins: 50 },
  { level: 43, name: "Impossible 3", target: 20000, numbers: 5, numbersPool: [1000,1500,2000], coins: 50 },
  { level: 44, name: "Impossible 4", target: 25000, numbers: 5, numbersPool: [1200,1800,2500], coins: 50 },
  { level: 45, name: "Impossible 5", target: 30000, numbers: 5, numbersPool: [1500,2000,3000], coins: 50 },
  { level: 46, name: "Impossible 6", target: 36000, numbers: 5, numbersPool: [1800,2400,3600], coins: 50 },
  { level: 47, name: "Impossible 7", target: 42000, numbers: 5, numbersPool: [2000,3000,4200], coins: 50 },
  { level: 48, name: "Impossible 8", target: 50000, numbers: 5, numbersPool: [2500,3500,5000], coins: 50 },
  { level: 49, name: "Impossible 9", target: 60000, numbers: 5, numbersPool: [3000,4000,6000], coins: 50 },
  { level: 50, name: "Impossible 10", target: 75000, numbers: 5, numbersPool: [3500,5000,7500], coins: 50 }
];

const App = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [equation, setEquation] = useState<(number | string)[]>([]);
  const [usedNumbers, setUsedNumbers] = useState<number[]>([]);
  const [playerCoins, setPlayerCoins] = useState(100);
  const [showSplash, setShowSplash] = useState(true);
  const [showLevels, setShowLevels] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('default');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const cubeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Cube animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(cubeAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(cubeAnim, {
          toValue: 0,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Splash screen timer
    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => setShowSplash(false));
    }, 1500);

    // Main game fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: 1500,
    }).start();

    return () => clearTimeout(timer);
  }, []);

  const cubeScale = cubeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05]
  });

  const cubeShadow = cubeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 25]
  });

  const addToEquation = (value: number | string) => {
    const level = gameLevels[currentLevel];
    
    if (typeof value === 'number') {
      if (usedNumbers.length >= level.numbers) {
        Alert.alert('Limit Reached', 'Maximum numbers used for this level!');
        return;
      }
      setUsedNumbers([...usedNumbers, value]);
    }
    
    setEquation([...equation, value]);
  };

  const clearEquation = () => {
    setEquation([]);
    setUsedNumbers([]);
  };

  const evaluateExpression = (expr: (number | string)[]): number => {
    try {
      const expression = expr.join('').replace(/×/g, '*').replace(/÷/g, '/');
      return Function(`"use strict"; return (${expression})`)();
    } catch {
      throw new Error('Invalid expression');
    }
  };

  const checkSolution = () => {
    const level = gameLevels[currentLevel];
    
    try {
      const result = evaluateExpression(equation);
      
      if (Math.abs(result - level.target) < 0.001) {
        // Correct solution
        const coinsEarned = level.coins;
        setPlayerCoins(prev => prev + coinsEarned);
        
        Alert.alert(
          'Perfect! 🎯', 
          `Moving to next level...\n+${coinsEarned} coins earned!`,
          [
            {
              text: 'Continue',
              onPress: () => {
                if (currentLevel < gameLevels.length - 1) {
                  setCurrentLevel(prev => prev + 1);
                } else {
                  setCurrentLevel(0); // Loop back to start
                }
                clearEquation();
              }
            }
          ]
        );
      } else {
        // Wrong solution
        const coinsLost = currentLevel < 30 ? 2 : 5;
        setPlayerCoins(prev => Math.max(0, prev - coinsLost));
        Alert.alert('Wrong!', `Result: ${result} | Target: ${level.target}\nLost ${coinsLost} coins`);
        clearEquation();
      }
    } catch {
      Alert.alert('Invalid equation!', 'Please check your equation format.');
      clearEquation();
    }
  };

  const selectLevel = (levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setShowLevels(false);
    clearEquation();
  };

  const claimDailyCoins = () => {
    setPlayerCoins(prev => prev + 50);
    Alert.alert('Daily Reward!', '+50 coins claimed! 🪙');
    setShowSettings(false);
  };

  const renderSplashScreen = () => (
    <Animated.View style={[styles.splashScreen, { opacity: splashOpacity }]}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.splashBackground}
      >
        <Animated.View style={[
          styles.mathgCube,
          {
            elevation: cubeShadow,
            transform: [
              { rotateX: '15deg' },
              { rotateY: '15deg' },
              { scale: cubeScale }
            ]
          }
        ]}>
          <Text style={styles.mathgText}>MathG</Text>
        </Animated.View>
        <Text style={styles.splashSubtitle}>Math Puzzle Game</Text>
      </LinearGradient>
    </Animated.View>
  );

  const renderNumberButtons = () => {
    const level = gameLevels[currentLevel];
    return level.numbersPool.map((num, index) => (
      <TouchableOpacity
        key={index}
        style={styles.numberButton}
        onPress={() => addToEquation(num)}
      >
        <Text style={styles.numberButtonText}>{num}</Text>
      </TouchableOpacity>
    ));
  };

  const renderOperatorButtons = () => {
    const operators = ['+', '-', '×', '÷'];
    return operators.map((op, index) => (
      <TouchableOpacity
        key={index}
        style={styles.operatorButton}
        onPress={() => addToEquation(op)}
      >
        <Text style={styles.operatorButtonText}>{op}</Text>
      </TouchableOpacity>
    ));
  };

  const level = gameLevels[currentLevel];

  if (showSplash) {
    return renderSplashScreen();
  }

  return (
    <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <StatusBar backgroundColor={theme === 'dark' ? '#2c3e50' : '#667eea'} />
      
      <Animated.View style={[styles.gameContainer, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.coinDisplay}>
            <Text style={styles.coinText}>🪙 {playerCoins}</Text>
          </View>
          
          <TouchableOpacity style={styles.levelDisplay} onPress={() => setShowLevels(true)}>
            <Text style={styles.levelText}>{level.name}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsBtn} onPress={() => setShowSettings(true)}>
            <Text style={styles.settingsText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Target Section */}
        <View style={styles.targetSection}>
          <Text style={styles.targetLabel}>TARGET NUMBER</Text>
          <Text style={styles.targetNumber}>{level.target.toLocaleString()}</Text>
          <Text style={styles.numbersInfo}>
            Use exactly {level.numbers} numbers
          </Text>
          <Text style={styles.equationHint}>
            {usedNumbers.length < level.numbers 
              ? `Add ${level.numbers - usedNumbers.length} more number${level.numbers - usedNumbers.length > 1 ? 's' : ''}`
              : 'Equation complete! Ready to check...'
            }
          </Text>
        </View>

        {/* Equation Display */}
        <View style={styles.equationSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.equationDisplay}>
              {equation.length === 0 ? (
                <Text style={styles.placeholderText}>
                  Tap numbers and operators to build your equation
                </Text>
              ) : (
                equation.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.equationChip,
                      typeof item === 'number' ? styles.numberChip : styles.operatorChip,
                    ]}
                    onPress={() => {
                      const newEquation = [...equation];
                      const newUsedNumbers = [...usedNumbers];
                      if (typeof item === 'number') {
                        const numIndex = newUsedNumbers.indexOf(item);
                        if (numIndex > -1) {
                          newUsedNumbers.splice(numIndex, 1);
                        }
                      }
                      newEquation.splice(index, 1);
                      setEquation(newEquation);
                      setUsedNumbers(newUsedNumbers);
                    }}
                  >
                    <Text style={styles.chipText}>{item}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
        </View>

        {/* Numbers Grid */}
        <View style={styles.numbersGrid}>
          {renderNumberButtons()}
        </View>

        {/* Operators Row */}
        <View style={styles.operatorsRow}>
          {renderOperatorButtons()}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.clearButton]} onPress={clearEquation}>
            <Text style={styles.actionButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.checkButton]} 
            onPress={checkSolution}
            disabled={usedNumbers.length < level.numbers}
          >
            <Text style={styles.actionButtonText}>
              {usedNumbers.length < level.numbers ? 'Add More Numbers' : 'Check Solution'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Level Selection Modal */}
      <Modal visible={showLevels} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Level</Text>
              <TouchableOpacity onPress={() => setShowLevels(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.levelsGrid}>
                {gameLevels.map((lvl, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.levelCard,
                      index === currentLevel && styles.levelCardActive,
                      index > currentLevel && styles.levelCardLocked
                    ]}
                    onPress={() => selectLevel(index)}
                    disabled={index > currentLevel}
                  >
                    <Text style={[
                      styles.levelNumber,
                      index === currentLevel && styles.levelCardActiveText,
                      index > currentLevel && styles.levelCardLockedText
                    ]}>{lvl.level}</Text>
                    <Text style={[
                      styles.levelName,
                      index === currentLevel && styles.levelCardActiveText,
                      index > currentLevel && styles.levelCardLockedText
                    ]}>{lvl.name}</Text>
                    <Text style={[
                      styles.levelTarget,
                      index === currentLevel && styles.levelCardActiveText,
                      index > currentLevel && styles.levelCardLockedText
                    ]}>Target: {lvl.target.toLocaleString()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal visible={showSettings} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Theme</Text>
              <View style={styles.themeOptions}>
                <TouchableOpacity 
                  style={[styles.themeOption, styles.themeDefault, theme === 'default' && styles.themeActive]}
                  onPress={() => setTheme('default')}
                >
                  <Text style={styles.themeText}>Default</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.themeOption, styles.themeDark, theme === 'dark' && styles.themeActive]}
                  onPress={() => setTheme('dark')}
                >
                  <Text style={styles.themeText}>Dark</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={claimDailyCoins}>
              <Text style={styles.primaryButtonText}>🎁 Claim Daily Coins (+50)</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>MathG v1.0.0</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (keep all the same styles from previous version, they're perfect)
  splashScreen: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 9999,
  },
  splashBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mathgCube: {
    width: 180, height: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 35,
  },
  mathgText: {
    fontSize: 42, fontWeight: '900',
    color: '#2c3e50',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  splashSubtitle: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    opacity: 0.9,
  },
  lightContainer: { flex: 1, backgroundColor: '#667eea' },
  darkContainer: { flex: 1, backgroundColor: '#2c3e50' },
  gameContainer: {
    flex: 1, margin: 10, borderRadius: 25,
    backgroundColor: 'white', overflow: 'hidden',
    elevation: 10, shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 30,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 15, backgroundColor: 'white',
  },
  coinDisplay: {
    backgroundColor: '#FFD700', paddingHorizontal: 15,
    paddingVertical: 8, borderRadius: 20, elevation: 5,
  },
  coinText: { fontWeight: 'bold', color: 'white', fontSize: 14 },
  levelDisplay: {
    backgroundColor: '#667eea', paddingHorizontal: 20,
    paddingVertical: 8, borderRadius: 20, elevation: 5,
  },
  levelText: { fontWeight: 'bold', color: 'white', fontSize: 14 },
  settingsBtn: {
    backgroundColor: '#667eea', width: 45, height: 45,
    borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 5,
  },
  settingsText: { fontSize: 20, color: 'white' },
  targetSection: {
    alignItems: 'center', padding: 25,
    borderBottomWidth: 2, borderBottomColor: '#e0e0e0',
  },
  targetLabel: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 },
  targetNumber: { fontSize: 48, fontWeight: '900', color: '#667eea', marginBottom: 8 },
  numbersInfo: { fontSize: 16, color: '#666', marginBottom: 5 },
  equationHint: { fontSize: 14, color: '#27ae60', fontWeight: '600' },
  equationSection: {
    margin: 20, padding: 15, borderWidth: 2,
    borderStyle: 'dashed', borderColor: '#e0e0e0', borderRadius: 15, minHeight: 80,
  },
  equationDisplay: { flexDirection: 'row', alignItems: 'center' },
  placeholderText: { color: '#95a5a6', fontStyle: 'italic', fontSize: 14 },
  equationChip: {
    paddingHorizontal: 15, paddingVertical: 12,
    borderRadius: 12, marginHorizontal: 5, elevation: 3,
  },
  numberChip: { backgroundColor: '#e74c3c' },
  operatorChip: { backgroundColor: '#667eea' },
  chipText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  numbersGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', padding: 20,
  },
  numberButton: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#e74c3c', justifyContent: 'center',
    alignItems: 'center', margin: 8, elevation: 5,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4,
  },
  numberButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  operatorsRow: { flexDirection: 'row', justifyContent: 'center', padding: 20 },
  operatorButton: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#667eea', justifyContent: 'center',
    alignItems: 'center', marginHorizontal: 10, elevation: 5,
  },
  operatorButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
  actionButton: { paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15, elevation: 5 },
  clearButton: { backgroundColor: '#e74c3c' },
  checkButton: { backgroundColor: '#27ae60' },
  actionButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white', borderRadius: 20, padding: 20,
    margin: 20, maxHeight: '80%', width: '90%', elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20, paddingBottom: 15,
    borderBottomWidth: 2, borderBottomColor: '#e0e0e0',
  },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#2c3e50' },
  closeButton: { fontSize: 24, color: '#666', padding: 5 },
  levelsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  levelCard: {
    width: '30%', backgroundColor: 'white', borderWidth: 2,
    borderColor: '#e0e0e0', borderRadius: 12, padding: 12,
    marginBottom: 12, alignItems: 'center', elevation: 2,
  },
  levelCardActive: { backgroundColor: '#667eea', borderColor: '#667eea' },
  levelCardLocked: { opacity: 0.6, backgroundColor: '#f8f9fa' },
  levelNumber: { fontSize: 18, fontWeight: '900', marginBottom: 2, color: '#2c3e50' },
  levelName: { fontSize: 10, fontWeight: '600', opacity: 0.8, color: '#2c3e50', textAlign: 'center' },
  levelTarget: { fontSize: 8, color: '#666', marginTop: 2 },
  levelCardActiveText: { color: 'white' },
  levelCardLockedText: { color: '#95a5a6' },
  settingsSection: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#2c3e50',
    marginBottom: 15, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  themeOptions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  themeOption: {
    flex: 1, padding: 15, borderRadius: 15,
    marginHorizontal: 6, alignItems: 'center',
    borderWidth: 2, borderColor: '#e0e0e0',
  },
  themeDefault: { backgroundColor: '#667eea' },
  themeDark: { backgroundColor: '#2c3e50' },
  themeActive: { borderColor: '#667eea', transform: [{ scale: 1.05 }], elevation: 5 },
  themeText: { color: 'white', fontWeight: '700' },
  primaryButton: {
    backgroundColor: '#667eea', padding: 15,
    borderRadius: 15, alignItems: 'center', marginTop: 10, elevation: 6,
  },
  primaryButtonText: { color: 'white', fontWeight: '700', fontSize: 16 },
  versionText: { textAlign: 'center', marginTop: 20, color: '#95a5a6', fontSize: 12 },
});

export default App;
