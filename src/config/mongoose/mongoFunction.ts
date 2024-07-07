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
export { getUser, getUserProfile, updateUserProfile, updateUser };
