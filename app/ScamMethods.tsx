import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// 🌟 資料庫：完整移植自你的「常見詐騙最新15種手法有哪些.docx」
const SCAM_METHODS = [
  {
    id: "1",
    title: "假投資詐騙",
    keyword: "投資",
    hint: "以高回報為誘餌，假借股票、虛擬通貨等名義，吸引民眾加入Line群組。",
    details: "詐騙分子會假借股票、虛擬通貨、期貨、外匯及基金等名義，吸引民眾加入Line投資群組。受害者往往在投入資金後，卻無法取回任何收益，或是發現帳號遭凍結或網站關閉才發現遭詐。"
  },
  {
    id: "2",
    title: "假中獎通知詐騙",
    keyword: "中獎",
    hint: "以抽獎、減脂比賽等名義謊稱中獎，接著以身份核對、稅金扣繳要求匯款。",
    details: "詐騙者以抽獎、減脂比賽等名義吸引受害者，謊稱中獎可兌現獎金，接著以身份核對、稅金扣繳或帳戶驗證為由，要求匯款或開啟網路銀行操作，甚至寄送銀行卡更新，最終騙取金錢或個資。"
  },
  {
    id: "3",
    title: "假網拍詐騙",
    keyword: "網拍",
    hint: "利用熱門3C、限量球鞋以明顯低於市價的價格誘導民眾私下交易，匯款後失聯。",
    details: "詐騙分子會利用當前最新款3C產品、限量球鞋、名牌包或熱門演唱會門票等，已明顯低於市價的價格誘導民眾私下交易。待被害人匯款後卻不出貨，並失去聯繫；或是取得貨品之後，才發現是劣質或其他商品。這類詐騙常見於臉書、LINE或知名拍賣網站。"
  },
  {
    id: "4",
    title: "ATM解除分期付款詐騙",
    keyword: "分期付款",
    hint: "假冒商家來電謊稱設定錯誤重複扣款，要求前往操作ATM或購買遊戲點數。",
    details: "詐騙集團攻擊資安防護不足的平台後，取得民眾的交易紀錄與個資，再假冒商家或銀行來電，謊稱因設定錯誤而重複扣款，要求民眾操作ATM、網路銀行或至超商購買遊戲點數進行解除設定。民眾依照指示操作後，發現帳戶餘額減少，才知道上當受騙。"
  },
  {
    id: "5",
    title: "假愛情交友詐騙",
    keyword: "愛情",
    hint: "在社交媒體建立虛擬戀愛關係，信任建立後以急需金錢為由要求匯款。",
    details: "這類詐騙以交友為名，詐騙分子在社交媒體或交友平台上接觸受害者，並建立起虛擬的戀愛關係。一旦信任建立後，詐騙者會以急需金錢為理由，要求受害者匯款。"
  },
  {
    id: "6",
    title: "猜猜我是誰詐騙",
    keyword: "猜猜我是誰",
    hint: "假冒兒女、親戚或多年不見友人，換號碼打來宣稱急需借錢周轉。",
    details: "詐騙分子會以「猜猜我是誰」的方式，假冒「兒女」、「親戚」或「多年不見的友人」，透過社交平台或電話接觸受害者，要求受害者提供金錢或幫忙，理由通常是急需錢款或遇到困難。"
  },
  {
    id: "7",
    title: "假冒機構（公務員）詐騙",
    keyword: "公務員",
    hint: "冒充健保局、檢警、電信機關，聲稱涉案或欠款，要求配合監管帳戶。",
    details: "詐騙者冒充健保局、醫院及中華電信或其他公務機關，告訴受害者其有未處理的案件或欠款，並要求匯款或提供敏感資料。這類詐騙利用公權力機構的名義來增加受害者的信任。"
  },
  {
    id: "8",
    title: "假求職詐騙",
    keyword: "求職",
    hint: "高薪工作為誘餌，面試後要求支付訂金、保證金、治裝費或扣留證件。",
    details: "假求職詐騙通常以高薪工作為誘餌，吸引求職者投遞履歷。詐騙分子會先進行面試，並要求求職者支付訂金、保證金、治裝費、訓練費或替代保證金，實際上是騙取金錢。"
  },
  {
    id: "9",
    title: "盜（冒）用網路帳號詐騙",
    keyword: "盜用",
    hint: "冒充朋友傳訊息要求幫忙借錢、投票、或幫忙收簡訊認證碼。",
    details: "詐騙集團盜取民眾LINE、Facebook等社群軟體帳號，再以盜用帳號傳訊息給其親友，進行各種詐騙活動，例如冒充朋友要求借錢、幫忙投票、幫忙購買點數卡......等。"
  },
  {
    id: "10",
    title: "釣魚訊息詐騙",
    keyword: "釣魚",
    hint: "發送簡訊誆稱包裹配送失敗、補繳水電費、退稅，誘導點擊惡意連結。",
    details: "詐騙者通常以銀行凍結帳戶、包裹配送失敗、退稅未領取、訂單異常或帳號異常登入等名義發送訊息，誘導受害者點擊惡意連結，進一步竊取個資或騙取金錢。這類訊息多以官方名義為包裝，內容包括身份驗證、付款確認、系統升級、貸款批准、欠費繳納或檢測報告查看等。"
  },
  {
    id: "11",
    title: "騙取金融帳戶",
    keyword: "帳戶",
    hint: "以應徵工作、家庭代工、處理異常交易為由，誆騙民眾寄出金融卡與密碼。",
    details: "此類詐騙分子假冒銀行客服要求寄回卡片處理異常交易，或設置仿冒網站誘導輸入卡片資訊。也有詐騙者聲稱獲獎、徵才或提供家庭代工機會，以支付手續費、保證金等理由騙取卡片資料。更甚者，假冒檢察官指控洗錢，或要求將金融卡放置於特定地點配合調查。"
  },
  {
    id: "12",
    title: "假借銀行貸款",
    keyword: "貸款",
    hint: "主打「超低利率、絕對過件」，不限職業，但要求先支付律師費或保險費。",
    details: "此類詐騙以「超低利率」、「超高額度」、「絕對過件」等標語吸引急需資金的人，聲稱不限職業、不需擔保品或聯徵紀錄即可貸款，但要求借款人先支付「律師費」、「保險費」等費用。實際上，詐騙分子一旦收到款項便失去聯繫。"
  },
  {
    id: "13",
    title: "假廣告",
    keyword: "廣告",
    hint: "利用超便宜租屋廣告、代辦證件吸引民眾先付訂金，隨後封鎖失聯。",
    details: "詐騙者利用租屋廣告、代辦證件或優惠票券吸引受害者，聲稱房租便宜、看護證快速代辦或票券有折扣，但要求先支付訂金、代辦費或輸入信用卡資訊。部分詐騙者甚至提供假租屋合約，誘導預付大筆租金。"
  },
  {
    id: "14",
    title: "色情應召詐財",
    keyword: "應召",
    hint: "網路交友、裸聊後，要求交付保證金、購買點數，甚至威脅散布裸聊影片。",
    details: "這類詐騙常以自稱直播主、酒店男模或從事八大行業的人物為名，誘使受害者進行網路交友、裸聊或援交等活動。詐騙者要求交付保證金、解鎖個人資料、繳費才能升等會員或證明身份，甚至以威脅散布裸聊影片為手段進一步逼迫受害者付款。"
  },
  {
    id: "15",
    title: "虛擬遊戲詐騙",
    keyword: "遊戲",
    hint: "交易虛擬寶物或帳號時，誆稱平台帳戶出錯被凍結，要求儲值才能解凍。",
    details: "這類詐騙通常發生在遊戲交易過程中。詐騙者與受害者約定交易遊戲帳號、裝備或點數後，指示至虛假的遊戲交易平台進行交易。當交易過程中出現問題時，詐騙者會以帳戶出錯或凍結為理由，要求儲值才能解決問題或退款。"
  }
];

export default function ScamMethods() {
  const router = useRouter();
  
  // 記錄使用者填寫的答案與是否點開展開解說
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const checkAnswer = (id: string, keyword: string) => {
    const userAns = answers[id]?.trim() || "";
    if (userAns === keyword) {
      setChecked(prev => ({ ...prev, [id]: true }));
      // 自動展開詳細解說
      setExpanded(prev => ({ ...prev, [id]: true }));
    } else {
      if (Platform.OS === 'web') {
        window.alert("答案不太對哦，再想想看！提示：可以參考紅字或手法標題。");
      } else {
        Alert.alert("提示", "答案不太對哦，再想想看！");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* 頂部標題列 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ 返回</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>2. 常見新聞相關手法</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageDesc}>💡 填空大挑戰：請閱讀手法提示，並填入正確的關鍵字詞以解鎖完整防詐密技！</Text>

        {SCAM_METHODS.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardIndex}>手法 {index + 1}</Text>
            
            {/* 填空題目敘述 */}
            <Text style={styles.hintText}>
              【 提示 】{item.hint}
            </Text>

            {/* 互動填空區塊 */}
            {!checked[item.id] ? (
              <View style={styles.inputRow}>
                <TextInput
                  style={[
                    styles.input,
                    Platform.OS === "web" && ({ outlineStyle: "none" } as any),
                  ]}
                  placeholder="請輸入關鍵字（例如：投資、網拍）"
                  placeholderTextColor="#9ca3af"
                  value={answers[item.id] || ""}
                  onChangeText={(text) => setAnswers(prev => ({ ...prev, [item.id]: text }))}
                />
                <TouchableOpacity 
                  style={styles.checkBtn}
                  onPress={() => checkAnswer(item.id, item.keyword)}
                >
                  <Text style={styles.checkBtnText}>檢查</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.successRow}>
                <Text style={styles.successText}>🎉 解鎖成功！這是：【{item.title}】</Text>
              </View>
            )}

            {/* 詳細說明按鈕（解鎖後才能點開，或直接展開） */}
            {checked[item.id] && (
              <View style={styles.detailsBox}>
                <Text style={styles.detailsTitle}>🔍 手法詳細拆解：</Text>
                <Text style={styles.detailsContent}>{item.details}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9fafb" },
  header: { 
    height: 56, 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-between",
    borderBottomWidth: 1, 
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  backButton: { paddingVertical: 8 },
  backText: { fontSize: 16, color: "#111827", fontWeight: "700" },
  headerTitle: { fontSize: 18, fontWeight: "900", color: "#111827" },
  placeholder: { width: 50 },

  container: { padding: 16 },
  pageDesc: { fontSize: 14, color: "#6b7280", fontWeight: "600", marginBottom: 16, textAlign: "center", lineHeight: 20 },
  
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    ...Platform.select({
      web: { boxShadow: "0px 2px 8px rgba(0,0,0,0.04)" }
    })
  },
  cardIndex: { fontSize: 12, fontWeight: "800", color: "#ef4444", textTransform: "uppercase", marginBottom: 6 },
  hintText: { fontSize: 15, fontWeight: "700", color: "#374151", lineHeight: 22, marginBottom: 12 },
  
  inputRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  input: { 
    flex: 1, 
    height: 44, 
    borderRadius: 10, 
    backgroundColor: "#f3f4f6", 
    paddingHorizontal: 12, 
    fontSize: 14, 
    color: "#111827",
    fontWeight: "600"
  },
  checkBtn: { 
    backgroundColor: "#111827", 
    paddingHorizontal: 16, 
    height: 44, 
    borderRadius: 10, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  checkBtnText: { color: "#fff", fontSize: 14, fontWeight: "800" },

  successRow: { backgroundColor: "#f0fdf4", padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#bbf7d0" },
  successText: { color: "#166534", fontSize: 14, fontWeight: "800" },

  detailsBox: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  detailsTitle: { fontSize: 14, fontWeight: "800", color: "#111827", marginBottom: 4 },
  detailsContent: { fontSize: 13, color: "#4b5563", lineHeight: 19, fontWeight: "500" }
});