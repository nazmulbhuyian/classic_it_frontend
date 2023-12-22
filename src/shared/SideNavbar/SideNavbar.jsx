import { Link } from "react-router-dom";


const SideNavbar = () => {
    const menuItems = [
        {
            id: 1,
            text: "Home",
            link: "/",
        },
        {
            id: 2,
            text: "Leads",
            link: "/leads",
        },
        {
            id: 3,
            text: "Account",
            link: "/account",
        },
        {
            id: 4,
            text: "Contact",
            link: "/contact",
        },
        {
            id: 5,
            text: "opportunities",
            link: "/Opportunities",
        },
        {
            id: 6,
            text: "Calender",
            link: "/calender",
        },
        {
            id: 7,
            text: "Forecastse",
            link: "/forecasts",
        },
        // {
        //     id: 8,
        //     text: "Dashboard",
        //     link: "/dashboard",
        // },
        {
            id: 9,
            text: "Reports",
            link: "/reports",
        },
        {
            id: 10,
            text: "Quotes",
            link: "/quotes",
        },
        {
            id: 11,
            text: "Campaings",
            link: "/campaings",
        }
    ];

    return (
        <ul>
            {menuItems.map((item) => (
                <li key={item.id}>
                    <Link
                        to={item.link}
                        className="flex items-center gap-[10px] text-black rounded-lg text-base font-medium py-[16px] px-[16px]"
                    >
                        <span> {item.text}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SideNavbar;