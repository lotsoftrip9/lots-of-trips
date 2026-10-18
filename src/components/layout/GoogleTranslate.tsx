"use client";

import { useEffect } from "react";
import { DEFAULT_LANGUAGE, languages } from "@/content/languages";
import { readTranslateLanguage } from "@/lib/translate/googtrans";
import { patchDomForTranslate } from "@/lib/translate/patchDomForTranslate";

const ELEMENT_ID = "google_translate_element";
const SCRIPT_ID = "google-translate-script";
const SCRIPT_SRC = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

export function GoogleTranslate() {
  useEffect(() => {
    if (readTranslateLanguage() === DEFAULT_LANGUAGE || document.getElementById(SCRIPT_ID)) return;

    patchDomForTranslate();
    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (!TranslateElement) return;
      new TranslateElement(
        {
          pageLanguage: DEFAULT_LANGUAGE,
          includedLanguages: languages.map((language) => language.code).join(","),
          autoDisplay: false,
        },
        ELEMENT_ID,
      );
    };

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div id={ELEMENT_ID} hidden aria-hidden />;
}
