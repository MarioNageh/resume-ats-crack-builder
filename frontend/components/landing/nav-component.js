'use client';
import NavItem from "@/components/landing/nav-item";
import useAppContext from "@/hooks/useAppContext";

const routes = [
    {
        icon: 'AiFillHome',
        title: 'Home',
        path: '/'
    },
    {
        icon: 'FaInfoCircle',
        title: 'About',
        path: '/about'
    }
];

export default function NavComponent() {
    const { isAuthenticated, user } = useAppContext();
    const userRoutes = isAuthenticated ? [
        ...routes,
        {
            icon: 'FaUser',
            title: 'Dashboard',
            path: '/dashboard'
        }
    ] : routes;

    return (
        <nav className="hidden bg-black text-white rounded-lg lg:grid grid-cols-[max-content_max-content_max-content_max-content] 
            justify-end gap-6 pr-2 text-xl">
            {userRoutes.map((route, index) => {
                const { icon, title, path } = route;
                return <NavItem key={index} href={path} icon={icon}>{title}</NavItem>
            })}
        </nav>
    );
}
