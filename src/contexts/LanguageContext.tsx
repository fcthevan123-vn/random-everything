import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    "common.back": "Back",
    "common.generate": "Generate",
    "common.reset": "Reset",
    "common.copyAll": "Copy All",
    "common.copied": "Copied!",
    "common.copiedMessage": "Copied to clipboard",
    "common.error": "Error",
    "common.success": "Success!",

    // Header/Navigation
    "nav.home": "Home",
    "nav.randomNumber": "Random Number",
    "nav.games": "Games",
    "nav.spinWheel": "Spin Wheel",
    "nav.listPicker": "List Picker",
    "nav.password": "Password",
    "nav.colors": "Colors",
    "nav.teams": "Teams",

    // HomePage
    "home.title": "Random Everything",
    "home.subtitle":
      "Generate random numbers, cards, passwords, teams, and more — instantly and beautifully.",
    "home.cta": "Explore All Tools",
    "home.feature.randomNumber.title": "Random Number",
    "home.feature.randomNumber.desc":
      "Generate random numbers within custom ranges. Perfect for lottery picks, dice rolls, or any numeric randomization.",
    "home.feature.games.title": "Random Games",
    "home.feature.games.desc":
      "Flip coins, roll dice, or draw cards. Classic randomization games with beautiful animations.",
    "home.feature.spinWheel.title": "Spin Wheel",
    "home.feature.spinWheel.desc":
      "Create custom decision wheels with your own options. Spin to choose randomly with style!",
    "home.feature.listPicker.title": "List Picker",
    "home.feature.listPicker.desc":
      "Pick random items from your custom lists. Great for choosing winners, making decisions, or shuffling.",
    "home.feature.password.title": "Password & Username",
    "home.feature.password.desc":
      "Generate secure passwords and creative usernames. Fully customizable with various options.",
    "home.feature.colors.title": "Color & Gradient",
    "home.feature.colors.desc":
      "Discover random colors and beautiful gradients. Get HEX, RGB values instantly.",
    "home.feature.teams.title": "Team/Group Generator",
    "home.feature.teams.desc":
      "Randomly divide people into teams or groups. Fair and balanced distribution guaranteed.",
    "home.tryIt": "Try it",

    // Random Number
    "randomNumber.title": "Random Number Generator",
    "randomNumber.subtitle":
      "Generate random numbers with customizable ranges and options",
    "randomNumber.numberType": "Number Type",
    "randomNumber.integer": "Integer",
    "randomNumber.decimal": "Decimal",
    "randomNumber.minimum": "Minimum",
    "randomNumber.maximum": "Maximum",
    "randomNumber.count": "Count",
    "randomNumber.minimumDesc": "Smallest possible value",
    "randomNumber.maximumDesc": "Largest possible value",
    "randomNumber.countDesc": "How many numbers to generate",
    "randomNumber.decimalPlaces": "Decimal Places",
    "randomNumber.decimalPlacesDesc": "Number of digits after decimal point",
    "randomNumber.noDuplicates": "No duplicates",
    "randomNumber.noDuplicatesDesc": "Ensure all generated numbers are unique",
    "randomNumber.results": "Results",
    "randomNumber.numbersGenerated": "number generated",
    "randomNumber.numbersGeneratedPlural": "numbers generated",
    "randomNumber.generatedSuccess": "Generated",
    "randomNumber.integerNumber": "integer",
    "randomNumber.decimalNumber": "decimal",
    "randomNumber.validationError": "Please enter valid numbers for all fields",
    "randomNumber.decimalValidationError": "Please enter valid decimal places",
    "randomNumber.copiedNumber": "Copied",

    // Language Switcher
    "language.english": "English",
    "language.vietnamese": "Tiếng Việt",
    "language.switchTo": "Switch to",
    "language.label": "Language",
  },
  vi: {
    // Common
    "common.back": "Quay lại",
    "common.generate": "Tạo ngẫu nhiên",
    "common.reset": "Đặt lại",
    "common.copyAll": "Sao chép tất cả",
    "common.copied": "Đã sao chép!",
    "common.copiedMessage": "Đã sao chép vào clipboard",
    "common.error": "Lỗi",
    "common.success": "Thành công!",

    // Header/Navigation
    "nav.home": "Trang chủ",
    "nav.randomNumber": "Số ngẫu nhiên",
    "nav.games": "Trò chơi",
    "nav.spinWheel": "Vòng quay",
    "nav.listPicker": "Chọn từ danh sách",
    "nav.password": "Mật khẩu",
    "nav.colors": "Màu sắc",
    "nav.teams": "Nhóm",

    // HomePage
    "home.title": "Random Everything",
    "home.subtitle":
      "Tạo số ngẫu nhiên, thẻ bài, mật khẩu, nhóm và nhiều hơn nữa — ngay lập tức và đẹp mắt.",
    "home.cta": "Khám phá tất cả công cụ",
    "home.feature.randomNumber.title": "Số ngẫu nhiên",
    "home.feature.randomNumber.desc":
      "Tạo số ngẫu nhiên trong phạm vi tùy chỉnh. Hoàn hảo cho xổ số, xúc xắc hoặc bất kỳ phép ngẫu nhiên số nào.",
    "home.feature.games.title": "Trò chơi ngẫu nhiên",
    "home.feature.games.desc":
      "Tung đồng xu, tung xúc xắc, hoặc rút thẻ bài. Các trò chơi ngẫu nhiên cổ điển với hiệu ứng đẹp mắt.",
    "home.feature.spinWheel.title": "Vòng quay may mắn",
    "home.feature.spinWheel.desc":
      "Tạo vòng quay quyết định tùy chỉnh với các tùy chọn của riêng bạn. Quay để chọn ngẫu nhiên một cách phong cách!",
    "home.feature.listPicker.title": "Chọn từ danh sách",
    "home.feature.listPicker.desc":
      "Chọn các mục ngẫu nhiên từ danh sách tùy chỉnh của bạn. Tuyệt vời để chọn người chiến thắng, đưa ra quyết định hoặc xáo trộn.",
    "home.feature.password.title": "Mật khẩu & Tên người dùng",
    "home.feature.password.desc":
      "Tạo mật khẩu bảo mật và tên người dùng sáng tạo. Hoàn toàn có thể tùy chỉnh với nhiều tùy chọn.",
    "home.feature.colors.title": "Màu sắc & Gradient",
    "home.feature.colors.desc":
      "Khám phá màu sắc ngẫu nhiên và gradient đẹp mắt. Lấy giá trị HEX, RGB ngay lập tức.",
    "home.feature.teams.title": "Tạo nhóm/đội",
    "home.feature.teams.desc":
      "Chia ngẫu nhiên mọi người thành các nhóm hoặc đội. Đảm bảo phân phối công bằng và cân bằng.",
    "home.tryIt": "Dùng thử",

    // Random Number
    "randomNumber.title": "Tạo Số Ngẫu Nhiên",
    "randomNumber.subtitle":
      "Tạo số ngẫu nhiên với các tùy chọn tùy chỉnh theo ý bạn",
    "randomNumber.numberType": "Loại số",
    "randomNumber.integer": "Số nguyên",
    "randomNumber.decimal": "Số thập phân",
    "randomNumber.minimum": "Giá trị nhỏ nhất",
    "randomNumber.maximum": "Giá trị lớn nhất",
    "randomNumber.count": "Số lượng",
    "randomNumber.minimumDesc": "Giá trị nhỏ nhất có thể",
    "randomNumber.maximumDesc": "Giá trị lớn nhất có thể",
    "randomNumber.countDesc": "Số lượng số cần tạo",
    "randomNumber.decimalPlaces": "Số chữ số thập phân",
    "randomNumber.decimalPlacesDesc": "Số chữ số sau dấu thập phân",
    "randomNumber.noDuplicates": "Không trùng lặp",
    "randomNumber.noDuplicatesDesc":
      "Đảm bảo tất cả các số được tạo là duy nhất",
    "randomNumber.results": "Kết quả",
    "randomNumber.numbersGenerated": "số đã được tạo",
    "randomNumber.numbersGeneratedPlural": "số đã được tạo",
    "randomNumber.generatedSuccess": "Đã tạo",
    "randomNumber.integerNumber": "số nguyên",
    "randomNumber.decimalNumber": "số thập phân",
    "randomNumber.validationError":
      "Vui lòng nhập số hợp lệ cho tất cả các trường",
    "randomNumber.decimalValidationError":
      "Vui lòng nhập số chữ số thập phân hợp lệ",
    "randomNumber.copiedNumber": "Đã sao chép",

    // Language Switcher
    "language.english": "English",
    "language.vietnamese": "Tiếng Việt",
    "language.switchTo": "Chuyển sang",
    "language.label": "Ngôn ngữ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Load from localStorage or default to 'en'
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
