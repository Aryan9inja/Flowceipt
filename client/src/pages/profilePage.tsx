import DesktopNav from "../components/ui/Navbars/desktopNav";
import MobileNav from "../components/ui/Navbars/mobileNav";
import ProfileInfo from "../components/profile/profileInfo";
import ActivityPanel from "../components/profile/activityPanel";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-card/80 flex">
      {/* Desktop sidebar */}
      <div className="hidden sm:block">
        <DesktopNav />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center sm:ml-64 mb-18 sm:mb-0">
        <main className="w-full max-w-4xl px-4 py-8 flex flex-col gap-8">
          <ProfileInfo />
          <ActivityPanel />
        </main>
        {/* Mobile bottom nav */}
        <div className="sm:hidden w-full fixed bottom-0 left-0 z-50">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
