'use client'
import Spinner from "@/components/ui/Spinner";
import AlertsHomeViewController from "@/controllers/alerts/Alerts.home.view.controller";
import { CameraHomeViewController } from "@/controllers/camera/Camera.home.view.controller";
import HomeController from "@/controllers/home/Home.controller";
import { HomeProfileCardController } from "@/controllers/home/Home.profile.card.controller";
import { NotificationBadgeController } from "@/controllers/home/Notification.badge.controller";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  return (
    <HomeController/>
  );
}
