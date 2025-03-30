"use client";

import HeaderContentLayout from "@/components/layout/HeaderContentLayout";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditUserProfilePage = () => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const authenticatedUser = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.users.users).find(
    (user) => user.id === Number(params.id)
  );
  const isEditable: boolean = authenticatedUser?.id === user?.id;

  const [editUserValues, setEditUserValues] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const [image, setImage] = useState<File | null>(null);

  async function urlToFile(imageUrl: string): Promise<File> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileName = imageUrl.split("/").pop() || "download.jpg";
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  useEffect(() => {
    if (user) {
      urlToFile("http://localhost:8000" + user.profile.image).then((file) => {
        setImage(file);
      });
    }
  }, [user]);

  useEffect(() => {
    setEditUserValues({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      username: user?.username || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setImage(e.target.files[0]);
  };

  const handleSubmitUserChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...editUserValues,
      image: image,
    };
    console.log(payload);
    // dispatch();
  };

  return (
    <HeaderContentLayout>
      {isEditable ? (
        user ? (
          <div className="w-full h-full flex justify-center p-4 pt-14">
            <div className="rounded-md border border-slate-200 bg-white w-3/5 p-7 relative">
              <form
                onSubmit={handleSubmitUserChange}
                className="flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="John Doe"
                    required={true}
                    value={editUserValues.username}
                    onChange={(e) =>
                      setEditUserValues({
                        ...editUserValues,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Max"
                    required={true}
                    value={editUserValues.first_name}
                    onChange={(e) =>
                      setEditUserValues({
                        ...editUserValues,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Mustermann"
                    required={true}
                    value={editUserValues.last_name}
                    onChange={(e) =>
                      setEditUserValues({
                        ...editUserValues,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required={true}
                    value={editUserValues.email}
                    onChange={(e) =>
                      setEditUserValues({
                        ...editUserValues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="profile_image"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Profile image
                  </label>
                  <div className="flex items-center gap-3 w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5">
                    {image ? (
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt=""
                          className="object-cover w-full h-full"
                          width={224}
                          height={80}
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-slate-600 rounded-full"></div>
                    )}
                    <input
                      type="file"
                      name="profile_image"
                      id="profile_image"
                      className="bg-transparent border-none outline-none text-gray-900 grow"
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>

                <button type="submit" className="mt-2 btn-filled">
                  Save Profile
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center p-8">
            <h1 className="text-slate-800 font-medium text-2xl">
              No user with the Id '{params.id}' was found.
            </h1>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center p-8">
          <h1 className="text-slate-800 font-medium text-2xl">
            You can't edit this user profile.
          </h1>
        </div>
      )}
    </HeaderContentLayout>
  );
};

export default EditUserProfilePage;
