import DashboardMobileSidebar from "./DashboardMobileSidebar";
import ThemeTogglerButton from "./ThemeToggle";
import UserProfileButton from "./UserProfileButton";

const DashboardNavbar = () => {
    return (
        <div className="flex items-center p-4">
            <DashboardMobileSidebar />
            <div className="flex w-full justify-end gap-4 items-center">
                <UserProfileButton />
                <ThemeTogglerButton />
            </div>
        </div>
    );
};

export default DashboardNavbar;