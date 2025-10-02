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
      <div className="w-full bg-bg sm:ml-64">
        <ProfileInfo />
        <ActivityPanel />
      </div>

      {/* Mobile bottom nav */}
      <div className="sm:hidden  w-full fixed bottom-0 left-0 z-50">
        <MobileNav />
      </div>
    </div>
  );
};

export default ProfilePage;
