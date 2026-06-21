export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2026",
    image: "/images/event1.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 2-4, 2026",
    time: "09:00 AM - 06:00 PM",
  },
  {
    title: "Web Summit",
    image: "/images/event2.png",
    slug: "web-summit-2026",
    location: "Lisbon, Portugal",
    date: "October 24-27, 2026",
    time: "08:30 AM - 05:00 PM",
  },
  {
    title: "Next.js Conf",
    image: "/images/event3.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, USA",
    date: "September 14-15, 2026",
    time: "10:00 AM - 06:00 PM",
  },
  {
    title: "DevOps Days Global",
    image: "/images/event4.png",
    slug: "devops-days-2026",
    location: "Berlin, Germany",
    date: "May 18-19, 2026",
    time: "09:00 AM - 05:00 PM",
  },
  {
    title: "Tech Crunch Disrupt",
    image: "/images/event5.png",
    slug: "techcrunch-disrupt-2026",
    location: "San Francisco, USA",
    date: "September 28-30, 2026",
    time: "08:00 AM - 06:00 PM",
  },
  {
    title: "AWS re:Invent",
    image: "/images/event6.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, USA",
    date: "November 28 - December 2, 2026",
    time: "08:00 AM - 09:00 PM",
  },
  {
    title: "JSConf EU",
    image: "/images/event-full.png",
    slug: "jsconf-eu-2026",
    location: "Berlin, Germany",
    date: "June 13-14, 2026",
    time: "09:00 AM - 06:00 PM",
  },
];
