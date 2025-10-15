import { Text, View } from "react-native";
export default function TimeBlock({ label, value }: { label:string; value:number }) {
  return (
    <View style={{ alignItems:"center", padding:10, borderRadius:12, borderWidth:1, borderColor:"#e5e7eb", minWidth:80 }}>
      <Text style={{ fontSize:28, fontWeight:"800" }}>{value.toString().padStart(2,"0")}</Text>
      <Text style={{ color:"#6b7280", fontWeight:"600" }}>{label}</Text>
    </View>
  );
}
