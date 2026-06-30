import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 🌟 100% 灌入你提供的全新 10 題實戰時事題庫
const RAW_QUIZ_POOL: {
  [key: string]: {
    title: string;
    hint: string;
    details: string;
    keywords: string[];
    link: string;
    isTrue: boolean; // True 爲圈，False 爲叉
  }[];
} = {
  "網路社會與通訊軟體": [
    {
      title: "【解除分期付款詐騙】",
      hint: "在臉書看到『免費認養寵物』訊息，對方稱需先匯 300 元運費，阿明轉帳後，手機隨即跳出被設定『72期分期扣款』的陷阱，並接到假客服來電要求操作解除。",
      details: "沒錯，這確實是【解除分期付款】的手法。詐騙集團會用免費送養寵物當糖衣，實則誘騙被害人掉入解除分期扣款的傳統圈套。",
      keywords: ["分期"],
      link: "https://www.mirrormedia.mg/external/mirrordaily_68401",
      isTrue: true
    },
    {
      title: "【投資與虛擬貨幣】",
      hint: "端午節前夕接到自稱肉粽店主管來電，謊稱系統錯誤將訂單設為大宗批發商，今晚不解除將每月自動扣款，隨後引導陳先生操作網路銀行，導致慘賠百萬。",
      details: "這其實是【網購設定錯誤/解除分期】的手法！詐騙集團利用節慶網購熱潮，編造系統設定錯誤的藉口來誘騙民眾操作網銀，並非投資或虛擬貨幣詐騙。",
      keywords: ["網購"],
      link: "https://www.mirrormedia.mg/story/20260607-174soc-145147",
      isTrue: false
    },
    {
      title: "【假交友戀愛詐騙】",
      hint: "在交友軟體結識異性出遊，行程結束後對方佯稱『哥哥酒駕被捕急需交保金』借走 15 萬元，隨後將人丟包在超商，連手機包包也一併載走，且車輛掛的是假車牌。",
      details: "沒錯，這確實是【假交友戀愛詐騙】的手法。利用交友軟體建立信任與好感，再編造家人出事等緊急理由實體詐財並丟包被害人。",
      keywords: ["交友"],
      link: "https://www.mirrormedia.mg/story/20260603edi037",
      isTrue: true
    },
    {
      title: "【網購客服金流詐騙】",
      hint: "高中男同學盜用正妹照片與個資在 IG 開假帳號，自導自演兩人熱戀並散播不實性愛片，甚至冒用女方名義向其親友演出『沒錢繳學費』的苦情戲碼誘騙匯款。",
      details: "這其實是【盜用身分/假冒熟人型詐欺】！雖然涉及金流，但核心手法是利用熟人個資在社群開假帳號，並鎖定被害人的親友圈進行精準欺詐。",
      keywords: ["盜用"],
      link: "https://www.mirrormedia.mg/story/20260530web006",
      isTrue: false
    },
    {
      title: "【LINE 派對模式側錄詐騙】",
      hint: "網購蒜頭雞蛋時，假客服誆稱須完成實名制才能交易，誘導民眾加入 LINE 官方帳號並開啟『派對模式（分享螢幕）』，藉機側錄民眾的手機轉帳與付款 QR Code。",
      details: "沒錯，這確實是【LINE 派對模式側錄詐騙】。官方客服絕不會要求你分享螢幕畫面，任何視訊教學、螢幕分享都可能讓你的帳戶與密碼當場外洩。",
      keywords: ["派對"],
      link: "https://www.mirrormedia.mg/story/20260430edi034",
      isTrue: true
    },
    {
      title: "【非法租用存摺求職詐騙】",
      hint: "社群宣稱『免費贈送 iPhone 手機』，加 LINE 後假客服以實名認證失敗為由，引導民眾到 ATM 操作『無卡提款』功能以提供『財力證明』，進而騙走無卡提款序號。",
      details: "這其實是【假贈獎/騙取無卡提款序號】的手法！詐騙集團用免費手機當誘餌，利用民眾對金融功能的不熟悉，隔空騙走提款序號並直接提領現金。",
      keywords: ["無卡"],
      link: "https://www.mirrormedia.mg/story/20260503soc004",
      isTrue: false
    }
  ],
  "電信與簡訊詐騙": [
    {
      title: "【惡意釣魚連結詐騙】",
      hint: "收到偽裝成『財政部』的電子郵件宣稱可領 2 萬多元退稅款，要求點擊信中連結進行個資驗證，並誘導填寫信用卡卡號、效期與安全碼以利領取退款。",
      details: "沒錯，這確實是【惡意釣魚連結詐騙】。官方絕不會透過郵件要求輸入信用卡資訊退稅，假網站通常由亂碼組成，目的是盜刷你的信用卡。",
      keywords: ["釣魚"],
      link: "https://www.mirrormedia.mg/story/20260521edi068",
      isTrue: true
    },
    {
      title: "【假冒官方釣魚網頁】",
      hint: "假冒悠遊卡會員中心發郵件稱發票中獎 1,000 元，點進網頁後發現，隨意輸入一串手機亂碼竟然也能『驗證成功』，並馬上跳轉要求輸入完整的信用卡號與安全碼。",
      details: "沒錯，這確實是【假冒官方釣魚網頁】。真實網頁會有後端驗證機制，釣魚網站因為沒有後端，不管輸入什麼亂碼都會成功，純粹是為了蒐集你的卡號。",
      keywords: ["官網"],
      link: "https://www.mirrormedia.mg/story/20260302edi042",
      isTrue: true
    }
  ],
  "投資與虛擬貨幣": [
    {
      title: "【海外交易所殺豬盤】",
      hint: "臉書看到免費領取白沙屯媽祖手鍊廣告，私訊後收到假交易平台連結，對方以『實名制認證失敗、帳戶遭鎖定』為由，恐嚇被害人將實體金融卡寄出並提供密碼。",
      details: "這其實是【假宮廟名義/騙取人頭帳戶】的手法！詐騙集團緊跟媽祖遶境熱潮，用免費結緣品吸引信眾，再恐嚇騙取實體金融卡作為洗錢人頭帳戶。",
      keywords: ["殺豬"],
      link: "https://www.mirrormedia.mg/story/20260503soc001",
      isTrue: false
    }
  ],
  "金融機構與帳戶": [
    {
      title: "【銀行帳戶凍結警示】",
      hint: "Threads 上出現大量自稱 7-11 店員的新帳號，稱為了完成經理交付的『漲粉絲』任務，只要網友按下追蹤並私訊，就能免費領取布丁、泡麵與不鏽鋼杯等福利。",
      details: "這其實是【社群假帳號增粉/個資詐騙】！詐騙集團冒充超商員工利用貪小便宜心理吸引大批網友追蹤私訊，隨後會引導點擊不明連結來竊取個資。",
      keywords: ["凍結"],
      link: "https://www.mirrormedia.mg/story/20260404edi008",
      isTrue: false
    }
  ]
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH; 
const SWIPE_OUT_DURATION = 250; 

export default function ScamMethods() {
  const router = useRouter();

  const [deck, setDeck] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const stateRef = useRef({ deck: [] as any[], currentIndex: 0 });

  useEffect(() => {
    stateRef.current = { deck, currentIndex };
  }, [deck, currentIndex]);

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right"); 
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left"); 
        } else {
          resetPosition(); 
        }
      },
    }),
  ).current;

  const forceSwipe = (direction: "left" | "right") => {
    const x = direction === "right" ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: "left" | "right") => {
    const currentDeck = stateRef.current.deck;
    const currIdx = stateRef.current.currentIndex;
    const currentCard = currentDeck[currIdx];

    if (!currentCard) return;

    // 🌟 右滑判定為 ⭕ 正確，左滑判定為 ❌ 錯誤
    const isGuessingTrue = direction === "right";
    const correct = currentCard.isTrue === isGuessingTrue;

    setIsAnswerCorrect(correct);
    setShowResult(true);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

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

  const generateDeck = () => {
    let allScams: any[] = [];
    Object.keys(RAW_QUIZ_POOL).forEach((cat) => {
      RAW_QUIZ_POOL[cat].forEach((item) => {
        allScams.push({ category: cat, ...item });
      });
    });

    const shuffled = allScams.sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    setShowResult(false);
    position.setValue({ x: 0, y: 0 }); 
  };

  useEffect(() => {
    generateDeck();
  }, []);

  const nextCard = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
      position.setValue({ x: 0, y: 0 }); 
    } else {
      generateDeck();
    }
  };

  // 🚀 修正後的跨平台安全超連結跳轉函式：徹底解決 Web 端與實體手持裝置的 Promise Error
  const handleOpenLink = async (url: string) => {
    if (!url) return;
    if (Platform.OS === "web") {
      window.open(url, "_blank");
    } else {
      try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          await Linking.openURL(url);
        }
      } catch (error) {
        console.log("無法開啟超連結:", error);
      }
    }
  };

  if (deck.length === 0) return null;
  const currentCard = deck[currentIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. 基本手法挑戰</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.container}>
        <Text style={styles.progressText}>
          進度：{currentIndex + 1} / {deck.length}
        </Text>

        {showResult ? (
          <View style={styles.resultCard}>
            <ScrollView contentContainerStyle={styles.resultScroll}>
              <Text style={isAnswerCorrect ? styles.resultCorrect : styles.resultWrong}>
                {isAnswerCorrect ? "🎉 判斷正確！" : "💥 判斷錯誤！"}
              </Text>

              {/* 🌟 核心修正：根據題目本尊是 ⭕ 還 ❌ 分開呈現回饋標題 */}
              <Text style={styles.detailsTitle}>
                {currentCard.isTrue 
                  ? "沒錯！這確實是該項詐騙的手法。" 
                  : "不對喔！這其實是匹配到別的案例情境。"}
              </Text>

              <Text style={styles.detailsContent}>
                {currentCard.details}
              </Text>

              {/* 🚀 超連結點擊安全包裝區塊 */}
              <TouchableOpacity 
                style={styles.linkBox} 
                onPress={() => handleOpenLink(currentCard.link)}
                activeOpacity={0.7}
              >
                <Text style={styles.linkLabel}>📰 原始時事新聞查核直達連結（點擊前往）：</Text>
                <Text style={styles.linkText} numberOfLines={2}>{currentCard.link}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextBtn} onPress={nextCard}>
                <Text style={styles.nextBtnText}>
                  {currentIndex === deck.length - 1 ? "完成挑戰！重新開始" : "下一題 ⏭️"}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ) : (
          <Animated.View key={currentIndex} style={[styles.card, getCardStyle()]} {...panResponder.panHandlers}>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.categoryTag}>{currentCard.category}</Text>
              </View>

              <Text style={styles.cardTitle}>{currentCard.title}</Text>
              <Text style={styles.vsText}>搭配以下情境，正確嗎？</Text>

              <View style={styles.hintBox}>
                <Text style={styles.hintText}>"{currentCard.hint}"</Text>
              </View>
            </View>

            <View style={styles.cardBottomBar}>
              <TouchableOpacity style={[styles.actionBtn, styles.btnCross]} onPress={() => forceSwipe("left")}>
                <Text style={[styles.actionIcon, { color: "#ef4444" }]}>✖</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionBtn, styles.btnCheck]} onPress={() => forceSwipe("right")}>
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
  headerTitle: { fontSize: 16, fontWeight: "900", color: "#111827", textAlign: "center", flex: 1 },
  placeholder: { width: 50 },
  container: { flex: 1, padding: 16, alignItems: "center", justifyContent: "center" },
  progressText: { fontSize: 14, color: "#6b7280", fontWeight: "800", marginBottom: 12 },
  card: {
    width: "100%",
    height: 520,
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden", 
    justifyContent: "space-between",
    ...Platform.select({
      web: { boxShadow: "0px 10px 30px rgba(0,0,0,0.08)" },
      default: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }
    })
  },
  cardContent: { padding: 24, flex: 1, justifyContent: "center" },
  cardHeader: { alignItems: "center", marginBottom: 16 },
  categoryTag: { backgroundColor: "#fee2e2", color: "#ef4444", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: "800", overflow: "hidden" },
  cardTitle: { fontSize: 20, fontWeight: "900", color: "#111827", textAlign: "center", marginBottom: 8 },
  vsText: { fontSize: 14, fontWeight: "700", color: "#9ca3af", textAlign: "center", marginBottom: 20 },
  hintBox: { backgroundColor: "#f9fafb", padding: 20, borderRadius: 16, borderWidth: 1, borderColor: "#f3f4f6" },
  hintText: { fontSize: 15, fontWeight: "700", color: "#374151", lineHeight: 24, textAlign: "justify" },
  cardBottomBar: { height: 100, backgroundColor: "#111827", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 20 },
  actionBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#1f2937", justifyContent: "center", alignItems: "center" },
  btnCross: { borderWidth: 2, borderColor: "#ef4444" },
  btnCheck: { borderWidth: 2, borderColor: "#22c55e" },
  actionIcon: { fontSize: 22, fontWeight: "bold" },
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
      default: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 }
    })
  },
  resultScroll: { padding: 24, flexGrow: 1, justifyContent: "center" },
  resultCorrect: { fontSize: 26, fontWeight: "900", color: "#166534", textAlign: "center", marginBottom: 12 },
  resultWrong: { fontSize: 26, fontWeight: "900", color: "#b91c1c", textAlign: "center", marginBottom: 12 },
  detailsTitle: { fontSize: 16, fontWeight: "800", color: "#1f2937", marginBottom: 16, textAlign: "center", lineHeight: 22 },
  detailsContent: { fontSize: 14, color: "#4b5563", lineHeight: 22, fontWeight: "600", textAlign: "justify", marginBottom: 16, backgroundColor: "#f0fdf4", padding: 14, borderRadius: 12 },
  linkBox: { backgroundColor: "#f3f4f6", padding: 12, borderRadius: 10, marginBottom: 24, borderWidth: 1, borderColor: "#e5e7eb" },
  linkLabel: { fontSize: 12, fontWeight: "800", color: "#ef4444", marginBottom: 4 },
  linkText: { fontSize: 11, color: "#1d4ed8", fontWeight: "700", textDecorationLine: "underline" },
  nextBtn: { backgroundColor: "#111827", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  nextBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" }
});