import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

export default function FraudDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* 頂部導覽列，維持 App 的一致體驗 */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>165 詐騙儀表板</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 嵌入外部網頁的核心元件 */}
      <WebView
        source={{ uri: "https://165dashboard.tw/" }}
        style={styles.webview}
        javaScriptEnabled={true} // 允許網頁執行 JS (儀表板通常需要)
        domStorageEnabled={true} // 允許網頁使用本地儲存
        startInLoadingState={true} // 網頁載入中顯示讀取動畫
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#111827" />
            <Text style={styles.loadingText}>網頁載入中...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // 🌟 1. 改成白底，消滅頂部的灰邊
  safe: { flex: 1, backgroundColor: "#ffffff" },

  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },

  // 🌟 2. 左右寬度統一是 60，達成絕對置中
  backButton: { paddingVertical: 8, width: 60, justifyContent: "center" },
  placeholder: { width: 60 },

  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },

  // 🌟 3. 字體放大到 18，與前兩頁完全統一
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },

  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },

  // 載入中的畫面樣式
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#4b5563",
    fontWeight: "600",
  },
});
