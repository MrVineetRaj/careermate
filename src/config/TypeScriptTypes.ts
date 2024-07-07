export interface featureInterface {
  title: string;
  description: string;
  icon: string;
  alignment: string;
}

export interface testimonialInterface {
  author: string;
  description: string;
}

export interface IntersectionObserverOptions {
  threshold?: number; // Optional threshold for visibility detection
  root?: Element | null | undefined; // Optional root element to observe within
  rootMargin?: string; // Optional margin around the root element
}

export interface userProfileInterface {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  links: { title: string; href: string }[];
  skills: { label: string; values: string }[];
  experiences: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
    imageUrl: string;
    technologies: string;
    GitHub: string;
    Demo: string;
  }[];
  education: {
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    marks: string;
  }[];
  achievements_Certification: {
    title: string;
    description: string;
  }[];
}

export interface CareerMateStoreProps {
  user_profile_db: userProfileInterface;
  user_profile_active: userProfileInterface;
  renderKey: number;
  localUser: userSchemaInterface;

  setLocalUser: (user: userSchemaInterface) => void;
  updateRenderKey: () => void;
  setUserProfileActive: (user_profile: userProfileInterface) => void;
  setUserProfileDB: (user_profile: userProfileInterface) => void;
  updateUserProfileDb: (user_profile: userProfileInterface) => void;
}

export interface educationInterface {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  marks: string;
}

export interface experienceInterface {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface userSchemaInterface {
  _id: string;
  clerkId: string;
  userName: string;
  email: string;
  name: string;
  subscription: {
    status: string;
    plan: string;
    start_date: Date;
    end_date: Date;
  };
  utilityImages: {
    url: string;
    publicId: string;
  }[];
  profileType: string;
  imageUrl: string;
}

export interface projectInterface {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string;
  GitHub: string;
  Demo: string;
}
