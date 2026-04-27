export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const team: TeamMember[] = [
  {
    name: "Jake Bryan",
    role: "Co-Founder & Lead Developer",
    bio: "Jake writes the code that makes the web feel alive. Obsessed with craft, performance, and the thousand tiny details that separate a good site from a great one.",
    initials: "JB",
  },
  {
    name: "Cam Reehl",
    role: "Co-Founder, Sales & Client Relations",
    bio: "Cam is the first voice you hear and the last person you need to chase. He translates business into tech, and makes sure every client feels handled from day one.",
    initials: "CR",
  },
];
