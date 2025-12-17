// Допоміжні масиви букв
const SERIES_LETTERS = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ш",
  "Ю",
  "Я",
];
const UKR_ALPHABET = [
  "А",
  "Б",
  "В",
  "Г",
  "Ґ",
  "Д",
  "Е",
  "Є",
  "Ж",
  "З",
  "И",
  "І",
  "Ї",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ь",
  "Ю",
  "Я",
];
const ENG_ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const UKR_ALPHABET_LOWER = UKR_ALPHABET.map((l) => l.toLowerCase());
const ENG_ALPHABET_LOWER = ENG_ALPHABET.map((l) => l.toLocaleLowerCase());

// Транслітерація
const translitMap: Record<string, string> = {
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Ґ: "G",
  Д: "D",
  Е: "E",
  Є: "IE",
  Ж: "ZH",
  З: "Z",
  И: "Y",
  І: "I",
  Ї: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "H",
  Ц: "C",
  Ч: "CH",
  Ш: "SH",
  Щ: "SCH",
  Ь: "",
  Ю: "IU",
  Я: "IA",
};

// Допоміжні функції
export function randomDigits(length: number): string {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCyrillicWord(minLen = 3, maxLen = 20): string {
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  let word = "";
  for (let i = 0; i < length; i++) {
    word += randomItem(UKR_ALPHABET_LOWER);
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function randomEnglishWord(minLen = 3, maxLen = 5): string {
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  let word = "";
  for (let i = 0; i < length; i++) {
    word += randomItem(ENG_ALPHABET_LOWER);
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function transliterate(text: string): string {
  return text
    .split("")
    .map((ch) => translitMap[ch.toUpperCase()] ?? ch)
    .join("")
    .toUpperCase();
}

// 1) Number (6 digits)
export function createNumber(): string {
  return randomDigits(6);
}

// 2) Series (2 Cyrillic letters)
export function createSeries(): string {
  return randomItem(SERIES_LETTERS) + randomItem(SERIES_LETTERS);
}

// 3) Inn (10 digits, last 6 from Number)
export function createInn(num: string): string {
  return randomDigits(4) + num; // додаємо 4 випадкові цифри + 6 цифр з createNumber()
}

// 4) FinancialPhone
export function createFinancialPhone(inn: string): number {
  const last7 = inn.slice(-7);
  return Number("38050" + last7);
}

// 5–7) Ім'я, По-батькові, Прізвище
export function createName(): string {
  return randomCyrillicWord();
}

export function createFirstName(): string {
  return createName();
}

export function createMiddleName(): string {
  return createName();
}

export function createLastName(): string {
  return createName();
}

// 8) FullName
export function createFullName(
  last: string,
  first: string,
  middle: string
): string {
  return `${last} ${first} ${middle}`.replace(/'/g, "\\'");
}

// 9) FirstNameLatin
export function createFirstNameLatin(firstName: string): string {
  const base = firstName.split("-")[0].split("'")[0];
  const translit = transliterate(base);
  return translit.slice(0, 10); // залишаємо тільки перші 10 букв
}

// 10) LastNameLatin
export function createLastNameLatin(lastName: string): string {
  const base = lastName.split("-")[0].split("'")[0];
  const translit = transliterate(base);
  return translit.slice(0, 10); // залишаємо тільки перші 10 букв
}

// 11) ValueEmailPerson
export function createValueEmailPerson(
  finPhone: number,
  lastName: string
): string {
  const translitLastName = transliterate(lastName).toLowerCase();
  return `${finPhone}@${translitLastName}.ukr.net`;
}

// 26) ValueUserName
export function createValueUserName(): string {
  return `${randomEnglishWord().toLowerCase()}${randomDigits(4)}`;
}

// 27) ValueEmail
export function createValueEmail(): string {
  const username = createValueUserName();
  return `${username}@ukr.net`;
}

// 28) ValuePassword
export function createValuePassword(): string {
  const password = createValueEmail();
  return `${password}`;
}

// 12) ValuePhonePerson
export function createValuePhonePerson(finPhone: number): string {
  return "38" + String(finPhone).slice(2).replace(/^050/, "044");
}

// 13) OpenedOn (Kyiv time)
export function createOpenedOn(): string {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(now);

  // зберемо у формат YYYY-MM-DDTHH:mm:ss
  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  const second = parts.find((p) => p.type === "second")?.value;

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}

// 14) FullNameEntr
export function createFullNameEntr(fullName: string): string {
  return `ФОП \"${fullName}\"`;
}

// 15) NameCorpCardPerson
export function createNameCorpCardPerson(
  firstLatin: string,
  lastLatin: string
): string {
  return `${firstLatin} ${lastLatin}`;
}

// 16) identCode
export function createIdentCode(): string {
  return randomDigits(8);
}

// 17–20) Компанії
export function createFullCompanyName(): string {
  return `ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ \"ФІРМА\" \"${randomCyrillicWord(
    10,
    20
  )}\"`;
}

export function createShortCompanyName(fullCompanyName: string): string {
  return `ТОВ \"ФІРМА\"\ \"${fullCompanyName}\"`;
}

export function createForeignName(fullCompanyName: string): string {
  return `LTD \"COMPANY\"\ \"${transliterate(fullCompanyName)}\"`;
}

export function createNameCorpCardCo(foreignName: string): string {
  return foreignName
    .split(" ")
    .slice(0, 2)
    .map((word) => word.replace(/["'\\]/g, "")) // прибираємо ", ', \
    .join(" ");
}

// 21) ValueEmailCo
export function createValueEmailCo(
  valuePhoneCo: string,
  nameCorpCardCo: string
): string {
  return `${valuePhoneCo}@${nameCorpCardCo
    .replace(/\s/g, "")
    .toLowerCase()}.ukr.net`;
}

// 22) ValuePhoneCo
export function createValuePhoneCo(): string {
  return "38048" + randomDigits(7);
}

// 23) fullBankName
export function createFullBankName(): string {
  return `ПУБЛІЧНЕ АКЦІОНЕРНЕ ТОВАРИСТВО \"КОМЕРЦІЙНИЙ БАНК\" \"${randomCyrillicWord(
    10,
    20
  )}\"`;
}

// 24) shortBankName
export function createShortBankName(fullBankName: string): string {
  return `ПАТ \"КБ\" \"${fullBankName}\"`;
}

// 25) identCodeBank
export function createIdentCodeBank(): string {
  return randomDigits(8);
}
