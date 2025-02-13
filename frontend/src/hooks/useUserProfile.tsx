import { useRouter } from "next/navigation";

const useUserProfile = ({
  profile,
  user_id,
  redirect = false,
}: {
  profile: string | null;
  user_id: number;
  redirect?: boolean;
}) => {
  const router = useRouter();

  const redirectToUserProfilePage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/user/${user_id}`);
  };

  const Profile = (
    <div
      className="rounded-full w-9 h-9 bg-slate-500"
      style={{ cursor: redirect ? "pointer" : undefined }}
      onClick={redirect ? redirectToUserProfilePage : () => {}}
    >
      {profile && (
        <img
          src={`http://localhost:8000${profile}`}
          className="w-full h-full"
          style={{ borderRadius: "inherit" }}
          alt=""
        />
      )}
    </div>
  );

  return { Profile, redirectToUserProfilePage };
};

export default useUserProfile;
