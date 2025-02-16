import { useRouter } from "next/navigation";

const useUserProfile = ({
  profile,
  user_id,
  redirect = false,
  size,
}: {
  profile: string | null;
  user_id: number;
  redirect?: boolean;
  size?: string;
}) => {
  const router = useRouter();

  const redirectToUserProfilePage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/user/${user_id}`);
  };

  const styles: React.CSSProperties = {
    width: size || "36px",
    height: size || "36px",
    cursor: redirect ? "cursor-pointer" : "cursor-default",
  };

  const Profile = (
    <>
      {profile ? (
        <img
          className="w-9 h-9 rounded-full"
          src={`http://localhost:8000${profile}`}
          style={styles}
          alt=""
          onClick={redirect ? redirectToUserProfilePage : undefined}
        />
      ) : (
        <div
          className="w-9 h-9 rounded-full bg-slate-500"
          style={styles}
          onClick={redirect ? redirectToUserProfilePage : undefined}
        ></div>
      )}
    </>
  );

  return { Profile, redirectToUserProfilePage };
};

export default useUserProfile;
