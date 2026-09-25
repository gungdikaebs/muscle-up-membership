import type { ImageMetadata } from "astro";
import coachAndre from "../assets/images/coaches/coach-andre.png";
import coachRaka from "../assets/images/coaches/coach-raka.png";
import coachDion from "../assets/images/coaches/coach-dion.png";

export const coaches = [
  {
    number: "01",
    slug: "andre",
    name: "Andre",
    role: "Strength Coach",
    quote: "Get stronger today for a better tomorrow.",
    image: coachAndre,
    intro:
      "Andre helps members build strength with a focus on consistent progress and purposeful training. His approach keeps the long-term goal in view while making each session count.",
    focus: [
      "Build strength through consistent practice",
      "Train with purpose and control",
      "Make progress that supports everyday life",
    ],
  },
  {
    number: "02",
    slug: "raka",
    name: "Raka",
    role: "Conditioning Coach",
    quote: "Move better. Do more.",
    image: coachRaka,
    intro:
      "Raka guides members to improve endurance and keep moving with intent. His coaching emphasizes sustainable effort, smart pacing, and showing up consistently.",
    focus: [
      "Develop endurance over time",
      "Find a pace you can sustain",
      "Build confidence through challenging sessions",
    ],
  },
  {
    number: "03",
    slug: "dion",
    name: "Dion",
    role: "Mobility & Hybrid Coach",
    quote: "A stronger body for a longer journey.",
    image: coachDion,
    intro:
      "Dion brings mobility and hybrid training together to help members move well and develop well-rounded fitness. His approach balances movement quality with strength and endurance.",
    focus: [
      "Move with more control and range",
      "Combine strength with endurance",
      "Build fitness for the long term",
    ],
  },
] satisfies {
  number: string;
  slug: string;
  name: string;
  role: string;
  quote: string;
  image: ImageMetadata;
  intro: string;
  focus: string[];
}[];
