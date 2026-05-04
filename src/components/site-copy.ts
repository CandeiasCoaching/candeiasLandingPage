import type { Locale } from "./language-provider";

type PlanDetail = {
  title: string;
  features: string[];
  price?: string;
};

type SiteCopy = {
  nav: {
    home: string;
    plans: string;
    starter: string;
    standard: string;
    more: string;
    firstBlock: string;
    about: string;
  };
  home: {
    logoAlt: string;
    heroTitle: string;
    stepPrompts: {
      plan: string;
    };
    plans: {
      starter4: string;
      starter12: string;
      premium12: string;
    };
    actions: {
      restart: string;
      back: string;
    };
    genders: {
      male: string;
      female: string;
    };
    planDetails: {
      title: string;
      starter: {
        title: string;
        features: string[];
        price: string;
      };
      standard: {
        title: string;
        features: string[];
        price: string;
      };
      more: {
        title: string;
        action: string;
      };
      advanced: PlanDetail;
      premium: PlanDetail;
      online4: PlanDetail;
      online12: PlanDetail;
      friendsFamily: PlanDetail;
      tenSessions: PlanDetail;
      varia: PlanDetail;
      back: string;
    };
    firstBlock: {
      title: string;
      pdfTitle: string;
    };
    about: {
      title: string;
      paragraphs: string[];
      imageAlt: string;
    };
    contact: {
      title: string;
      emailIconAlt: string;
      whatsappIconAlt: string;
      instagramIconAlt: string;
    };
    footer: string;
  };
  pages: {
    about: {
      title: string;
      description: string;
      imageAlt: string;
    };
    contact: {
      title: string;
      description: string;
    };
    programs: {
      title: string;
      description: string;
    };
  };
};

export const siteCopy = {
  en: {
    nav: {
      home: "Home",
      plans: "Plans",
      starter: "Starter",
      standard: "Standard",
      more: "More",
      firstBlock: "The First Block",
      about: "About",
    },
    home: {
      logoAlt: "Candeias Coaching logo",
      heroTitle: "Training Program - Mealplan - 1to1 Contact",
      stepPrompts: {
        plan: "Choose your program.",
      },
      plans: {
        starter4: "Starter Online Coaching 4 Weeks",
        starter12: "Starter Online Coaching 12 Weeks",
        premium12: "Premium Online Coaching 12 Weeks",
      },
      actions: {
        restart: "Restart",
        back: "Back",
      },
      genders: {
        male: "Male",
        female: "Female",
      },
      planDetails: {
        title: "Plans",
        starter: {
          title: "Starters Coaching (4 Sessions)",
          features: [
            "4 Weeks",
            "Intake",
            "1 training per week",
            "Nutrition program",
            "Training program",
            "Training app",
            "Body Analysis",
            "Constant follow up - online coaching - Whatsapp",
          ],
          price: "250,00 €",
        },
        standard: {
          title: "Standard Coaching (12 Sessions)",
          features: [
            "12 Weeks",
            "Intake",
            "1 training per week",
            "Nutrition program",
            "Training program",
            "Training app",
            "Body Analysis",
            "Constant follow up - online coaching - Whatsapp",
          ],
          price: "700,00 €",
        },
        more: {
          title: "More",
          action: "View more plans",
        },
        advanced: {
          title: "Advanced Coaching (24 Sessions)",
          features: [
            "12 Weeks",
            "Intake",
            "1 training per week",
            "Nutrition program",
            "Training program",
            "Training app",
            "Body Analysis",
            "Constant follow up - online coaching - Whatsapp",
          ],
          price: "1100,00 €",
        },
        premium: {
          title: "Premium Coaching (36 Sessions)",
          features: [
            "12 Weeks",
            "Intake",
            "1 training per week",
            "Nutrition program",
            "Training program",
            "Training app",
            "Body Analysis",
            "Constant follow up - online coaching - Whatsapp",
          ],
          price: "1500,00 €",
        },
        online4: {
          title: "Online coaching (4 weeks)",
          features: [
            "4 weeks",
            "Intake",
            "Nutrition program",
            "Training program",
            "Training app",
            "1 Follow up call per week",
            "Constant follow up - online coaching - Whatsapp",
          ],
          price: "170,00 €",
        },
        online12: {
          title: "Online coaching (12 weeks)",
          features: [
            "12 weeks",
            "Intake",
            "Nutrition program",
            "Training program",
            "Training app",
            "1 Follow up call per week",
            "Constant follow up - online coaching - Whatsapp",
          ],
          price: "450,00 €",
        },
        friendsFamily: {
          title: "Friends & Family",
          features: [
            "35€ Per person (minimal 2 people)",
            "30€ Starting at 3 people",
            "10 Sessions",
          ],
          price: "400,00 €",
        },
        tenSessions: {
          title: "10 Sessions",
          features: ["350,00€"],
        },
        varia: {
          title: "Varia",
          features: [
            "1 hour PT training: 45,00€",
            "1 Training program: 40,00€",
            "1 Meal plan: 40,00€",
            "Training program + meal plan: 65,00€",
            "Full Body analysis: 35,00€",
            "Full Body analysis and meal plan: 60,00€",
            "Full Body analysis and meal plan + training program: 95,00€",
            "Online coaching: 1hour 35,00€",
            "Consult: 1uur 35,00€",
          ],
        },
        back: "Back",
      },
      firstBlock: {
        title: "The First Block",
        pdfTitle: "The First Block PDF",
      },
      about: {
        title: "About",
        paragraphs: [
          "Hi, I'm Stef.",
          "I'm a personal trainer based in the Netherlands, and I'm here to help you transform your physique and get in the best shape of your life.",
          "My approach is grounded in evidence-based training and nutrition. I stay current with the latest research to ensure my coaching methods are effective, safe, and tailored to what actually works - not just what's trendy.",
          "I'd describe my coaching style as positive and encouraging. I believe in smart, sustainable training that matches your effort to your goals. Progress does not require destroying yourself in the gym seven days a week - it requires the right program, consistency, and a plan that fits your life.",
          "Whether you're just starting out or looking to break through a plateau, I'm here to guide you with a methodical, no-nonsense approach that gets results.",
        ],
        imageAlt: "Stefan bio portrait",
      },
      contact: {
        title: "Contact",
        emailIconAlt: "Email icon",
        whatsappIconAlt: "WhatsApp icon",
        instagramIconAlt: "Instagram icon",
      },
      footer: "© 2026 Candeias Coaching. All rights reserved.",
    },
    pages: {
      about: {
        title: "About",
        description: "This page will soon share more about Stef's background, coaching philosophy, and approach.",
        imageAlt: "Stefan bio portrait",
      },
      contact: {
        title: "Contact",
        description: "Reach out by email, WhatsApp, or Instagram for coaching questions and availability.",
      },
      programs: {
        title: "Programs",
        description: "Program details will be added here soon. In the meantime, use the home page to view the available coaching options.",
      },
    },
  },
  nl: {
    nav: {
      home: "Home",
      plans: "Plannen",
      starter: "Starter",
      standard: "Standard",
      more: "Meer",
      firstBlock: "The First Block",
      about: "Over",
    },
    home: {
      logoAlt: "Candeias Coaching logo",
      heroTitle: "Trainingsschema - Voedingsplan - 1-op-1 Contact",
      stepPrompts: {
        plan: "Kies je programma.",
      },
      plans: {
        starter4: "Starter Online Coaching 4 Weken",
        starter12: "Starter Online Coaching 12 Weken",
        premium12: "Premium Online Coaching 12 Weken",
      },
      actions: {
        restart: "Opnieuw",
        back: "Terug",
      },
      genders: {
        male: "Man",
        female: "Vrouw",
      },
      planDetails: {
        title: "Plannen",
        starter: {
          title: "Starters Coaching (4 Sessies)",
          features: [
            "4 Weken",
            "Intake",
            "1 training per week",
            "Voedingsprogramma",
            "Trainingsprogramma",
            "Training app",
            "Body Analysis",
            "Constante opvolging - online coaching - Whatsapp",
          ],
          price: "250,00 €",
        },
        standard: {
          title: "Standard Coaching (12 Sessies)",
          features: [
            "12 Weken",
            "Intake",
            "1 training per week",
            "Voedingsprogramma",
            "Trainingsprogramma",
            "Training app",
            "Body Analysis",
            "Constante opvolging - online coaching - Whatsapp",
          ],
          price: "700,00 €",
        },
        more: {
          title: "Meer",
          action: "Bekijk meer plannen",
        },
        advanced: {
          title: "Advanced Coaching (24 Sessies)",
          features: [
            "12 Weken",
            "Intake",
            "1 training per week",
            "Voedingsprogramma",
            "Trainingsprogramma",
            "Training app",
            "Body Analysis",
            "Constante opvolging - online coaching - Whatsapp",
          ],
          price: "1100,00 €",
        },
        premium: {
          title: "Premium Coaching (36 Sessies)",
          features: [
            "12 Weken",
            "Intake",
            "1 training per week",
            "Voedingsprogramma",
            "Trainingsprogramma",
            "Training app",
            "Body Analysis",
            "Constante opvolging - online coaching - Whatsapp",
          ],
          price: "1500,00 €",
        },
        online4: {
          title: "Online coaching (4 weken)",
          features: [
            "4 weken",
            "Intake",
            "Voedingsprogramma",
            "Trainingsprogramma",
            "Training app",
            "1 opvolggesprek per week",
            "Constante opvolging - online coaching - Whatsapp",
          ],
          price: "170,00 €",
        },
        online12: {
          title: "Online coaching (12 weken)",
          features: [
            "12 weken",
            "Intake",
            "Voedingsprogramma",
            "Trainingsprogramma",
            "Training app",
            "1 opvolggesprek per week",
            "Constante opvolging - online coaching - Whatsapp",
          ],
          price: "450,00 €",
        },
        friendsFamily: {
          title: "Friends & Family",
          features: [
            "35€ per persoon (minimaal 2 personen)",
            "30€ vanaf 3 personen",
            "10 Sessies",
          ],
          price: "400,00 €",
        },
        tenSessions: {
          title: "10 Sessies",
          features: ["350,00€"],
        },
        varia: {
          title: "Varia",
          features: [
            "1 uur PT training: 45,00€",
            "1 Trainingsprogramma: 40,00€",
            "1 Voedingsplan: 40,00€",
            "Trainingsprogramma + voedingsplan: 65,00€",
            "Full Body analysis: 35,00€",
            "Full Body analysis en voedingsplan: 60,00€",
            "Full Body analysis en voedingsplan + trainingsprogramma: 95,00€",
            "Online coaching: 1 uur 35,00€",
            "Consult: 1 uur 35,00€",
          ],
        },
        back: "Terug",
      },
      firstBlock: {
        title: "The First Block",
        pdfTitle: "The First Block PDF",
      },
      about: {
        title: "Over",
        paragraphs: [
          "Hi, ik ben Stef.",
          "Ik ben een personal trainer uit Nederland en ik help je graag om je fysiek te transformeren en in de beste vorm van je leven te komen.",
          "Mijn aanpak is gebaseerd op evidence-based training en voeding. Ik blijf op de hoogte van het nieuwste onderzoek, zodat mijn coaching effectief, veilig en afgestemd is op wat echt werkt, niet alleen op wat populair is.",
          "Ik zou mijn coachingstijl omschrijven als positief en motiverend. Ik geloof in slim en duurzaam trainen dat jouw inzet koppelt aan jouw doelen. Voor vooruitgang hoef je jezelf niet zeven dagen per week kapot te trainen; je hebt het juiste programma, consistentie en een plan nodig dat bij je leven past.",
          "Of je nu net begint of door een plateau heen wilt breken, ik begeleid je met een methodische, no-nonsense aanpak die resultaat oplevert.",
        ],
        imageAlt: "Portret van Stefan",
      },
      contact: {
        title: "Contact",
        emailIconAlt: "E-mailpictogram",
        whatsappIconAlt: "WhatsApp-pictogram",
        instagramIconAlt: "Instagram-pictogram",
      },
      footer: "© 2026 Candeias Coaching. Alle rechten voorbehouden.",
    },
    pages: {
      about: {
        title: "Over",
        description: "Op deze pagina komt binnenkort meer informatie over Stefs achtergrond, coachingfilosofie en aanpak.",
        imageAlt: "Portret van Stefan",
      },
      contact: {
        title: "Contact",
        description: "Neem via e-mail, WhatsApp of Instagram contact op voor coachingvragen en beschikbaarheid.",
      },
      programs: {
        title: "Programma's",
        description: "Meer informatie over de programma's volgt binnenkort. Gebruik intussen de homepagina om de beschikbare coachingopties te bekijken.",
      },
    },
  },
} satisfies Record<Locale, SiteCopy>;
