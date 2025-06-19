import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. James Walker", // M
    image: doc1,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. James Walker is committed to modern skincare solutions for acne, pigmentation, and aging, blending science with aesthetics.",
    fees: 300,
    address: {
      line1: "45 Pine Street",
      line2: "Los Angeles, CA, USA",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Brooks", // F
    image: doc2,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Emily Brooks is a skilled neurologist with a passion for early diagnosis and treatment of migraines and epilepsy.",
    fees: 500,
    address: {
      line1: "66 Queen’s Avenue",
      line2: "Toronto, Ontario, Canada",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Ethan Carter", // M
    image: doc3,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Ethan Carter provides expert care in women's reproductive health and patient-friendly gynecological consultations.",
    fees: 400,
    address: {
      line1: "78 Oxford Street",
      line2: "London, UK",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Henry Collins", // M
    image: doc4,
    speciality: "General Physician",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Henry Collins emphasizes wellness, early detection, and lifestyle counseling for everyday health issues.",
    fees: 200,
    address: {
      line1: "109 Sunset Blvd",
      line2: "Seattle, WA, USA",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Olivia Scott", // F
    image: doc5,
    speciality: "Pediatrician",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Olivia Scott loves working with children and provides holistic care with a focus on immunity and nutrition.",
    fees: 150,
    address: {
      line1: "92 Carlton Hill",
      line2: "London, UK",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Lucas Bennett", // M
    image: doc6,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Lucas Bennett offers treatments for acne, hair fall, and skin pigmentation using the latest dermatology tools.",
    fees: 300,
    address: {
      line1: "32 Maple Lane",
      line2: "Vancouver, BC, Canada",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Nathaniel Reed", // M
    image: doc7,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Nathaniel Reed specializes in treating neurological conditions such as migraines, epilepsy, and neuropathies. He focuses on non-invasive diagnostics and long-term care strategies for brain and nerve health.",
    fees: 450,
    address: {
      line1: "12 Beacon Street",
      line2: "Boston, MA, USA",
    },
  },
  {
    _id: "doc8",
    name: "Dr. William Carter", // M
    image: doc8,
    speciality: "General Physician",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. William Carter offers comprehensive care for common illnesses, chronic conditions, and lifestyle-related health issues. He also provides health counseling and preventive screenings for all age groups.",
    fees: 300,
    address: {
      line1: "88 King Street",
      line2: "Manchester, UK",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Sophia Turner", // F
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Year",
    about:
      "Dr. Sophia Turner specializes in diagnosing and treating skin conditions including acne, eczema, fungal infections, and pigmentation issues. She uses modern skincare methods and personalized treatment plans.",
    fees: 200,
    address: {
      line1: "221B Baker Street",
      line2: "London, UK",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Benjamin Moore", // M
    image: doc10,
    speciality: "Pediatrician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Benjamin Moore provides medical care for children, addressing common issues like infections, allergies, and nutritional deficiencies. He focuses on growth monitoring, vaccinations, and developmental milestones.",
    fees: 350,
    address: {
      line1: "98 Wellington Ave",
      line2: "Toronto, Canada",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Grace Allen", // F
    image: doc11,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Grace Allen specializes in women's reproductive health, offering services including menstrual disorder treatment, prenatal care, and fertility consultations. She emphasizes compassionate and confidential care.",
    fees: 200,
    address: {
      line1: "102 Riverside Drive",
      line2: "New York, NY, USA",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Samuel Brooks", // M
    image: doc12,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "7 Years",
    about:
      "Dr. Samuel Brooks is an expert in advanced dermatological treatments such as laser therapy, acne scar reduction, chemical peels, and anti-aging solutions. He combines clinical care with cosmetic dermatology.",
    fees: 400,
    address: {
      line1: "78 Green Street",
      line2: "Birmingham, UK",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Ella Robinson", // F
    image: doc13,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ella Robinson specializes in diagnosing and managing digestive disorders such as IBS, acid reflux, ulcers, and liver disease. She blends dietary planning with medical interventions for gut health.",
    fees: 300,
    address: {
      line1: "42 Lake View Road",
      line2: "Melbourne, Australia",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Christopher Hughes", // M
    image: doc14,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "5 Years",
    about:
      "Dr. Christopher Hughes focuses on women's health across all stages of life, offering services such as prenatal care, menopause management, and reproductive counseling. His approach combines empathy and clinical excellence.",
    fees: 400,
    address: {
      line1: "19 Castle Avenue",
      line2: "Edinburgh, Scotland",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Mia Anderson", // F
    image: doc15,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Mia Anderson offers preventive and developmental care for infants and children, focusing on early diagnosis, immunizations, and parent education. She creates a nurturing environment for young patients.",
    fees: 200,
    address: {
      line1: "55 Central Park West",
      line2: "New York, NY, USA",
    },
  },
];
