import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Countdowns" }} />
      <Stack.Screen name="create" options={{ title: "New Countdown" }} />
      <Stack.Screen name="[id]" options={{ title: "Countdown" }} />
    </Stack>
  );
}
