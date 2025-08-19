import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const ProfileInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="p-6 flex flex-col items-center gap-4 text-text">
      <h2 className="text-xl font-semibold">{user?.name}</h2>
      <p>({user?.email})</p>
    </div>
  );
};

export default ProfileInfo;
