import type { ImageMetadata } from "astro";
import programStrength from "../assets/images/program-strength.png";
import programConditioning from "../assets/images/program-conditioning.png";
import programMobility from "../assets/images/program-mobility.png";
import programHybrid from "../assets/images/program-hybrid.png";

export const programs = [
  {
    number: "01",
    slug: "strength",
    title: "Strength",
    description: "Build real strength for real life.",
    intro:
      "Build a stronger foundation with purposeful resistance training. Strength sessions focus on steady progress, confident movement, and strength you can use beyond the gym.",
    image: programStrength,
    focus: [
      "Build full-body strength",
      "Practice controlled movement",
      "Progress at your own pace",
    ],
  },
  {
    number: "02",
    slug: "conditioning",
    title: "Conditioning",
    description: "Push your limits. Improve endurance.",
    intro:
      "Improve your work capacity through challenging, purposeful training. Conditioning helps you build endurance, maintain effort, and feel more capable from one session to the next.",
    image: programConditioning,
    focus: [
      "Build cardiovascular endurance",
      "Improve pacing and consistency",
      "Challenge your whole body",
    ],
  },
  {
    number: "03",
    slug: "mobility",
    title: "Mobility",
    description: "Move better. Stay injury free.",
    intro:
      "Make room for better movement. Mobility training develops control and usable range of motion to support the way you train and move every day.",
    image: programMobility,
    focus: [
      "Explore comfortable range of motion",
      "Build movement control",
      "Support recovery and daily movement",
    ],
  },
  {
    number: "04",
    slug: "hybrid",
    title: "Hybrid",
    description: "Strength meets endurance.",
    intro:
      "Bring strength and endurance together in one balanced approach. Hybrid training helps you develop all-round fitness and move confidently across different challenges.",
    image: programHybrid,
    focus: [
      "Develop strength and stamina",
      "Build well-rounded fitness",
      "Adapt to varied training demands",
    ],
  },
] satisfies {
  number: string;
  slug: string;
  title: string;
  description: string;
  intro: string;
  image: ImageMetadata;
  focus: string[];
}[];
