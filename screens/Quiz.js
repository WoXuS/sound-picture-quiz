import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { soundPictureArray as tmpSoundPictureArray } from "../assets/soundPictureArray";

const Quiz = ({ route, navigation }) => {
  const [sound, setSound] = useState();
  const [played, setPlayed] = useState(false);
  const [notClickable, setNotClickable] = useState(true);
  const [soundPictureArray, setSoundPictureArray] = useState(
    tmpSoundPictureArray.slice()
  );
  const [pictures, setPictures] = useState(getPictures(soundPictureArray));
  const [endGame, setEndGame] = useState(false);
  const [pointsAmount, setPointsAmount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { maxPoints } = route.params;

  useEffect(() => {
    if (isCorrect) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 1600);
    }
  }, [isCorrect, fadeAnim]);

  function getPictures(someArray) {
    const randomNumbers = [];
    const usedNumbers = new Set();

    while (randomNumbers.length < 4) {
      const randomIndex = Math.floor(Math.random() * someArray.length);
      if (!usedNumbers.has(randomIndex)) {
        randomNumbers.push(randomIndex);
        usedNumbers.add(randomIndex);
      }
    }

    return randomNumbers;
  }

  const [correctID, setCorrectID] = useState(null);

  useEffect(() => {
    const tmpCorrectID = Math.floor(Math.random() * pictures.length);
    setCorrectID(tmpCorrectID);
  }, []);

  function generateCorrect() {
    let tmpCorrectID = Math.floor(Math.random() * pictures.length);
    setCorrectID(tmpCorrectID);
  }

  function checkCorrect(id) {
    if (correctID === id) {
      if (pointsAmount === maxPoints - 1) {
        setEndGame(true);
        playSound(require("../sounds/fanfare.mp3"));
      } else {
        setPointsAmount(pointsAmount + 1);
        soundPictureArray.splice(pictures[correctID], 1);
        setIsCorrect(true);
        playSound(require("../sounds/correctAnswer.mp3"));
        setTimeout(() => {
          setIsCorrect(false);
        }, 2200);
      }
      setPictures(getPictures(soundPictureArray));
      setPlayed(false);
      generateCorrect();
      setNotClickable(true);
    }
  }

  function resetGame() {
    setSoundPictureArray(tmpSoundPictureArray);
    setPointsAmount(0);
    setPlayed(false);
    setEndGame(false);
    setIsCorrect(false);
    setNotClickable(true);
    setPictures(getPictures(soundPictureArray));
  }

  async function playSound(soundName) {
    const { sound } = await Audio.Sound.createAsync(soundName);
    setSound(sound);
    if (soundName === soundPictureArray[pictures[correctID]].sound) {
      setPlayed(true);
    }

    await sound.playAsync();

    setTimeout(() => {
      sound.pauseAsync();
      if (soundName === soundPictureArray[pictures[correctID]].sound) {
        setNotClickable(false);
      }
    }, 2000);
    setTimeout(() => {
      sound.pauseAsync();
      if (soundName === require("../sounds/fanfare.mp3")) {
        setNotClickable(false);
      }
    }, 1500);
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      {isCorrect && (
        <Animated.View style={[styles.correctAnswer, { opacity: fadeAnim }]}>
          <Text style={styles.correctAnswerText}>Dobra Robota!</Text>
        </Animated.View>
      )}
      {endGame && (
        <View style={styles.correctAnswer}>
          <Text style={[styles.correctAnswerText, { fontSize: 30 }]}>
            Udało ci się dopasować wszystkie dźwięki, gratulacje!
          </Text>
          <TouchableOpacity
            onPress={resetGame}
            style={[styles.ButtonContainer, { marginTop: 23 }]}
            disabled={notClickable}
          >
            <Text style={styles.ButtonText}>ZAGRAJ PONOWNIE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={[styles.ButtonContainer, { marginTop: 23 }]}
            disabled={notClickable}
          >
            <Text style={styles.ButtonText}>Powrót</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.imagesRows}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => checkCorrect(0)}
          disabled={notClickable}
        >
          <Image
            style={[styles.image1, { tintColor: notClickable && "black" }]}
            source={soundPictureArray[pictures[0]].image}
          />
          <Image
            style={[
              styles.image1,
              { position: "absolute", opacity: notClickable ? 0.3 : 1 },
            ]}
            source={soundPictureArray[pictures[0]].image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => checkCorrect(1)}
          disabled={notClickable}
        >
          <Image
            style={[styles.image1, { tintColor: notClickable && "black" }]}
            source={soundPictureArray[pictures[1]].image}
          />
          <Image
            style={[
              styles.image1,
              { position: "absolute", opacity: notClickable ? 0.3 : 1 },
            ]}
            source={soundPictureArray[pictures[1]].image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowTwo}>
        <Text style={styles.noPointsText}>{pointsAmount}</Text>
        <TouchableOpacity
          onPress={() => {
            playSound(soundPictureArray[pictures[correctID]].sound);
          }}
          style={styles.ButtonContainer}
          disabled={played}
        >
          <Text style={styles.ButtonText}>START</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imagesRows}>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => checkCorrect(2)}
          disabled={notClickable}
        >
          <Image
            style={[styles.image1, { tintColor: notClickable && "black" }]}
            source={soundPictureArray[pictures[2]].image}
          />
          <Image
            style={[
              styles.image1,
              { position: "absolute", opacity: notClickable ? 0.3 : 1 },
            ]}
            source={soundPictureArray[pictures[2]].image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pressable}
          onPress={() => checkCorrect(3)}
          disabled={notClickable}
        >
          <Image
            style={[styles.image1, { tintColor: notClickable && "black" }]}
            source={soundPictureArray[pictures[3]].image}
          />
          <Image
            style={[
              styles.image1,
              { position: "absolute", opacity: notClickable ? 0.3 : 1 },
            ]}
            source={soundPictureArray[pictures[3]].image}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonView}></View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  image1: {
    width: "100%",
    height: "100%",
  },
  image2: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 0.3,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pressable: {
    width: "40%",
    height: "100%",
    margin: 10,
  },
  imagesRows: {
    width: "100%",
    height: "43%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  rowTwo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    backgroundColor: "white",
    borderRadius: 3,
    paddingVertical: 3,
    marginVertical: 5,
    width: "30%",
  },
  ButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  correctAnswer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#00A86B",
    zIndex: 1000,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  correctAnswerText: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textAlign: "center",
  },
  noPointsText: {
    fontSize: 45,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    left: 15,
  },
});
