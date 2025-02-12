"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const UserProfilePage = () => {
  const params = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const response: { data: {} } = await axiosInstance.get(
          `/api/auth/user/${params.id}/`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <HeaderContentLayout>
      <h1>{params.id}</h1>
    </HeaderContentLayout>
  );
};

export default UserProfilePage;
