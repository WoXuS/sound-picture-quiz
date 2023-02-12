import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CounterInput from "./../components/CounterInput";
import { soundPictureArray } from "../assets/soundPictureArray";

const HomeScreen = ({ navigation }) => {
  const [mode, setMode] = useState(false);
  const [count, setCount] = useState(1);

  const handleDecrement = (minValue) => {
    if (count > minValue) {
      setCount(count - 1);
    }
  };

  const handleIncrement = (maxValue) => {
    if (count < maxValue) {
      setCount(count + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quiz Dźwiękowo-Obrazkowy</Text>
      <View style={[styles.modeSelector, { paddingBottom: mode ? 40 : 50 }]}>
        {!mode && (
          <>
            <Text style={[styles.subheaderText, { marginBottom: 55 }]}>
              Wybierz Tryb:
            </Text>
            <TouchableOpacity
              style={[styles.ButtonContainer, { marginBottom: 27 }]}
              onPress={() => {
                navigation.navigate("Training");
              }}
            >
              <Text style={styles.ButtonText}>TRENING</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonContainer}
              onPress={() => {
                setMode("mode1");
              }}
            >
              <Text style={styles.ButtonText}>1 Dźwięk 4 Obrazki</Text>
            </TouchableOpacity>
          </>
        )}
        {mode === "mode1" && (
          <>
            <Text style={[styles.subheaderText, { marginBottom: 20 }]}>
              Ustal maksymalną liczbę punktów:
            </Text>
            <CounterInput
              maxValue={soundPictureArray.length - 4}
              minValue={1}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              count={count}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 25,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={() => {
                  setMode(false);
                }}
              >
                <Text style={{ fontSize: 30, marginBottom: 3 }}>&lt;</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ButtonContainer}
                onPress={() => {
                  navigation.navigate("Quiz", { maxPoints: count });
                }}
              >
                <Text style={styles.ButtonText}>AKCEPTUJ</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <Text style={styles.credits}>Kamil Woźniak & Patryk Krajewski</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  modeSelector: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#232324",
    paddingHorizontal: 45,
    paddingTop: 25,
    borderRadius: 6,
  },
  headerText: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  subheaderText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    // marginBottom: 55,
  },
  ButtonContainer: {
    backgroundColor: "white",
    borderRadius: 3,
    paddingVertical: 5,
    alignItems: "center",
    width: "80%",
  },
  ButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 3,
  },
  backButtonContainer: {
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: "white",
    width: "15%",
  },
  credits: {
    color: "white",
    position: "absolute",
    bottom: 8,
  },
});
