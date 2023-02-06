import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CounterInput = ({ maxValue, minValue, handleDecrement, handleIncrement, count }) => {

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={() => { handleDecrement(minValue) } }
        >
          <Text style={[styles.ButtonText, {fontSize: 35, marginBottom: 3}]}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{count}</Text>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={() => { handleIncrement(maxValue) } }
        >
          <Text style={[styles.ButtonText, {fontSize: 35, marginBottom: 3}]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

CounterInput.defaultProps = {
  maxValue: 100,
  minValue: 0,
};

const styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: "white",
    borderRadius: 3,
    alignItems: "center",
  },
  ButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    width: 50,
  },
  counterText: {
    fontSize: 35,
    marginHorizontal: 15,
    color: "white",
  }
});

export default CounterInput;
