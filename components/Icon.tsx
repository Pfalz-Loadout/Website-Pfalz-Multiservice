import {
  ShoppingCart, Recycle, Warehouse, Truck, MonitorCog, Wrench, Lightbulb, Layers, FileCheck, MapPin,
  MessageCircle, Phone, Mail, Check, ArrowRight, ChevronDown, ChevronRight, CircleArrowRight, Star, Menu, X, ArrowUp,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/data";

const MAP = {
  "shopping-cart": ShoppingCart, recycle: Recycle, warehouse: Warehouse, truck: Truck, "monitor-cog": MonitorCog,
  wrench: Wrench, lightbulb: Lightbulb, layers: Layers, "file-check": FileCheck, "map-pin": MapPin,
  "message-circle": MessageCircle, phone: Phone, mail: Mail, check: Check, "arrow-right": ArrowRight,
  "chevron-down": ChevronDown, "chevron-right": ChevronRight, "circle-arrow-right": CircleArrowRight, star: Star,
  menu: Menu, x: X, "arrow-up": ArrowUp,
} as const;

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & Omit<LucideProps, "ref">) {
  const C = MAP[name];
  return <C size={size} strokeWidth={2} aria-hidden="true" {...rest} />;
}
