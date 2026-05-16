import {
  BookOpen,
  Building2,
  CalendarDays,
  Compass,
  Cross,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
  type LucideIcon
} from "lucide-react";

import type { IconKey } from "@/data/schools";

export const iconMap: Record<IconKey, LucideIcon> = {
  "book-open": BookOpen,
  building: Building2,
  calendar: CalendarDays,
  compass: Compass,
  cross: Cross,
  "graduation-cap": GraduationCap,
  "heart-handshake": HeartHandshake,
  landmark: Landmark,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  trophy: Trophy,
  users: Users
};
