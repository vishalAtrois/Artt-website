"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
  language: "sv",
  setLanguage: () => {},
  t: (key) => key,
});

const translations = {
  sv: {
    "nav.home": "Hemsida",
    "nav.paintings": "Målningar",
    "nav.about": "Om",
    "nav.contact": "Kontakta",

    "hero.subtitle.line1":
      "Exotiska djur, livfulla landskap och abstrakt konst,",
    "hero.subtitle.line2":
      "för att förvandla ditt personliga område till ett färgglatt och levande utrymme.",

    "browsePaintings.title": "Bläddra bland alla målningar",

    "footer.pages": "Pages",
    "footer.forSale": "Tavlor till salu",

    "about.title": "Om",
    "about.moreAboutMe": "Mer om mig",
    "about.paragraph1":
      "Jag är en bildkonstnär med över tio års erfarenhet av måleri och visuell kommunikation. I mitt arbete kombinerar jag fina penseldrag med minimalistiska kompositioner för att skapa känslosamma visuella berättelser.",
    "about.paragraph2":
      "Jag samarbetar med gallerier och privata samlare och deltar i utställningar både hemma och utomlands. Mitt tillvägagångssätt kombinerar traditionella tekniker med moderna metoder, vilket ger varje verk ett unikt djup och precision.",

    // InAboutSection
    "inAbout.title": "Konst är min passion",
    "inAbout.paragraph1":
      "Jag kanaliserar över ett decennium av konstnärlig utforskning i varje komposition, och blandar uttrycksfulla penseldrag med harmoniska paletter. Mina verk inbjuder betraktaren att stanna upp och engagera sig i subtila nyanser av ljus och form.",
    "inAbout.paragraph2":
      "Jag ställs ut över hela Europa – både i intima gallerier och storskaliga konst mässor – och strävar efter att koppla samman rum med meningsfulla visuella berättelser. Vare sig det är genom djärva abstrakta verk eller fina studier, återspeglar varje målning mitt engagemang för hantverk och historieberättande.",
    "inAbout.paragraph3":
      "Följ med mig och upptäck hur konst kan förvandla ett rum och lyfta stämningen.",

    // LatestPaintings
    "latestPaintings.title": "Senaste målningarna",

    // ViewAllPaintings
    "viewAllPaintings.button": "Visa alla \nMålningar",

    // PaintingDetail
    "paintingDetail.back": "Alla målningar",
    "paintingDetail.year": "År",
    "paintingDetail.cta": "Få tavlan →",

    // StartConversation / contact form
    "contact.intro":
      "Intresserad av en målning? Har du en fråga? Fyll bara i formuläret eller kontakta mig via",
    "contact.paintingLabel":
      "Målning",
    "contact.paintingOptional": "(frivillig)",
    "contact.subjectLabel": "Ämne",
    "contact.subjectPlaceholder": "Måleribeställning",
    "contact.messagePlaceholder":
      "Jag skulle vilja köpa målningen \"Tiden väntade inte\"...",

    // ContactSection
    "contactSection.stat": "100+ specialgjorda målningar",
    "contactSection.headingLine1": "Bara din fantasi",
    "contactSection.button": "Kontakta mig",
    "contactSection.limitsYou": "begränsar dig",

    // ArtGrid
    "artGrid.empty": "Inga konstverk är tillgängliga.",

    // FAQSection
    "faq.notSure": "Inte säker på \nnågot?",
    "faq.none": "Inga FAQs tillgänglig.",
    "faq.contactMe": "Kontakta mig",

    // Admin common / layout / confirmations (kept Swedish)
    "admin.logout.confirmTitle": "Bekräfta utloggning",
    "admin.logout.confirmBody":
      "Är du säker på att du vill logga ut? Du måste logga in igen för att komma åt administratörspanelen.",

    // Admin login page
    "admin.login.invalidResponse": "Ogiltigt svar från servern.",
    "admin.login.success": "Inloggad framgångsrikt",
    "admin.login.networkError": "Nätverksfel. Försök igen.",
    "admin.login.openPanel": "Öppna adminpanelen",
    "admin.login.password": "Lösenord",
    "admin.login.passwordPlaceholder": "Ange lösenord",
    "admin.login.helper":
      "Använd din administratörs-e-postadress och ditt lösenord för att logga in.",

    // Admin dashboard
    "admin.dashboard.subtitle": "Översikt över ditt konstgalleri",
    "admin.dashboard.quickActions": "Snabba åtgärder",
    "admin.dashboard.addArtwork": "Lägg till nytt konstverk",
    "admin.dashboard.addArtworkDesc": "Ladda upp en ny målning",
    "admin.dashboard.manageCategoriesDesc":
      "Lägg till eller redigera kategorier",

    // Admin FAQs
    "admin.faq.addError": "Misslyckades med att lägga till vanliga frågor",
    "admin.faq.genericError": "Något gick fel",
    "admin.faq.deleteSuccess": "FAQ raderades framgångsrikt",
    "admin.faq.deleteError": "Misslyckades med att ta bort vanliga frågor",
    "admin.faq.title": "Vanliga frågor",
    "admin.faq.subtitle": "Hantera vanliga frågor",
    "admin.faq.addButton": "Lägg till FAQ",
    "admin.faq.loading": "Laddar vanliga frågor...",
    "admin.faq.noneYet":
      "Inga vanliga frågor än. Lägg till din första vanliga fråga för att komma igång.",
    "admin.faq.noQuestion": "Ingen fråga",
    "admin.faq.addNewTitle": "Lägg till nya vanliga frågor",
    "admin.faq.questionPlaceholder": "Skriv in frågan",
    "admin.faq.sortOptional":
      "Valfritt: Ange visningsordningen (lägre siffror visas först)",
    "admin.faq.deleteConfirm":
      "Är du säker på att du vill ta bort FAQ:n",

    // Admin contacts
    "admin.contacts.deleteConfirm":
      "Är du säker på att du vill ta bort den här kontaktinskickningen?",
    "admin.contacts.title": "Kontakta Submissions",
    "admin.contacts.subtitle": "Hantera meddelanden från besökare",
    "admin.contacts.unreadCount": "oläst",
    "admin.contacts.filterUnread": "Endast oläst",
    "admin.contacts.filterRead": "Endast läs",
    "admin.contacts.markRead": "Markera som läst",
    "admin.contacts.markUnread": "Markera som oläst",
    "admin.contacts.painting": "Målning:",
    "admin.contacts.subject": "Ämne:",

    // Admin categories
    "admin.categories.deleteConfirm":
      "Är du säker på att du vill radera\"{category}\"? Detta kommer inte att ta bort det från befintliga konstverk.",
    "admin.categories.addButton": "Lägg till kategori",
    "admin.categories.none": "Inga kategorier än",

    // Admin artworks
    "admin.artworks.loadError": "Misslyckades med att ladda konstverk",
    "admin.artworks.uploadError": "Det gick inte att ladda upp bilden",
    "admin.artworks.selectImageError": "Välj en bild",
    "admin.artworks.addSuccess": "Konstverk har lagts till",
    "admin.artworks.addError": "Misslyckades med att lägga till bildmaterial",
    "admin.artworks.updateSuccess": "Konstverket har uppdaterats",
    "admin.artworks.updateError":
      "Misslyckades med att uppdatera bilden",
    "admin.artworks.deleteSuccess": "Konstverket har raderats",
    "admin.artworks.deleteError":
      "Misslyckades med att ta bort bilden",
    "admin.artworks.genericError": "Något gick fel",
    "admin.artworks.title": "Konstverk",
    "admin.artworks.subtitle": "Hantera din konstsamling",
    "admin.artworks.addArtwork": "Lägg till konstverk",
    "admin.artworks.imageHeader": "Bild",
    "admin.artworks.titleHeader": "Titel",
    "admin.artworks.categoryHeader": "Kategori",
    "admin.artworks.forSaleHeader": "Till salu",
    "admin.artworks.actions": "Åtgärder",
    "admin.artworks.noImage": "Ingen bild",
    "admin.artworks.editTitle": "Redigera konstverk",
    "admin.artworks.addNewTitle": "Lägg till nytt konstverk",
    "admin.artworks.categoryLabel": "Kategori *",
    "admin.artworks.imageLabel": "Bild *",
    "admin.artworks.descriptionLabel": "Beskrivning *",
    "admin.artworks.priceLabel": "Pris",
    "admin.artworks.year": "År",
    "admin.artworks.inStockLabel": "I lager",
    "admin.artworks.dropHere": "Släpp bilden här",
    "admin.artworks.clickToUpload":
      "Klicka för att ladda upp eller dra och släpp",
    "admin.artworks.updating": "Uppdaterar...",
    "admin.artworks.creating": "Skapande...",
    "admin.artworks.updateButton": "Uppdatera",
    "admin.artworks.createButton": "Skapa",
    "admin.artworks.deleteTitle": "Ta bort konstverk",
    "admin.artworks.deleteConfirm":
      "Är du säker på att du vill radera\"{title}\"? Den här åtgärden kan inte ångras.",

    // Common
    "common.cancel": "Avboka",
    "common.delete": "Radera",
    "common.deleting": "Tar bort...",
    "artGrid.loading": "Laddar konstverk...",

    // Art card
    "artCard.forSale": "Till salu",
    "artCard.seDetails": "Se detaljer",

    // Contact / StartConversation extra keys
    "contact.title": "Starta konversationen",
    "contact.nameLabel": "Namn",
    "contact.emailLabel": "E-post",
    "contact.messageLabel": "Meddelande",
    "contact.sent": "Meddelandet har skickats!",
    "contact.sendButton": "Skicka meddelande",

    // Navbar language switcher
    "language.label": "Språk",
    "language.sv": "Svenska",
    "language.en": "Engelska",
  },
  en: {
    "nav.home": "Home",
    "nav.paintings": "Paintings",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.subtitle.line1":
      "Exotic animals, vivid landscapes and abstract art,",
    "hero.subtitle.line2":
      "to transform your personal space into a colourful and vibrant environment.",

    "browsePaintings.title": "Browse all paintings",

    "footer.pages": "Pages",
    "footer.forSale": "Paintings for sale",

    "about.title": "About",
    "about.moreAboutMe": "More about me",
    "about.paragraph1":
      "I am a visual artist with over ten years of experience in painting and visual communication. In my work I combine delicate brushstrokes with minimalist compositions to create emotional visual stories.",
    "about.paragraph2":
      "I collaborate with galleries and private collectors and participate in exhibitions both at home and abroad. My approach blends traditional techniques with modern methods, giving each piece a unique depth and precision.",

    // InAboutSection
    "inAbout.title": "Art is my passion",
    "inAbout.paragraph1":
      "I channel over a decade of artistic exploration into every composition, blending expressive brushstrokes with harmonious palettes. My works invite the viewer to pause and engage with subtle nuances of light and form.",
    "inAbout.paragraph2":
      "I exhibit across Europe – in both intimate galleries and large-scale art fairs – and strive to connect spaces with meaningful visual stories. Whether through bold abstracts or delicate studies, each painting reflects my commitment to craft and storytelling.",
    "inAbout.paragraph3":
      "Join me and discover how art can transform a room and elevate the mood.",

    // LatestPaintings
    "latestPaintings.title": "Latest paintings",

    // ViewAllPaintings
    "viewAllPaintings.button": "View all \npaintings",

    // PaintingDetail
    "paintingDetail.back": "All paintings",
    "paintingDetail.year": "Year",
    "paintingDetail.cta": "Get the painting →",

    // StartConversation / contact form
    "contact.intro":
      "Interested in a painting? Have a question? Just fill in the form or contact me via",
    "contact.paintingLabel": "Painting",
    "contact.paintingOptional": "(optional)",
    "contact.subjectLabel": "Subject",
    "contact.subjectPlaceholder": "Painting commission",
    "contact.messagePlaceholder":
      'I would like to buy the painting "Time did not wait"...',

    // ContactSection
    "contactSection.stat": "100+ custom paintings",
    "contactSection.headingLine1": "Only your imagination",
    "contactSection.button": "Contact me",
    "contactSection.limitsYou": "limits you",

    // ArtGrid
    "artGrid.empty": "No artworks are available.",

    // FAQSection
    "faq.notSure": "Not sure \nabout something?",
    "faq.none": "No FAQs available.",
    "faq.contactMe": "Contact me",

    // Admin texts (translated to English for convenience)
    "admin.logout.confirmTitle": "Confirm logout",
    "admin.logout.confirmBody":
      "Are you sure you want to log out? You will need to log in again to access the admin panel.",

    "admin.login.invalidResponse": "Invalid response from server.",
    "admin.login.success": "Logged in successfully",
    "admin.login.networkError": "Network error. Please try again.",
    "admin.login.openPanel": "Open the admin panel",
    "admin.login.password": "Password",
    "admin.login.passwordPlaceholder": "Enter password",
    "admin.login.helper":
      "Use your admin email address and password to log in.",

    "admin.dashboard.subtitle": "Overview of your art gallery",
    "admin.dashboard.quickActions": "Quick actions",
    "admin.dashboard.addArtwork": "Add new artwork",
    "admin.dashboard.addArtworkDesc": "Upload a new painting",
    "admin.dashboard.manageCategoriesDesc":
      "Add or edit categories",

    "admin.faq.addError": "Failed to add FAQ",
    "admin.faq.genericError": "Something went wrong",
    "admin.faq.deleteSuccess": "FAQ deleted successfully",
    "admin.faq.deleteError": "Failed to delete FAQ",
    "admin.faq.title": "Frequently Asked Questions",
    "admin.faq.subtitle": "Manage FAQs",
    "admin.faq.addButton": "Add FAQ",
    "admin.faq.loading": "Loading FAQs...",
    "admin.faq.noneYet":
      "No FAQs yet. Add your first FAQ to get started.",
    "admin.faq.noQuestion": "No question",
    "admin.faq.addNewTitle": "Add new FAQ",
    "admin.faq.questionPlaceholder": "Enter the question",
    "admin.faq.sortOptional":
      "Optional: set display order (lower numbers show first)",
    "admin.faq.deleteConfirm":
      "Are you sure you want to delete the FAQ",

    "admin.contacts.deleteConfirm":
      "Are you sure you want to delete this contact submission?",
    "admin.contacts.title": "Contact submissions",
    "admin.contacts.subtitle": "Manage messages from visitors",
    "admin.contacts.unreadCount": "unread",
    "admin.contacts.filterUnread": "Only unread",
    "admin.contacts.filterRead": "Only read",
    "admin.contacts.markRead": "Mark as read",
    "admin.contacts.markUnread": "Mark as unread",
    "admin.contacts.painting": "Painting:",
    "admin.contacts.subject": "Subject:",

    "admin.categories.deleteConfirm":
      'Are you sure you want to delete "{category}"? This will not remove it from existing artworks.',
    "admin.categories.addButton": "Add category",
    "admin.categories.none": "No categories yet",

    "admin.artworks.loadError": "Failed to load artworks",
    "admin.artworks.uploadError": "Failed to upload image",
    "admin.artworks.selectImageError": "Select an image",
    "admin.artworks.addSuccess": "Artwork added",
    "admin.artworks.addError": "Failed to add artwork",
    "admin.artworks.updateSuccess": "Artwork updated",
    "admin.artworks.updateError": "Failed to update artwork",
    "admin.artworks.deleteSuccess": "Artwork deleted",
    "admin.artworks.deleteError": "Failed to delete artwork",
    "admin.artworks.genericError": "Something went wrong",
    "admin.artworks.title": "Artworks",
    "admin.artworks.subtitle": "Manage your art collection",
    "admin.artworks.addArtwork": "Add artwork",
    "admin.artworks.imageHeader": "Image",
    "admin.artworks.titleHeader": "Title",
    "admin.artworks.categoryHeader": "Category",
    "admin.artworks.forSaleHeader": "For sale",
    "admin.artworks.actions": "Actions",
    "admin.artworks.noImage": "No image",
    "admin.artworks.editTitle": "Edit artwork",
    "admin.artworks.addNewTitle": "Add new artwork",
    "admin.artworks.categoryLabel": "Category *",
    "admin.artworks.imageLabel": "Image *",
    "admin.artworks.descriptionLabel": "Description *",
    "admin.artworks.priceLabel": "Price",
    "admin.artworks.year": "Year",
    "admin.artworks.inStockLabel": "In stock",
    "admin.artworks.dropHere": "Drop image here",
    "admin.artworks.clickToUpload": "Click to upload or drag and drop",
    "admin.artworks.updating": "Updating...",
    "admin.artworks.creating": "Creating...",
    "admin.artworks.updateButton": "Update",
    "admin.artworks.createButton": "Create",
    "admin.artworks.deleteTitle": "Delete artwork",
    "admin.artworks.deleteConfirm":
      'Are you sure you want to delete "{title}"? This action cannot be undone.',

    // Common
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.deleting": "Deleting...",
    "common.cannotUndo": "This action cannot be undone.",
    "artGrid.loading": "Loading artworks...",

    // Art card
    "artCard.forSale": "For sale",
    "artCard.seDetails": "See details",

    // Contact / StartConversation extra keys
    "contact.title": "Start the conversation",
    "contact.nameLabel": "Name",
    "contact.emailLabel": "Email",
    "contact.messageLabel": "Message",
    "contact.sent": "Your message has been sent!",
    "contact.sendButton": "Send message",

    // Navbar language switcher
    "language.label": "Language",
    "language.sv": "Swedish",
    "language.en": "English",

    // Admin layout
    "admin.layout.subtitle": "Art gallery management",
    "admin.logout.success": "Logged out successfully",
    "admin.logout.loading": "Logging out...",
    "admin.logout.buttonLabel": "Logout",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("sv");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("language");
    if (stored === "sv" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (next) => {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", next);
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language]?.[key] ?? key,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

