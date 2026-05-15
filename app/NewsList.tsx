import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 模擬新聞數據
const NEWS_DATA = [
  {
    id: "1",
    type: "影片",
    title: "【易誤解】網傳花椰菜上的黑點代表發霉？顯微鏡拍攝的影片？斑點可能代表各種不同情況！專家詳解",
    date: "Dec 31, 2025",
    summary: "你可以先知道：(1) 花椰菜上可能出現的包括「黑斑」、「黑點」、「黑色素」...",
    img: "https://via.placeholder.com/150" // 這裡之後換成你的實際圖片
  },
  {
    id: "2",
    type: "假圖片",
    title: "【錯誤】網傳特斯拉將於2026年推出新手機？虛構創作內容！非可信資訊來源",
    date: "Dec 31, 2025",
    summary: "你可以先知道：(1) 網傳訊息為虛構內容。特斯拉並沒有在研發新手機...",
    img: "https://via.placeholder.com/150"
  }
];

export default function NewsList() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>詐騙新聞相關</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {NEWS_DATA.map((item) => (
          <TouchableOpacity key={item.id} style={styles.newsCard}>
            <Image source={{ uri: item.img }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.typeTag}>{item.type}</Text>
              <Text style={styles.newsTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.newsDate}>🕒 {item.date}</Text>
              <Text style={styles.newsSummary} numberOfLines={3}>{item.summary}</Text>
              <Text style={styles.moreText}>更多內容</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { height: 56, justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
  container: { padding: 16 },
  newsCard: { flexDirection: "row", marginBottom: 24, backgroundColor: "#fff" },
  newsImage: { width: 120, height: 120, borderRadius: 8, backgroundColor: "#f3f4f6" },
  newsContent: { flex: 1, marginLeft: 12 },
  typeTag: { color: "#ef4444", fontSize: 12, fontWeight: "700", marginBottom: 4 },
  newsTitle: { fontSize: 16, fontWeight: "800", color: "#111827", lineHeight: 22 },
  newsDate: { fontSize: 12, color: "#9ca3af", marginVertical: 4 },
  newsSummary: { fontSize: 13, color: "#4b5563", lineHeight: 18 },
  moreText: { color: "#ef4444", fontSize: 13, fontWeight: "700", marginTop: 4 }
});