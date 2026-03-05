"use client";

import { useLanguage } from "./LanguageProvider";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="border border-gray-300 bg-white text-sm px-2 py-1 rounded-md text-black"
      aria-label="Change language"
    >
      <option value="sv">Svenska</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSwitcher;

