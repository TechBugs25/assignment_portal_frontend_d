// app/dashboard/data.ts

export const STATS = [
    { title: "Active Stories", value: "24", trend: "5%", trendType: "up" },
    { title: "Pending Tasks", value: "12", trend: "2%", trendType: "down" },
    { title: "Online Staff", value: "48", trend: "1%", trendType: "down" },
    { title: "Deadlines Today", value: "5", trend: "10%", trendType: "up" },
];

export const TEAM_MEMBERS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Politics • Desk Lead",
        avatar: "/avatars/sarah.jpg",
        status: "online",
    },
    {
        id: 2,
        name: "David Chen",
        role: "Global Markets • Reporting",
        avatar: "/avatars/david.jpg",
        status: "online",
    },
    {
        id: 3,
        name: "Emma Watson",
        role: "Tech & Science • Editing",
        avatar: "/avatars/emma.jpg",
        status: "away",
    },
];

export const RECENT_IDEAS = [
    {
        id: 1,
        category: "High Urgency",
        title: "Market Volatility: CBDC Impacts on Global Trade",
        author: "David Chen",
        time: "2 min ago",
        avatar: "/avatars/david.jpg",
    },
    {
        id: 2,
        category: "Politics",
        title: "Deep Dive: Upcoming Election Policy Revisions",
        author: "Sarah Jenkins",
        time: "14 min ago",
        avatar: "/avatars/sarah.jpg",
    },
    {
        id: 3,
        category: "Lifestyle",
        title: "The Future of Remote Work in Urban Environments",
        author: "Emma Watson",
        time: "1 hour ago",
        avatar: "/avatars/emma.jpg",
    },
    {
        id: 4,
        category: "Economy",
        title: "Infrastructure Spending and Its Long-term Yields",
        author: "Mark Thompson",
        time: "3 hours ago",
        avatar: "/avatars/mark.jpg",
    },
];