import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// 🌟 引入 Expo Router 的跳轉工具
import { useRouter } from "expo-router";

export default function ScreenAntiScam() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 詐騙新聞相關 (佔上方 2/3) */}
      <View style={styles.topSection}>
        <TouchableOpacity
          style={[styles.box, styles.box1]}
          onPress={() => router.push("/NewsList")} // 🚀 點擊跳轉至新聞列表
        >
          <Text style={styles.boxNumber}>1</Text>
          <View style={styles.textContainer}>
            <Text style={styles.boxTitle}>1. 詐騙新聞相關</Text>
            <Text style={styles.description}>
              點擊進入最新偽新聞篩選與分析專區
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 下方區塊 (佔下方 1/3) */}
      <View style={styles.bottomSection}>
        {/* 2. 常見新聞相關手法 (佔左下 1/2) */}
        <TouchableOpacity
          style={[styles.box, styles.bottomBox, styles.box2]}
          onPress={() => router.push("/ScamMethods")} // 🚀 🌟 這裡幫你加上跳轉至填空細節頁面了！
        >
          <Text style={styles.boxNumberSmall}>2</Text>
          <Text style={styles.boxTitleSmall}>2. 常見新聞相關手法</Text>
        </TouchableOpacity>

        {/* 3. 待定 (佔右下 1/2) */}
        <TouchableOpacity
          style={[styles.box, styles.bottomBox, styles.box3]}
          onPress={() => router.push("/FraudDashboard")} // 🚀 🌟 這裡幫你加上跳轉至詐騙儀表板頁面了！
        >
          <Text style={styles.boxNumberSmall}>3</Text>
          <Text style={styles.boxTitleSmall}>3. 165 詐騙儀表板</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // 上方 2/3 空間
  topSection: {
    flex: 2,
    padding: 15,
  },
  // 下方 1/3 空間
  bottomSection: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  box: {
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
      },
    }),
  },
  // 1 號大盒子樣式
  box1: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  // 底部左右平分的盒子
  bottomBox: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
  },
  box2: {
    backgroundColor: "#f9fafb", // 稍微淺灰做出區隔
  },
  box3: {
    backgroundColor: "#f9fafb",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  boxNumber: {
    fontSize: 60,
    fontWeight: "900",
    color: "#f3f4f6",
    position: "absolute",
    top: 20,
    left: 30,
  },
  boxNumberSmall: {
    fontSize: 30,
    fontWeight: "900",
    color: "#e5e7eb",
    position: "absolute",
    top: 10,
    left: 15,
  },
  boxTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },
  boxTitleSmall: {
    fontSize: 15,
    fontWeight: "800",
    color: "#374151",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 10,
    fontWeight: "500",
  },
});
