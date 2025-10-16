import AsyncStorage from "@react-native-async-storage/async-storage";
export type Countdown = { id:string; title:string; targetISO:string; createdAt:string };
const KEY = "COUNTDOWNS_V1";

export async function getAll(): Promise<Countdown[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
export async function saveAll(items: Countdown[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
}
export async function getById(id: string) {
  const all = await getAll();
  return all.find(x => x.id === id) ?? null;
}
export async function removeById(id: string) {
  const list = await getAll();
  const next = list.filter(x => x.id !== id);
  await saveAll(next);
}
