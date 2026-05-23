import type { SchoolId } from "@/data/schools";

export type AcademicMenuItem = {
  id: string;
  label: string;
  href: string;
  description: string;
};

export type AcademicPhoto = {
  src: string;
  alt: string;
};

export type AcademicDetailSection = {
  id: string;
  label: string;
  cardTitle: string;
  cardSummary: string;
  heroImage: string;
  heroAlt: string;
  paragraphs: string[];
  listTitle?: string;
  listItems?: string[];
  secondaryImage?: string;
  secondaryImageAlt?: string;
  assessmentTitle?: string;
  assessmentIntro?: string;
  assessmentItems?: string[];
  photoGalleryTitle?: string;
  photoGallery?: AcademicPhoto[];
  ctaTitle?: string;
  ctaParagraphs?: string[];
  ctaImage?: string;
  ctaImageAlt?: string;
  ctaLinkLabel?: string;
  ctaLinkHref?: string;
};

export type AcademicPageContent = {
  heading: string;
  intro: string;
  sections: AcademicDetailSection[];
};

export function getAcademicSectionHref(sectionId: string) {
  return `/academics/${sectionId}`;
}

export const academicPageContentBySchool: Record<SchoolId, AcademicPageContent> = {
  "st-jacinta": {
    heading: "Academics",
    intro: "Join us for CBC learning, strong values, and a clear path from Kindergarten to Junior Secondary.",
    sections: [
      {
        id: "kindergarten",
        label: "Kindergarten",
        cardTitle: "Kindergarten",
        cardSummary:
          "A warm, joyful introduction to school life where young children begin learning through care, structure, play, and guided discovery.",
        heroImage: "/st-jacinta/hero.jpg",
        heroAlt: "Kindergarten learners at St. Jacinta",
        paragraphs: [
          "Our Kindergarten department is designed to help children settle confidently into school life within a friendly and caring Christian environment. At this early stage, we place strong emphasis on language growth, social development, routines, confidence, and joyful participation in learning.",
          "Children are guided by attentive teachers who help them grow through play-based activities, early literacy, early numeracy, songs, stories, structured classroom routines, and daily interaction with their peers.",
          "We want every child to feel safe, known, and encouraged. The goal is to build a strong early foundation that supports school readiness and a smooth transition into the next level."
        ],
        listTitle: "We have different kindergarten levels designed for progressive early learning:",
        listItems: [
          "Playgroup - early socialisation, guided routines, and confidence-building",
          "Baby Class - early language development, interaction, and classroom readiness",
          "PP1 - foundational literacy, numeracy, creativity, and discovery learning",
          "PP2 - stronger school readiness and preparation for a confident transition into primary school"
        ],
        secondaryImage: "/st-jacinta/gallery-1.jpg",
        secondaryImageAlt: "Early years classroom activity at St. Jacinta",
        assessmentTitle: "Kindergarten Assessments",
        assessmentIntro:
          "Children in the early years are supported through age-appropriate assessment methods that help teachers monitor progress while keeping learning engaging and child-friendly.",
        assessmentItems: [
          "Continuous classroom observation and teacher guidance",
          "CBC-aligned early years learning activities",
          "Foundational language and numeracy progress checks",
          "Practical, creative, and social development reviews",
          "Parent-teacher feedback on progress and readiness"
        ],
        photoGalleryTitle: "Our Kindergarten in Photos",
        photoGallery: [
          {
            src: "/st-jacinta/gallery-1.jpg",
            alt: "Kindergarten activity at St. Jacinta"
          },
          {
            src: "/st-jacinta/gallery-3.jpg",
            alt: "Kindergarten classroom moments at St. Jacinta"
          }
        ],
        ctaTitle: "Take the Next Step",
        ctaParagraphs: [
          "Families looking for a caring, structured, and child-friendly early years environment are warmly welcome to learn more about our Kindergarten pathway.",
          "Admissions are open, and parents or guardians may contact the school directly to book a visit, ask questions, and begin the admission process."
        ],
        ctaImage: "/st-jacinta/gallery-1.jpg",
        ctaImageAlt: "Kindergarten learners in class at St. Jacinta",
        ctaLinkLabel: "View Admission Requirements and Procedure",
        ctaLinkHref: "/admissions"
      },
      {
        id: "primary",
        label: "Primary",
        cardTitle: "Primary",
        cardSummary:
          "A steady primary pathway focused on strong foundations, disciplined routines, and consistent CBC progress across each level.",
        heroImage: "/st-jacinta/gallery-2.jpg",
        heroAlt: "Primary learners in class at St. Jacinta",
        paragraphs: [
          "The Primary section is built to help learners grow in literacy, numeracy, communication, responsibility, and confidence within a structured CBC environment. Teachers guide children carefully so that progress remains steady and meaningful across each grade.",
          "At this stage, children are encouraged to think clearly, read widely, express themselves well, and strengthen the habits that support good learning. Classroom routines, assignments, and teacher support are all designed to improve consistency and understanding.",
          "Alongside academic growth, the school continues to nurture discipline, Christian values, respectful conduct, and positive learner attitudes."
        ],
        listTitle: "The Primary section places clear emphasis on:",
        listItems: [
          "Strong literacy and numeracy development",
          "CBC-aligned learning experiences and class participation",
          "Teacher guidance, progress follow-up, and learner support",
          "Discipline, confidence, and personal responsibility"
        ],
        secondaryImage: "/st-jacinta/gallery-6.jpg",
        secondaryImageAlt: "Primary classroom environment at St. Jacinta",
        assessmentTitle: "Primary Learning Support",
        assessmentIntro:
          "Learners in the Primary section are supported through regular classwork, continuous progress tracking, and steady teacher feedback.",
        assessmentItems: [
          "CBC classroom assessments and practical activities",
          "Homework guidance and progress monitoring",
          "Reading, writing, and numeracy reinforcement",
          "Teacher-parent communication where support is needed"
        ],
        photoGalleryTitle: "Primary Learning in Focus",
        photoGallery: [
          {
            src: "/st-jacinta/gallery-4.jpg",
            alt: "Primary academic activity at St. Jacinta"
          },
          {
            src: "/st-jacinta/gallery-5.jpg",
            alt: "Primary learners building confidence at St. Jacinta"
          }
        ]
      },
      {
        id: "junior-secondary",
        label: "Junior Secondary",
        cardTitle: "Junior Secondary",
        cardSummary:
          "A focused junior secondary pathway that helps learners grow in maturity, subject confidence, and readiness for the next academic stage.",
        heroImage: "/st-jacinta/gallery-4.jpg",
        heroAlt: "Junior secondary learners at St. Jacinta",
        paragraphs: [
          "Our Junior Secondary section supports learners up to Grade 9 and helps them move through a more advanced stage of learning with confidence, discipline, and closer academic focus. At this level, learners are encouraged to think more independently while still benefiting from teacher guidance and structure.",
          "Greater attention is given to subject understanding, responsibility, study habits, and the ability to engage seriously with schoolwork. The school aims to make this transition stage calm, supportive, and well guided for both learners and parents.",
          "By combining academic support with values-based formation, St. Jacinta helps learners grow into more responsible and capable young people who are ready for the next step."
        ],
        listTitle: "In Junior Secondary, learners are supported through:",
        listItems: [
          "Stronger subject engagement and guided study habits",
          "Teacher mentorship and academic follow-up",
          "Confidence-building, discipline, and responsibility",
          "Preparation for the transition beyond Grade 9"
        ],
        secondaryImage: "/st-jacinta/gallery-5.jpg",
        secondaryImageAlt: "Junior secondary learning environment at St. Jacinta",
        assessmentTitle: "Junior Secondary Development",
        assessmentIntro:
          "At this stage, the school focuses on deeper understanding, academic accountability, and readiness for the next level.",
        assessmentItems: [
          "CBC-aligned subject assessments and learning tasks",
          "Teacher guidance on study habits and consistency",
          "Academic support where learners need reinforcement",
          "Character, discipline, and transition readiness"
        ],
        photoGalleryTitle: "Junior Secondary in Focus",
        photoGallery: [
          {
            src: "/st-jacinta/gallery-2.jpg",
            alt: "Junior secondary classroom engagement at St. Jacinta"
          },
          {
            src: "/st-jacinta/gallery-6.jpg",
            alt: "Classroom environment supporting junior secondary learners at St. Jacinta"
          }
        ]
      }
    ]
  },
  "king-david": {
    heading: "Academics",
    intro: "Explore the junior and senior learning pathways that shape student growth at King David Senior and Junior School.",
    sections: [
      {
        id: "junior-school",
        label: "Junior School",
        cardTitle: "Junior School",
        cardSummary:
          "A guided junior school pathway where younger learners grow through care, routine, confidence-building, and steady academic support.",
        heroImage: "/king-david/gallery-1.jpg",
        heroAlt: "Junior school learning at King David",
        paragraphs: [
          "King David's junior school pathway helps younger learners settle well into school life through caring guidance, clear routines, and teacher support that builds confidence day by day.",
          "Learning is aligned to CBC expectations while keeping the school environment structured, supportive, and welcoming for children as they grow."
        ],
        listTitle: "The junior school pathway focuses on:",
        listItems: [
          "Clear routines and supportive classroom guidance",
          "CBC-aligned learner development",
          "Confidence-building, participation, and teacher care",
          "Preparation for higher levels of study"
        ],
        secondaryImage: "/king-david/gallery-4.jpeg",
        secondaryImageAlt: "Junior learners on an educational trip at King David",
        assessmentTitle: "Junior School Support",
        assessmentIntro:
          "Junior school learners benefit from guided routines, caring teacher support, and a steady school environment that helps them settle, progress, and build confidence.",
        assessmentItems: [
          "CBC-aligned classroom tasks and learner follow-up",
          "Teacher guidance on routines, participation, and consistency",
          "Progress support designed to strengthen confidence and academic habits",
          "A structured environment that encourages discipline and readiness"
        ],
        photoGalleryTitle: "Junior School in Focus",
        photoGallery: [
          {
            src: "/king-david/gallery-4.jpeg",
            alt: "Junior learners during an educational trip at King David"
          },
          {
            src: "/king-david/gallery-1.jpg",
            alt: "Junior school classroom engagement at King David"
          }
        ]
      },
      {
        id: "senior-school",
        label: "Senior School",
        cardTitle: "Senior School",
        cardSummary:
          "A more established senior pathway shaped by academic seriousness, responsibility, and structured progression.",
        heroImage: "/king-david/hero.jpg",
        heroAlt: "Senior school learning at King David",
        paragraphs: [
          "King David began as a senior secondary school, and that foundation continues to shape its academic tone today. The senior pathway reflects stronger expectations, academic seriousness, and a learning culture built around clear direction and purposeful progress.",
          "Students are encouraged to take learning seriously, manage responsibility well, and prepare with maturity for future opportunities."
        ],
        listTitle: "The senior pathway encourages:",
        listItems: [
          "Academic discipline and consistent study habits",
          "Clear learner expectations and accountability",
          "Structured progression and future readiness",
          "Supportive guidance within a serious school culture"
        ],
        secondaryImage: "/king-david/gallery-6.jpg",
        secondaryImageAlt: "Senior school classroom environment at King David",
        assessmentTitle: "Senior School Development",
        assessmentIntro:
          "The senior pathway is built around stronger academic expectations, more focused study habits, and a school culture that encourages maturity and accountability.",
        assessmentItems: [
          "Consistent academic follow-up and subject engagement",
          "Teacher guidance that reinforces responsibility and seriousness",
          "Structured progression toward future academic opportunities",
          "A disciplined environment that supports steady learner growth"
        ],
        photoGalleryTitle: "Senior Learning in Focus",
        photoGallery: [
          {
            src: "/king-david/gallery-3.jpg",
            alt: "Senior school event and participation at King David"
          },
          {
            src: "/king-david/gallery-6.jpg",
            alt: "Senior classroom environment at King David"
          }
        ]
      },
      {
        id: "student-growth",
        label: "Student Growth",
        cardTitle: "Student Growth",
        cardSummary:
          "A wider school culture that develops confidence, character, leadership, and responsibility alongside academic progress.",
        heroImage: "/king-david/gallery-5.jpg",
        heroAlt: "Student growth at King David",
        paragraphs: [
          "At King David, learning is not only about classroom performance. The school also seeks to develop responsible, confident, and disciplined learners across both junior and senior sections.",
          "This wider student development focus helps create a school environment where knowledge, character, and future readiness grow together from the early stages upward."
        ],
        listTitle: "Student growth is supported through:",
        listItems: [
          "Leadership and responsibility-building opportunities",
          "Mentorship, discipline, and guidance",
          "Confidence in communication and presentation",
          "A school culture that values maturity and readiness"
        ],
        secondaryImage: "/king-david/gallery-2.jpg",
        secondaryImageAlt: "Student growth in the junior pathway at King David",
        assessmentTitle: "Student Growth and Guidance",
        assessmentIntro:
          "Growth at King David goes beyond academics alone. Learners are also guided in responsibility, presentation, discipline, and confidence as part of the wider school experience.",
        assessmentItems: [
          "Mentorship and teacher guidance",
          "Discipline, responsibility, and positive learner habits",
          "Confidence-building through participation and leadership moments",
          "A school culture that supports maturity and future readiness"
        ],
        photoGalleryTitle: "Growth Beyond the Classroom",
        photoGallery: [
          {
            src: "/king-david/gallery-1.jpg",
            alt: "Student growth within the learning environment at King David"
          },
          {
            src: "/king-david/gallery-5.jpg",
            alt: "Student growth and participation at King David"
          }
        ]
      }
    ]
  }
};

export function getAcademicSectionById(schoolId: SchoolId, sectionId: string) {
  return academicPageContentBySchool[schoolId].sections.find((section) => section.id === sectionId);
}

export function getAcademicMenuItems(schoolId: SchoolId): AcademicMenuItem[] {
  return academicPageContentBySchool[schoolId].sections.map((section) => ({
    id: section.id,
    label: section.label,
    href: getAcademicSectionHref(section.id),
    description: section.cardSummary
  }));
}
