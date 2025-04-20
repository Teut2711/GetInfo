import { Image, StyleSheet, Platform, TextInput, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function LoginScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/splash.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome Back!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.formContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#888"
          secureTextEntry
        />
        <Button
          title="Login"
          onPress={() => {
            /* Handle login */
          }}
        />
      </ThemedView>

      <ThemedView style={styles.helpTextContainer}>
        <ThemedText>
          Forgot your password?{" "}
          <ThemedText type="defaultSemiBold">Reset it</ThemedText>
        </ThemedText>
        <ThemedText>
          New user? <ThemedText type="defaultSemiBold">Sign up here</ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  formContainer: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  helpTextContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  reactLogo: {
    height: 200,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
