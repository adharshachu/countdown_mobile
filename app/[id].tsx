import TimeBlock from "@/components/TimeBlock";
import { getRemaining } from "@/lib/countdown";
import { getById, type Countdown } from "@/lib/storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

export default function ViewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<Countdown | null>(null);
  const [, force] = useState(0);
  const timer = useRef<NodeJS.Timer | null>(null);

  useEffect(() => { (async () => setItem(id ? await getById(id) : null))(); }, [id]);
  useEffect(() => { timer.current = setInterval(() => force(t => t + 1), 1000); return () => timer.current && clearInterval(timer.current); }, []);

  if (!item) return <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}><Text>Loading…</Text></View>;

  const r = getRemaining(item.targetISO);
  return (
    <View style={{ flex:1, padding:24, alignItems:"center", justifyContent:"center", gap:12 }}>
      <Text style={{ fontSize:22, fontWeight:"700" }}>{item.title}</Text>
      <Text style={{ color:"#6b7280" }}>{new Date(item.targetISO).toLocaleString()}</Text>
      {r.total <= 0 ? (
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
