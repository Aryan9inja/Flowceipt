import DesktopNav from "../components/ui/Navbars/desktopNav";
import MobileNav from "../components/ui/Navbars/mobileNav";
import ProfileInfo from "../components/profile/profileInfo";
import ActivityPanel from "../components/profile/activityPanel";

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden sm:flex">
        <DesktopNav />
      </div>

      {/* Main content */}
      <div className="w-full bg-bg">
        <ProfileInfo />
        <ActivityPanel />
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default ProfilePage;
