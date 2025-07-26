"use client";
import { AlertCard } from "@/components/views/alert/AlertCard";
import AlertsFiltersButtons from "@/components/views/alert/AlertsFiltersButtons";
import SearchBar from "@/components/common/Searchbar";
import { TimeFiltersDialogue } from "@/components/dialogue/TimeFiltersDialogue";
import InfiniteScrolling from "@/components/ui/InfiniteScrolling";
import Spinner from "@/components/ui/Spinner";
import { protectApi } from "@/lib/protectApi";
import { Alert } from "@/models/alert";
import { filterButtonClassname } from "@/styles/tailwind-class";
import { getUtcTimestamp } from "@/utils/getUTCTimestamp";
import { IconFilter, IconFilterX } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import AlertsController from "@/controllers/alerts/Alerts.controller";

export default function Alerts() {
 

  return (
    <AlertsController />
  );
}
