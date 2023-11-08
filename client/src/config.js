const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const apiBaseUrl = process.env.API_URL || "http://localhost:3900";

export const appConfig = {
  name: "RMJ AUTO",
  title: "Car Service",
  description: "",
  url,
  apiBaseUrl,
  author: {
    name: "Masud Pervez || Gowtom Kumar",
    email: "masudpervez431@gmail.com",
    website: "",
  },
  links: {
    linkedIn: "",
    github: "",
  },
};

export default appConfig;
