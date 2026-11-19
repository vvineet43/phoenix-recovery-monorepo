import Link from 'next/link';
import { locales, ogLocales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  en: {
    title: 'Terms of Service | TheNexTools',
    description: 'The terms of use for TheNexTools utility suite.',
    h1: 'Terms of Service',
    lastUpdated: 'Last updated:',
    localeString: 'en-US',
    sec1Title: 'Acceptance of Terms',
    sec1Desc: 'By accessing or using TheNexTools (the &quot;Site&quot; and &quot;Software&quot;), you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our services.',
    sec2Title: 'License to Use',
    sec2Desc: 'We grant you a non-exclusive, non-transferable license to use our web utilities for personal or commercial purposes. You may not attempt to decompile, reverse-engineer, or extract the source code of our tools without our express written permission.',
    sec3Title: 'Software Provided &quot;As-Is&quot;',
    sec3Desc: 'While we strive for the highest quality and reliability, all tools provided by TheNexTools are offered &quot;as-is&quot; without warranty of any kind. We are not liable for any data loss or hardware damage that may occur while using our software, particularly during data recovery operations.',
    sec4Title: 'Paid Software &amp; Licensing',
    sec4Desc: 'Certain tools, such as NexData Recovery, may require a paid license for full functionality. Licenses are typically tied to specific hardware. Refunds are handled on a case-by-case basis as outlined in our Refund Policy.',
    sec5Title: 'Modifications',
    sec5Desc: 'We reserve the right to modify these terms at any time. Continued use of the site following such changes constitutes acceptance of the new terms.',
    sec6Title: 'Contact',
    sec6Desc: 'Questions about these terms? Contact us at '
  },
  fr: {
    title: 'Conditions d\'Utilisation | TheNexTools',
    description: 'Les conditions d\'utilisation de la suite d\'utilitaires TheNexTools.',
    h1: 'Conditions d\'Utilisation',
    lastUpdated: 'Dernière mise à jour :',
    localeString: 'fr-FR',
    sec1Title: 'Acceptation des Conditions',
    sec1Desc: 'En accédant ou en utilisant TheNexTools (le &quot;Site&quot; et le &quot;Logiciel&quot;), vous acceptez d\'être lié par les présentes Conditions d\'Utilisation. Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser nos services.',
    sec2Title: 'Licence d\'Utilisation',
    sec2Desc: 'Nous vous accordons une licence non exclusive et non transférable pour utiliser nos utilitaires web à des fins personnelles ou commerciales. Vous ne devez pas tenter de décompiler, d\'effectuer une ingénierie inverse ou d\'extraire le code source de nos outils sans notre autorisation écrite expresse.',
    sec3Title: 'Logiciel Fourni &quot;Tel Quel&quot;',
    sec3Desc: 'Bien que nous nous efforcions d\'offrir la plus haute qualité et fiabilité, tous les outils fournis par TheNexTools sont proposés &quot;tels quels&quot; sans garantie d\'aucune sorte. Nous ne sommes pas responsables des pertes de données ou dommages matériels pouvant survenir lors de l\'utilisation de nos logiciels.',
    sec4Title: 'Logiciels Payants et Licences',
    sec4Desc: 'Certains outils, tels que NexData Recovery, peuvent nécessiter une licence payante pour débloquer toutes les fonctionnalités. Les licences sont généralement liées à un matériel spécifique. Les remboursements sont traités conformément à notre Politique de Remboursement.',
    sec5Title: 'Modifications',
    sec5Desc: 'Nous nous réservons le droit de modifier ces conditions à tout moment. L\'utilisation continue du site après de telles modifications vaut acceptation des nouvelles conditions.',
    sec6Title: 'Contact',
    sec6Desc: 'Des questions sur ces conditions ? Contactez-nous à '
  },
  hi: {
    title: 'सेवा की शर्तें | TheNexTools',
    description: 'TheNexTools उपयोगिता सुइट के उपयोग की शर्तें।',
    h1: 'सेवा की शर्तें',
    lastUpdated: 'अंतिम अपडेट:',
    localeString: 'hi-IN',
    sec1Title: 'शर्तों की स्वीकृति',
    sec1Desc: 'TheNexTools (&quot;साइट&quot; और &quot;सॉफ़्टवेयर&quot;) का उपयोग करके, आप इन सेवा की शर्तों से बंधे होने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।',
    sec2Title: 'उपयोग का लाइसेंस',
    sec2Desc: 'हम आपको व्यक्तिगत या व्यावसायिक उद्देश्यों के लिए हमारी वेब उपयोगिताओं का उपयोग करने के लिए एक गैर-अनन्य, गैर-हस्तांतरणीय लाइसेंस प्रदान करते हैं। आप हमारी लिखित अनुमति के बिना हमारे टूल्स के सोर्स कोड को डीकंपाइल या रिवर्स-इंजीनियर करने का प्रयास नहीं कर सकते।',
    sec3Title: 'सॉफ़्टवेयर &quot;जैसा है&quot; (As-Is) के रूप में',
    sec3Desc: 'यद्यपि हम उच्चतम गुणवत्ता और विश्वसनीयता के लिए प्रयास करते हैं, TheNexTools द्वारा प्रदत्त सभी टूल्स बिना किसी वारंटी के &quot;जैसे हैं&quot; के आधार पर प्रदान किए जाते हैं। हमारे सॉफ़्टवेयर के उपयोग के दौरान होने वाले किसी भी डेटा नुकसान या हार्डवेयर क्षति के लिए हम उत्तरदायी नहीं हैं।',
    sec4Title: 'सशुल्क सॉफ़्टवेयर और लाइसेंसिंग',
    sec4Desc: 'कुछ टूल्स, जैसे NexData Recovery, को पूर्ण कार्यक्षमता के लिए सशुल्क लाइसेंस की आवश्यकता हो सकती है। लाइसेंस आमतौर पर विशिष्ट हार्डवेयर से जुड़े होते हैं। रिफंड हमारी रिफंड नीति के अनुसार प्रबंधित किए जाते हैं।',
    sec5Title: 'संशोधन',
    sec5Desc: 'हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं। ऐसे परिवर्तनों के बाद साइट का निरंतर उपयोग नई शर्तों की स्वीकृति माना जाएगा।',
    sec6Title: 'संपर्क करें',
    sec6Desc: 'इन शर्तों के बारे में कोई प्रश्न हैं? हमसे संपर्क करें: '
  },
  tr: {
    title: 'Hizmet Şartları | TheNexTools',
    description: 'TheNexTools araç paketi kullanım şartları.',
    h1: 'Hizmet Şartları',
    lastUpdated: 'Son güncelleme:',
    localeString: 'tr-TR',
    sec1Title: 'Şartların Kabulü',
    sec1Desc: 'TheNexTools\'a (&quot;Site&quot; ve &quot;Yazılım&quot;) erişerek veya bunları kullanarak bu Hizmet Şartları\'na bağlı kalmayı kabul edersiniz. Bu şartları kabul etmiyorsanız lütfen hizmetlerimizi kullanmayın.',
    sec2Title: 'Kullanım Lisansı',
    sec2Desc: 'Web araçlarımızı kişisel veya ticari amaçlarla kullanmanız için size münhasır olmayan, devredilemez bir lisans veriyoruz. Açık yazılı iznimiz olmadan araçlarımızın kaynak kodunu tersine mühendislikle çözmeye veya çıkarmaya çalışamazsınız.',
    sec3Title: '&quot;Olduğu Gibi&quot; (As-Is) Yazılım',
    sec3Desc: 'En yüksek kalite ve güvenilirlik için çaba göstersek de TheNexTools tarafından sağlanan tüm araçlar hiçbir garanti olmaksızın &quot;olduğu gibi&quot; sunulmaktadır. Yazılımımızın kullanımı sırasında oluşabilecek veri kaybı veya donanım hasarlarından sorumlu değiliz.',
    sec4Title: 'Ücretli Yazılım ve Lisanslama',
    sec4Desc: 'NexData Recovery gibi bazı araçlar tam işlevsellik için ücretli bir lisans gerektirebilir. Lisanslar genellikle belirli bir donanıma bağlıdır. İadeler İade Politikamızda belirtilen kurallara göre değerlendirilir.',
    sec5Title: 'Değişiklikler',
    sec5Desc: 'Bu şartları istediğimiz zaman değiştirme hakkımızı saklı tutarız. Değişikliklerden sonra siteyi kullanmaya devam etmeniz yeni şartları kabul ettiğiniz anlamına gelir.',
    sec6Title: 'İletişim',
    sec6Desc: 'Bu şartlar hakkında sorularınız mı var? Bize ulaşın: '
  },
  es: {
    title: 'Términos de Servicio | TheNexTools',
    description: 'Los términos de uso de la suite de utilidades de TheNexTools.',
    h1: 'Términos de Servicio',
    lastUpdated: 'Última actualización:',
    localeString: 'es-ES',
    sec1Title: 'Aceptación de los Términos',
    sec1Desc: 'Al acceder o utilizar TheNexTools (el &quot;Sitio&quot; y el &quot;Software&quot;), aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, no utilices nuestros servicios.',
    sec2Title: 'Licencia de Uso',
    sec2Desc: 'Te otorgamos una licencia no exclusiva y no transferible para utilizar nuestras utilidades web con fines personales o comerciales. No debes intentar descompilar, realizar ingeniería inversa o extraer el código fuente de nuestras herramientas sin nuestro permiso expreso por escrito.',
    sec3Title: 'Software &quot;Tal Cual&quot;',
    sec3Desc: 'Aunque nos esforzamos por ofrecer la máxima calidad y fiabilidad, todas las herramientas proporcionadas por TheNexTools se ofrecen &quot;tal cual&quot; sin garantía de ningún tipo. No nos hacemos responsables de ninguna pérdida de datos o daño de hardware que pueda ocurrir durante el uso de nuestro software, especialmente en las operaciones de recuperación de datos.',
    sec4Title: 'Software de Pago y Licencias',
    sec4Desc: 'Ciertas herramientas, como NexData Recovery, pueden requerir una licencia de pago para su funcionalidad completa. Las licencias suelen estar vinculadas a hardware específico. Los reembolsos se gestionan caso por caso según lo descrito en nuestra documentación.',
    sec5Title: 'Modificaciones',
    sec5Desc: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio después de dichos cambios constituye la aceptación de los nuevos términos.',
    sec6Title: 'Contacto',
    sec6Desc: '¿Preguntas sobre estos términos? Contáctanos en '
  },
  pt: {
    title: 'Termos de Serviço | TheNexTools',
    description: 'Os termos de uso da suíte de utilidades de TheNexTools.',
    h1: 'Termos de Serviço',
    lastUpdated: 'Última atualização:',
    localeString: 'pt-PT',
    sec1Title: 'Aceitação dos Termos',
    sec1Desc: 'Ao acessar ou utilizar TheNexTools (o &quot;Site&quot; e o &quot;Software&quot;), você concorda em estar sujeito a estes Termos de Serviço. Se você não concorda com estes termos, por favor não use nossos serviços.',
    sec2Title: 'Licença de Uso',
    sec2Desc: 'Concedemos a você uma licença não exclusiva e não transferível para usar nossos utilitários web para fins pessoais ou comerciais. Você não deve tentar decompilar, fazer engenharia reversa ou extrair o código-fonte de nossas ferramentas sem nossa permissão expressa por escrito.',
    sec3Title: 'Software &quot;Como Está&quot;',
    sec3Desc: 'Embora nos esforcemos para oferecer a máxima qualidade e confiabilidade, todas as ferramentas fornecidas por TheNexTools são oferecidas &quot;como estão&quot; sem garantia de qualquer tipo. Não nos responsabilizamos por qualquer perda de dados ou dano de hardware que possa ocorrer durante o uso de nosso software, especialmente nas operações de recuperação de dados.',
    sec4Title: 'Software Pago e Licenciamento',
    sec4Desc: 'Certas ferramentas, como o NexData Recovery, podem exigir uma licença paga para funcionalidade completa. As licenças geralmente são vinculadas a hardware específico. Os reembolsos são gerenciados caso a caso, conforme descrito em nossa documentação.',
    sec5Title: 'Modificações',
    sec5Desc: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. O uso contínuo do site após tais alterações constitui aceitação dos novos termos.',
    sec6Title: 'Contato',
    sec6Desc: 'Dúvidas sobre estes termos? Fale conosco em '
  },
  sw: {
    title: 'Masharti ya Huduma | TheNexTools',
    description: 'Masharti ya matumizi ya mkusanyiko wa zana za TheNexTools.',
    h1: 'Masharti ya Huduma',
    lastUpdated: 'Ilisasishwa mwisho:',
    localeString: 'sw',
    sec1Title: 'Kukubaliana na Masharti',
    sec1Desc: 'Kwa kufikia au kutumia TheNexTools (&quot;Tovuti&quot; na &quot;Programu&quot;), unakubali kuzingatia Masharti haya ya Huduma. Ikiwa hukubaliani na masharti haya, tafadhali usitumie huduma zetu.',
    sec2Title: 'Leseni ya Matumizi',
    sec2Desc: 'Tunakupa leseni isiyo ya kipekee, isiyoweza kuhamishwa ya kutumia zana zetu za mtandaoni kwa madhumuni ya kibinafsi au ya kibiashara. Hupaswi kujaribu kuondoa msimbo, kubadilisha uhandisi, au kutoa msimbo wa chanzo wa zana zetu bila ruhusa yetu ya wazi ya maandishi.',
    sec3Title: 'Programu kama ilivyo (&quot;As-Is&quot;)',
    sec3Desc: 'Ingawa tunajitahidi kutoa ubora na uaminifu wa juu zaidi, zana zote zinazotolewa na TheNexTools zinatolewa &quot;kama zilivyo&quot; bila dhamana ya aina yoyote. Hatutawajibika kwa upotezaji wowote wa data au uharibifu wa vifaa ambao unaweza kutokea wakati wa kutumia programu yetu, hasa katika shughuli za kurejesha data.',
    sec4Title: 'Programu ya Kulipia na Leseni',
    sec4Desc: 'Zana fulani, kama vile Urejeshaji wa NexData, zinaweza kuhitaji leseni ya kulipia kwa utendaji kamili. Leseni kawaida hufungamanishwa na vifaa maalum. Urejeshaji wa fedha unashughulikiwa kwa msingi wa kesi kwa kesi kama inavyoelezwa katika nyaraka zetu.',
    sec5Title: 'Mabadiliko ya Masharti',
    sec5Desc: 'Tunasajili haki ya kurekebisha masharti haya wakati wowote. Kuendelea kutumia tovuti baada ya mabadiliko hayo hufanya ukubaliane na masharti mapya.',
    sec6Title: 'Wasiliana Nasi',
    sec6Desc: 'Maswali kuhusu masharti haya? Wasiliana nasi kwa '
  },
  bn: {
    title: 'ব্যবহারের শর্তাবলী | TheNexTools',
    description: 'TheNexTools ইউটিলিটি সুইট ব্যবহারের শর্তাবলী।',
    h1: 'ব্যবহারের শর্তাবলী',
    lastUpdated: 'সর্বশেষ আপডেট:',
    localeString: 'bn-BD',
    sec1Title: 'শর্তাবলী গ্রহণ করা',
    sec1Desc: 'TheNexTools (&quot;সাইট&quot; এবং &quot;সফটওয়্যার&quot;) অ্যাক্সেস বা ব্যবহার করার মাধ্যমে, আপনি এই ব্যবহারের শর্তাবলী মেনে চলতে সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তবে দয়া করে আমাদের পরিত্যাগ করুন এবং পরিষেবাগুলো ব্যবহার করবেন না।',
    sec2Title: 'ব্যবহারের লাইসেন্স',
    sec2Desc: 'আমরা আপনাকে ব্যক্তিগত বা ব্যবসায়িক উদ্দেশ্যে আমাদের ওয়েব ইউটিলিটিগুলো ব্যবহার করার জন্য একটি অ-একচেটিয়া, অ-হস্তান্তরযোগ্য লাইসেন্স প্রদান করছি। আমাদের স্পষ্ট লিখিত অনুমতি ছাড়া আপনি আমাদের টুলগুলোর সোর্স কোড ডিকম্পাইল, রিভার্স ইঞ্জিনিয়ারিং বা এক্সট্রাক্ট করার চেষ্টা করবেন না।',
    sec3Title: 'সফটওয়্যার &quot;যেমন আছে&quot; (As-Is) ভিত্তিতে প্রদান',
    sec3Desc: 'যদিও আমরা সর্বোচ্চ গুণমান এবং নির্ভরযোগ্যতা নিশ্চিত করার চেষ্টা করি, TheNexTools দ্বারা প্রদত্ত সমস্ত টুল কোনো ওয়ারেন্টি ছাড়াই &quot;যেমন আছে&quot; ভিত্তিতে প্রদান করা হয়। আমাদের সফটওয়্যার ব্যবহারের সময় কোনো ডেটা হারানো বা হার্ডওয়্যারের ক্ষতির জন্য আমরা দায়ী থাকব না, বিশেষ করে ডেটা পুনরুদ্ধারের কাজের ক্ষেত্রে।',
    sec4Title: 'পেইড সফটওয়্যার এবং লাইসেন্সিং',
    sec4Desc: 'NexData Recovery-এর মতো কিছু টুলের সম্পূর্ণ কার্যকারিতার জন্য পেইড লাইসেন্সের প্রয়োজন হতে পারে। লাইসেন্সগুলো সাধারণত নির্দিষ্ট হার্ডওয়্যারের সাথে লিঙ্ক করা থাকে। আমাদের ডকুমেন্টেশনে বর্ণিত নিয়ম অনুযায়ী রিফান্ডগুলো কেস-বাই-কেস ভিত্তিতে পরিচালনা করা হয়।',
    sec5Title: 'পরিবর্তনসমূহ',
    sec5Desc: 'আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার সংরক্ষণ করি। এই ধরনের পরিবর্তনের পর সাইটের ক্রমাগত ব্যবহার নতুন শর্তাবলীর গ্রহণযোগ্যতা হিসেবে গণ্য হবে।',
    sec6Title: 'যোগাযোগ',
    sec6Desc: 'এই শর্তাবলী সম্পর্কে কোনো প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন: '
  },
  de: {
    title: 'Nutzungsbedingungen | TheNexTools',
    description: 'Die Nutzungsbedingungen für die Utility-Suite von TheNexTools.',
    h1: 'Nutzungsbedingungen',
    lastUpdated: 'Zuletzt aktualisiert:',
    localeString: 'de-DE',
    sec1Title: 'Annahme der Bedingungen',
    sec1Desc: 'Durch den Zugriff auf oder die Nutzung von TheNexTools (die &quot;Website&quot; und die &quot;Software&quot;) erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie unsere Dienste bitte nicht.',
    sec2Title: 'Nutzungslizenz',
    sec2Desc: 'Wir gewähren Ihnen eine nicht exklusive, nicht übertragbare Lizenz zur Nutzung unserer Web-Utilitys für persönliche oder kommerzielle Zwecke. Sie dürfen nicht versuchen, den Quellcode unserer Werkzeuge ohne unsere ausdrückliche schriftliche Genehmigung zu dekompilieren, zurückzuentwickeln oder zu extrahieren.',
    sec3Title: 'Software &quot;wie besehen&quot; (As-Is)',
    sec3Desc: 'Obwohl wir uns um höchste Qualität und Zuverlässigkeit bemühen, werden alle von TheNexTools bereitgestellten Werkzeuge &quot;wie besehen&quot; und ohne Mängelgewähr angeboten. Wir haften nicht für Datenverlust oder Hardwarebeschädigungen, die während der Nutzung unserer Software auftreten können, insbesondere bei Datenrettungsmaßnahmen.',
    sec4Title: 'Kostenpflichtige Software und Lizenzierung',
    sec4Desc: 'Bestimmte Werkzeuge wie NexData Recovery erfordern möglicherweise eine kostenpflichtige Lizenz für den vollen Funktionsumfang. Lizenzen sind in der Regel an bestimmte Hardware gebunden. Rückerstattungen werden von Fall zu Fall gemäß den Angaben in unserer Dokumentation bearbeitet.',
    sec5Title: 'Änderungen',
    sec5Desc: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Die fortgesetzte Nutzung der Website nach solchen Änderungen gilt als Annahme der neuen Bedingungen.',
    sec6Title: 'Kontakt',
    sec6Desc: 'Fragen zu diesen Bedingungen? Kontaktieren Sie uns unter '
  },
  nl: {
    title: 'Algemene Voorwaarden | TheNexTools',
    description: 'De gebruiksvoorwaarden voor de utility suite van TheNexTools.',
    h1: 'Algemene Voorwaarden',
    lastUpdated: 'Laatst bijgewerkt:',
    localeString: 'nl-NL',
    sec1Title: 'Acceptatie van de Voorwaarden',
    sec1Desc: 'Door TheNexTools (de &quot;Site&quot; en de &quot;Software&quot;) te bezoeken of te gebruiken, gaat u akkoord met deze Algemene Voorwaarden. Als u niet akkoord gaat met deze voorwaarden, gebruik onze diensten dan niet.',
    sec2Title: 'Gebruikslicentie',
    sec2Desc: 'We verlenen u een niet-exclusieve, niet-overdraagbare licentie om onze webhulpprogramma\'s te gebruiken voor persoonlijke of commerciële doeleinden. U mag niet proberen de broncode van onze tools te decompileren, te reverse-engineeren of te extraheren zonder onze uitdrukkelijke schriftelijke toestemming.',
    sec3Title: 'Software &quot;as-is&quot;',
    sec3Desc: 'Hoewel we streven naar de hoogste kwaliteit en betrouwbaarheid, worden alle door TheNexTools geleverde tools &quot;as-is&quot; aangeboden zonder enige vorm van garantie. Wij zijn niet aansprakelijk voor eventueel gegevensverlies of hardwareschade die optreedt tijdens het gebruik van onze software, met name bij dataherstelactiviteiten.',
    sec4Title: 'Betaalde Software en Licenties',
    sec4Desc: 'Voor bepaalde tools, zoals NexData Recovery, is mogelijk een betaalde licentie vereist voor volledige functionaliteit. Licenties zijn doorgaans gekoppeld aan specifieke hardware. Terugbetalingen worden van geval tot geval afgehandeld zoals beschreven in onze documentatie.',
    sec5Title: 'Wijzigingen',
    sec5Desc: 'Wij behouden ons het recht voor om deze voorwaarden op elk moment te wijzigen. Het voortgezet gebruik van de site na dergelijke wijzigingen houdt in dat u akkoord gaat met de nieuwe voorwaarden.',
    sec6Title: 'Contact',
    sec6Desc: 'Vragen over deze voorwaarden? Neem contact met ons op via '
  },
  it: {
    title: 'Termini di Servizio | TheNexTools',
    description: 'I termini di utilizzo della suite di utility di TheNexTools.',
    h1: 'Termini di Servizio',
    lastUpdated: 'Ultimo aggiornamento:',
    localeString: 'it-IT',
    sec1Title: 'Accettazione dei Termini',
    sec1Desc: 'Accedendo o utilizzando TheNexTools (il &quot;Sito&quot; e il &quot;Software&quot;), accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare i nostri servizi.',
    sec2Title: 'Licenza d\'Uso',
    sec2Desc: 'Ti concediamo una licenza non esclusiva e non trasferibile per l\'utilizzo delle nostre utility web per scopi personali o commerciali. Non devi tentare di decompilare, decodificare o estrarre il codice sorgente dei nostri strumenti senza il nostro esplicito permesso scritto.',
    sec3Title: 'Software &quot;Così Com\'è&quot; (As-Is)',
    sec3Desc: 'Sebbene ci impegniamo a offrire la massima qualità e affidabilità, tutti gli strumenti forniti da TheNexTools sono offerti &quot;così come sono&quot; senza garanzie di alcun tipo. Non siamo responsabili per eventuali perdite di dati o danni all\'hardware che potrebbero verificarsi durante l\'uso del nostro software, in particolare nelle operazioni di recupero dati.',
    sec4Title: 'Software a Pagamento e Licenze',
    sec4Desc: 'Alcuni strumenti, come NexData Recovery, potrebbero richiedere una licenza a pagamento per la funzionalità completa. Le licenze sono solitamente legate a hardware specifico. I rimborsi sono gestiti caso per caso come descritto nella nostra documentazione.',
    sec5Title: 'Modifiche',
    sec5Desc: 'Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. L\'uso continuato del sito dopo tali modifiche costituisce l\'accettazione dei nuovi termini.',
    sec6Title: 'Contatto',
    sec6Desc: 'Domande su questi termini? Contattaci all\'indirizzo '
  },
  ja: {
    title: '利用規約 | TheNexTools',
    description: 'TheNexToolsユーティリティスイートの利用規約。',
    h1: '利用規約',
    lastUpdated: '最終更新日:',
    localeString: 'ja-JP',
    sec1Title: '規約への同意',
    sec1Desc: 'TheNexTools（「当サイト」および「当ソフトウェア」）にアクセスまたは使用することにより、お客様は本利用規約に同意したものとみなされます。これらの規約に同意しない場合は、当社のサービスを使用しないでください。',
    sec2Title: '使用許諾ライセンス',
    sec2Desc: '当社は、お客様に対し、個人的または商業的目的で当社のウェブユーティリティを使用するための、非独占的かつ譲渡不能なライセンスを付与します。当社の書面による明示的な許可なしに、ツールのソースコードをデコンパイル、リバースエンジニアリング、または抽出することを試みてはなりません。',
    sec3Title: '「現状有姿」（As-Is）での提供',
    sec3Desc: '最高品質と信頼性の提供に努めておりますが、TheNexToolsが提供するすべてのツールは「現状有姿」で提供され、いかなる保証も行いません。当社のソフトウェアの使用中に発生したデータの損失やハードウェアの破損（特にデータ復元処理）について、当社は一切の責任を負いません。',
    sec4Title: '有料ソフトウェアとライセンス',
    sec4Desc: 'NexData Recoveryなどの特定のツールでは、フル機能を使用するために有料ライセンスが必要になる場合があります。ライセンスは通常、特定のハードウェアに関連付けられています。返金は、ドキュメントに記載されている通り、ケースバイケースで処理されます。',
    sec5Title: '規約の変更',
    sec5Desc: '当社は、いつでもこれらの規約を変更する権利を留保します。変更後にサイトの使用を継続することは、新しい規約への同意とみなされます。',
    sec6Title: 'お問い合わせ',
    sec6Desc: '本規約に関するご質問は、以下までお問い合わせください: '
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
      canonical: `/${lang}/terms`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/terms' : `/${l}/terms`;
          return acc;
        }, {}),
        'x-default': '/terms',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      siteName: 'TheNexTools',
      locale: ogLocales[lang] || 'en_US',
      images: [
        {
          url: 'https://thenextools.com/thenextools-com-og-image.png',
          width: 1200,
          height: 630,
          alt: t.title,
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

export default async function TermsPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.lastUpdated} {new Date().toLocaleDateString(t.localeString)}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{t.sec1Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.sec1Desc }} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{t.sec2Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.sec2Desc }} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{t.sec3Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.sec3Desc }} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{t.sec4Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.sec4Desc }} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{t.sec5Title}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.sec5Desc }} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem' }}>{t.sec6Title}</h2>
          <p>
            {t.sec6Desc}
            <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
