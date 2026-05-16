export type SchoolId = "st-jacinta" | "king-david";

export type IconKey =
  | "book-open"
  | "building"
  | "calendar"
  | "compass"
  | "cross"
  | "graduation-cap"
  | "heart-handshake"
  | "landmark"
  | "map-pin"
  | "message-circle"
  | "shield-check"
  | "sparkles"
  | "star"
  | "trophy"
  | "users";

export type NavLink = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: string;
  icon: IconKey;
};

export type Feature = {
  title: string;
  description: string;
  icon: IconKey;
};

export type Program = {
  title: string;
  summary: string;
  bullets: string[];
};

export type AcademicSection = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type DirectorMessage = {
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  role: string;
  signature: string;
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  category: "Learning" | "School Life" | "Events" | "Facilities";
};

export type HeroProfile = {
  name: string;
  role: string;
  note: string;
  image: string;
};

export type SchoolProfile = {
  id: SchoolId;
  name: string;
  shortName: string;
  initials: string;
  founded: string;
  location: string;
  director: string;
  motto: string;
  tagline: string;
  seoDescription: string;
  domains: string[];
  logo: string;
  heroImage: string;
  heroImageFit?: "cover" | "contain";
  heroImagePosition?: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    tint: string;
    text: string;
    panel: string;
  };
  topBar: {
    announcement: string;
    items: string[];
    ctaLabel: string;
  };
  hero: {
    eyebrow: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    titleLines: string[];
    backgroundImages?: string[];
    profiles: HeroProfile[];
  };
  summary: string;
  history: string;
  mission: string;
  vision: string;
  leadershipNote: string;
  learnerFocus: string;
  curriculum: string[];
  academicSections: AcademicSection[];
  directorMessage: DirectorMessage;
  stats: Stat[];
  differentiators: Feature[];
  programs: Program[];
  values: Feature[];
  milestones: Milestone[];
  coCurricular: string[];
  gallery: GalleryItem[];
  admissions: {
    intro: string;
    steps: string[];
    requirements: string[];
    familyNote: string;
  };
  contact: {
    phone: string;
    officePhones?: string[];
    directorPhones?: string[];
    email: string;
    emailSecondary?: string[];
    whatsapp: string;
    address: string;
    mapLabel: string;
    mapQuery?: string;
  };
};

export const navigationLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];

export const schools: Record<SchoolId, SchoolProfile> = {
  "st-jacinta": {
    id: "st-jacinta",
    name: "St. Jacinta Junior Christian School",
    shortName: "St. Jacinta",
    initials: "SJ",
    founded: "2007",
    location: "Mwiki, Kasarani Phase 3",
    director: "Agness Wairimu Kamithi",
    motto: "Growing in Faith, Learning with Purpose",
    tagline: "A nurturing Christian school building confident learners for the CBC journey.",
    seoDescription:
      "St. Jacinta Junior Christian School is a caring CBC school in Mwiki, Kasarani Phase 3, serving learners up to Grade 9 in a disciplined Christian environment.",
    domains: ["stjacinta-domain.co.ke", "www.stjacinta-domain.co.ke", "localhost:3000"],
    logo: "/st-jacinta/logo.png",
    heroImage: "/st-jacinta/hero.jpg",
    heroImageFit: "cover",
    heroImagePosition: "center 24%",
    theme: {
      primary: "#154C79",
      secondary: "#C63A3A",
      accent: "#FFFFFF",
      surface: "#F5F7FA",
      tint: "#EAF2FA",
      text: "#0F172A",
      panel: "#FFFFFF"
    },
    topBar: {
      announcement: "Admissions are open. Families are welcome to visit and speak with the school team.",
      items: ["CBC to Grade 9", "Christian Values", "Mwiki, Kasarani Phase 3"],
      ctaLabel: "Book a Visit"
    },
    hero: {
      eyebrow: "Christian Learning. Strong Foundations. Confident Growth.",
      intro:
        "Designed for parents who want a warm, disciplined, and faith-guided school where children are nurtured academically and personally from their earliest learning years into junior school.",
      primaryCta: "Start Admission",
      secondaryCta: "Explore Academics",
      titleLines: ["St. Jacinta", "Junior Christian School"],
      backgroundImages: [
        "/st-jacinta/gallery-5.jpg",
        "/st-jacinta/gallery-3.jpg",
        "/st-jacinta/gallery-2.jpg"
      ],
      profiles: [
        {
          name: "Learner Growth",
          role: "CBC Journey",
          note: "A supportive pathway that helps children grow confidently through each level.",
          image: "/st-jacinta/gallery-1.jpg"
        },
        {
          name: "Values First",
          role: "Christian Culture",
          note: "Faith, discipline, kindness, and daily care shape the school experience.",
          image: "/st-jacinta/gallery-2.jpg"
        },
        {
          name: "Trusted Leadership",
          role: "Director-Led Vision",
          note: "A school culture built steadily under Director Agness Wairimu Kamithi.",
          image: "/st-jacinta/gallery-3.jpg"
        }
      ]
    },
    summary:
      "St. Jacinta Junior Christian School blends nurturing care, discipline, and strong academic guidance within a Christian environment built for lasting learner growth.",
    history:
      "Founded in 2007 and named after Jacinta Kamithi, the mother of the Director, St. Jacinta began with 3 learners and 1 teacher in Mwiki, Kasarani Phase 3. Over time it grew into a trusted school community serving over 300 learners. The school first operated under the 8-4-4 system and now serves learners up to Grade 9 under Kenya's CBC structure.",
    mission:
      "To nurture each learner in a caring Christian environment that supports academic progress, discipline, character, and confidence.",
    vision:
      "To be a trusted school community known for faith-guided growth, strong learning foundations, and responsible young leaders.",
    leadershipNote:
      "Under Director Agness Wairimu Kamithi, the school continues to focus on what families value most: steady leadership, caring teachers, disciplined culture, and meaningful progress for every child.",
    learnerFocus:
      "Faith-guided nurture, strong academic foundations, discipline, and a confident transition through the CBC years up to Grade 9.",
    curriculum: ["CBC", "Primary Learning Pathway", "Junior School up to Grade 9", "Christian-Based Guidance"],
    academicSections: [
      {
        title: "Foundation Years",
        description:
          "Our early learning and lower primary experience is designed to help children settle well, build confidence, and grow in literacy, numeracy, communication, and positive social habits within a caring Christian environment.",
        image: "/st-jacinta/hero.jpg",
        alt: "Foundational learning at St. Jacinta"
      },
      {
        title: "Primary School",
        description:
          "The primary pathway focuses on steady CBC progress, strong classroom routines, teacher guidance, and the kind of supportive structure that helps learners develop discipline, curiosity, and academic consistency.",
        image: "/st-jacinta/gallery-2.jpg",
        alt: "Primary learning at St. Jacinta"
      },
      {
        title: "Junior School",
        description:
          "Up to Grade 9, learners are prepared with deeper subject engagement, stronger responsibility, and close academic support so they can move through junior school with maturity, confidence, and readiness for the next level.",
        image: "/st-jacinta/gallery-4.jpg",
        alt: "Junior school learning at St. Jacinta"
      }
    ],
    directorMessage: {
      heading: "A warm welcome to our learning community",
      paragraphs: [
        "At St. Jacinta Junior Christian School, we believe that every child deserves a school environment where care, discipline, faith, and quality teaching work together. Our goal is to help learners grow steadily in confidence, character, and academic ability from their earliest years through junior school.",
        "We remain committed to walking closely with parents and guardians as partners in the learning journey. Through attentive teachers, structured support, and a Christian foundation, we continue to build a school culture where children are known well, guided well, and prepared well for the future."
      ],
      image: "/st-jacinta/gallery-3.jpg",
      imageAlt: "School leadership and learner community at St. Jacinta",
      role: "Director",
      signature: "Agness Wairimu Kamithi"
    },
    stats: [
      { label: "Founded", value: "2007", icon: "calendar" },
      { label: "Learners", value: "300+", icon: "users" },
      { label: "Location", value: "Mwiki Phase 3", icon: "map-pin" },
      { label: "Pathway", value: "CBC to Grade 9", icon: "graduation-cap" }
    ],
    differentiators: [
      {
        title: "Warm learner care",
        description: "Every section of the experience is built to reassure parents that children are seen, guided, and supported well.",
        icon: "heart-handshake"
      },
      {
        title: "Christian-centered culture",
        description: "The school's identity is grounded in values, discipline, prayerful guidance, and respectful daily routines.",
        icon: "cross"
      },
      {
        title: "Strong foundation years",
        description: "Literacy, numeracy, confidence, communication, and readiness are treated as essential building blocks.",
        icon: "book-open"
      },
      {
        title: "Steady school growth",
        description: "The journey from 3 learners and 1 teacher to a thriving community reflects years of trust, commitment, and steady growth.",
        icon: "sparkles"
      }
    ],
    programs: [
      {
        title: "Foundation Learning",
        summary:
          "Early learning support is shaped around confidence, participation, literacy, numeracy, and day-to-day guidance.",
        bullets: [
          "Age-appropriate learner support",
          "Warm classroom routines",
          "Strong early academic structure"
        ]
      },
      {
        title: "CBC Pathway",
        summary:
          "Teaching is aligned to CBC expectations while keeping the learning atmosphere calm, parent-friendly, and highly supportive.",
        bullets: [
          "Competency-based classroom practice",
          "Balanced academic and practical activities",
          "Progress-focused learner support"
        ]
      },
      {
        title: "Junior School Continuity",
        summary:
          "Families benefit from continuity through Grade 9, with a familiar school culture guiding learners through a key transition stage.",
        bullets: [
          "Up to Grade 9",
          "Smooth learner progression",
          "Stronger parent confidence in continuity"
        ]
      }
    ],
    values: [
      {
        title: "Faith",
        description: "Learners are guided through a school culture shaped by Christian values and everyday integrity.",
        icon: "cross"
      },
      {
        title: "Discipline",
        description: "Consistency, respect, and self-control are part of how learners are prepared for growth.",
        icon: "shield-check"
      },
      {
        title: "Growth",
        description: "The school is intentional about helping children progress steadily in confidence and capability.",
        icon: "sparkles"
      },
      {
        title: "Excellence",
        description: "Strong foundations matter because they shape stronger learning outcomes later.",
        icon: "trophy"
      }
    ],
    milestones: [
      {
        year: "2007",
        title: "School founded",
        description: "St. Jacinta begins its journey in Mwiki, Kasarani Phase 3."
      },
      {
        year: "Early Years",
        title: "Started with 3 learners and 1 teacher",
        description: "A humble beginning shaped a culture of care, attentiveness, and resilience."
      },
      {
        year: "Transition",
        title: "Moved from 8-4-4 to CBC",
        description: "The school adapted to the current national curriculum while keeping its strong learner focus."
      },
      {
        year: "Growth",
        title: "Expanded to over 300 learners",
        description: "Steady family trust helped the school become a respected local learning community."
      },
      {
        year: "Today",
        title: "Serving learners up to Grade 9",
        description: "The school now supports children further through the junior school stage."
      }
    ],
    coCurricular: [
      "Creative learner activities",
      "School life events rooted in values",
      "Games and wellness experiences",
      "Team-based activities that build confidence"
    ],
    gallery: [
      {
        src: "/st-jacinta/gallery-1.jpg",
        alt: "Kindergarten learning at St. Jacinta",
        category: "Learning"
      },
      {
        src: "/st-jacinta/gallery-2.jpg",
        alt: "Primary classroom learning at St. Jacinta",
        category: "Learning"
      },
      {
        src: "/st-jacinta/gallery-3.jpg",
        alt: "Kindergarten school life at St. Jacinta",
        category: "School Life"
      },
      {
        src: "/st-jacinta/gallery-4.jpg",
        alt: "Junior secondary learning at St. Jacinta",
        category: "Learning"
      },
      {
        src: "/st-jacinta/gallery-5.jpg",
        alt: "Junior secondary school moment at St. Jacinta",
        category: "Events"
      },
      {
        src: "/st-jacinta/gallery-6.jpg",
        alt: "Classroom environment at St. Jacinta",
        category: "Facilities"
      }
    ],
    admissions: {
      intro:
        "Families looking for a caring, disciplined, and growth-oriented learning environment are warmly welcome to begin with a school visit and conversation.",
      steps: [
        "Contact the school for an initial admissions conversation.",
        "Visit the school to understand the environment and learning culture.",
        "Submit learner details and supporting documents.",
        "Complete an assessment or interview where applicable.",
        "Receive admission confirmation and joining guidance."
      ],
      requirements: [
        "Copy of the learner's birth certificate",
        "Previous school report where applicable",
        "Parent or guardian contact details",
        "Passport photos if required"
      ],
      familyNote:
        "For the fastest response, families are encouraged to call or WhatsApp the school directly."
    },
    contact: {
      phone: "0727161133",
      directorPhones: ["0722648983"],
      email: "stjacintas@gmail.com",
      emailSecondary: ["stjacintaschool2020@gmail.com"],
      whatsapp: "0722648983",
      address: "Mwiki, Kasarani Phase 3",
      mapLabel: "Mwiki, Kasarani Phase 3",
      mapQuery: "Mwiki, Kasarani Phase 3, Nairobi, Kenya"
    }
  },
  "king-david": {
    id: "king-david",
    name: "King David Senior and Junior School",
    shortName: "King David",
    initials: "KD",
    founded: "2014",
    location: "Juja",
    director: "Agness Wairimu Kamithi",
    motto: "Discipline, Excellence, Leadership",
    tagline: "A more structured school environment for serious learning, mature growth, and future readiness.",
    seoDescription:
      "King David Senior and Junior School offers disciplined, growth-focused learning with senior secondary roots and a CBC junior school pathway.",
    domains: ["kingdavid-domain.co.ke", "www.kingdavid-domain.co.ke", "localhost:3001"],
    logo: "/king-david/logo.png",
    heroImage: "/king-david/hero.jpg",
    heroImageFit: "cover",
    heroImagePosition: "center center",
    theme: {
      primary: "#0F3E67",
      secondary: "#C63A3A",
      accent: "#FFFFFF",
      surface: "#F5F7FA",
      tint: "#E8F1F9",
      text: "#0F172A",
      panel: "#FFFFFF"
    },
    topBar: {
      announcement: "Admissions are open. Families are invited to visit the school and learn more about our programmes.",
      items: ["Senior & Junior Pathways", "Boys and Girls", "Focused Learning Culture"],
      ctaLabel: "Plan a Visit"
    },
    hero: {
      eyebrow: "Academic Structure. Learner Maturity. Future Readiness.",
      intro:
        "Built for families who value discipline, clear academic direction, and a learning culture that prepares students with confidence and purpose.",
      primaryCta: "Apply to King David",
      secondaryCta: "View Programmes",
      titleLines: ["King David", "Senior and Junior School"],
      backgroundImages: [
        "/king-david/gallery-3.jpg",
        "/king-david/gallery-5.jpg",
        "/king-david/gallery-6.jpg"
      ],
      profiles: [
        {
          name: "Academic Focus",
          role: "Structured Pathway",
          note: "A school tone shaped by seriousness, progression, and academic accountability.",
          image: "/king-david/gallery-1.jpg"
        },
        {
          name: "Leadership Culture",
          role: "Growth with Discipline",
          note: "Students are encouraged to grow in maturity, responsibility, and self-direction.",
          image: "/king-david/gallery-5.jpg"
        },
        {
          name: "Expanded Pathway",
          role: "Senior Roots, Junior Growth",
          note: "A school that evolved from senior secondary foundations into a broader learner journey.",
          image: "/king-david/gallery-6.jpg"
        }
      ]
    },
    summary:
      "King David Senior and Junior School offers a disciplined learning environment where learners are guided to grow in knowledge, confidence, and responsibility.",
    history:
      "King David began in 2014 as a senior secondary school for boys and girls under the 8-4-4 system. In 2024, the school expanded to include a junior school aligned with Kenya's Competency Based Curriculum. The school continues to be shaped by academic structure, learner discipline, and steady progression.",
    mission:
      "To provide disciplined, high-quality education that develops strong character, academic seriousness, and long-term learner readiness.",
    vision:
      "To be a respected school community known for structure, excellence, and the development of responsible future leaders.",
    leadershipNote:
      "Director Agness Wairimu Kamithi continues to guide the school with a strong focus on structured learning, disciplined culture, and confidence for the future.",
    learnerFocus:
      "Academic discipline, mature learner growth, strong secondary-school foundations, and a confident CBC junior pathway.",
    curriculum: [
      "Senior Secondary Learning Roots",
      "Junior School Pathway",
      "CBC Junior School",
      "Structured Learning Culture"
    ],
    academicSections: [
      {
        title: "Junior School",
        description:
          "Our junior school pathway is aligned to CBC expectations and is built around guided learning, clear routines, and a school culture that encourages students to become confident, disciplined, and academically focused.",
        image: "/king-david/gallery-1.jpg",
        alt: "Junior school learning at King David"
      },
      {
        title: "Senior Pathway",
        description:
          "King David's foundation as a senior school continues to shape a more structured academic environment where learners are encouraged to think seriously, study consistently, and prepare well for the demands of higher levels.",
        image: "/king-david/hero.jpg",
        alt: "Senior academic pathway at King David"
      },
      {
        title: "Leadership Growth",
        description:
          "Beyond classroom learning, the school seeks to develop responsibility, maturity, discipline, and self-direction so that learners are prepared not only for examinations, but also for long-term growth and leadership.",
        image: "/king-david/gallery-5.jpg",
        alt: "Leadership and learner growth at King David"
      }
    ],
    directorMessage: {
      heading: "A message to families seeking purposeful education",
      paragraphs: [
        "King David Senior and Junior School is built for families who value structure, discipline, and meaningful academic progress. We believe students thrive when they are guided within a culture of clear expectations, steady support, and purposeful teaching.",
        "As the school continues to grow, our commitment remains the same: to offer an environment where learners are challenged to grow in knowledge, character, and confidence. We warmly welcome families who want a school that combines seriousness of learning with responsible student development."
      ],
      image: "/king-david/gallery-3.jpg",
      imageAlt: "School leadership and student development at King David",
      role: "Director",
      signature: "Agness Wairimu Kamithi"
    },
    stats: [
      { label: "Founded", value: "2014", icon: "calendar" },
      { label: "Expansion", value: "Junior School 2024", icon: "sparkles" },
      { label: "School Type", value: "Boys & Girls", icon: "users" },
      { label: "Positioning", value: "Structured Academic Path", icon: "landmark" }
    ],
    differentiators: [
      {
        title: "Stronger academic tone",
        description: "The school projects maturity and seriousness in ways that fit families looking for structure and direction.",
        icon: "landmark"
      },
      {
        title: "Secondary-school foundation",
        description: "Its origin as a senior school gives it a more established and academically focused culture.",
        icon: "building"
      },
      {
        title: "Leadership and discipline",
        description: "Student growth is framed around order, responsibility, and confidence rather than just activity.",
        icon: "shield-check"
      },
      {
        title: "Expanded learner journey",
        description: "The junior school pathway allows the school to support learners more fully as they progress toward higher levels.",
        icon: "compass"
      }
    ],
    programs: [
      {
        title: "Senior School Foundation",
        summary:
          "The school's roots in secondary education shape an academic environment with strong structure, clear expectations, and purposeful direction.",
        bullets: [
          "Serious study culture",
          "Stronger progression mindset",
          "Discipline-led academic routines"
        ]
      },
      {
        title: "CBC Junior Expansion",
        summary:
          "The junior school pathway introduced in 2024 allows the school to support learners earlier within the same broad culture of growth and seriousness.",
        bullets: [
          "CBC-aligned junior learning",
          "Continuity into higher levels",
          "Purposeful learner support"
        ]
      },
      {
        title: "Leadership Development",
        summary:
          "The school encourages student growth through confidence, maturity, discipline, and the ability to carry responsibility well.",
        bullets: [
          "Learner responsibility",
          "Confidence and accountability",
          "Character growth through structure"
        ]
      }
    ],
    values: [
      {
        title: "Discipline",
        description: "Clear expectations and consistency help students build stronger personal responsibility.",
        icon: "shield-check"
      },
      {
        title: "Excellence",
        description: "The school aims for steady progress, seriousness, and meaningful academic outcomes.",
        icon: "trophy"
      },
      {
        title: "Leadership",
        description: "Students are encouraged to think ahead, speak with confidence, and carry themselves with maturity.",
        icon: "star"
      },
      {
        title: "Growth",
        description: "The environment is built to help students progress in capability, character, and future readiness.",
        icon: "sparkles"
      }
    ],
    milestones: [
      {
        year: "2014",
        title: "School founded",
        description: "King David begins as a senior secondary school serving boys and girls."
      },
      {
        year: "Founding Stage",
        title: "Built under the 8-4-4 system",
        description: "Its earliest identity was rooted in structured secondary education."
      },
      {
        year: "Growth",
        title: "Developed a stronger academic profile",
        description: "The school continued to grow around discipline, seriousness, and steady academic progression."
      },
      {
        year: "2024",
        title: "Junior school introduced",
        description: "A CBC-aligned junior pathway expanded the school's learner journey."
      },
      {
        year: "Today",
        title: "Senior and junior identity",
        description: "The school now combines structured roots with a broader and more future-facing offering."
      }
    ],
    coCurricular: [
      "Clubs and student leadership opportunities",
      "Events that support confidence and presentation",
      "Sport and physical development activities",
      "Growth experiences that reinforce discipline and teamwork"
    ],
    gallery: [
      {
        src: "/king-david/gallery-1.jpg",
        alt: "Junior school learning at King David",
        category: "Learning"
      },
      {
        src: "/king-david/gallery-2.jpg",
        alt: "Junior pathway classroom learning at King David",
        category: "Learning"
      },
      {
        src: "/king-david/gallery-3.jpg",
        alt: "Student event and participation at King David",
        category: "Events"
      },
      {
        src: "/king-david/gallery-5.jpg",
        alt: "Student life and guided growth at King David",
        category: "School Life"
      },
      {
        src: "/king-david/gallery-6.jpg",
        alt: "Senior school classroom environment at King David",
        category: "Facilities"
      }
    ],
    admissions: {
      intro:
        "King David welcomes families who want a more structured and academically focused school environment for their children.",
      steps: [
        "Reach out to the school for an admissions conversation.",
        "Visit the school to understand the environment and expectations.",
        "Submit learner details and supporting documents.",
        "Complete an assessment or interview where applicable.",
        "Receive admission confirmation and reporting guidance."
      ],
      requirements: [
        "Copy of the learner's birth certificate",
        "Previous school report where applicable",
        "Parent or guardian contact details",
        "Passport photos if required"
      ],
      familyNote:
        "Families are encouraged to call or WhatsApp the school directly for the quickest admissions support."
    },
    contact: {
      phone: "0705843958",
      officePhones: ["0728388072"],
      directorPhones: ["0722648983", "0734932916"],
      email: "Email address to be added",
      whatsapp: "0722648983",
      address: "Juja",
      mapLabel: "Juja",
      mapQuery: "Juja, Kenya"
    }
  }
};

export const defaultSchoolId: SchoolId = "st-jacinta";

export const schoolHostMap = {
  "stjacinta-domain.co.ke": "st-jacinta",
  "www.stjacinta-domain.co.ke": "st-jacinta",
  "kingdavid-domain.co.ke": "king-david",
  "www.kingdavid-domain.co.ke": "king-david",
  "localhost:3000": "st-jacinta",
  "127.0.0.1:3000": "st-jacinta",
  "localhost:3001": "king-david",
  "127.0.0.1:3001": "king-david",
  localhost: "st-jacinta",
  "127.0.0.1": "st-jacinta"
} satisfies Record<string, SchoolId>;
