import TimeBlock from "@/components/TimeBlock";
import { getRemaining } from "@/lib/countdown";
import { getById, removeById, type Countdown } from "@/lib/storage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function ViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nav = useNavigation();
  const [item, setItem] = useState<Countdown | null>(null);
  const [, forceTick] = useState(0);

  useEffect(() => { (async () => setItem(id ? await getById(id) : null))(); }, [id]);
  useEffect(() => {
    const interval = setInterval(() => forceTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // add a trash button in the header
  useEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            Alert.alert("Delete countdown?", "This cannot be undone.", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                  if (!id) return;
                  await removeById(String(id));
                  // go back to list
                  // @ts-ignore
                  nav.replace && (nav as any).replace("/");
                },
              },
            ]);
          }}
          style={{ paddingHorizontal: 8, paddingVertical: 6 }}
        >
          <Text style={{ color: "#ef4444", fontWeight: "700" }}>Delete</Text>
        </Pressable>
      ),
    });
  }, [nav, id]);

  if (!item) return <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}><Text>Loading…</Text></View>;

  const r = getRemaining(item.targetISO);
  const done = r.total <= 0;

  return (
    <View style={{ flex:1, padding:24, alignItems:"center", justifyContent:"center", gap:12 }}>
      <Text style={{ fontSize:22, fontWeight:"700" }}>{item.title}</Text>
      <Text style={{ color:"#6b7280" }}>{new Date(item.targetISO).toLocaleString()}</Text>
      {done ? (
        <Text style={{ fontSize:28, fontWeight:"800" }}>🎉 It’s time!</Text>
      ) : (
        <View style={{ flexDirection:"row", gap:12 }}>
          <TimeBlock label="Days" value={r.days} />
          <TimeBlock label="Hours" value={r.hours} />
          <TimeBlock label="Minutes" value={r.minutes} />
          <TimeBlock label="Seconds" value={r.seconds} />
        </View>
      )}
    </View>
  );
}
