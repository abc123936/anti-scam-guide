import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ⚠️ 請在這裡貼回你原本完整的 100 題 RAW_QUIZ_POOL 陣列
const RAW_QUIZ_POOL: {
  [key: string]: {
    title: string;
    hint: string;
    details: string;
    keywords: string[];
  }[];
} = {
  電信與簡訊詐騙: [
    {
      title: "銀行帳戶凍結",
      hint: "您的網路銀行安全機制已過期，請立即登入更新個資，否則將永久凍結帳戶。",
      keywords: ["網銀", "凍結"],
      details:
        "簡訊假冒知名銀行，受害者點進假網銀頁面輸入密碼，詐騙集團立刻在真網銀將存款轉光。",
    },
  ],
  網路社群與通訊軟體: [
    {
      title: "名人投資廣告",
      hint: "盜用謝金河、陳重銘等財經名人的照片，聲稱「這是我唯一公開的免費飆股社團」。",
      keywords: ["名人", "飆股"],
      details:
        "在各大社交媒體購買精準廣告，引導受害者點進不公開的詐騙 LINE 飆股群組。",
    },
  ],
  投資與虛擬貨幣: [
    {
      title: "虛擬貨幣線下交易",
      hint: "約在實體便利商店見面交易 USDT，轉帳後對方藉口上廁所坐上接應機車逃逸，或給大疊假鈔。",
      keywords: ["usdt"],
      details: "轉移虛寶或貨幣後，對方直接開溜或使用假鈔坑殺。",
    },
  ],
  投資: [
    {
      title: "虛擬貨幣線下交易",
      hint: "約在實體便利商店見面交易 USDT，轉帳後對方藉口上廁所坐上接應機車逃逸，或給大疊假鈔。",
      keywords: ["usdt"],
      details: "轉移虛寶或貨幣後，對方直接開溜或使用假鈔坑殺。",
    },
  ],
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH; // 滑動超過螢幕 25% 才算數
const SWIPE_OUT_DURATION = 250; // 飛出動畫時間

export default function ScamMethods() {
  const router = useRouter();

  const [deck, setDeck] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // 🌟 新增：用一個 Ref 來隨時存放「最新的狀態」，突破閉包限制
  const stateRef = useRef({ deck: [] as any[], currentIndex: 0 });

  // 🌟 新增：只要 deck 或 currentIndex 有變，就立刻更新到 stateRef 裡
  useEffect(() => {
    stateRef.current = { deck, currentIndex };
  }, [deck, currentIndex]);

  // 動畫與手勢狀態
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      // 避免跟卡片內的點擊按鈕衝突，只有滑動距離大於 5 才接管手勢
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right"); // 往右滑 (圈)
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left"); // 往左滑 (叉)
        } else {
          resetPosition(); // 沒滑超過就彈回中間
        }
      },
    }),
  ).current;

  // 程式化滑動卡片飛出
  const forceSwipe = (direction: "left" | "right") => {
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  // 🌟 修改：將 onSwipeComplete 改為從 stateRef 讀取資料
  const onSwipeComplete = (direction: "left" | "right") => {
    // 改從我們準備好的 stateRef 裡面拿出最新的題庫與進度
    const currentDeck = stateRef.current.deck;
    const currIdx = stateRef.current.currentIndex;
    const currentCard = currentDeck[currIdx];

    // 加入防呆機制，如果真的沒抓到題目就中斷，避免程式崩潰
    if (!currentCard) return;

    // 右滑代表猜 O (True)，左滑代表猜 X (False)
    const isGuessingTrue = direction === "right";
    const correct = currentCard.isTrueMatch === isGuessingTrue;

    setIsAnswerCorrect(correct);
    setShowResult(true);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  // 取得卡片旋轉與位移樣式
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-25deg", "0deg", "25deg"],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  // 產生題目
  const generateDeck = () => {
    let allScams: any[] = [];
    Object.keys(RAW_QUIZ_POOL).forEach((cat) => {
      RAW_QUIZ_POOL[cat].forEach((item) => {
        allScams.push({ category: cat, ...item });
      });
    });

    const shuffled = allScams.sort(() => 0.5 - Math.random()).slice(0, 10);
    const matchDeck = shuffled.map((item) => {
      const isTrueMatch = Math.random() > 0.5;
      let displayHint = item.hint;
      let actualAnswerTitle = item.title;

      if (!isTrueMatch) {
        const randomItem =
          allScams[Math.floor(Math.random() * allScams.length)];
        displayHint = randomItem.hint;
        actualAnswerTitle = randomItem.title;
      }

      return { ...item, displayHint, isTrueMatch, actualAnswerTitle };
    });

    setDeck(matchDeck);
    setCurrentIndex(0);
    setShowResult(false);
    position.setValue({ x: 0, y: 0 }); // 重置位置
  };

  useEffect(() => {
    generateDeck();
  }, []);

  const nextCard = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      position.setValue({ x: 0, y: 0 }); // 下一張卡片回到正中間
    } else {
      generateDeck();
    }
  };

  if (deck.length === 0) return null;
  const currentCard = deck[currentIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>詐騙辨識挑戰</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.container}>
        <Text style={styles.progressText}>
          進度：{currentIndex + 1} / {deck.length}
        </Text>

        {/* 如果正在顯示解答 */}
        {showResult ? (
          <View style={styles.resultCard}>
            <ScrollView contentContainerStyle={styles.resultScroll}>
              <Text
                style={
                  isAnswerCorrect ? styles.resultCorrect : styles.resultWrong
                }
              >
                {isAnswerCorrect ? "🎉 判斷正確！" : "💥 判斷錯誤！"}
              </Text>

              <Text style={styles.detailsTitle}>
                {currentCard.isTrueMatch
                  ? "沒錯，這確實是這項詐騙的手法。"
                  : `這其實是【${currentCard.actualAnswerTitle}】的手法！`}
              </Text>

              <Text style={styles.detailsContent}>{currentCard.details}</Text>

              <TouchableOpacity style={styles.nextBtn} onPress={nextCard}>
                <Text style={styles.nextBtnText}>
                  {currentIndex === deck.length - 1
                    ? "完成挑戰！重新開始"
                    : "下一題 ⏭️"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ) : (
          /* 卡片本體 (包含滑動動畫) */
          <Animated.View
            style={[styles.card, getCardStyle()]}
            {...panResponder.panHandlers}
          >
            {/* 上半部：題目區 */}
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.categoryTag}>{currentCard.category}</Text>
              </View>

              <Text style={styles.cardTitle}>【 {currentCard.title} 】</Text>
              <Text style={styles.vsText}>搭配以下情境，正確嗎？</Text>

              <View style={styles.hintBox}>
                <Text style={styles.hintText}>"{currentCard.displayHint}"</Text>
              </View>
            </View>

            {/* 下半部：深色按鈕區 (致敬探探) */}
            <View style={styles.cardBottomBar}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.btnCross]}
                onPress={() => forceSwipe("left")}
              >
                <Text style={[styles.actionIcon, { color: "#ef4444" }]}>✖</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.btnCheck]}
                onPress={() => forceSwipe("right")}
              >
                <Text style={[styles.actionIcon, { color: "#22c55e" }]}>❤</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  backButton: { paddingVertical: 8 },
  backText: { fontSize: 16, color: "#ef4444", fontWeight: "700" },
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },
  placeholder: { width: 50 },

  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "800",
    marginBottom: 12,
  },

  // 卡片與滑動區域設計
  card: {
    width: "100%",
    height: 520,
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden", // 讓底部的深色區域可以貼齊圓角
    justifyContent: "space-between",
    ...Platform.select({
      web: { boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
    }),
  },
  cardContent: { padding: 24, flex: 1, justifyContent: "center" },
  cardHeader: { alignItems: "center", marginBottom: 16 },
  categoryTag: {
    backgroundColor: "#fef08a",
    color: "#854d0e",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "800",
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  vsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 20,
  },

  hintBox: {
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  hintText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    lineHeight: 28,
    textAlign: "center",
  },

  // 內嵌在卡片底部的深色按鈕區 (致敬探探)
  cardBottomBar: {
    height: 100,
    backgroundColor: "#111827",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCross: { borderWidth: 2, borderColor: "#ef4444" },
  btnCheck: { borderWidth: 2, borderColor: "#22c55e" },
  actionIcon: { fontSize: 26, lineHeight: 30, fontWeight: "bold" },

  // 結算畫面 (取代卡片位置)
  resultCard: {
    width: "100%",
    height: 520,
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    ...Platform.select({
      web: { boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" },
      default: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
    }),
  },
  resultScroll: { padding: 24, flexGrow: 1, justifyContent: "center" },
  resultCorrect: {
    fontSize: 26,
    fontWeight: "900",
    color: "#166534",
    textAlign: "center",
    marginBottom: 12,
  },
  resultWrong: {
    fontSize: 26,
    fontWeight: "900",
    color: "#b91c1c",
    textAlign: "center",
    marginBottom: 12,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  detailsContent: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "justify",
    marginBottom: 30,
  },
  nextBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  nextBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
