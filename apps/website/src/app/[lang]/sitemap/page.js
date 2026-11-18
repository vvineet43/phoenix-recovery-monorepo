import Link from 'next/link';
import { TOOLS_METADATA } from '@/lib/pdf-tools-metadata';
import { 
  FileText, Image, ArrowRight, ShieldCheck, Home
} from 'lucide-react';
import { locales } from '@/lib/i18n-config';
import { getDictionary } from '@/dictionaries';

const TRANSLATIONS = {
  en: {
    title: 'Sitemap | TheNexTools',
    description: 'Navigate through TheNexTools. Complete index of all our online PDF tools, image compressors, metadata strippers, and offline data recovery applications.',
    badge: 'Index',
    h1: 'Sitemap',
    sub: 'Find direct links to every utility, tool, documentation page, and policy document across TheNexTools.',
    sec1Title: 'Core Pages',
    homeTitle: 'Home Page',
    homeDesc: 'Welcome to TheNexTools. Free web utilities and offline data recovery software.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Professional offline data recovery desktop application for macOS and Windows.',
    docsTitle: 'Documentation',
    docsDesc: 'Guides, support resources, FAQs, and integration docs for all utilities.',
    contactTitle: 'Contact Us',
    contactDesc: 'Get in touch with support, billing enquiries, or general feedback.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'All PDF tools run 100% locally in your web browser. No files are uploaded to any server.',
    pdfWorkspaceTitle: 'NexPDF Toolkit Workspace',
    pdfWorkspaceDesc: 'Open the comprehensive PDF Editing Suite interface with file previews and drag-and-drop workspace.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage Dashboard',
    imageWorkspaceDesc: 'Access our localized suite of batch image processing and compression tools.',
    compressorTitle: 'Image Compressor',
    compressorDesc: 'Shrink JPG, PNG, and WebP files locally with real-time compression ratio previews.',
    converterTitle: 'Image Converter',
    converterDesc: 'Convert images locally between formats including JPEG, PNG, and WebP.',
    redactorTitle: 'Image Redactor & Blur',
    redactorDesc: 'Permanently blur faces, license plates, or confidential text in images before sharing.',
    stripperTitle: 'EXIF Stripper',
    stripperDesc: 'Remove private EXIF metadata (GPS coordinates, camera model, lens) from photographs.',
    sec4Title: 'Policies & Legal',
    privacyTitle: 'Privacy Policy',
    privacyDesc: 'Learn about our local-first data processing policy. We never upload your documents.',
    termsTitle: 'Terms of Service',
    termsDesc: 'Terms, conditions, license details, and liability terms for using our software.',
    refundTitle: 'Refund Policy',
    refundDesc: 'Information on our 10-day refund guarantee for NexData Recovery Pro licenses.',
    sitemapTitle: 'HTML Sitemap',
    sitemapDesc: 'You are currently viewing the HTML sitemap page of TheNexTools.'
  },
  fr: {
    title: 'Plan du Site | TheNexTools',
    description: 'Parcourez TheNexTools. Index complet de tous nos outils PDF en ligne, compresseurs d\'images, nettoyeurs de métadonnées et applications de récupération de données hors ligne.',
    badge: 'Index',
    h1: 'Plan du Site',
    sub: 'Trouvez des liens directs vers chaque utilitaire, outil, page de documentation et politique sur TheNexTools.',
    sec1Title: 'Pages Principales',
    homeTitle: 'Page d\'Accueil',
    homeDesc: 'Bienvenue sur TheNexTools. Utilitaires web gratuits et logiciel de récupération de données hors ligne.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Application de bureau professionnelle pour la récupération de données hors ligne sur macOS et Windows.',
    docsTitle: 'Documentation',
    docsDesc: 'Guides, ressources d\'assistance, FAQ et documentation pour tous nos utilitaires.',
    contactTitle: 'Contactez-nous',
    contactDesc: 'Contactez le support, posez des questions sur la facturation ou partagez vos commentaires.',
    sec2Title: 'Boîte à outils NexPDF',
    sec2Sub: 'Tous les outils PDF s\'exécutent à 100 % localement dans votre navigateur. Aucun fichier n\'est envoyé sur un serveur.',
    pdfWorkspaceTitle: 'Espace de Travail NexPDF',
    pdfWorkspaceDesc: 'Ouvrez la suite complète d\'édition PDF avec aperçu des fichiers et espace glisser-déposer.',
    sec3Title: 'Boîte à outils NexImage',
    imageWorkspaceTitle: 'Tableau de bord NexImage',
    imageWorkspaceDesc: 'Accédez à notre suite d\'outils locaux de traitement et de compression d\'images par lots.',
    compressorTitle: 'Compresseur d\'Images',
    compressorDesc: 'Réduisez localement vos fichiers JPG, PNG et WebP avec aperçu du taux de compression en temps réel.',
    converterTitle: 'Convertisseur d\'Images',
    converterDesc: 'Convertissez vos images localement entre les formats JPEG, PNG et WebP.',
    redactorTitle: 'Caviardage & Floutage',
    redactorDesc: 'Floutez définitivement les visages, plaques d\'immatriculation ou textes confidentiels avant partage.',
    stripperTitle: 'Nettoyeur EXIF',
    stripperDesc: 'Supprimez les métadonnées EXIF privées (coordonnées GPS, modèle d\'appareil, objectif) de vos photos.',
    sec4Title: 'Politiques et Mentions Légales',
    privacyTitle: 'Politique de Confidentialité',
    privacyDesc: 'Découvrez notre politique de traitement local des données. Nous ne téléchargeons jamais vos documents.',
    termsTitle: 'Conditions d\'Utilisation',
    termsDesc: 'Conditions générales, détails de licence et responsabilité liés à l\'utilisation de nos logiciels.',
    refundTitle: 'Politique de Remboursement',
    refundDesc: 'Informations sur notre garantie de remboursement de 10 jours pour les licences NexData Recovery Pro.',
    sitemapTitle: 'Plan du Site HTML',
    sitemapDesc: 'Vous consultez actuellement la page du plan du site HTML en français.'
  },
  hi: {
    title: 'साइटमैप | TheNexTools',
    description: 'TheNexTools पर नेविगेट करें। हमारे सभी ऑनलाइन PDF टूल्स, इमेज कंप्रेसर, मेटाडेटा स्ट्रिपर्स और ऑफ़लाइन डेटा रिकवरी ऐप्स की पूरी सूची।',
    badge: 'सूची',
    h1: 'साइटमैप',
    sub: 'TheNexTools के प्रत्येक टूल, दस्तावेज़ पृष्ठ और नीति दस्तावेज़ के लिए सीधे लिंक प्राप्त करें।',
    sec1Title: 'मुख्य पृष्ठ',
    homeTitle: 'होम पेज',
    homeDesc: 'TheNexTools में आपका स्वागत है। निःशुल्क वेब उपयोगिताएँ और ऑफ़लाइन डेटा रिकवरी सॉफ़्टवेयर।',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'macOS और Windows के लिए पेशेवर ऑफ़लाइन डेटा रिकवरी डेस्कटॉप एप्लिकेशन।',
    docsTitle: 'डॉक्यूमेंटेशन',
    docsDesc: 'सभी उपयोगिताओं के लिए गाइड, सहायता संसाधन और सामान्य प्रश्न।',
    contactTitle: 'संपर्क करें',
    contactDesc: 'सहायता, बिलिंग पूछताछ या सामान्य प्रतिक्रिया के लिए संपर्क करें।',
    sec2Title: 'NexPDF टूलकिट',
    sec2Sub: 'सभी PDF टूल्स आपके ब्राउज़र में 100% स्थानीय रूप से चलते हैं। कोई भी फ़ाइल सर्वर पर अपलोड नहीं की जाती है।',
    pdfWorkspaceTitle: 'NexPDF कार्यक्षेत्र',
    pdfWorkspaceDesc: 'फ़ाइल पूर्वावलोकन और ड्रैग-एंड-ड्रॉप कार्यक्षेत्र के साथ संपूर्ण PDF संपादन सुइट खोलें।',
    sec3Title: 'NexImage टूलकिट',
    imageWorkspaceTitle: 'NexImage डैशबोर्ड',
    imageWorkspaceDesc: 'बैच इमेज प्रोसेसिंग और कंप्रेशन टूल्स के हमारे स्थानीय सुइट तक पहुँचें।',
    compressorTitle: 'इमेज कंप्रेसर',
    compressorDesc: 'रीयल-टाइम कंप्रेशन पूर्वावलोकन के साथ स्थानीय रूप से JPG, PNG और WebP फ़ाइलों का आकार घटाएं।',
    converterTitle: 'इमेज कन्वर्टर',
    converterDesc: 'JPEG, PNG और WebP सहित प्रारूपों के बीच स्थानीय रूप से छवियों को बदलें।',
    redactorTitle: 'इमेज रेडैक्टर और ब्लर',
    redactorDesc: 'साझा करने से पहले छवियों में चेहरे, लाइसेंस प्लेट या गोपनीय टेक्स्ट को स्थायी रूप से धुंधला करें।',
    stripperTitle: 'EXIF स्ट्रिपर',
    stripperDesc: 'तस्वीरों से निजी EXIF मेटाडेटा (GPS निर्देशांक, कैमरा मॉडल, लेंस) हटाएं।',
    sec4Title: 'नीतियाँ और कानूनी जानकारी',
    privacyTitle: 'गोपनीयता नीति',
    privacyDesc: 'हमारी लोकल-फ़र्स्ट डेटा प्रोसेसिंग नीति के बारे में जानें। हम आपके दस्तावेज़ कभी अपलोड नहीं करते।',
    termsTitle: 'सेवा की शर्तें',
    termsDesc: 'हमारे सॉफ़्टवेयर के उपयोग के लिए नियम, शर्तें, लाइसेंस विवरण और दायित्व की शर्तें।',
    refundTitle: 'रिफंड नीति',
    refundDesc: 'NexData Recovery Pro लाइसेंस के लिए हमारी 10-दिन की रिफंड गारंटी की जानकारी।',
    sitemapTitle: 'HTML साइटमैप',
    sitemapDesc: 'आप वर्तमान में हिंदी में HTML साइटमैप पृष्ठ देख रहे हैं।'
  },
  tr: {
    title: 'Site Haritası | TheNexTools',
    description: 'TheNexTools içinde gezinin. Tüm çevrimiçi PDF araçlarımızın, görsel sıkıştırıcıların, meta veri temizleyicilerin ve çevrimdışı veri kurtarma uygulamalarının tam dizini.',
    badge: 'Dizin',
    h1: 'Site Haritası',
    sub: 'TheNexTools üzerindeki her yardımcı programa, araca, dokümantasyon sayfasına ve politika belgesine doğrudan bağlantılar bulun.',
    sec1Title: 'Ana Sayfalar',
    homeTitle: 'Ana Sayfa',
    homeDesc: 'TheNexTools\'a hoş geldiniz. Ücretsiz web araçları ve çevrimdışı veri kurtarma yazılımı.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'macOS ve Windows için profesyonel çevrimdışı veri kurtarma masaüstü uygulaması.',
    docsTitle: 'Dokümantasyon',
    docsDesc: 'Tüm araçlar için kılavuzlar, destek kaynakları ve SSS.',
    contactTitle: 'İletişim',
    contactDesc: 'Destek, faturalandırma soruları veya genel geri bildirim için bizimle iletişime geçin.',
    sec2Title: 'NexPDF Araç Seti',
    sec2Sub: 'Tüm PDF araçları tarayıcınızda %100 yerel olarak çalışır. Hiçbir dosya sunucuya yüklenmez.',
    pdfWorkspaceTitle: 'NexPDF Çalışma Alanı',
    pdfWorkspaceDesc: 'Dosya önizlemeleri ve sürükle-bırak çalışma alanıyla kapsamlı PDF düzenleme paketini açın.',
    sec3Title: 'NexImage Araç Seti',
    imageWorkspaceTitle: 'NexImage Paneli',
    imageWorkspaceDesc: 'Toplu görsel işleme ve sıkıştırma araçlarımızın yerel paketine erişin.',
    compressorTitle: 'Görsel Sıkıştırıcı',
    compressorDesc: 'JPG, PNG ve WebP dosyalarını gerçek zamanlı sıkıştırma önizlemeleriyle yerel olarak küçültün.',
    converterTitle: 'Görsel Dönüştürücü',
    converterDesc: 'Görselleri JPEG, PNG ve WebP dahil formatlar arasında yerel olarak dönüştürün.',
    redactorTitle: 'Gizlilik Bulanıklaştırıcı',
    redactorDesc: 'Paylaşmadan önce fotoğraflardaki yüzleri, plakaları veya gizli metinleri kalıcı olarak bulanıklaştırın.',
    stripperTitle: 'EXIF Temizleyici',
    stripperDesc: 'Fotoğraflardan özel EXIF meta verilerini (GPS koordinatları, kamera modeli, lens) kaldırın.',
    sec4Title: 'Politikalar ve Yasal',
    privacyTitle: 'Gizlilik Politikası',
    privacyDesc: 'Yerel öncelikli veri işleme politikamız hakkında bilgi edinin. Belgelerinizi asla yüklemeyiz.',
    termsTitle: 'Hizmet Şartları',
    termsDesc: 'Yazılımımızı kullanmaya ilişkin şartlar, koşullar, lisans ayrıntıları ve sorumluluk hükümleri.',
    refundTitle: 'İade Politikası',
    refundDesc: 'NexData Recovery Pro lisansları için 10 günlük iade garantimiz hakkında bilgiler.',
    sitemapTitle: 'HTML Site Haritası',
    sitemapDesc: 'Şu anda Türkçe HTML site haritası sayfasını görüntülüyorsunuz.'
  },
  sw: {
    title: 'Ramani ya Tovuti | TheNexTools',
    description: ' Vinjari TheNexTools. Faharasa kamili ya zana zetu zote za PDF mtandaoni, vibana picha, viondoa metadata, na programu za kurejesha data nje ya mtandao.',
    badge: 'Faharasa',
    h1: 'Ramani ya Tovuti',
    sub: 'Pata viungo vya moja kwa moja kwa kila zana, ukurasa wa nyaraka, na sera kwenye TheNexTools.',
    sec1Title: 'Kurasa Kuu',
    homeTitle: 'Ukurasa wa Kwanza',
    homeDesc: 'Karibu TheNexTools. Zana za bure za mtandaoni na programu ya kurejesha data nje ya mtandao.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Programu ya kitaalamu ya kompyuta ya kurejesha data nje ya mtandao kwa macOS na Windows.',
    docsTitle: 'Nyaraka',
    docsDesc: 'Miongozo, rasilimali za msaada, na maswali yanayoulizwa mara kwa mara.',
    contactTitle: 'Wasiliana Nasi',
    contactDesc: 'Wasiliana na usaidizi, maswali ya malipo, au maoni ya jumla.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Zana zote za PDF zinaendeshwa 100% ndani ya kivinjari chako. Hakuna faili zinazopakiwa kwenye seva.',
    pdfWorkspaceTitle: 'Eneo la Kazi la NexPDF',
    pdfWorkspaceDesc: 'Fungua mfumo kamili wa kuhariri PDF wenye hakikisho la faili.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Dashibodi ya NexImage',
    imageWorkspaceDesc: 'Fikia mkusanyiko wetu wa zana za kuchakata na kubana picha kwa pamoja.',
    compressorTitle: 'Kibana Picha',
    compressorDesc: 'Punguza ukubwa wa faili za JPG, PNG, na WebP ndani ya kivinjari chako.',
    converterTitle: 'Kibadilisha Picha',
    converterDesc: 'Badilisha picha kati ya umbizo za JPEG, PNG, na WebP.',
    redactorTitle: 'Kifuta na Kufifisha Picha',
    redactorDesc: 'Fifisha kabisa nyuso, nambari za magari, au maandishi ya siri kwenye picha.',
    stripperTitle: 'Kiondoa EXIF',
    stripperDesc: 'Ondoa metadata ya siri ya EXIF (GPS, aina ya kamera) kutoka kwenye picha.',
    sec4Title: 'Sera na Sheria',
    privacyTitle: 'Sera ya Faragha',
    privacyDesc: 'Jifunze kuhusu sera yetu ya kuchakata data kwenye kifaa chako. Hatupakii hati zako kamwe.',
    termsTitle: 'Masharti ya Huduma',
    termsDesc: 'Masharti, maelezo ya leseni, na wajibu wa kutumia programu zetu.',
    refundTitle: 'Sera ya Urejeshaji Fedha',
    refundDesc: 'Taarifa kuhusu dhamana yetu ya siku 10 ya kurejeshewa fedha kwa leseni za NexData Recovery Pro.',
    sitemapTitle: 'Ramani ya Tovuti ya HTML',
    sitemapDesc: 'Unaangalia ukurasa wa ramani ya tovuti ya HTML kwa Kiswahili.'
  },
  bn: {
    title: 'সাইটম্যাপ | TheNexTools',
    description: 'TheNexTools ব্রাউজ করুন। আমাদের সকল অনলাইন পিডিএফ টুল, ইমেজ কম্প্রেসর, মেটাডেটা স্ট্রিপার এবং অফলাইন ডেটা রিকভারি অ্যাপের সম্পূর্ণ তালিকা।',
    badge: 'সূচী',
    h1: 'সাইটম্যাপ',
    sub: 'TheNexTools-এর প্রতিটি ইউটিলিটি, টুল, ডকুমেন্টেশন পেজ এবং পলিসি ডকুমেন্টের সরাসরি লিংক খুঁজুন।',
    sec1Title: 'প্রধান পাতা',
    homeTitle: 'হোম পেজ',
    homeDesc: 'TheNexTools-এ স্বাগতম। ফ্রি ওয়েব ইউটিলিটি এবং অফলাইন ডেটা রিকভারি সফটওয়্যার।',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'macOS এবং Windows-এর জন্য পেশাদার অফলাইন ডেটা রিকভারি ডেস্কটপ অ্যাপ্লিকেশন।',
    docsTitle: 'ডকুমেন্টেশন',
    docsDesc: 'সকল ইউটিলিটির জন্য গাইড, সাপোর্ট রিসোর্স এবং সাধারণ জিজ্ঞাসা।',
    contactTitle: 'যোগাযোগ করুন',
    contactDesc: 'সাপোর্ট, বিলিং সংক্রান্ত প্রশ্ন বা সাধারণ মতামতের জন্য আমাদের সাথে যোগাযোগ করুন।',
    sec2Title: 'NexPDF টুলকিট',
    sec2Sub: 'সব পিডিএফ টুল আপনার ওয়েব ব্রাউজারে ১০০% লোকালি চলে। কোনো ফাইল সার্ভারে আপলোড করা হয় না।',
    pdfWorkspaceTitle: 'NexPDF ওয়ার্কস্পেস',
    pdfWorkspaceDesc: 'ফাইল প্রিভিউ এবং ড্র্যাগ-অ্যান্ড-ড্রপ ওয়ার্কস্পেস সহ সম্পূর্ণ পিডিএফ এডিটিং স্যুট খুলুন।',
    sec3Title: 'NexImage টুলকিট',
    imageWorkspaceTitle: 'NexImage ড্যাশবোর্ড',
    imageWorkspaceDesc: 'ব্যাচ ইমেজ প্রসেসিং এবং কম্প্রেশন টুলের লোকাল স্যুটে প্রবেশ করুন।',
    compressorTitle: 'ইমেজ কম্প্রেসর',
    compressorDesc: 'রিয়েল-টাইম কম্প্রেশন প্রিভিউ সহ লোকালি JPG, PNG এবং WebP ফাইলের সাইজ কমান।',
    converterTitle: 'ইমেজ কনভার্টার',
    converterDesc: 'JPEG, PNG এবং WebP ফরম্যাটের মধ্যে লোকালি ছবি রূপান্তর করুন।',
    redactorTitle: 'ইমেজ রিডাক্টর ও ব্লার',
    redactorDesc: 'শেয়ার করার আগে ছবির মুখমণ্ডল, লাইসেন্স প্লেট বা গোপনীয় টেক্সট স্থায়ীভাবে ব্লার করুন।',
    stripperTitle: 'EXIF স্ট্রিপার',
    stripperDesc: 'ছবি থেকে ব্যক্তিগত EXIF মেটাডেটা (GPS স্থানাঙ্ক, ক্যামেরা মডেল, লেন্স) মুছে ফেলুন।',
    sec4Title: 'পলিসি ও আইনি তথ্য',
    privacyTitle: 'প্রাইভেসি পলিসি',
    privacyDesc: 'আমাদের লোকাল-ফার্স্ট ডেটা প্রসেসিং পলিসি সম্পর্কে জানুন। আমরা কখনোই আপনার ডকুমেন্ট আপলোড করি না।',
    termsTitle: 'ব্যবহারের শর্তাবলী',
    termsDesc: 'আমাদের সফটওয়্যার ব্যবহারের শর্তাবলী, লাইসেন্সের বিবরণ এবং দায়বদ্ধতার নিয়ম।',
    refundTitle: 'রিফান্ড পলিসি',
    refundDesc: 'NexData Recovery Pro লাইসেন্সের জন্য আমাদের ১০ দিনের রিফান্ড গ্যারান্টি সম্পর্কিত তথ্য।',
    sitemapTitle: 'HTML সাইটম্যাপ',
    sitemapDesc: 'আপনি বর্তমানে বাংলায় HTML সাইটম্যাপ পেজটি দেখছেন।'
  },
  es: {
    title: 'Mapa del Sitio | TheNexTools',
    description: 'Navega por TheNexTools. Índice completo de todas nuestras herramientas de PDF en línea, compresores de imágenes, limpiadores de metadatos y aplicaciones de recuperación de datos sin conexión.',
    badge: 'Índice',
    h1: 'Mapa del Sitio',
    sub: 'Encuentra enlaces directos a cada utilidad, herramienta, página de documentación y políticas en TheNexTools.',
    sec1Title: 'Páginas Principales',
    homeTitle: 'Página de Inicio',
    homeDesc: 'Bienvenido a TheNexTools. Utilidades web gratuitas y software de recuperación de datos sin conexión.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Aplicación de escritorio profesional para la recuperación de datos sin conexión en macOS y Windows.',
    docsTitle: 'Documentación',
    docsDesc: 'Guías, recursos de soporte, preguntas frecuentes y documentación de integración para todas las utilidades.',
    contactTitle: 'Contacto',
    contactDesc: 'Ponte en contacto con soporte, consultas de facturación o comentarios generales.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Todas las herramientas PDF se ejecutan al 100% localmente en tu navegador. Ningún archivo se carga a ningún servidor.',
    pdfWorkspaceTitle: 'Espacio de Trabajo NexPDF',
    pdfWorkspaceDesc: 'Abre la suite de edición de PDF completa con vista previa de archivos y área de trabajo de arrastrar y soltar.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Panel NexImage',
    imageWorkspaceDesc: 'Accede a nuestro conjunto localizado de herramientas para procesamiento y compresión de imágenes por lotes.',
    compressorTitle: 'Compresor de Imágenes',
    compressorDesc: 'Reduce el peso de archivos JPG, PNG y WebP de forma local con vistas previas de relación de compresión en tiempo real.',
    converterTitle: 'Convertidor de Imágenes',
    converterDesc: 'Convierte formatos de imágenes localmente entre formatos que incluyen JPEG, PNG y WebP.',
    redactorTitle: 'Difuminador de Privacidad',
    redactorDesc: 'Difumina de forma permanente rostros, matrículas o texto confidencial en las imágenes antes de compartirlas.',
    stripperTitle: 'Limpiador EXIF',
    stripperDesc: 'Elimina los metadatos EXIF privados (coordenadas GPS, modelo de cámara, lente) de tus fotografías.',
    sec4Title: 'Políticas y Avisos Legales',
    privacyTitle: 'Política de Privacidad',
    privacyDesc: 'Conoce nuestra política de procesamiento de datos local. Nunca cargamos tus documentos.',
    termsTitle: 'Términos de Servicio',
    termsDesc: 'Términos, condiciones, detalles de licencia y responsabilidad por el uso de nuestro software.',
    refundTitle: 'Política de Reembolso',
    refundDesc: 'Información sobre nuestra garantía de reembolso de 10 días para las licencias de NexData Recovery Pro.',
    sitemapTitle: 'Mapa del Sitio HTML',
    sitemapDesc: 'Actualmente estás viendo la página del mapa del sitio HTML en español.'
  },
  pt: {
    title: 'Mapa do Site | TheNexTools',
    description: 'Navegue pelo TheNexTools. Índice completo de todas as nossas ferramentas de PDF online, compressores de imagem, removedores de metadados e aplicativos de recuperação de dados offline.',
    badge: 'Índice',
    h1: 'Mapa do Site',
    sub: 'Encontre links diretos para cada utilitário, ferramenta, página de documentação e políticas no TheNexTools.',
    sec1Title: 'Páginas Principais',
    homeTitle: 'Página Inicial',
    homeDesc: 'Bem-vindo ao TheNexTools. Utilitários web gratuitos e software de recuperação de dados offline.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Aplicativo de desktop profissional para recuperação de dados offline no macOS e Windows.',
    docsTitle: 'Documentação',
    docsDesc: 'Guias, recursos de suporte, FAQs e documentos de integração para todos os utilitários.',
    contactTitle: 'Contato',
    contactDesc: 'Entre em contato com suporte, dúvidas sobre faturamento ou feedback geral.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Todas as ferramentas PDF funcionam 100% localmente em seu navegador web. Nenhum arquivo é enviado para qualquer servidor.',
    pdfWorkspaceTitle: 'Espaço de Trabalho NexPDF',
    pdfWorkspaceDesc: 'Abra a suíte completa de edição de PDF com pré-visualização de arquivos e espaço de trabalho arrastar e soltar.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Painel NexImage',
    imageWorkspaceDesc: 'Acesse nossa suíte localizada de processamento e compactação de imagens em lote.',
    compressorTitle: 'Compressor de Imagens',
    compressorDesc: 'Reduza arquivos JPG, PNG e WebP localmente com visualizações de taxa de compactação em tempo real.',
    converterTitle: 'Conversor de Imagens',
    converterDesc: 'Converta imagens localmente entre formatos incluindo JPEG, PNG e WebP.',
    redactorTitle: 'Redator de Privacidade',
    redactorDesc: 'Desfoque rostos, placas ou textos confidenciais permanentemente antes de compartilhar.',
    stripperTitle: 'Removedor EXIF',
    stripperDesc: 'Remova metadados EXIF privados (coordenadas GPS, modelo da câmera, lentes) das fotos.',
    sec4Title: 'Políticas e Avisos Legais',
    privacyTitle: 'Política de Privacidade',
    privacyDesc: 'Saiba mais sobre nossa política de processamento local. Nunca enviamos seus documentos.',
    termsTitle: 'Termos de Serviço',
    termsDesc: 'Termos, condições, detalhes de licença e responsabilidade pelo uso do nosso software.',
    refundTitle: 'Política de Reembolso',
    refundDesc: 'Informações sobre nossa garantia de reembolso de 10 dias para licenças do NexData Recovery Pro.',
    sitemapTitle: 'Mapa do Site HTML',
    sitemapDesc: 'Você está visualizando atualmente a página do mapa do site HTML em português.'
  },
  de: {
    title: 'Sitemap | TheNexTools',
    description: 'Durchsuchen Sie TheNexTools. Vollständiger Index aller unserer Online-PDF-Werkzeuge, Bildkompressoren, Metadaten-Bereiniger und Offline-Datenrettungs-Apps.',
    badge: 'Index',
    h1: 'Sitemap',
    sub: 'Finden Sie direkte Links zu jedem Dienstprogramm, Werkzeug, jeder Dokumentationsseite und den Richtlinien auf TheNexTools.',
    sec1Title: 'Hauptseiten',
    homeTitle: 'Startseite',
    homeDesc: 'Willkommen bei TheNexTools. Kostenlose Web-Dienstprogramme und Offline-Datenrettungssoftware.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Professionelle Desktop-Anwendung zur Offline-Datenrettung unter macOS und Windows.',
    docsTitle: 'Dokumentation',
    docsDesc: 'Anleitungen, Support-Ressourcen, FAQs und Integrationsdokumente für alle Dienstprogramme.',
    contactTitle: 'Kontakt',
    contactDesc: 'Wenden Sie sich an den Support, stellen Sie Abrechnungsfragen oder geben Sie allgemeines Feedback.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Alle PDF-Werkzeuge werden zu 100 % lokal in Ihrem Webbrowser ausgeführt. Es werden keine Dateien auf einen Server hochgeladen.',
    pdfWorkspaceTitle: 'NexPDF Arbeitsbereich',
    pdfWorkspaceDesc: 'Öffnen Sie die komplette PDF-Bearbeitungssuite mit Dateivorschau und Drag-and-drop-Arbeitsbereich.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage Dashboard',
    imageWorkspaceDesc: 'Greifen Sie auf unsere lokalisierten Werkzeuge zur Stapelverarbeitung und Komprimierung von Bildern zu.',
    compressorTitle: 'Bildkompressor',
    compressorDesc: 'Reduzieren Sie die Dateigröße von JPG-, PNG- und WebP-Dateien lokal mit Echtzeit-Vorschau des Komprimierungsverhältnisses.',
    converterTitle: 'Bildkonverter',
    converterDesc: 'Konvertieren Sie Bildformate lokal zwischen Formaten wie JPEG, PNG und WebP.',
    redactorTitle: 'Datenschutz-Schwärzer',
    redactorDesc: 'Machen Sie Gesichter, Nummernschilder oder vertrauliche Texte in Bildern vor dem Teilen dauerhaft unkenntlich.',
    stripperTitle: 'EXIF-Bereiniger',
    stripperDesc: 'Entfernen Sie private EXIF-Metadaten (GPS-Koordinaten, Kameramodell, Objektiv) aus Ihren Fotos.',
    sec4Title: 'Richtlinien und rechtliche Hinweise',
    privacyTitle: 'Datenschutzrichtlinie',
    privacyDesc: 'Erfahren Sie mehr über unsere Richtlinie zur lokalen Datenverarbeitung. Wir laden Ihre Dokumente niemals hoch.',
    termsTitle: 'Nutzungsbedingungen',
    termsDesc: 'Bedingungen, Konditionen, Lizenzdetails und Haftung für die Nutzung unserer Software.',
    refundTitle: 'Rückerstattungsrichtlinie',
    refundDesc: 'Informationen zu unserer 10-tägigen Rückerstattungsgarantie für NexData Recovery Pro-Lizenzen.',
    sitemapTitle: 'HTML-Sitemap',
    sitemapDesc: 'Sie sehen derzeit die HTML-Sitemap-Seite in deutscher Sprache.'
  },
  nl: {
    title: 'Sitemap | TheNexTools',
    description: 'Blader door TheNexTools. Volledige index van al onze online PDF-tools, afbeeldingscompressoren, metadatacleaners en offline dataherstel-apps.',
    badge: 'Index',
    h1: 'Sitemap',
    sub: 'Vind directe links naar elk hulpprogramma, tool, documentatiepagina en beleid op TheNexTools.',
    sec1Title: 'Hoofdpagina\'s',
    homeTitle: 'Startpagina',
    homeDesc: 'Welkom bij TheNexTools. Gratis webhulpprogramma\'s en offline dataherstelsoftware.',
    recoveryTitle: 'NexData Herstel',
    recoveryDesc: 'Professionele desktop-applicatie voor offline dataherstel op macOS en Windows.',
    docsTitle: 'Documentatie',
    docsDesc: 'Handleidingen, ondersteuningsbronnen, veelgestelde vragen en integratiedocumenten voor alle hulpprogramma\'s.',
    contactTitle: 'Contact',
    contactDesc: 'Neem contact op met de ondersteuning, stel factureringsvragen of geef algemene feedback.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Alle PDF-tools worden 100% lokaal in uw webbrowser uitgevoerd. Er worden geen bestanden geüpload naar een server.',
    pdfWorkspaceTitle: 'NexPDF Werkruimte',
    pdfWorkspaceDesc: 'Open de complete PDF-bewerkingssuite met bestandsvoorbeeld en drag-and-drop werkruimte.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage Dashboard',
    imageWorkspaceDesc: 'Toegang tot onze gelokaliseerde set tools voor batchverwerking en compressie van afbeeldingen.',
    compressorTitle: 'Afbeeldingscompressor',
    compressorDesc: 'Verklein JPG-, PNG- en WebP-bestanden lokaal met real-time compressieverhoudingvoorbeelden.',
    converterTitle: 'Afbeeldingsconverter',
    converterDesc: 'Converteer afbeeldingen lokaal tussen formaten waaronder JPEG, PNG en WebP.',
    redactorTitle: 'Privacy-Anonimiser',
    redactorDesc: 'Vervag gezichten, kentekenplaten of gevoelige tekst permanent voordat u deze deelt.',
    stripperTitle: 'EXIF-Cleaner',
    stripperDesc: 'Verwijder privé EXIF-metadata (GPS-coördinaten, cameramodel, lens) uit uw foto\'s.',
    sec4Title: 'Beleid en Juridische Kennisgevingen',
    privacyTitle: 'Privacybeleid',
    privacyDesc: 'Lees meer over ons beleid voor lokale gegevensverwerking. We uploaden uw documenten nooit.',
    termsTitle: 'Algemene Voorwaarden',
    termsDesc: 'Algemene voorwaarden, licentiedetails en aansprakelijkheid voor het gebruik van onze software.',
    refundTitle: 'Terugbetalingsbeleid',
    refundDesc: 'Informatie over onze 10-dagen-niet-goed-geld-terug-garantie voor NexData Recovery Pro-licenties.',
    sitemapTitle: 'HTML Sitemap',
    sitemapDesc: 'U bekijkt momenteel de HTML sitemappagina in het Nederlands.'
  },
  it: {
    title: 'Mappa del Sito | TheNexTools',
    description: 'Naviga in TheNexTools. Indice completo di tutti i nostri strumenti PDF online, compressori di immagini, pulitori di metadati e app di recupero dati offline.',
    badge: 'Indice',
    h1: 'Mappa del Sito',
    sub: 'Trova collegamenti diretti a ogni utility, strumento, pagina di documentazione e informativa su TheNexTools.',
    sec1Title: 'Pagine Principali',
    homeTitle: 'Pagina Iniziale',
    homeDesc: 'Benvenuto in TheNexTools. Utility web gratuite e software di recupero dati offline.',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'Applicazione desktop professionale per il recupero dati offline su macOS e Windows.',
    docsTitle: 'Documentazione',
    docsDesc: 'Guide, risorse di supporto, FAQ e documenti di integrazione per tutte le utility.',
    contactTitle: 'Contatto',
    contactDesc: 'Mettiti in contatto con il supporto, richiedi informazioni sulla fatturazione o fornisci un feedback generale.',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'Tutti gli strumenti PDF vengono eseguiti al 100% localmente nel tuo browser. Nessun file viene caricato su alcun server.',
    pdfWorkspaceTitle: 'Area di Lavoro NexPDF',
    pdfWorkspaceDesc: 'Apri la suite completa di modifica PDF con anteprima dei file e area di lavoro drag-and-drop.',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'Pannello NexImage',
    imageWorkspaceDesc: 'Accedi al nostro set localizzato di strumenti per l\'elaborazione e la compressione batch delle immagini.',
    compressorTitle: 'Compressore Immagini',
    compressorDesc: 'Riduci localmente le dimensioni dei file JPG, PNG e WebP con anteprime del rapporto di compressione in tempo reale.',
    converterTitle: 'Convertitore Immagini',
    converterDesc: 'Converti le immagini localmente tra formati tra cui JPEG, PNG e WebP.',
    redactorTitle: 'Redattore di Privacy',
    redactorDesc: 'Sfoca permanentemente volti, targhe o testo sensibile nelle immagini prima di condividerle.',
    stripperTitle: 'Pulitore EXIF',
    stripperDesc: 'Rimuovi i metadati EXIF privati (coordinate GPS, modello di fotocamera, obiettivo) dalle tue foto.',
    sec4Title: 'Informative e Note Legali',
    privacyTitle: 'Informativa sulla Privacy',
    privacyDesc: 'Scopri la nostra politica di elaborazione locale dei dati. Non carichiamo mai i tuoi documenti.',
    termsTitle: 'Termini di Servizio',
    termsDesc: 'Termini, condizioni, dettagli sulla licenza e responsabilità per l\'uso del nostro software.',
    refundTitle: 'Politica di Rimborso',
    refundDesc: 'Informazioni sulla nostra garanzia di rimborso di 10 giorni per le licenze NexData Recovery Pro.',
    sitemapTitle: 'Mappa del Sito HTML',
    sitemapDesc: 'Attualmente stai visualizzando la pagina della mappa del sito HTML in italiano.'
  },
  ja: {
    title: 'サイトマップ | TheNexTools',
    description: 'TheNexToolsを参照します。すべてのオンラインPDFツール、画像圧縮ツール、メタデータ削除ツール、およびオフラインデータ復元アプリの完全なインデックス。',
    badge: 'インデックス',
    h1: 'サイトマップ',
    sub: 'TheNexTools上のすべてのユーティリティ、ツール、ドキュメントページ、およびポリシーへの直接リンクを表示します。',
    sec1Title: '主要ページ',
    homeTitle: 'ホーム',
    homeDesc: 'TheNexToolsへようこそ。無料のウェブユーティリティとオフラインデータ復元ソフトウェアを提供します。',
    recoveryTitle: 'NexData Recovery',
    recoveryDesc: 'macOSおよびWindows向けのプロフェッショナルなオフラインデータ復元デスクトップアプリケーション。',
    docsTitle: 'ドキュメント',
    docsDesc: 'すべてのユーティリティに関するガイド、サポートリソース、よくある質問、および統合ドキュメント。',
    contactTitle: 'お問い合わせ',
    contactDesc: 'サポートへのお問い合わせ、お支払いに関するご質問、または一般的なフィードバック。',
    sec2Title: 'NexPDF Toolkit',
    sec2Sub: 'すべてのPDFツールはブラウザ内で100%ローカルに実行されます。ファイルがサーバーにアップロードされることはありません。',
    pdfWorkspaceTitle: 'NexPDF ワークスペース',
    pdfWorkspaceDesc: 'ファイルプレビューとドラッグ＆ドロップ対応のワークスペースを備えた、完全なPDF編集スイートを開きます。',
    sec3Title: 'NexImage Toolkit',
    imageWorkspaceTitle: 'NexImage ダッシュボード',
    imageWorkspaceDesc: '画像の一括処理および圧縮を行うローカルツールセットにアクセスします。',
    compressorTitle: '画像圧縮',
    compressorDesc: '圧縮率をリアルタイムでプレビューしながら、JPG、PNG、WebPファイルをローカルで圧縮します。',
    converterTitle: '画像変換',
    converterDesc: 'JPEG、PNG、WebPなどの間で、画像をローカルで相互変換します。',
    redactorTitle: 'プライバシーぼかし',
    redactorDesc: '写真を共有する前に、顔、ナンバープレート、または機密テキストを永久にぼかします。',
    stripperTitle: 'EXIF削除',
    stripperDesc: '写真からプライベートなEXIFメタデータ（GPS座標、カメラモデル、レンズ情報など）を削除します。',
    sec4Title: 'ポリシーと法的通知',
    privacyTitle: 'プライバシーポリシー',
    privacyDesc: 'ローカルでのデータ処理ポリシーについて説明します。ドキュメントをアップロードすることは一切ありません。',
    termsTitle: '利用規約',
    termsDesc: 'ソフトウェアの使用に関する条件、ライセンスの詳細、および免責事項。',
    refundTitle: '返金ポリシー',
    refundDesc: 'NexData Recovery Proライセンスの10日間返金保証に関する情報。',
    sitemapTitle: 'HTML サイトマップ',
    sitemapDesc: '現在、日本語のHTMLサイトマップページを表示しています。'
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/sitemap`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/sitemap' : `/${l}/sitemap`;
          return acc;
        }, {}),
        'x-default': '/sitemap',
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

export default async function SitemapPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const d = await getDictionary(lang);
  const pdfTools = Object.entries(TOOLS_METADATA).map(([slug, meta]) => {
    const locTool = d?.pdfTools?.tools?.[slug];
    const fallbackTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const cleanTitle = locTool?.title ? locTool.title.split('—')[0].split('–')[0].split('|')[0].trim() : fallbackTitle;
    return {
      slug,
      title: cleanTitle,
      desc: locTool?.description ? locTool.description.split('.')[0] + '.' : meta.description.split('.')[0] + '.',
    };
  });

  const getLink = (path) => {
    return `/${lang}${path}`;
  };

  return (
    <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="badge" style={{ marginBottom: '1.25rem' }}>{t.badge}</div>
        <h1 style={{ marginBottom: '1rem' }}>{t.h1}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.75', margin: '0 auto' }}>
          {t.sub}
        </p>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          
          {/* Main Sections */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Home size={20} /></span>
              {t.sec1Title}
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href={`/${lang}`} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.homeTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.homeDesc}</p>
              </Link>
              <Link href={getLink('/data-recovery')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.recoveryTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.recoveryDesc}</p>
              </Link>
              <Link href={getLink('/docs')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.docsTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.docsDesc}</p>
              </Link>
              <Link href={getLink('/contact')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.contactTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.contactDesc}</p>
              </Link>
            </div>
          </div>

          {/* PDF Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><FileText size={20} /></span>
              {t.sec2Title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {t.sec2Sub}
            </p>
            <div className="dashboard-grid">
              <Link href={getLink('/pdf-toolkit')} className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>{t.pdfWorkspaceTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.pdfWorkspaceDesc}</p>
              </Link>
              {pdfTools.map((tTool) => (
                <Link key={tTool.slug} href={getLink(`/pdf-toolkit/tools/${tTool.slug}`)} className="dashboard-card">
                  <div className="dashboard-card-header">
                    <h3>{tTool.title}</h3>
                    <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                  </div>
                  <p>{tTool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Image Editing Tools */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><Image size={20} /></span>
              {t.sec3Title}
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href={getLink('/image-toolkit')} className="dashboard-card" style={{ gridColumn: '1 / -1', background: 'var(--bg-2)', borderColor: 'var(--border-2)' }}>
                <div className="dashboard-card-header">
                  <h3 style={{ fontWeight: 700 }}>{t.imageWorkspaceTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.imageWorkspaceDesc}</p>
              </Link>
              <Link href={getLink('/image-compressor')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.compressorTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.compressorDesc}</p>
              </Link>
              <Link href={getLink('/image-converter')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.converterTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.converterDesc}</p>
              </Link>
              <Link href={getLink('/image-redactor')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.redactorTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.redactorDesc}</p>
              </Link>
              <Link href={getLink('/exif-stripper')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.stripperTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.stripperDesc}</p>
              </Link>
            </div>
          </div>

          {/* Legal / Policy Pages */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'inline-flex', color: 'var(--text-muted)' }}><ShieldCheck size={20} /></span>
              {t.sec4Title}
            </h2>
            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <Link href={getLink('/privacy')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.privacyTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.privacyDesc}</p>
              </Link>
              <Link href={getLink('/terms')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.termsTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.termsDesc}</p>
              </Link>
              <Link href={getLink('/refund-policy')} className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3>{t.refundTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.refundDesc}</p>
              </Link>
              <Link href={getLink('/sitemap')} className="dashboard-card" style={{ borderStyle: 'dashed' }}>
                <div className="dashboard-card-header">
                  <h3>{t.sitemapTitle}</h3>
                  <span className="dashboard-card-arrow"><ArrowRight size={16} /></span>
                </div>
                <p>{t.sitemapDesc}</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
