import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { getAll, type Countdown } from "@/lib/storage";

export default function ListScreen() {
  const [items, setItems] = useState<Countdown[]>([]);
  useFocusEffect(useCallback(() => { (async () => setItems(await getAll()))(); }, []));
  return (
    <View style={{ flex:1, padding:16 }}>
      <Link href="/create" asChild>
        <Pressable style={{ backgroundColor:"#111827", padding:12, borderRadius:12, marginBottom:12 }}>
          <Text style={{ color:"#fff", textAlign:"center", fontWeight:"600" }}>+ New countdown</Text>
        </Pressable>
      </Link>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Link href={`/${item.id}`} asChild>
            <Pressable style={{ padding:14, borderWidth:1, borderColor:"#e5e7eb", borderRadius:12, marginBottom:10 }}>
              <Text style={{ fontSize:16, fontWeight:"600" }}>{item.title}</Text>
              <Text style={{ color:"#6b7280" }}>{new Date(item.targetISO).toLocaleString()}</Text>
            </Pressable>
          </Link>
        )}
        ListEmptyComponent={<Text style={{ color:"#6b7280" }}>No countdowns yet.</Text>}
      />
    </View>
  );
}
