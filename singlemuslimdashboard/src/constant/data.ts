import {
  DataUsageOutlined,
  EditOutlined,
  ManageAccountsOutlined,
  PeopleAltOutlined,
  Settings,
} from "@mui/icons-material";

export const NAVDATA = [
  {
    icon: ManageAccountsOutlined,
    path: "/",
  },
  {
    icon: PeopleAltOutlined,
    path: "/users",
  },
  {
    icon: EditOutlined,
    path: "/safety-report",
  },
  {
    icon: DataUsageOutlined,
    path: "/analytics",
  },
  {
    icon: Settings,
    path: "/settings",
  },
];

export const REPORT_TABLE_DATA = {
  columns: [
    { label: "COMPANY NAME", field: "companyName" },
    { label: "USER NAME", field: "userName" },
    { label: "SUBJECT", field: "subject" },
    { label: "CATEGORY", field: "category" },
    { label: "CONTENT", field: "content" },
    { label: "STATUS", field: "status" },
  ],
  rows: [
    {
      companyName: "Coral Design",
      userName: "Lance Stroll",
      subject: "I found out he was not part",
      category: "Misuse",
      content: "User Profile",
      status: "Open",
    },
    ...Array(7).fill({
      companyName: "Coral Design",
      userName: "Lance Stroll",
      subject: "I found out he was not part",
      category: "Unrecognized User",
      content: "Comment",
      status: "New",
    }),
  ],
};
export const USER_TABLE_DATA = {
  columns: [
    { label: "Company Name / NAME", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Subscription / Position", field: "subscription" },
    { label: "STATUS", field: "status" },
  ],
  rows: [
    {
      name: "Jon Snow",
      email: "sahar@chopdawg.com",
      phone: "+1 (000) 279-1434",
      subscription: "Premium",
      status: "Active",
    },
    ...Array(5).fill({
      name: "Jon Snow",
      email: "sahar@chopdawg.com",
      phone: "+1 (000) 279-1434",
      subscription: "Premium",
      status: "Active",
    }),
  ],
};
export const DATA_SENT = [
  {
    categoryTitle: "Date Sent",
    title: "6/23/2023",
  },
  {
    categoryTitle: "category",
    title: "Misuse",
  },
  {
    categoryTitle: "Content Type",
    title: "User Profile",
  },
];

 export const PROFESSION = [
  "Software Developer",
  "Data Scientist",
  "Doctor",
  "Engineer",
  "Teacher",
  "Nurse",
  "Architect",
  "Lawyer",
  "Accountant",
  "Chef",
  "Photographer",
  "Designer",
  "Entrepreneur",
  "Researcher",
  "Scientist",
  "Consultant",
  "Project Manager",
  "Marketer",
  "Civil Servant",
  "Psychologist",
  "Pharmacist",
  "Veterinarian",
  "Journalist",
  "Social Worker",
  "Human Resources Specialist",
  "Web Developer",
  "Graphic Designer",
  "Content Creator",
  "Event Planner",
  "Sales Representative",
  "Fashion Designer",
  "Public Relations Specialist",
  "Real Estate Agent",
  "Fitness Trainer",
  "Musician",
  "Artist",
  "Architect",
  "Teacher’s Assistant",
  "Construction Manager",
  "Speech Therapist",
  "Interior Designer",
  "Financial Analyst",
  "IT Specialist",
  "Marketing Manager",
  "Nurse Practitioner",
  "Biotechnologist",
  "Electrician",
  "Lawyer (Corporate)",
  "Research Scientist",
  "Copywriter",
];
export const SECTION = [
  {
    title: "Personal Information",
    data: {
      "My Citizenship": "Pakistani",
      "Country of Origin": "Pakistan",
      "Willing to Relocate?": "Internationally",
      "I am Looking to Marry": "As soon as possible",
      "My Income": "Prefer not to say",
      "Marital Status": "Never married",
      "Would I like to have Children?": "Yes",
      "Do I have children?": "No",
      "My Living Arrangements?": "I Live With Family",
      Country: "Pakistan",
      "County/State": "Gujrat",
      Distance: "213 miles",
    },
  },
  {
    title: "Appearance",
    data: {
      "My Height": "1.55m (5'1\")",
      "My Build": "Slim",
      "My Hair Colour": "Black",
      "Colour of My Eyes": "Brown",
      "Do I Smoke?": "No",
      "Do I Have Any Disabilities?": "No",
    },
  },
  {
    title: "Education",
    data: {
      "My Education Level": "Bachelors degree",
      "Subject I Studied": "Commerce",
    },
  },
  {
    title: "Language",
    data: {
      "My First Language": "Urdu",
      "My Second Language": "Punjabi",
    },
  },
  {
    title: "Work",
    data: {
      "My Profession": "Prefer not to say",
      "My Job Title": "Not working",
    },
  },
  {
    title: "Religion",
    data: {
      Religiousness: "Religious",
      "My Sect": "Sunni",
      "Hijab/Niqab ": "Yes Hijab",
      " Beard": "Yes",
      "Are You a Revert? ": "N0",
      "Do You Keep Halal?": "I Always Keep Halal",
      "Do You Perform Salaah?": "Always",
    },
  },
];