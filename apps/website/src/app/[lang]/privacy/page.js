import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

// ... TRANSLATIONS ...

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/privacy' : `/${l}/privacy`;
          return acc;
        }, {}),
        'x-default': '/privacy',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['https://thenextools.com/thenextools-com-og-image.png'],
    }
  };
}

const TRANSLATIONS = {
  en: {
    title: 'Privacy Policy | TheNexTools',
    description: 'Our privacy policy is simple: we do not want your data. All tools run locally on your device.',
    h1: 'Privacy Policy',
    effectiveDate: 'Effective Date:',
    localeString: 'en-US',
    sec1Title: 'The Core Principle',
    sec1Desc: 'We sell software, not data. Our tools process everything on your device, and we have no interest in seeing, storing, or monetizing what you work on.',
    sec2Title: 'No File Uploads',
    sec2Desc: 'Every web-based tool in our suite (NexPDF, NexStrip, NexCompress) uses modern browser APIs to process your files <strong>locally</strong> in your browser tab. Your files never transit our servers. We cannot see them, and we certainly do not store them.',
    sec3Title: 'No Accounts or Tracking',
    sec3Desc: 'We do not require accounts to use our free utilities. We do not use invasive tracking pixels or third-party cookies for advertising. We may collect minimal, anonymized server logs (like page views) purely for performance monitoring and to prevent abuse of our infrastructure.',
    sec4Title: 'Local Storage',
    sec4Desc: 'Some tools may use your browser\'s local storage or IndexedDB to save your preferences or temporary working files (like a PDF being edited). This data stays on your device and is never synced with any cloud service by us.',
    sec5Title: 'NexData Desktop App',
    sec5Desc: 'Our desktop application, NexData Recovery, is designed to run entirely offline. It does not require an internet connection to scan or recover files. License verification happens via a secure, local-first mechanism.',
    sec6Title: 'Contact',
    sec6Desc: 'Questions about this privacy policy? Email us at '
  },
  fr: {
    title: 'Politique de Confidentialité | TheNexTools',
    description: 'Notre politique de confidentialité est simple : nous ne voulons pas de vos données. Tous nos outils fonctionnent localement sur votre appareil.',
    h1: 'Politique de Confidentialité',
    effectiveDate: 'Date d\'entrée en vigueur :',
    localeString: 'fr-FR',
    sec1Title: 'Le Principe Fondamental',
    sec1Desc: 'Nous vendons des logiciels, pas des données. Nos outils traitent tout sur votre appareil et nous n\'avons aucun intérêt à voir, stocker ou monétiser le contenu sur lequel vous travaillez.',
    sec2Title: 'Aucun Téléversement de Fichiers',
    sec2Desc: 'Chaque outil web de notre suite (NexPDF, NexStrip, NexCompress) utilise les API modernes du navigateur pour traiter vos fichiers <strong>localement</strong> dans votre onglet. Vos fichiers ne transitent jamais par nos serveurs. Nous ne pouvons pas les voir et nous ne les stockons pas.',
    sec3Title: 'Aucun Compte ni Suivi',
    sec3Desc: 'Nous n\'exigeons aucun compte pour utiliser nos utilitaires gratuits. Nous n\'utilisons pas de pixels de suivi intrusifs ni de cookies tiers à des fins publicitaires. Nous pouvons collecter des journaux serveur minimaux et anonymisés uniquement pour surveiller les performances et prévenir les abus.',
    sec4Title: 'Stockage Local',
    sec4Desc: 'Certains outils peuvent utiliser le stockage local de votre navigateur ou IndexedDB pour enregistrer vos préférences ou des fichiers de travail temporaires. Ces données restent sur votre appareil et ne sont jamais synchronisées avec un service cloud.',
    sec5Title: 'Application de Bureau NexData',
    sec5Desc: 'Notre application de bureau, NexData Recovery, est conçue pour fonctionner entièrement hors ligne. Elle ne nécessite pas de connexion Internet pour analyser ou récupérer des fichiers.',
    sec6Title: 'Contact',
    sec6Desc: 'Des questions concernant cette politique de confidentialité ? Écrivez-nous à '
  },
  hi: {
    title: 'गोपनीयता नीति | TheNexTools',
    description: 'हमारी गोपनीयता नीति सरल है: हमें आपका डेटा नहीं चाहिए। सभी टूल्स आपके डिवाइस पर स्थानीय रूप से चलते हैं।',
    h1: 'गोपनीयता नीति',
    effectiveDate: 'प्रभावी तिथि:',
    localeString: 'hi-IN',
    sec1Title: 'मूल सिद्धांत',
    sec1Desc: 'हम सॉफ़्टवेयर बेचते हैं, डेटा नहीं। हमारे टूल्स आपके डिवाइस पर ही सब कुछ प्रोसेस करते हैं, और आप जिस सामग्री पर काम करते हैं उसे देखने, संग्रहीत करने या मुद्रीकृत करने में हमारी कोई रुचि नहीं है।',
    sec2Title: 'कोई फ़ाइल अपलोड नहीं',
    sec2Desc: 'हमारे सुइट का प्रत्येक वेब-आधारित टूल (NexPDF, NexStrip, NexCompress) आपके ब्राउज़र टैब में <strong>स्थानीय रूप से</strong> आपकी फ़ाइलों को प्रोसेस करने के लिए आधुनिक ब्राउज़र API का उपयोग करता है। आपकी फ़ाइलें कभी भी हमारे सर्वर से होकर नहीं गुजरती हैं।',
    sec3Title: 'कोई खाता या ट्रैकिंग नहीं',
    sec3Desc: 'हमारी निःशुल्क उपयोगिताओं का उपयोग करने के लिए किसी खाते की आवश्यकता नहीं है। हम विज्ञापन के लिए आक्रामक ट्रैकिंग पिक्सेल या तृतीय-पक्ष कुकीज़ का उपयोग नहीं करते हैं।',
    sec4Title: 'लोकल स्टोरेज',
    sec4Desc: 'कुछ टूल्स आपकी प्राथमिकताओं या अस्थायी कार्यशील फ़ाइलों को सहेजने के लिए आपके ब्राउज़र के लोकल स्टोरेज या IndexedDB का उपयोग कर सकते हैं। यह डेटा आपके डिवाइस पर ही रहता है।',
    sec5Title: 'NexData डेस्कटॉप ऐप',
    sec5Desc: 'हमारा डेस्कटॉप एप्लिकेशन, NexData Recovery, पूरी तरह से ऑफ़लाइन चलने के लिए डिज़ाइन किया गया है। फ़ाइलों को स्कैन या रिकवर करने के लिए इंटरनेट कनेक्शन की आवश्यकता नहीं होती है।',
    sec6Title: 'संपर्क करें',
    sec6Desc: 'इस गोपनीयता नीति के बारे में कोई प्रश्न हैं? हमें ईमेल करें: '
  },
  tr: {
    title: 'Gizlilik Politikası | TheNexTools',
    description: 'Gizlilik politikamız basittir: verilerinizi istemiyoruz. Tüm araçlar cihazınızda yerel olarak çalışır.',
    h1: 'Gizlilik Politikası',
    effectiveDate: 'Yürürlük tarihi:',
    localeString: 'tr-TR',
    sec1Title: 'Temel İlke',
    sec1Desc: 'Biz veri değil, yazılım satıyoruz. Araçlarımız her şeyi cihazınızda işler; üzerinde çalıştığınız içerikleri görmek, saklamak veya bunlardan gelir elde etmek gibi bir amacımız yoktur.',
    sec2Title: 'Dosya Yükleme Yok',
    sec2Desc: 'Paketimizdeki her web tabanlı araç (NexPDF, NexStrip, NexCompress), dosyalarınızı tarayıcı sekmenizde <strong>yerel olarak</strong> işlemek için modern tarayıcı API\'lerini kullanır. Dosyalarınız asla sunucularımızdan geçmez.',
    sec3Title: 'Hesap veya İzleme Yok',
    sec3Desc: 'Ücretsiz araçlarımızı kullanmak için hesap açmanızı istemiyoruz. Reklam amacıyla izleme pikselleri veya üçüncü taraf çerezleri kullanmıyoruz.',
    sec4Title: 'Yerel Depolama',
    sec4Desc: 'Bazı araçlar tercihlerinizi veya geçici çalışma dosyalarınızı kaydetmek için tarayıcınızın yerel depolama alanını veya IndexedDB\'yi kullanabilir. Bu veriler cihazınızda kalır ve hiçbir bulut hizmetiyle senkronize edilmez.',
    sec5Title: 'NexData Masaüstü Uygulaması',
    sec5Desc: 'Masaüstü uygulamamız NexData Recovery tamamen çevrimdışı çalışacak şekilde tasarlanmıştır. Dosyaları taramak veya kurtarmak için internet bağlantısı gerektirmez.',
    sec6Title: 'İletişim',
    sec6Desc: 'Bu gizlilik politikası hakkında sorularınız mı var? Bize yazın: '
  },
  es: {
    title: 'Política de Privacidad | TheNexTools',
    description: 'Nuestra política de privacidad es sencilla: no queremos tus datos. Todas las herramientas se ejecutan localmente en tu dispositivo.',
    h1: 'Política de Privacidad',
    effectiveDate: 'Fecha de vigencia:',
    localeString: 'es-ES',
    sec1Title: 'El Principio Fundamental',
    sec1Desc: 'Vendemos software, no datos. Nuestras herramientas procesan todo en tu dispositivo y no tenemos ningún interés en ver, almacenar o monetizar el contenido con el que trabajas.',
    sec2Title: 'Sin Carga de Archivos',
    sec2Desc: 'Cada herramienta web de nuestra suite (NexPDF, NexStrip, NexCompress) utiliza las API nativas del navegador para procesar tus archivos <strong>localmente</strong> en tu pestaña. Tus archivos nunca pasan por nuestros servidores. No podemos verlos y, por supuesto, no los almacenamos.',
    sec3Title: 'Sin Cuentas ni Seguimiento',
    sec3Desc: 'No requerimos cuentas para usar nuestras utilidades gratuitas. No utilizamos píxeles de seguimiento invasivos ni cookies de terceros para publicidad. Podemos recopilar registros mínimos y anonimizados del servidor (como vistas de páginas) únicamente para supervisar el rendimiento y evitar el abuso de nuestra infraestructura.',
    sec4Title: 'Almacenamiento Local',
    sec4Desc: 'Algunas herramientas pueden usar el almacenamiento local de tu navegador o IndexedDB para guardar tus preferencias o archivos de trabajo temporales (como un PDF que se está editando). Estos datos se quedan en tu dispositivo y nunca los sincronizamos con ningún servicio en la nube.',
    sec5Title: 'Aplicación de Escritorio NexData',
    sec5Desc: 'Nuestra aplicación de escritorio, NexData Recovery, está diseñada para funcionar completamente sin conexión. No requiere conexión a internet para escanear o recuperar archivos. La verificación de la licencia se realiza a través de un mecanismo seguro y local.',
    sec6Title: 'Contacto',
    sec6Desc: '¿Preguntas sobre esta política de privacidad? Escríbenos a '
  },
  pt: {
    title: 'Política de Privacidade | TheNexTools',
    description: 'Nossa política de privacidade é simples: não queremos seus dados. Todas as ferramentas são executadas localmente em seu dispositivo.',
    h1: 'Política de Privacidade',
    effectiveDate: 'Data de vigência:',
    localeString: 'pt-PT',
    sec1Title: 'O Princípio Fundamental',
    sec1Desc: 'Vendemos software, não dados. Nossas ferramentas processam tudo no seu dispositivo, e não temos interesse em ver, armazenar ou monetizar aquilo em que você trabalha.',
    sec2Title: 'Sem Envio de Arquivos',
    sec2Desc: 'Cada ferramenta web em nossa suíte (NexPDF, NexStrip, NexCompress) usa APIs de navegador modernas para processar seus arquivos <strong>localmente</strong> na aba do seu navegador. Seus arquivos nunca transitam por nossos servidores. Não podemos vê-los e, certamente, não os armazenamos.',
    sec3Title: 'Sem Contas ou Rastreamento',
    sec3Desc: 'Não exigimos contas para usar nossos utilitários gratuitos. Não usamos pixels de rastreamento invasivos ou cookies de terceiros para publicidade. Podemos coletar registros de servidor mínimos e anonimizados (como visualizações de página) puramente para monitoramento de desempenho e para evitar abusos em nossa infraestrutura.',
    sec4Title: 'Armazenamento Local',
    sec4Desc: 'Algumas ferramentas podem usar o armazenamento local do seu navegador ou IndexedDB para salvar suas preferências ou arquivos de trabalho temporários (como um PDF sendo editado). Esses dados permanecem no seu dispositivo e nunca são sincronizados com qualquer serviço de nuvem por nós.',
    sec5Title: 'Aplicativo Desktop NexData',
    sec5Desc: 'Nosso aplicativo desktop, NexData Recovery, foi projetado para rodar inteiramente offline. Ele não requer uma conexão com a internet para escanear ou recuperar arquivos. A verificação da licença acontece por meio de um mecanismo seguro e local-first.',
    sec6Title: 'Contato',
    sec6Desc: 'Dúvidas sobre esta política de privacidade? Envie um e-mail para '
  },
  sw: {
    title: 'Sera ya Faragha | TheNexTools',
    description: 'Sera yetu ya faragha ni rahisi: hatutaki data yako. Zana zote zinaendeshwa ndani ya nchi kwenye kifaa chako.',
    h1: 'Sera ya Faragha',
    effectiveDate: 'Tarehe ya kuanza kutumika:',
    localeString: 'sw',
    sec1Title: 'Kanuni Kuu',
    sec1Desc: 'Tunauza programu, sio data. Zana zetu zinasindika kila kitu kwenye kifaa chako, na hatuna nia ya kuona, kuhifadhi, au kupata faida kutokana na kile unachofanyia kazi.',
    sec2Title: 'Hakuna Kupakia Faili',
    sec2Desc: 'Kila zana ya mtandaoni kwenye mkusanyiko wetu (NexPDF, NexStrip, NexCompress) inatumia API za kisasa za kivinjari kusindika faili zako <strong>ndani ya nchi</strong> katika kichupo cha kivinjari chako. Faili zako hazipiti kwenye seva zetu kamwe. Hatuwezi kuziona, na hakika hatuzihifadhi.',
    sec3Title: 'Hakuna Akaunti au Kufuatilia',
    sec3Desc: 'Hatuhitaji akaunti ili kutumia zana zetu za bure. Hatutumii saizi za ufuatiliaji vamizi au kuki za wahusika wengine kwa matangazo. Tunaweza kukusanya kumbukumbu ndogo za seva zisizojulikana (kama maoni ya kurasa) kwa ajili ya kufuatilia utendaji na kuzuia matumizi mabaya ya miundombinu yetu.',
    sec4Title: 'Hifadhi ya Ndani',
    sec4Desc: 'Baadhi ya zana zinaweza kutumia hifadhi ya ndani ya kivinjari chako au IndexedDB ili kuhifadhi mapendeleo yako au faili za kazi za muda (kama PDF inayohaririwa). Data hii inabaki kwenye kifaa chako na haisawazishwi kamwe na huduma yoyote ya wingu na sisi.',
    sec5Title: 'Programu ya Kompyuta ya NexData',
    sec5Desc: 'Programu ya kompyuta ya NexData Recovery imeundwa kufanya kazi nje ya mtandao kabisa. Haihitaji muunganisho wa mtandao ili kutafuta au kurejesha faili. Uhakiki wa leseni unafanyika kupitia utaratibu salama wa ndani.',
    sec6Title: 'Wasiliana Nasi',
    sec6Desc: 'Maswali kuhusu sera hii ya faragha? Tuandikie kwa '
  },
  bn: {
    title: 'প্রাইভেসি পলিসি | TheNexTools',
    description: 'আমাদের প্রাইভেসি পলিসি সহজ: আমরা আপনার ডেটা চাই না। সব টুল আপনার ডিভাইসে লোকালি চলে।',
    h1: 'প্রাইভেসি পলিসি',
    effectiveDate: 'কার্যকরের তারিখ:',
    localeString: 'bn-BD',
    sec1Title: 'মূল নীতি',
    sec1Desc: 'আমরা সফটওয়্যার বিক্রি করি, ডেটা নয়। আমাদের টুলগুলো আপনার ডিভাইসেই সবকিছু প্রসেস করে, এবং আপনি কী নিয়ে কাজ করছেন তা দেখার, সংরক্ষণ করার বা তা থেকে অর্থোপার্জনের কোনো আগ্রহ আমাদের নেই।',
    sec2Title: 'কোনো ফাইল আপলোড নেই',
    sec2Desc: 'আমাদের সুইটের প্রতিটি ওয়েব-ভিত্তিক টুল (NexPDF, NexStrip, NexCompress) আপনার ব্রাউজার ট্যাবে <strong>লোকালি</strong> আপনার ফাইল প্রসেস করতে আধুনিক ব্রাউজার এপিআই ব্যবহার করে। আপনার ফাইল কখনোই আমাদের সার্ভারে স্থানান্তরিত হয় না। আমরা সেগুলো দেখতে পারি না এবং নিশ্চিতভাবেই সংরক্ষণ করি না।',
    sec3Title: 'কোনো অ্যাকাউন্ট বা ট্র্যাকিং নেই',
    sec3Desc: 'আমাদের ফ্রি ইউটিলিটিগুলো ব্যবহার করার জন্য কোনো অ্যাকাউন্টের প্রয়োজন নেই। আমরা বিজ্ঞাপনের জন্য কোনো আক্রমণাত্মক ট্র্যাকিং পিক্সেল বা থার্ড-পার্টি কুকি ব্যবহার করি না। আমরা শুধুমাত্র পারফরম্যান্স পর্যবেক্ষণ এবং অপব্যবহার রোধ করার জন্য ন্যূনতম, বেনামী সার্ভার লগ (যেমন পেজ ভিউ) সংগ্রহ করতে পারি।',
    sec4Title: 'লোকাল স্টোরেজ',
    sec4Desc: 'কিছু টুল আপনার পছন্দ বা সাময়িক কাজের ফাইল (যেমন সম্পাদিত পিডিএফ) সংরক্ষণ করতে আপনার ব্রাউজারের লোকাল স্টোরেজ বা IndexedDB ব্যবহার করতে পারে। এই ডেটা আপনার ডিভাইসেই থাকে এবং আমাদের দ্বারা কোনো ক্লাউড সার্ভিসে সিঙ্ক করা হয় না।',
    sec5Title: 'NexData ডেস্কটপ অ্যাপ',
    sec5Desc: 'আমাদের ডেস্কটপ অ্যাপ্লিকেশন, NexData Recovery, সম্পূর্ণরূপে অফলাইনে চালানোর জন্য ডিজাইন করা হয়েছে। ফাইল স্ক্যান বা পুনরুদ্ধার করতে এটির ইন্টারনেট সংযোগের প্রয়োজন নেই। লাইসেন্স যাচাইকরণ একটি নিরাপদ, লোকাল-ফার্স্ট মেকানিজমের মাধ্যমে ঘটে।',
    sec6Title: 'যোগাযোগ',
    sec6Desc: 'এই প্রাইভেসি পলিসি সম্পর্কে কোনো প্রশ্ন আছে? আমাদের ইমেইল করুন: '
  },
  de: {
    title: 'Datenschutzrichtlinie | TheNexTools',
    description: 'Unsere Datenschutzrichtlinie ist einfach: Wir wollen Ihre Daten nicht. Alle Werkzeuge werden lokal auf Ihrem Gerät ausgeführt.',
    h1: 'Datenschutzrichtlinie',
    effectiveDate: 'Inkrafttreten:',
    localeString: 'de-DE',
    sec1Title: 'Das Grundprinzip',
    sec1Desc: 'Wir verkaufen Software, keine Daten. Unsere Werkzeuge verarbeiten alles auf Ihrem Gerät, und wir haben kein Interesse daran, die Inhalte, an denen Sie arbeiten, einzusehen, zu speichern oder zu monetarisieren.',
    sec2Title: 'Keine Datei-Uploads',
    sec2Desc: 'Jedes webbasierte Werkzeug in unserer Suite (NexPDF, NexStrip, NexCompress) verwendet moderne Browser-APIs, um Ihre Dateien <strong>lokal</strong> in Ihrem Browser-Tab zu verarbeiten. Ihre Dateien werden niemals über unsere Server übertragen. Wir können sie nicht sehen und speichern sie natürlich auch nicht.',
    sec3Title: 'Keine Konten oder Tracking',
    sec3Desc: 'Wir verlangen keine Konten, um unsere kostenlosen Dienstprogramme zu nutzen. Wir verwenden keine invasiven Tracking-Pixel oder Drittanbieter-Cookies für Werbung. Wir erfassen möglicherweise minimale, anonymisierte Serverprotokolle (wie Seitenaufrufe) ausschließlich zur Leistungsüberwachung und zur Verhinderung von Missbrauch unserer Infrastruktur.',
    sec4Title: 'Lokaler Speicher',
    sec4Desc: 'Einige Werkzeuge verwenden möglicherweise den lokalen Speicher Ihres Browsers oder IndexedDB, um Ihre Einstellungen oder temporäre Arbeitsdateien (wie eine bearbeitete PDF-Datei) zu speichern. Diese Daten verbleiben auf Ihrem Gerät und werden von uns niemals mit einem Cloud-Dienst synchronisiert.',
    sec5Title: 'NexData Desktop-App',
    sec5Desc: 'Unsere Desktop-Anwendung NexData Recovery ist so konzipiert, dass sie vollständig offline ausgeführt werden kann. Sie erfordert keine Internetverbindung, um Dateien zu scannen oder wiederherzustellen. Die Lizenzüberprüfung erfolgt über einen sicheren, lokalen Mechanismus.',
    sec6Title: 'Kontakt',
    sec6Desc: 'Fragen zu dieser Datenschutzrichtlinie? Schreiben Sie uns an '
  },
  nl: {
    title: 'Privacybeleid | TheNexTools',
    description: 'Ons privacybeleid is eenvoudig: we willen uw gegevens niet. Alle tools draaien lokaal op uw apparaat.',
    h1: 'Privacybeleid',
    effectiveDate: 'Ingangsdatum:',
    localeString: 'nl-NL',
    sec1Title: 'Het Basisprincipe',
    sec1Desc: 'We verkopen software, geen gegevens. Onze tools verwerken alles op uw apparaat, en we hebben er geen belang bij om de inhoud waaraan u werkt te bekijken, op te slaan of te gelde te maken.',
    sec2Title: 'Geen Uploads van Bestanden',
    sec2Desc: 'Elke webgebaseerde tool in onze suite (NexPDF, NexStrip, NexCompress) maakt gebruik van moderne browser-APIs om uw bestanden <strong>lokaal</strong> in uw browsertabblad te verwerken. Uw bestanden passeren onze servers nooit. We kunnen ze niet zien en slaan ze uiteraard niet op.',
    sec3Title: 'Geen Accounts of Tracking',
    sec3Desc: 'We vereisen geen accounts om onze gratis hulpprogramma\'s te gebruiken. We gebruiken geen invasieve trackingpixels of cookies van derden voor advertenties. We kunnen minimale, geanonimiseerde serverlogs verzamelen (zoals paginaweergaven) puur voor prestatiebewaking en om misbruik van onze infrastructuur te voorkomen.',
    sec4Title: 'Lokale Opslag',
    sec4Desc: 'Sommige tools kunnen de lokale opslag van uw browser of IndexedDB gebruiken om uw voorkeuren of tijdelijke werkbestanden (zoals een PDF die wordt bewerkt) op te slaan. Deze gegevens blijven op uw apparaat en worden door ons nooit gesynchroniseerd met een clouddienst.',
    sec5Title: 'NexData Desktop App',
    sec5Desc: 'Onze desktopapplicatie, NexData Recovery, is ontworpen om volledig offline te draaien. Er is geen internetverbinding vereist om bestanden te scannen of te herstellen. Licentieverificatie vindt plaats via een veilig, lokaal mechanisme.',
    sec6Title: 'Contact',
    sec6Desc: 'Vragen over dit privacybeleid? E-mail ons op '
  },
  it: {
    title: 'Informativa sulla Privacy | TheNexTools',
    description: 'La nostra informativa sulla privacy è semplice: non vogliamo i tuoi dati. Tutti gli strumenti vengono eseguiti localmente sul tuo dispositivo.',
    h1: 'Informativa sulla Privacy',
    effectiveDate: 'Data di entrata in vigore:',
    localeString: 'it-IT',
    sec1Title: 'Il Principio Fondamentale',
    sec1Desc: 'Vendiamo software, non dati. I nostri strumenti elaborano tutto sul tuo dispositivo e non abbiamo alcun interesse a visualizzare, memorizzare o monetizzare i contenuti su cui lavori.',
    sec2Title: 'Nessun Caricamento di File',
    sec2Desc: 'Ogni strumento web della nostra suite (NexPDF, NexStrip, NexCompress) utilizza le API native del browser per elaborare i tuoi file <strong>localmente</strong> nella scheda del tuo browser. I tuoi file non passano mai dai nostri server. Non possiamo vederli e, naturalmente, non li memorizziamo.',
    sec3Title: 'Nessun Account o Tracciamento',
    sec3Desc: 'Non richiediamo la creazione di un account per utilizzare le nostre utility gratuite. Non utilizziamo pixel di tracciamento invasivi o cookie di terze parti per scopi pubblicitari. Potremmo raccogliere registri del server minimi e anonimizzati (come le visualizzazioni delle pagine) esclusivamente per monitorare le prestazioni e prevenire abusi della nostra infrastruttura.',
    sec4Title: 'Archiviazione Locale',
    sec4Desc: 'Alcuni strumenti potrebbero utilizzare la memoria locale del browser o IndexedDB per salvare le tue preferenze o file di lavoro temporanei (come un PDF in fase di modifica). Questi dati rimangono sul tuo dispositivo e non vengono mai sincronizzati con alcun servizio cloud da parte nostra.',
    sec5Title: 'App Desktop NexData',
    sec5Desc: 'La nostra applicazione desktop, NexData Recovery, è progettata per funzionare completamente offline. Non richiede una connessione a internet per scansionare o recuperare i file. La verifica della licenza avviene tramite un meccanismo locale sicuro.',
    sec6Title: 'Contatto',
    sec6Desc: 'Domande su questa informativa sulla privacy? Scrivici a '
  },
  ja: {
    title: 'プライバシーポリシー | TheNexTools',
    description: '当サイトのプライバシーポリシーはシンプルです。お客様のデータを収集することはありません。すべてのツールはデバイス上でローカルに実行されます。',
    h1: 'プライバシーポリシー',
    effectiveDate: '発効日:',
    localeString: 'ja-JP',
    sec1Title: '基本原則',
    sec1Desc: '私たちはソフトウェアを販売しており、データを販売しているわけではありません。当サイトのツールはすべてお客様のデバイス上で処理を行い、お客様が作業する内容を閲覧、保存、または収益化することに関心はありません。',
    sec2Title: 'ファイルのアップロードなし',
    sec2Desc: '当スイートのすべてのウェブツール（NexPDF、NexStrip、NexCompress）は、モダンブラウザAPIを使用して、ブラウザタブ内で<strong>ローカルに</strong>ファイルを処理します。ファイルが当社のサーバーを通過することはありません。閲覧することも、保存することもありません。',
    sec3Title: 'アカウント登録・追跡なし',
    sec3Desc: '無料のユーティリティを使用するためのアカウント登録は不要です。広告目的の侵入的なトラッキングピクセルやサードパーティCookieは使用しません。パフォーマンスの監視や悪用防止の目的で、最小限の匿名サーバーログ（ページビューなど）を収集する場合があります。',
    sec4Title: 'ローカルストレージ',
    sec4Desc: '一部のツールでは、設定や一時的な作業ファイル（編集中のPDFなど）を保存するために、ブラウザのローカルストレージやIndexedDBを使用する場合があります。これらのデータはお客様のデバイスに留まり、当社がクラウドサービスと同期することはありません。',
    sec5Title: 'NexData デスクトップアプリ',
    sec5Desc: 'デスクトップアプリケーション「NexData Recovery」は、完全にオフラインで動作するように設計されています。ファイルの検索や復元にインターネット接続は不要です。ライセンスの検証は、安全なローカルファーストの仕組みで行われます。',
    sec6Title: 'お問い合わせ',
    sec6Desc: 'プライバシーポリシーに関するご質問は、以下までメールでお問い合わせください: '
  }
};



export default async function PrivacyPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.effectiveDate} {new Date().toLocaleDateString(t.localeString)}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>{t.sec1Title}</h3>
          <p>{t.sec1Desc}</p>
        </div>

        <div>
          <h3>{t.sec2Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec2Desc }} />
        </div>

        <div>
          <h3>{t.sec3Title}</h3>
          <p>{t.sec3Desc}</p>
        </div>

        <div>
          <h3>{t.sec4Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec4Desc }} />
        </div>

        <div>
          <h3>{t.sec5Title}</h3>
          <p>{t.sec5Desc}</p>
        </div>

        <div>
          <h3>{t.sec6Title}</h3>
          <p>
            {t.sec6Desc}
            <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
