import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  es: {
    title: 'Documentación | TheNexTools',
    description: 'Aprende cómo usar la suite de utilidades de TheNexTools con prioridad en la privacidad.',
    h1: 'Documentación',
    textMuted: 'Guías y consejos de inicio rápido para TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData funciona escaneando sectores físicos del disco. Para obtener mejores resultados:',
    sec1Li1: 'Conecta la unidad de destino mediante una conexión USB o SATA estable.',
    sec1Li2: 'Asegúrate de tener suficiente espacio libre en un disco **diferente** para guardar los archivos recuperados.',
    sec1Li3: 'Evita escribir cualquier dato nuevo en la unidad que estás escaneando.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Todas las operaciones de PDF se realizan en tu navegador utilizando la CPU local. Las características compatibles incluyen:',
    sec2Li1: '<strong>Combinar:</strong> Combina múltiples archivos en cualquier orden.',
    sec2Li2: '<strong>Firmar:</strong> Coloca firmas como elementos vectoriales aplanados.',
    sec2Li3: '<strong>Comprimir:</strong> Reduce el tamaño del archivo con preajustes de calidad en tiempo real.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Procesa fotos completamente sin conexión en tu navegador. Operaciones compatibles:',
    secImgLi1: '<strong>EXIF Stripper:</strong> Elimina coordenadas GPS, modelo de cámara y marcas de tiempo.',
    secImgLi2: '<strong>Compresor:</strong> Optimiza tamaños de archivo con previsualización en tiempo real.',
    secImgLi3: '<strong>Conversor:</strong> Convierte entre formatos (JPG, PNG, WebP) en lote.',
    secImgLi4: '<strong>Redactor:</strong> Difumina rostros, matrículas y detalles sensibles.',
    sec3Title: 'Solución de Problemas de PWA',
    sec3Desc: 'Para instalar nuestras herramientas como aplicaciones independientes:',
    sec3Li1: '<strong>Chrome:</strong> Busca el icono de &quot;Instalar&quot; en el lado derecho de la barra de direcciones.',
    sec3Li2: '<strong>iOS Safari:</strong> Toca Compartir &rarr; Añadir a la pantalla de inicio.',
    sec3Li3: '<strong>Android:</strong> Toca el banner de &quot;Añadir a la pantalla de inicio&quot; o el menú del navegador.'
  },
  pt: {
    title: 'Documentação | TheNexTools',
    description: 'Aprenda como usar a suíte de utilidades de TheNexTools com prioridade na privacidade.',
    h1: 'Documentação',
    textMuted: 'Guias e dicas de início rápido para TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData funciona escaneando setores físicos do disco. Para obter melhores resultados:',
    sec1Li1: 'Conecte a unidade de destino usando uma conexão USB ou SATA estável.',
    sec1Li2: 'Certifique-se de ter espaço livre suficiente em um disco **diferente** para salvar os arquivos recuperados.',
    sec1Li3: 'Evite gravar qualquer dado novo na unidade que você está escaneando.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Todas as operações de PDF ocorrem no seu navegador usando a CPU local. Os recursos suportados incluem:',
    sec2Li1: '<strong>Mesclar:</strong> Combine vários arquivos em qualquer ordem.',
    sec2Li2: '<strong>Assinar:</strong> Coloque assinaturas como elementos vetoriais achatados.',
    sec2Li3: '<strong>Compactar:</strong> Reduza o tamanho do arquivo com predefinições de qualidade em tempo real.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Processe fotos totalmente offline no seu navegador. Operações suportadas:',
    secImgLi1: '<strong>EXIF Stripper:</strong> Remova coordenadas GPS, modelo da câmera e carimbos de data/hora.',
    secImgLi2: '<strong>Compressor:</strong> Otimize o tamanho dos arquivos com visualização de compressão em tempo real.',
    secImgLi3: '<strong>Conversor:</strong> Converta entre formatos (JPG, PNG, WebP) em lote.',
    secImgLi4: '<strong>Redator:</strong> Desfoque rostros, placas e detalhes sensíveis.',
    sec3Title: 'Solução de problemas de PWA',
    sec3Desc: 'Para instalar nossas ferramentas como aplicativos independentes:',
    sec3Li1: '<strong>Chrome:</strong> Procure o ícone &quot;Instalar&quot; no lado direito da barra de endereços.',
    sec3Li2: '<strong>iOS Safari:</strong> Toque em Compartilhar &rarr; Adicionar à tela inicial.',
    sec3Li3: '<strong>Android:</strong> Toque no banner &quot;Adicionar à tela inicial&quot; ou no menu do navegador.'
  },
  hi: {
    title: 'डॉक्यूमेंटेशन | TheNexTools',
    description: 'TheNexTools के गोपनीयता-प्रथम उपयोगिताओं का उपयोग करना सीखें।',
    h1: 'डॉक्यूमेंटेशन',
    textMuted: 'TheNexTools के लिए त्वरित-शुरुआत मार्गदर्शिकाएँ और सुझाव।',
    sec1Title: 'NexData रिकवरी',
    sec1Desc: 'NexData भौतिक डिस्क सेक्टर्स को स्कैन करके काम करता है। सर्वोत्तम परिणामों के लिए:',
    sec1Li1: 'लक्षित ड्राइव को एक स्थिर USB या SATA कनेक्शन के माध्यम से कनेक्ट करें।',
    sec1Li2: 'सुनिश्चित करें कि आपके पास बरामद फ़ाइलों को सहेजने के लिए एक **अलग** ड्राइव पर पर्याप्त जगह है।',
    sec1Li3: 'जिस ड्राइव को आप स्कैन कर रहे हैं, उस पर कोई नया डेटा लिखने से बचें।',
    sec2Title: 'NexPDF टूलकिट',
    sec2Desc: 'सभी PDF प्रक्रियाएं आपके स्थानीय CPU का उपयोग करके आपके ब्राउज़र में होती हैं। समर्थित सुविधाओं में शामिल हैं:',
    sec2Li1: '<strong>मर्ज करें:</strong> किसी भी क्रम में कई फ़ाइलों को संयोजित करें।',
    sec2Li2: '<strong>हस्ताक्षर:</strong> सपाट वेक्टर तत्वों के रूप में हस्ताक्षर रखें।',
    sec2Li3: '<strong>कंप्रेस करें:</strong> रीयल-टाइम गुणवत्ता प्रीसेट के साथ फ़ाइल आकार घटाएं।',
    secImgTitle: 'NexImage टूलकिट',
    secImgDesc: 'अपने ब्राउज़र में पूरी तरह से ऑफ़लाइन फ़ोटो प्रोसेस करें। समर्थित प्रक्रियाएं:',
    secImgLi1: '<strong>EXIF स्ट्रिपर:</strong> GPS निर्देशांक, कैमरा मॉडल और समय डेटा हटाएं।',
    secImgLi2: '<strong>कंप्रेशन:</strong> रीयल-टाइम पूर्वावलोकन के साथ छवि फ़ाइल आकार अनुकूलित करें।',
    secImgLi3: '<strong>कन्वर्टर:</strong> थोक में प्रारूपों (JPG, PNG, WebP) के बीच बदलें।',
    secImgLi4: '<strong>रेडैक्टर:</strong> चेहरे, नंबर प्लेट और संवेदनशील विवरणों को धुंधला करें।',
    sec3Title: 'PWA समस्या निवारण',
    sec3Desc: 'हमारे टूल्स को स्टैंडअलोन ऐप के रूप में स्थापित करने के लिए:',
    sec3Li1: '<strong>Chrome:</strong> एड्रेस बार के दाईं ओर &quot;इंस्टॉल&quot; आइकन ढूंढें।',
    sec3Li2: '<strong>iOS Safari:</strong> शेयर &rarr; होम स्क्रीन पर जोड़ें टैप करें।',
    sec3Li3: '<strong>Android:</strong> &quot;होम स्क्रीन पर जोड़ें&quot; बैनर या ब्राउज़र मेनू पर टैप करें।'
  },
  tr: {
    title: 'Dokümantasyon | TheNexTools',
    description: 'TheNexTools gizlilik öncelikli araçlar paketini nasıl kullanacağınızı öğrenin.',
    h1: 'Dokümantasyon',
    textMuted: 'TheNexTools için kılavuzlar ve hızlı başlangıç ipuçları.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData, fiziksel disk sektörlerini tarayarak çalışır. En iyi sonuçlar için:',
    sec1Li1: 'Hedef sürücüyü sabit bir USB veya SATA bağlantısı üzerinden bağlayın.',
    sec1Li2: 'Kurtarılan dosyaları kaydetmek için **farklı** bir sürücüde yeterli boş alan olduğundan emin olun.',
    sec1Li3: 'Taradığınız sürücüye yeni veri yazmaktan kaçının.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Tüm PDF işlemleri, yerel işlemciniz kullanılarak tarayıcınızda gerçekleşir. Desteklenen özellikler:',
    sec2Li1: '<strong>Birleştir:</strong> Birden fazla dosyayı istediğiniz sırada birleştirin.',
    sec2Li2: '<strong>İmzala:</strong> İmzaları düzleştirilmiş vektör öğeleri olarak yerleştirin.',
    sec2Li3: '<strong>Sıkıştır:</strong> Gerçek zamanlı kalite ön ayarlarıyla dosya boyutunu azaltın.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Fotoğrafları tarayıcınızda tamamen çevrimdışı işleyin. Desteklenen işlemler:',
    secImgLi1: '<strong>EXIF Temizleyici:</strong> GPS koordinatlarını, kamera modelini ve zaman damgası verilerini kaldırın.',
    secImgLi2: '<strong>Sıkıştırıcı:</strong> Gerçek zamanlı sıkıştırma kalitesi önizlemeleriyle resim boyutlarını optimize edin.',
    secImgLi3: '<strong>Dönüştürücü:</strong> Formatlar (JPG, PNG, WebP) arasında toplu dönüştürme yapın.',
    secImgLi4: '<strong>Sansürleyici:</strong> Yüzleri, plakaları ve hassas ayrıntıları bulanıklaştırın.',
    sec3Title: 'PWA Sorun Giderme',
    sec3Desc: 'Araçlarımızı bağımsız uygulamalar olarak yüklemek için:',
    sec3Li1: '<strong>Chrome:</strong> Adres çubuğunun sağ tarafındaki &quot;Yükle&quot; simgesine bakın.',
    sec3Li2: '<strong>iOS Safari:</strong> Paylaş &rarr; Ana Ekrana Ekle seçeneğine dokunun.',
    sec3Li3: '<strong>Android:</strong> &quot;Ana Ekrana Ekle&quot; başlığına veya tarayıcı menüsüne dokunun.'
  },
  fr: {
    title: 'Documentation | TheNexTools',
    description: 'Apprenez à utiliser la suite d\'outils respectueux de la vie privée TheNexTools.',
    h1: 'Documentation',
    textMuted: 'Guides et conseils de démarrage rapide pour TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData fonctionne en analysant les secteurs physiques du disque. Pour de meilleurs résultats :',
    sec1Li1: 'Connectez le disque cible via une connexion USB ou SATA stable.',
    sec1Li2: 'Assurez-vous de disposer de suffisamment d\'espace sur un disque **différent** pour sauvegarder les fichiers récupérés.',
    sec1Li3: 'Évitez d\'écrire de nouvelles données sur le disque en cours d\'analyse.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Toutes les opérations PDF s\'effectuent dans votre navigateur en utilisant votre processeur local. Fonctionnalités prises en charge :',
    sec2Li1: '<strong>Fusionner:</strong> Combinez plusieurs fichiers dans n\'importe quel ordre.',
    sec2Li2: '<strong>Signer:</strong> Apposez des signatures sous forme d\'éléments vectoriels aplatis.',
    sec2Li3: '<strong>Compresser:</strong> Réduisez la taille du fichier avec des préréglages de qualité en temps réel.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Traisez les photos entièrement hors ligne dans votre navigateur. Opérations prises en charge :',
    secImgLi1: '<strong>EXIF Stripper:</strong> Supprimez les coordonnées GPS, le modèle de l\'appareil et les données de date.',
    secImgLi2: '<strong>Compresseur:</strong> Optimisez la taille des images avec des aperçus de compression en temps réel.',
    secImgLi3: '<strong>Convertisseur:</strong> Convertissez par lots entre les formats (JPG, PNG, WebP).',
    secImgLi4: '<strong>Floutage:</strong> Floutez les visages, plaques d\'immatriculation et détails sensibles.',
    sec3Title: 'Dépannage des PWA',
    sec3Desc: 'Pour installer nos outils en tant qu\'applications autonomes :',
    sec3Li1: '<strong>Chrome:</strong> Recherchez l\'icône &quot;Installer&quot; dans la barre d\'adresse à droite.',
    sec3Li2: '<strong>iOS Safari:</strong> Appuyez sur Partager &rarr; Sur l\'écran d\'accueil.',
    sec3Li3: '<strong>Android:</strong> Appuyez sur la bannière &quot;Ajouter à l\'écran d\'accueil&quot; ou le menu du navigateur.'
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}/docs`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/docs' : `/${l}/docs`;
          return acc;
        }, {}),
        'x-default': '/docs',
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

export default async function DocsPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": t.title,
            "description": t.description,
            "url": `https://thenextools.com/${lang}/docs`,
            "inLanguage": lang,
            "about": [
              {
                "@type": "Thing",
                "name": "Data Recovery"
              },
              {
                "@type": "Thing",
                "name": "PDF Editing"
              },
              {
                "@type": "Thing",
                "name": "Image Editing"
              }
            ]
          })
        }}
      />

      <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
        <header style={{ marginBottom: '4rem' }}>
          <h1>{t.h1}</h1>
          <p className="text-muted">{t.textMuted}</p>
        </header>

        <section className="docs-grid" style={{ display: 'grid', gap: '3rem' }}>
          <div>
            <h3>{t.sec1Title}</h3>
            <p className="mt-sm">{t.sec1Desc}</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>{t.sec1Li1}</li>
              <li>{t.sec1Li2}</li>
              <li>{t.sec1Li3}</li>
            </ul>
          </div>

          <div>
            <h3>{t.sec2Title}</h3>
            <p className="mt-sm">{t.sec2Desc}</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li dangerouslySetInnerHTML={{ __html: t.sec2Li1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.sec2Li2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.sec2Li3 }} />
            </ul>
          </div>

          <div>
            <h3>{t.secImgTitle}</h3>
            <p className="mt-sm">{t.secImgDesc}</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li dangerouslySetInnerHTML={{ __html: t.secImgLi1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.secImgLi2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.secImgLi3 }} />
              <li dangerouslySetInnerHTML={{ __html: t.secImgLi4 }} />
            </ul>
          </div>

          <div>
            <h3>{t.sec3Title}</h3>
            <p className="mt-sm">{t.sec3Desc}</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li dangerouslySetInnerHTML={{ __html: t.sec3Li1 }} />
              <li dangerouslySetInnerHTML={{ __html: t.sec3Li2 }} />
              <li dangerouslySetInnerHTML={{ __html: t.sec3Li3 }} />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
