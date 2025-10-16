import { getAll, saveAll } from "@/lib/storage";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [dt, setDt] = useState<Date>(new Date(Date.now() + 3600_000)); // default +1h
  const [showPicker, setShowPicker] = useState(false);

  async function onSave() {
    if (!title) return Alert.alert("Missing info", "Enter a name.");
    if (dt.getTime() <= Date.now()) return Alert.alert("Choose a future time", "Pick a date/time in the future.");

    const list = await getAll();
    list.push({ id: uuid(), title, targetISO: dt.toISOString(), createdAt: new Date().toISOString() });
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

      <Pressable
        onPress={() => setShowPicker(true)}
        style={{ borderWidth:1, borderColor:"#e5e7eb", borderRadius:12, padding:12 }}
      >
        <Text style={{ color:"#111827", fontWeight:"600" }}>
          {dt.toLocaleString()}
        </Text>
        <Text style={{ color:"#6b7280", marginTop:4 }}>Tap to change date & time</Text>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={dt}
          mode="datetime"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, selected) => {
            setShowPicker(Platform.OS === "ios"); // keep inline open on iOS
            if (selected) setDt(selected);
          }}
          minimumDate={new Date()}
        />
      )}

      <Pressable onPress={onSave} style={{ backgroundColor:"#111827", padding:14, borderRadius:12 }}>
        <Text style={{ color:"#fff", textAlign:"center", fontWeight:"600" }}>Save</Text>
      </Pressable>
    </View>
  );
}
