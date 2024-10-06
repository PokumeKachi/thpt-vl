const localizationTable = {
  'home': 'Trang chủ',
  'news': 'Tin tức',
  'event': 'Sự kiện',
  'resource': 'Thư viện',
  'chat': 'Trò chuyện',
  'setting': 'Cài đặt',
  'about': 'Giới thiệu',
}

export function localize(target) {
  return localizationTable[target] || target;
}
