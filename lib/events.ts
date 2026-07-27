export type ChurchEvent = {
  name: string;
  isoDate: string;
  date: string;
  time: string;
  venue: string;
  speakers: string[];
  image?: string;
};

export const events: ChurchEvent[] = [
  {
    name: "Night of Visitations",
    isoDate: "2026-07-17",
    date: "Friday, 17 July 2026",
    time: "8:00 PM – 5:00 AM",
    venue: "Eastern Highlands, next to Sanhanga Building, Mutare",
    speakers: ["Apostle Elisha", "Pastor Elijah", "Pastor Masenda", "Minister Kuziwa"],
    image: "/events/night-of-visitations.jpg",
  },
];

export const upcomingEvents = events.filter((event) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(event.isoDate) >= today;
});
