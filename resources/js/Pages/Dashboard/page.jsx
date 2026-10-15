import CampusApp from '@/Components/Campus/CampusApp';

// dashboard.html — opens on the Overview view. Product Management is one click away in the sidebar.
export default function DashboardPage() {
    return <CampusApp initialView="overview" />;
}
