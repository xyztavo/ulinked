import { ConfigProps } from "./types/config";

const config: ConfigProps = {
  options: {
    blog: true,
    gallery: false, // this will only hide the gallery page, you can still access it by going to its respective routes.
    umimic: true, // this is for the ai chatbot that mimics you
  },
  nickname: "DIP - Direção Positiva",
  lanyard: {
    active:
      false /* if you don't wish to expose your Discord activities with lanyard, set to false */,
    discordId: "801073563368947742",
  },
  accentColor: "#ffea00",
  avatarImgSrc: "/assets/profile.png",
  buttons: [
    {
      title: "Whatsapp",
      link: "https://wa.me/5511971172672",
    },
    {
      title: "Website",
      link: "https://www.direcaopositiva.com.br/",
    },
    {
      title: "Curso - Dirigir Com Tranquilidade" ,
      link: "https://p.eduzz.com/2382782"
    },
    {
      title: "Curso - Guia Prático De Direção",
      link: "https://p.eduzz.com/2378229"
    }
  ],
  instagramLink: "https://www.instagram.com/luiz.dip",
  tiktokLink: "https://www.tiktok.com/@user304951254",
  whatsAppLink: "https://wa.me/5511971172672",
  ytMusicLink:
    "" /* if you don't wish the button to appear, you can either leave it blank or omit it */,
  footer: "DIP, direção positiva 2025 ©",
};

export default config;
