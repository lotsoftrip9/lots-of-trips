"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_LANGUAGE } from "@/content/languages";
import { readTranslateLanguage } from "@/lib/translate/googtrans";

const subscribe = () => () => {};

export const useActiveLanguage = () =>
  useSyncExternalStore(subscribe, readTranslateLanguage, () => DEFAULT_LANGUAGE);
