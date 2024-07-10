import { toast } from "@/components/ui/use-toast";

const getUser = async (clerkId: string) => {
  const res = await fetch(`/api/user?r=${clerkId}`);
  const data = await res.json();
  return data;
};

const updateUser = async (clerkId: string, data: any) => {
  const res = await fetch(`/api/user?r=${clerkId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  toast({
    title: response.message,
    variant: response.type,
  });
  return response;
};

const getUserProfile = async (clerkId: string, userId: string) => {
  const res = await fetch(`/api/user-profile?r=${clerkId}&u=${userId}`);
  const data = await res.json();
  toast({
    title: data.message,
    variant: data.type,
  });
  return data;
};

const updateUserProfile = async (
  clerkId: string,
  userId: string,
  data: any
) => {
  const res = await fetch(`/api/user-profile?r=${clerkId}&u=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  console.log(response.data);
  toast({
    title: response.message,
    variant: response.type,
  });
  return response;
};

const createNewResume = async (
  owner: string,
  ownerClerkId: string,
  userResume: any
) => {
  const res = await fetch("/api/user-resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner, ownerClerkId, userResume }),
  });
  const response = await res.json();
  toast({
    title: response.message,
    variant: response.type,
  });
  return response;
};

const getUserResume = async (resumeId: string, userId: string) => {
  const res = await fetch(`/api/user-resume?r=${resumeId}&u=${userId}`);
  const data = await res.json();
  
  return data;
};

const createNewPortfolio = async (
  owner: string,
  ownerClerkId: string,
  userPortfolio: any
) => {
  const res = await fetch("/api/user-portfolio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner, ownerClerkId, userPortfolio }),
  });
  const response = await res.json();
  toast({
    title: response.message,
    variant: response.type,
  });
  return response;
};

const getUserPortfolio = async (userId: string) => {
  const res = await fetch(`/api/user-portfolio?u=${userId}`);
  const data = await res.json();
  return data;
};

const handleFollow = async (data: any) => {
  const res = await fetch("/api/followers-details", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  toast({
    title: response.message,
    variant: response.type,
  });
  return response;
};

const getUserFollowers = async (userId: string) => {
  const res = await fetch(`/api/followers-details?u=${userId}`);
  const data = await res.json();
  return data;
};
export {
  getUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  createNewResume,
  getUserResume,
  createNewPortfolio,
  getUserPortfolio,
  handleFollow,
  getUserFollowers,
};
