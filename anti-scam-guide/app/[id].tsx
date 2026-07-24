import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 🌟 匯入 NewsList 導出的 ALL_NEWS_DATA 完整資料集
import { ALL_NEWS_DATA } from "./NewsList";

export default function NewsDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // 根據網址傳過來的 id 找到對應的新聞案件
  const news = ALL_NEWS_DATA.find((item) => item.id === id);

  if (!news) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backText}>‹ 返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>文章詳情</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>找不到該篇新聞內容！</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* 頂部 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {news.type} 報導
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* 分類與日期 */}
        <View style={styles.tagRow}>
          <Text style={styles.typeTag}>{news.type}</Text>
          <Text style={styles.newsDate}>{news.date}</Text>
        </View>

        {/* 標題 */}
        <Text style={styles.title}>{news.title}</Text>

        {/* 高畫質 Banner 圖 */}
        <Image source={{ uri: news.img }} style={styles.bannerImage} />

        {/* 💡 AI 防詐重點統整卡片 */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryBadge}>💡 防詐 AI 重點摘要與分析</Text>
          <Text style={styles.summaryText}>{news.summary}</Text>
        </View>

        {/* 警語與外鏈 */}
        <View style={styles.footerSection}>
          <Text style={styles.noticeText}>
            📌 本篇內容由防詐雞掰（FraudChickenBye）自動檢索並進行防詐重點提煉，提醒您切勿輕易相信高報酬投資或來源不明之訊息。
          </Text>

          {news.link && (
            <TouchableOpacity
              style={styles.openLinkBtn}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(news.link)}
            >
              <Text style={styles.openLinkBtnText}>🔗 前往原始新聞查看完整原委</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingHorizontal: 16,
  },
  backButton: { width: 60, justifyContent: "center", paddingVertical: 8 },
  placeholder: { width: 60 },
  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },
  container: { padding: 20 },
  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeTag: {
    backgroundColor: "#fee2e2",
    color: "#ef4444",
    fontSize: 12,
    fontWeight: "800",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newsDate: { fontSize: 13, color: "#6b7280", fontWeight: "500" },
  title: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    lineHeight: 28,
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#f3f4f6",
  },
  summaryCard: {
    backgroundColor: "#f0f9ff",
    borderColor: "#bae6fd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryBadge: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0369a1",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    color: "#1e293b",
    lineHeight: 24,
    fontWeight: "500",
  },
  footerSection: {
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 16,
  },
  noticeText: {
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 18,
    marginBottom: 16,
  },
  openLinkBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  openLinkBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { fontSize: 16, color: "#6b7280", fontWeight: "600" },
});