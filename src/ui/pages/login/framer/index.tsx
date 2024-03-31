import { TargetAndTransition, Variant, VariantLabels } from "framer-motion";

export const ANIMATION_DURATION = 0.2;

export const SlideLeftFromZero: TargetAndTransition | VariantLabels = {
  x: "-100%",
  opacity: 0,
};

export const SlideLeftFrom100: TargetAndTransition | VariantLabels = {
  x: "0%",
  opacity: 1,
};

export const SlideRightFromZero: TargetAndTransition | VariantLabels = {
  x: "100%",
  opacity: 0,
};
