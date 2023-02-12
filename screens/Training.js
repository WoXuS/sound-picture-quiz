import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { soundPictureArray as tmpSoundPictureArray } from "../assets/soundPictureArray";

const Training = () => {
  const [sound, setSound] = useState();
  const [notClickable, setNotClickable] = useState(false);
  const half = Math.ceil(tmpSoundPictureArray.length / 2);
  const [firstSoundPictureArray, setFirstSoundPictureArray] = useState(
    tmpSoundPictureArray.slice(0, half)
  );
  const [secondSoundPictureArray, setSecondSoundPictureArray] = useState(
    tmpSoundPictureArray.slice(half)
  );

  async function playSound(soundName) {
    const { sound } = await Audio.Sound.createAsync(soundName);
    setSound(sound);
    setNotClickable(true);

    await sound.playAsync();

    setTimeout(() => {
      sound.pauseAsync();
      setNotClickable(false);
    }, 2500);
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
      <View style={[styles.imagesRow, {marginTop: "auto",}]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {firstSoundPictureArray.map((item, key) => {
            return (
              <TouchableOpacity
                style={styles.pressable}
                onPress={() => playSound(item.sound)}
                disabled={notClickable}
                key={key}
              >
                <Image
                  style={[
                    styles.image1,
                    { tintColor: notClickable && "black" },
                  ]}
                  source={item.image}
                />
                <Image
                  style={[
                    styles.image1,
                    { position: "absolute", opacity: notClickable ? 0.3 : 1 },
                  ]}
                  source={item.image}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.imagesRow}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {secondSoundPictureArray.map((item, key) => {
            return (
              <TouchableOpacity
                style={styles.pressable}
                onPress={() => playSound(item.sound)}
                disabled={notClickable}
                key={key}
              >
                <Image
                  style={[
                    styles.image1,
                    { tintColor: notClickable && "black" },
                  ]}
                  source={item.image}
                />
                <Image
                  style={[
                    styles.image1,
                    { position: "absolute", opacity: notClickable ? 0.3 : 1 },
                  ]}
                  source={item.image}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Training;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image1: {
    width: 300,
    height: "100%",
  },
  image2: {
    width: 300,
    height: "100%",
    position: "absolute",
    opacity: 0.3,
  },
  pressable: {
    margin: 10,
  },
  imagesRow: {
    width: "100%",
    height: "45%",
  },
});
