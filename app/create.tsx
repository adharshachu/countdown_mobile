import { getAll, saveAll } from "@/lib/storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Platform, Pressable, Text, TextInput, View } from "react-native";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random()*16)|0, v = c === "x" ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export default function CreateScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  async function onSave() {
    if (!title || !date) return Alert.alert("Missing info", "Enter a name and ISO date-time.");
    const list = await getAll();
    list.push({ id: uuid(), title, targetISO: date, createdAt: new Date().toISOString() });
    await saveAll(list);
    router.replace("/");
  }

  return (
    <View style={{ flex:1, padding:16, gap:12 }}>
      <Text style={{ fontSize:24, fontWeight:"700" }}>Create a countdown</Text>
      <TextInput
        placeholder="Name (e.g., My Wedding)"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth:1, borderColor:"#e5e7eb", borderRadius:12, padding:12 }}
      />
      <TextInput
        placeholder="Target (ISO) e.g. 2026-01-01T00:00:00"
        value={date}
        onChangeText={setDate}
        autoCapitalize="none"
        keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
        style={{ borderWidth:1, borderColor:"#e5e7eb", borderRadius:12, padding:12 }}
      />
      <Pressable onPress={onSave} style={{ backgroundColor:"#111827", padding:14, borderRadius:12 }}>
        <Text style={{ color:"#fff", textAlign:"center", fontWeight:"600" }}>Save</Text>
      </Pressable>
    </View>
  );
}
