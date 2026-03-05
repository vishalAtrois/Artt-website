"use client";

import { Globe2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Globe2 className="w-4 h-4 text-gray-700" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-700">
          {t("language.label")}
        </span>
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border border-gray-300 bg-white text-xs px-2 py-1 rounded-md text-black shadow-sm hover:border-gray-500 transition"
        aria-label={t("language.label")}
      >
        <option value="sv">{t("language.sv")}</option>
        <option value="en">{t("language.en")}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

