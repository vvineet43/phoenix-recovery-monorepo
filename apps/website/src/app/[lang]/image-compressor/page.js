import Link from 'next/link';
import { ImageCompressorPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  en: {
    title: 'Image Compressor — Shrink JPG, PNG, WebP Locally | TheNexTools',
    description: 'Compress images in your browser without uploading them. Adjust quality, compare before and after at full resolution, and download — individually or as a batch ZIP.',
    steps: [
      { title: 'Add Images', desc: 'Select or drag JPG, PNG, or WebP files into the compressor.' },
      { title: 'Tune Compression', desc: 'Adjust the quality slider and preview original vs. compressed side-by-side.' },
      { title: 'Download Output', desc: 'Save your compressed images individually or as a single consolidated ZIP.' }
    ],
    badge: 'NexCompress — Local & Private',
    h1: 'Compress images without uploading them anywhere.',
    p1: 'Every other image compressor sends your files to a server, processes them remotely, and sends them back. That\'s fine until it isn\'t — the file is too large, the queue is slow, or the image is something you\'d rather keep private. NexCompress runs the same compression algorithms directly in your browser. Faster, no size limits, and nothing leaves your machine.',
    schemaTitle: 'NexCompress Image Compressor',
    schemaHome: 'Home',
    schemaToolkit: 'Image Toolkit',
    schemaTool: 'Image Compressor',
    howToTitle: 'How to compress images offline',
    diffTitle: 'What makes this different from TinyPNG',
    diffDesc: 'The things that actually matter when you\'re compressing images on a regular basis — not just one file at a time through a web form.',
    feat1Title: 'Output to JPEG, PNG, or WebP',
    feat1Desc: 'Pick your output format as part of the compression step. PNGs with transparency stay lossless. For JPEG and WebP, drag the quality slider anywhere from 10% to 100% and the estimated file size updates as you move it. You see the trade-off before you commit.',
    feat2Title: 'Side-by-side comparison at full resolution',
    feat2Desc: 'Every compressed image gets a compare view — original on the left, compressed on the right, both at full width. You can actually see the quality difference (or lack of it) before downloading anything.',
    feat3Title: 'Batch processing with running totals',
    feat3Desc: 'Drop an entire folder in at once. NexCompress works through them sequentially and keeps a running tally of total space saved. Download files one at a time or grab the whole batch as a single ZIP.',
    feat4Title: 'No account, no upload, no artificial caps',
    feat4Desc: 'Most web compressors limit you to 5MB per file unless you sign up. Some watermark the output. NexCompress doesn\'t do any of that — the only limit is your browser\'s available memory, which on any modern machine handles hundreds of megabytes easily.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about NexCompress image compression.',
    faqQ1: 'How does local image compression work?',
    faqA1: 'It uses your browser\'s native Canvas API to decode the uploaded image, processes the pixels locally at your chosen quality level, and exports it back as a compressed JPEG, PNG, or WebP. No external servers are contacted.',
    faqQ2: 'Are my images safe with NexCompress?',
    faqA2: 'Yes, completely. Your images are never sent to a server. All processing is executed client-side on your device, ensuring total privacy.',
    faqQ3: 'Is there a file size limit?',
    faqA3: 'No, there are no artificial file size caps. The only physical limit is your device\'s available browser memory, which easily handles hundreds of megabytes.',
    faqQ4: 'Does NexCompress work offline?',
    faqA4: 'Yes. NexCompress is a Progressive Web App (PWA). Once loaded, it works entirely without an internet connection.',
    ctaTitle: 'Ready to shrink your images?',
    ctaDesc: 'Drop your files at the top of the page. Runs in Chrome, Firefox, Safari, and Edge. Nothing to install.',
    ctaButton: 'Back to Tool'
  },
  es: {
    title: 'Compresor de Imágenes — Comprimir JPG, PNG, WebP Localmente | TheNexTools',
    description: 'Comprime imágenes en tu navegador sin subirlas. Ajusta la calidad, compara antes y después a resolución completa y descarga — individual o en ZIP.',
    steps: [
      { title: 'Añadir Imágenes', desc: 'Selecciona o arrastra archivos JPG, PNG o WebP al compresor.' },
      { title: 'Ajustar Compresión', desc: 'Ajusta la barra de calidad y compara el original contra el comprimido lado a lado.' },
      { title: 'Descargar Salida', desc: 'Guarda tus imágenes comprimidas de forma individual o como un archivo ZIP consolidado.' }
    ],
    badge: 'NexCompress — Local y Privado',
    h1: 'Comprime imágenes sin subirlas a ningún sitio.',
    p1: 'La mayoría de compresores envían tus archivos a un servidor, los procesan remotamente y los devuelven. Eso está bien hasta que deja de estarlo: la cola es lenta, el archivo es demasiado grande o la imagen es algo confidencial. NexCompress ejecuta los mismos algoritmos directamente en tu navegador. Más rápido, sin límites y tus archivos no salen de tu máquina.',
    schemaTitle: 'NexCompress Compresor de Imágenes',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Compresor de Imágenes',
    howToTitle: 'Cómo comprimir imágenes sin conexión',
    diffTitle: 'Lo que nos diferencia de TinyPNG',
    diffDesc: 'Las características que realmente importan cuando comprimes imágenes de forma habitual, no de una en una en un formulario web simple.',
    feat1Title: 'Salida a JPEG, PNG o WebP',
    feat1Desc: 'Elige tu formato de salida como parte del paso de compresión. Las imágenes PNG con transparencia se mantienen sin pérdidas. Para JPEG y WebP, arrastra la barra de calidad del 10% al 100% y el tamaño estimado del archivo se actualizará mientras la mueves.',
    feat2Title: 'Comparación lado a lado a resolución completa',
    feat2Desc: 'Cada imagen comprimida obtiene una vista comparativa: original a la izquierda, comprimida a la derecha. Puedes ver la diferencia de calidad real antes de descargar nada.',
    feat3Title: 'Procesamiento por lotes y totales',
    feat3Desc: 'Suelta una carpeta entera a la vez. NexCompress las procesa secuencialmente y mantiene un recuento del espacio total ahorrado. Descarga los archivos de uno en uno o la carpeta completa como un ZIP.',
    feat4Title: 'Sin cuentas, sin cargas, sin límites artificiales',
    feat4Desc: 'La mayoría de los compresores web te limitan a 5MB por archivo a menos que te registres. Algunos añaden marcas de agua. NexCompress no hace nada de eso: el único límite es la memoria del navegador de tu dispositivo.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre la compresión local con NexCompress.',
    faqQ1: '¿Cómo funciona la compresión de imágenes local?',
    faqA1: 'Utiliza la API Canvas nativa de tu navegador para decodificar la imagen cargada, procesa los píxeles localmente al nivel de calidad elegido y los vuelve a exportar como un archivo JPEG, PNG o WebP comprimido. No se contacta con ningún servidor externo.',
    faqQ2: '¿Están seguras mis imágenes con NexCompress?',
    faqA2: 'Sí, completamente. Tus imágenes nunca se envían a un servidor. Todo el procesamiento se realiza del lado del cliente en tu dispositivo, garantizando total privacidad.',
    faqQ3: '¿Existe un límite de tamaño de archivo?',
    faqA3: 'No, no hay límites artificiales de tamaño. El único límite físico es la memoria disponible del navegador de tu dispositivo, que maneja fácilmente cientos de megabytes.',
    faqQ4: '¿Funciona NexCompress sin conexión?',
    faqA4: 'Sí. NexCompress es una Aplicación Web Progresiva (PWA). Una vez cargada, funciona completamente sin conexión a Internet.',
    ctaTitle: '¿Listo para reducir el tamaño de tus imágenes?',
    ctaDesc: 'Sueltas tus archivos en la parte superior de la página. Funciona en Chrome, Firefox, Safari y Edge. Nada que instalar.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Compressor de Imagens — Compactar JPG, PNG, WebP Localmente | TheNexTools',
    description: 'Compacte imagens no seu navegador sem fazer upload. Ajuste a qualidade, compare antes e depois em resolução total e faça o download — individualmente ou em ZIP.',
    steps: [
      { title: 'Adicionar Imagens', desc: 'Selecione ou arraste arquivos JPG, PNG ou WebP para o compressor.' },
      { title: 'Ajustar Compactação', desc: 'Ajuste o controle deslizante de qualidade e compare o original com o compactado lado a lado.' },
      { title: 'Baixar Arquivos', desc: 'Salve suas imagens compactadas individualmente ou como um único arquivo ZIP consolidado.' }
    ],
    badge: 'NexCompress — Local e Privado',
    h1: 'Compacte imagens sem enviá-las a lugar nenhum.',
    p1: 'A maioria dos compressores envia seus arquivos para um servidor, processa-os remotamente e os envia de volta. Isso é bom até que não seja — o arquivo é muito grande, a fila é lenta ou a imagem é algo que você prefere manter privado. NexCompress executa os mesmos algoritmos de compactação diretamente no seu navegador. Mais rápido, sem limites de tamanho e nada sai da sua máquina.',
    schemaTitle: 'Compressor de Imagens NexCompress',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Compressor de Imagens',
    howToTitle: 'Como compactar imagens offline',
    diffTitle: 'O que nos diferencia do TinyPNG',
    diffDesc: 'As características que realmente importam quando você compacta imagens regularmente — não apenas um arquivo de cada vez por meio de um formulário da web.',
    feat1Title: 'Saída para JPEG, PNG ou WebP',
    feat1Desc: 'Escolha seu formato de saída como parte da etapa de compactação. PNGs com transparência permanecem sem perdas. Para JPEG e WebP, arraste o controle deslizante de qualidade de 10% a 100% e o tamanho estimado do arquivo é atualizado em tempo real.',
    feat2Title: 'Comparación lado a lado em resolução total',
    feat2Desc: 'Cada imagem compactada obtém uma exibição de comparação — original à esquerda, compactada à direita. Você pode realmente ver a diferença de qualidade antes de baixar qualquer coisa.',
    feat3Title: 'Processamento em lote e totais',
    feat3Desc: 'Solte uma pasta inteira de uma vez. NexCompress trabalha neles sequencialmente e mantém uma contagem contínua do espaço total economizado. Baixe os arquivos um de cada vez ou pegue o lote inteiro como um único ZIP.',
    feat4Title: 'Sem conta, sem upload, sem limites artificiais',
    feat4Desc: 'A maioria dos compressores da web limita os usuários gratuitos a 5 MB por arquivo. NexCompress não faz nada disso — o único limite é a memória disponível do seu navegador.',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre a compactação local com NexCompress.',
    faqQ1: 'Como funciona a compactação de imagens local?',
    faqA1: 'Ele usa a API Canvas nativa do seu navegador para decodificar a imagem enviada, processa os pixels localmente no nível de qualidade escolhido e a exporta de volta como um JPEG, PNG ou WebP compactado. Nenhum servidor externo é contatado.',
    faqQ2: 'Minhas imagens estão seguras com NexCompress?',
    faqA2: 'Sim, completamente. Suas imagens nunca são enviadas para um servidor. Todo o processamento é executado no lado do cliente no seu dispositivo, garantindo total privacidade.',
    faqQ3: 'Existe um limite de tamanho de arquivo?',
    faqA3: 'Não, não há limites de tamanho artificiais. O único limite físico é a memória disponível do navegador do seu dispositivo, que lida facilmente com centenas de megabytes.',
    faqQ4: 'O NexCompress funciona offline?',
    faqA4: 'Sim. NexCompress é um Progressive Web App (PWA). Uma vez carregado, funciona inteiramente sem conexão com a internet.',
    ctaTitle: 'Pronto para reduzir o tamanho de suas imagens?',
    ctaDesc: 'Solte seus arquivos no topo da página. Funciona no Chrome, Firefox, Safari e Edge. Nada para instalar.',
    ctaButton: 'Voltar à Ferramenta'
  },
  fr: {
      "title": "Compresseur d'Images — Réduire JPG, PNG, WebP Localement | TheNexTools",
      "description": "Compressez des images dans votre navigateur sans les téléverser. Ajustez la qualité, comparez avant/après en pleine résolution et téléchargez en ZIP.",
      "steps": [
          {
              "title": "Ajouter des Images",
              "desc": "Sélectionnez ou glissez des fichiers JPG, PNG ou WebP dans le compresseur."
          },
          {
              "title": "Ajuster la Compression",
              "desc": "Réglez le curseur de qualité et comparez l'original et l'image compressée côte à côte."
          },
          {
              "title": "Télécharger",
              "desc": "Enregistrez vos images compressées individuellement ou dans une archive ZIP unique."
          }
      ],
      "badge": "NexCompress — Local et Privé",
      "h1": "Compressez vos images sans les envoyer nulle part.",
      "p1": "Les autres compresseurs envoient vos fichiers sur un serveur distant. NexCompress exécute les algorithmes de compression directement dans votre navigateur : plus rapide, sans limite de taille, et rien ne quitte votre appareil.",
      "schemaTitle": "Compresseur d'Images NexCompress",
      "schemaHome": "Accueil",
      "schemaToolkit": "Boîte à Outils Image",
      "schemaTool": "Compresseur d'Images",
      "howToTitle": "Comment compresser des images hors ligne",
      "diffTitle": "Ce qui nous différencie de TinyPNG",
      "diffDesc": "Les fonctionnalités essentielles lorsque vous compressez des images régulièrement.",
      "feat1Title": "Sortie en JPEG, PNG ou WebP",
      "feat1Desc": "Choisissez votre format de sortie. Les PNG transparents restent sans perte. Pour JPEG et WebP, réglez la qualité de 10 % à 100 % avec estimation de taille en temps réel.",
      "feat2Title": "Comparaison côte à côte en pleine résolution",
      "feat2Desc": "Chaque image compressée dispose d'une vue comparative — original à gauche, compressé à droite — avant tout téléchargement.",
      "feat3Title": "Traitement par lots et total économisé",
      "feat3Desc": "Déposez un dossier entier d'un coup. Téléchargez les fichiers individuellement ou récupérez tout le lot en un seul fichier ZIP.",
      "feat4Title": "Sans compte, sans envoi, sans limites artificielles",
      "feat4Desc": "Aucune limite de 5 Mo ni filigrane. La seule limite est la mémoire disponible de votre navigateur.",
      "faqTitle": "Questions Fréquentes",
      "faqSubtitle": "Tout savoir sur la compression locale avec NexCompress.",
      "faqQ1": "Comment fonctionne la compression d'images locale ?",
      "faqA1": "Elle utilise l'API Canvas native de votre navigateur pour décoder l'image, traiter les pixels au niveau de qualité choisi et l'exporter en JPEG, PNG ou WebP sans serveur externe.",
      "faqQ2": "Mes images sont-elles en sécurité avec NexCompress ?",
      "faqA2": "Oui, totalement. Vos images ne sont jamais envoyées sur un serveur. Tout le traitement est exécuté localement sur votre appareil.",
      "faqQ3": "Y a-t-il une limite de taille de fichier ?",
      "faqA3": "Non, il n'y a aucune limite artificielle. Seule la mémoire de votre navigateur fixe la limite physique.",
      "faqQ4": "NexCompress fonctionne-t-il hors ligne ?",
      "faqA4": "Oui. NexCompress est une Progressive Web App (PWA) qui fonctionne entièrement sans connexion Internet une fois chargée.",
      "ctaTitle": "Prêt à réduire la taille de vos images ?",
      "ctaDesc": "Déposez vos fichiers en haut de la page. Fonctionne sur Chrome, Firefox, Safari et Edge.",
      "ctaButton": "Retour à l'outil"
  },
  de: {
      "title": "Bildkompressor — JPG, PNG, WebP Lokal Verkleinern | TheNexTools",
      "description": "Komprimieren Sie Bilder direkt im Browser ohne Upload. Qualität anpassen, Vorher-Nachher in voller Auflösung vergleichen und einzeln oder als ZIP herunterladen.",
      "steps": [
          {
              "title": "Bilder Hinzufügen",
              "desc": "Wählen Sie JPG-, PNG- oder WebP-Dateien aus oder ziehen Sie sie in den Kompressor."
          },
          {
              "title": "Komprimierung Anpassen",
              "desc": "Passen Sie den Qualitätsregler an und vergleichen Sie Original und Komprimierung nebeneinander."
          },
          {
              "title": "Herunterladen",
              "desc": "Speichern Sie komprimierte Bilder einzeln oder gesammelt als ZIP-Archiv."
          }
      ],
      "badge": "NexCompress — Lokal & Privat",
      "h1": "Bilder komprimieren, ohne sie irgendwo hochzuladen.",
      "p1": "Andere Bildkompressoren senden Ihre Dateien an einen Server. NexCompress führt die Komprimierung direkt in Ihrem Browser aus — schneller, ohne Größenlimits und ohne dass Daten Ihr Gerät verlassen.",
      "schemaTitle": "NexCompress Bildkompressor",
      "schemaHome": "Startseite",
      "schemaToolkit": "Bild-Toolkit",
      "schemaTool": "Bildkompressor",
      "howToTitle": "So komprimieren Sie Bilder offline",
      "diffTitle": "Was uns von TinyPNG unterscheidet",
      "diffDesc": "Die Funktionen, auf die es bei regelmäßiger Bildkomprimierung wirklich ankommt.",
      "feat1Title": "Ausgabe als JPEG, PNG oder WebP",
      "feat1Desc": "Wählen Sie Ihr Ausgabeformat direkt beim Komprimieren. PNGs mit Transparenz bleiben verlustfrei. Für JPEG und WebP regeln Sie die Qualität von 10 % bis 100 %.",
      "feat2Title": "Direkter Vergleich in voller Auflösung",
      "feat2Desc": "Jedes komprimierte Bild bietet eine Vergleichsansicht — Original links, komprimiert rechts — bevor Sie etwas herunterladen.",
      "feat3Title": "Stapelverarbeitung mit Gesamtersparnis",
      "feat3Desc": "Legen Sie ganze Ordner auf einmal ab und laden Sie alle Bilder einzeln oder als ZIP-Datei herunter.",
      "feat4Title": "Kein Konto, kein Upload, keine künstlichen Limits",
      "feat4Desc": "Keine 5-MB-Sperre und keine Wasserzeichen. Das einzige Limit ist der Arbeitsspeicher Ihres Browsers.",
      "faqTitle": "Häufig gestellte Fragen",
      "faqSubtitle": "Alles über die lokale Bildkomprimierung mit NexCompress.",
      "faqQ1": "Wie funktioniert die lokale Bildkomprimierung?",
      "faqA1": "Sie nutzt die native Canvas-API Ihres Browsers, um das Bild lokal zu dekodieren und in der gewählten Qualitätsstufe als JPEG, PNG oder WebP zu exportieren.",
      "faqQ2": "Sind meine Bilder bei NexCompress sicher?",
      "faqA2": "Ja, vollständig. Ihre Bilder werden niemals an einen Server gesendet. Alle Schritte erfolgen lokal auf Ihrem Gerät.",
      "faqQ3": "Gibt es ein Dateigrößenlimit?",
      "faqA3": "Nein, es gibt keine künstlichen Größenbeschränkungen.",
      "faqQ4": "Funktioniert NexCompress offline?",
      "faqA4": "Ja. Als Progressive Web App (PWA) funktioniert NexCompress nach dem ersten Laden komplett ohne Internetverbindung.",
      "ctaTitle": "Bereit, Ihre Bilder zu verkleinern?",
      "ctaDesc": "Legen Sie Ihre Dateien oben auf der Seite ab. Läuft in Chrome, Firefox, Safari und Edge.",
      "ctaButton": "Zurück zum Tool"
  },
  nl: {
      "title": "Afbeelding Compressor — Verklein JPG, PNG, WebP Lokaal | TheNexTools",
      "description": "Comprimeer afbeeldingen in uw browser zonder uploaden. Pas kwaliteit aan, vergelijk voor en na op volledige resolutie en download los of als ZIP.",
      "steps": [
          {
              "title": "Afbeeldingen Toevoegen",
              "desc": "Selecteer of sleep JPG-, PNG- of WebP-bestanden naar de compressor."
          },
          {
              "title": "Compressie Afstemmen",
              "desc": "Pas de kwaliteitsschuifregelaar aan en vergelijk origineel en gecomprimeerd naast elkaar."
          },
          {
              "title": "Downloaden",
              "desc": "Sla uw gecomprimeerde afbeeldingen afzonderlijk of als één ZIP-bestand op."
          }
      ],
      "badge": "NexCompress — Lokaal & Privé",
      "h1": "Comprimeer afbeeldingen zonder ze ergens te uploaden.",
      "p1": "Andere compressors sturen uw bestanden naar een server. NexCompress voert de compressie rechtstreeks in uw browser uit — sneller, zonder groottebeperkingen en er verlaat niets uw apparaat.",
      "schemaTitle": "NexCompress Afbeelding Compressor",
      "schemaHome": "Home",
      "schemaToolkit": "Afbeelding Toolkit",
      "schemaTool": "Afbeelding Compressor",
      "howToTitle": "Hoe afbeeldingen offline te comprimeren",
      "diffTitle": "Wat dit anders maakt dan TinyPNG",
      "diffDesc": "De zaken die er echt toe doen wanneer u regelmatig afbeeldingen comprimeert.",
      "feat1Title": "Uitvoer naar JPEG, PNG of WebP",
      "feat1Desc": "Kies uw uitvoerformaat. PNG's met transparantie blijven verliesvrij. Voor JPEG en WebP stelt u de kwaliteit in van 10% tot 100%.",
      "feat2Title": "Vergelijking naast elkaar op volledige resolutie",
      "feat2Desc": "Elke gecomprimeerde afbeelding krijgt een vergelijkingsweergave voordat u iets downloadt.",
      "feat3Title": "Batchverwerking met totaaloverzicht",
      "feat3Desc": "Sleep een hele map tegelijk en download bestanden één voor één of allemaal samen als één ZIP.",
      "feat4Title": "Geen account, geen upload, geen kunstmatige limieten",
      "feat4Desc": "Geen limiet van 5 MB en geen watermerken. De enige limiet is het beschikbare geheugen van uw browser.",
      "faqTitle": "Veelgestelde Vragen",
      "faqSubtitle": "Alles wat u moet weten over lokale compressie met NexCompress.",
      "faqQ1": "Hoe werkt lokale beeldcompressie?",
      "faqA1": "Het gebruikt de native Canvas API van uw browser om de afbeelding lokaal te decoderen en te exporteren als gecomprimeerde JPEG, PNG of WebP.",
      "faqQ2": "Zijn mijn afbeeldingen veilig bij NexCompress?",
      "faqA2": "Ja, volledig. Uw afbeeldingen worden nooit naar een server verzonden.",
      "faqQ3": "Is er een limiet voor de bestandsgrootte?",
      "faqA3": "Nee, er zijn geen kunstmatige limieten voor de bestandsgrootte.",
      "faqQ4": "Werkt NexCompress offline?",
      "faqA4": "Ja. NexCompress is een Progressive Web App (PWA) en werkt na het laden volledig zonder internetverbinding.",
      "ctaTitle": "Klaar om uw afbeeldingen te verkleinen?",
      "ctaDesc": "Sleep uw bestanden naar de bovenkant van de pagina. Werkt in Chrome, Firefox, Safari en Edge.",
      "ctaButton": "Terug naar Tool"
  },
  it: {
      "title": "Compressore Immagini — Riduci JPG, PNG, WebP Localmente | TheNexTools",
      "description": "Comprimi immagini nel browser senza caricarle. Regola la qualità, confronta prima e dopo a piena risoluzione e scarica singolarmente o in ZIP.",
      "steps": [
          {
              "title": "Aggiungi Immagini",
              "desc": "Seleziona o trascina file JPG, PNG o WebP nel compressore."
          },
          {
              "title": "Regola Compressione",
              "desc": "Regola il cursore della qualità e confronta originale e compresso fianco a fianco."
          },
          {
              "title": "Scarica Risultato",
              "desc": "Salva le immagini compresse singolarmente o in un unico pacchetto ZIP."
          }
      ],
      "badge": "NexCompress — Locale e Privato",
      "h1": "Comprimi le immagini senza caricarle da nessuna parte.",
      "p1": "Gli altri compressori inviano i tuoi file a un server remoto. NexCompress esegue gli algoritmi di compressione direttamente nel tuo browser: più veloce, senza limiti di dimensione e nulla esce dal tuo dispositivo.",
      "schemaTitle": "Compressore Immagini NexCompress",
      "schemaHome": "Home",
      "schemaToolkit": "Toolkit Immagini",
      "schemaTool": "Compressore Immagini",
      "howToTitle": "Come comprimere immagini offline",
      "diffTitle": "Cosa ci rende diversi da TinyPNG",
      "diffDesc": "Le funzionalità che contano davvero quando comprimi immagini regolarmente.",
      "feat1Title": "Output in JPEG, PNG o WebP",
      "feat1Desc": "Scegli il formato di output. I PNG con trasparenza restano lossless. Per JPEG e WebP regola la qualità dal 10% al 100% con stima in tempo reale.",
      "feat2Title": "Confronto fianco a fianco a piena risoluzione",
      "feat2Desc": "Ogni immagine compressa offre una vista comparativa — originale a sinistra, compressa a destra — prima del download.",
      "feat3Title": "Elaborazione in batch con totale risparmiato",
      "feat3Desc": "Trascina un'intera cartella in una volta. Scarica i file singolarmente o l'intero gruppo come singolo ZIP.",
      "feat4Title": "Nessun account, nessun upload, nessun limite artificiale",
      "feat4Desc": "Nessun limite di 5 MB o filigrana. L'unico limite è la memoria disponibile del browser.",
      "faqTitle": "Domande Frequenti",
      "faqSubtitle": "Tutto quello che devi sapere sulla compressione locale con NexCompress.",
      "faqQ1": "Come funziona la compressione locale delle immagini?",
      "faqA1": "Utilizza l'API Canvas nativa del browser per decodificare l'immagine ed esportarla localmente come JPEG, PNG o WebP compresso.",
      "faqQ2": "Le mie immagini sono al sicuro con NexCompress?",
      "faqA2": "Sì, completamente. Le tue immagini non vengono mai inviate a nessun server.",
      "faqQ3": "C'è un limite alle dimensioni del file?",
      "faqA3": "No, non ci sono limiti artificiali alle dimensioni dei file.",
      "faqQ4": "NexCompress funziona offline?",
      "faqA4": "Sì. NexCompress è una Progressive Web App (PWA) e funziona interamente offline dopo il primo caricamento.",
      "ctaTitle": "Pronto a ridurre le tue immagini?",
      "ctaDesc": "Trascina i tuoi file in cima alla pagina. Funziona su Chrome, Firefox, Safari ed Edge.",
      "ctaButton": "Torna allo Strumento"
  },
  ja: {
      "title": "画像圧縮ツール — JPG・PNG・WebPをローカルで軽量化 | TheNexTools",
      "description": "画像をアップロードせずにブラウザ内で圧縮。品質調整、フル解像度での前後比較、個別または一括ZIPダウンロードに対応。",
      "steps": [
          {
              "title": "画像を追加",
              "desc": "JPG、PNG、またはWebPファイルを選択するかドラッグ＆ドロップします。"
          },
          {
              "title": "圧縮率を調整",
              "desc": "品質スライダーを調整し、元画像と圧縮後の画像を並べてプレビューします。"
          },
          {
              "title": "ダウンロード",
              "desc": "圧縮した画像を個別に、または1つのZIPファイルとして保存します。"
          }
      ],
      "badge": "NexCompress — ローカル＆プライベート",
      "h1": "画像をどこにもアップロードせずに圧縮。",
      "p1": "他の画像圧縮ツールはファイルを外部サーバーに送信しますが、NexCompressはブラウザ内で直接圧縮アルゴリズムを実行します。高速でサイズ制限もなく、データが端末から外部へ出ることはありません。",
      "schemaTitle": "NexCompress 画像圧縮ツール",
      "schemaHome": "ホーム",
      "schemaToolkit": "画像ツールキット",
      "schemaTool": "画像圧縮ツール",
      "howToTitle": "オフラインで画像を圧縮する方法",
      "diffTitle": "TinyPNGとの違い",
      "diffDesc": "日常的に画像を圧縮する際に本当に重要な機能を備えています。",
      "feat1Title": "JPEG、PNG、WebPへの出力に対応",
      "feat1Desc": "圧縮と同時に出力形式を選択可能。透過PNGはロスレスを維持し、JPEGとWebPは10%〜100%で品質を調整できます。",
      "feat2Title": "フル解像度での並列比較",
      "feat2Desc": "ダウンロード前に左側に元画像、右側に圧縮後画像を並べて画質の違いを確認できます。",
      "feat3Title": "一括処理と削減容量の集計",
      "feat3Desc": "フォルダごと一括でドロップ可能。個別ダウンロードまたはZIP一括ダウンロードに対応しています。",
      "feat4Title": "アカウント不要・アップロード不要・容量制限なし",
      "feat4Desc": "5MBの制限や透かしは一切ありません。ブラウザのメモリが許す限り大容量ファイルも処理できます。",
      "faqTitle": "よくある質問",
      "faqSubtitle": "NexCompressのローカル画像圧縮に関するよくある質問。",
      "faqQ1": "ローカル画像圧縮はどのように機能しますか？",
      "faqA1": "ブラウザ標準のCanvas APIを使用して画像をデコードし、指定された品質でJPEG、PNG、WebPとして再エンコードします。外部サーバーとは通信しません。",
      "faqQ2": "画像のプライバシーは安全ですか？",
      "faqA2": "はい、完全に安全です。画像がサーバーに送信されることは一切ありません。",
      "faqQ3": "ファイルサイズの制限はありますか？",
      "faqA3": "いいえ、人為的なファイルサイズ制限はありません。",
      "faqQ4": "オフラインでも動作しますか？",
      "faqA4": "はい。プログレッシブウェブアプリ（PWA）として動作するため、一度読み込めばインターネット接続なしで利用できます。",
      "ctaTitle": "画像を軽量化する準備はできましたか？",
      "ctaDesc": "ページ上部にファイルをドロップしてください。Chrome、Firefox、Safari、Edgeで動作します。",
      "ctaButton": "ツールに戻る"
  },
  hi: {
      "title": "इमेज कंप्रेसर — JPG, PNG, WebP को लोकली छोटा करें | TheNexTools",
      "description": "अपलोड किए बिना अपने ब्राउज़र में इमेज कंप्रेस करें। क्वालिटी सेट करें, पहले और बाद की तुलना करें, और अकेले या ZIP में डाउनलोड करें।",
      "steps": [
          {
              "title": "इमेज जोड़ें",
              "desc": "कंप्रेसर में JPG, PNG या WebP फ़ाइलें चुनें या ड्रैग करें।"
          },
          {
              "title": "कंप्रेशन सेट करें",
              "desc": "क्वालिटी स्लाइडर समायोजित करें और मूल बनाम कंप्रेस्ड इमेज की तुलना करें।"
          },
          {
              "title": "आउटपुट डाउनलोड करें",
              "desc": "अपनी कंप्रेस्ड इमेज को अलग-अलग या एकल ZIP फ़ाइल के रूप में सहेजें।"
          }
      ],
      "badge": "NexCompress — लोकल और प्राइवेट",
      "h1": "इमेज को कहीं भी अपलोड किए बिना कंप्रेस करें।",
      "p1": "अन्य इमेज कंप्रेसर आपकी फ़ाइलों को सर्वर पर भेजते हैं। NexCompress सीधे आपके ब्राउज़र में कंप्रेशन एल्गोरिदम चलाता है — तेज़, बिना किसी साइज़ सीमा के, और आपकी फ़ाइलें आपके डिवाइस से बाहर नहीं जातीं।",
      "schemaTitle": "NexCompress इमेज कंप्रेसर",
      "schemaHome": "होम",
      "schemaToolkit": "इमेज टूलकिट",
      "schemaTool": "इमेज कंप्रेसर",
      "howToTitle": "ऑफ़लाइन इमेज कैसे कंप्रेस करें",
      "diffTitle": "यह TinyPNG से अलग कैसे है",
      "diffDesc": "जब आप नियमित रूप से इमेज कंप्रेस करते हैं तो वास्तव में मायने रखने वाली सुविधाएँ।",
      "feat1Title": "JPEG, PNG या WebP में आउटपुट",
      "feat1Desc": "कंप्रेशन चरण के भाग के रूप में अपना आउटपुट फ़ॉर्मेट चुनें। JPEG और WebP के लिए क्वालिटी स्लाइडर को 10% से 100% तक सेट करें।",
      "feat2Title": "पूर्ण रेज़ोल्यूशन पर आमने-सामने तुलना",
      "feat2Desc": "डाउनलोड करने से पहले बाईं ओर मूल और दाईं ओर कंप्रेस्ड इमेज की गुणवत्ता में अंतर देखें।",
      "feat3Title": "बैच प्रोसेसिंग और कुल बचत",
      "feat3Desc": "एक साथ कई फ़ाइलें ड्रॉप करें और उन्हें अलग-अलग या एक ZIP के रूप में डाउनलोड करें।",
      "feat4Title": "कोई अकाउंट नहीं, कोई अपलोड नहीं, कोई सीमा नहीं",
      "feat4Desc": "कोई 5MB सीमा या वॉटरमार्क नहीं। एकमात्र सीमा आपके ब्राउज़र की उपलब्ध मेमोरी है।",
      "faqTitle": "अक्सर पूछे जाने वाले प्रश्न",
      "faqSubtitle": "NexCompress लोकल इमेज कंप्रेशन के बारे में सब कुछ।",
      "faqQ1": "लोकल इमेज कंप्रेशन कैसे काम करता है?",
      "faqA1": "यह आपके ब्राउज़र के मूल Canvas API का उपयोग करके इमेज को डिकोड करता है और आपके चुने गए क्वालिटी स्तर पर कंप्रेस्ड JPEG, PNG या WebP के रूप में एक्सपोर्ट करता है।",
      "faqQ2": "क्या NexCompress के साथ मेरी तस्वीरें सुरक्षित हैं?",
      "faqA2": "हाँ, पूरी तरह से। आपकी तस्वीरें कभी किसी सर्वर पर नहीं भेजी जातीं।",
      "faqQ3": "क्या फ़ाइल आकार की कोई सीमा है?",
      "faqA3": "नहीं, कोई कृत्रिम फ़ाइल आकार सीमा नहीं है।",
      "faqQ4": "क्या NexCompress ऑफ़लाइन काम करता है?",
      "faqA4": "हाँ। एक बार लोड होने के बाद यह बिना इंटरनेट कनेक्शन के पूरी तरह से काम करता है।",
      "ctaTitle": "अपनी इमेज का आकार कम करने के लिए तैयार हैं?",
      "ctaDesc": "पृष्ठ के शीर्ष पर अपनी फ़ाइलें ड्रॉप करें। किसी इंस्टॉलेशन की आवश्यकता नहीं।",
      "ctaButton": "टूल पर वापस जाएं"
  },
  tr: {
      "title": "Görsel Sıkıştırıcı — JPG, PNG, WebP Dosyalarını Yerel Olarak Küçültün | TheNexTools",
      "description": "Görsellerinizi hiçbir yere yüklemeden tarayıcınızda sıkıştırın. Kaliteyi ayarlayın, tam çözünürlükte karşılaştırın ve tek tek veya ZIP olarak indirin.",
      "steps": [
          {
              "title": "Görselleri Ekleyin",
              "desc": "JPG, PNG veya WebP dosyalarını seçin veya sıkıştırıcıya sürükleyin."
          },
          {
              "title": "Sıkıştırmayı Ayarlayın",
              "desc": "Kalite kaydırıcısını ayarlayın ve orijinal ile sıkıştırılmış görseli yan yana karşılaştırın."
          },
          {
              "title": "Çıktıyı İndirin",
              "desc": "Sıkıştırılmış görsellerinizi tek tek veya tek bir ZIP arşivi olarak kaydedin."
          }
      ],
      "badge": "NexCompress — Yerel ve Gizli",
      "h1": "Görselleri hiçbir yere yüklemeden sıkıştırın.",
      "p1": "Diğer görsel sıkıştırıcılar dosyalarınızı uzak bir sunucuya gönderir. NexCompress aynı sıkıştırma algoritmalarını doğrudan tarayıcınızda çalıştırır — daha hızlıdır, boyut sınırı yoktur ve hiçbir veri cihazınızdan çıkmaz.",
      "schemaTitle": "NexCompress Görsel Sıkıştırıcı",
      "schemaHome": "Ana Sayfa",
      "schemaToolkit": "Görsel Araç Seti",
      "schemaTool": "Görsel Sıkıştırıcı",
      "howToTitle": "Görseller çevrimdışı nasıl sıkıştırılır",
      "diffTitle": "Bizi TinyPNG'den ayıran nedir",
      "diffDesc": "Düzenli olarak görsel sıkıştırırken gerçekten önem taşıyan özellikler.",
      "feat1Title": "JPEG, PNG veya WebP çıktısı",
      "feat1Desc": "Çıktı formatınızı seçin. Şeffaf PNG'ler kayıpsız kalır. JPEG ve WebP için kaliteyi %10 ile %100 arasında ayarlayın.",
      "feat2Title": "Tam çözünürlükte yan yana karşılaştırma",
      "feat2Desc": "İndirmeden önce solda orijinal, sağda sıkıştırılmış görseli tam genişlikte karşılaştırın.",
      "feat3Title": "Toplu işleme ve toplam tasarruf sayacı",
      "feat3Desc": "Tüm klasörü tek seferde bırakın. Dosyaları tek tek veya tek bir ZIP olarak indirin.",
      "feat4Title": "Hesap yok, yükleme yok, yapay sınır yok",
      "feat4Desc": "5 MB sınırı veya filigran yoktur. Tek sınır tarayıcınızın kullanılabilir belleğidir.",
      "faqTitle": "Sıkça Sorulan Sorular",
      "faqSubtitle": "NexCompress yerel görsel sıkıştırma hakkında bilmeniz gereken her şey.",
      "faqQ1": "Yerel görsel sıkıştırma nasıl çalışır?",
      "faqA1": "Tarayıcınızın yerleşik Canvas API'sini kullanarak görseli yerel olarak işler ve seçtiğiniz kalitede JPEG, PNG veya WebP olarak dışa aktarır.",
      "faqQ2": "Görsellerim NexCompress ile güvende mi?",
      "faqA2": "Evet, tamamen. Görselleriniz asla bir sunucuya gönderilmez.",
      "faqQ3": "Dosya boyutu sınırı var mı?",
      "faqA3": "Hayır, yapay bir dosya boyutu sınırı yoktur.",
      "faqQ4": "NexCompress çevrimdışı çalışır mı?",
      "faqA4": "Evet. Yükledikten sonra internet bağlantısı olmadan tamamen çevrimdışı çalışır.",
      "ctaTitle": "Görsellerinizi küçültmeye hazır mısınız?",
      "ctaDesc": "Dosyalarınızı sayfanın üst kısmına bırakın. Kurulum gerektirmez.",
      "ctaButton": "Araca Dön"
  },
  sw: {
      "title": "Kibana Picha — Punguza Ukubwa wa JPG, PNG, WebP Ndani ya Kifaa | TheNexTools",
      "description": "Bana picha kwenye kivinjari chako bila kuzipakia mtandaoni. Rekebisha ubora, linganisha kabla na baada, na pakua moja moja au kama ZIP.",
      "steps": [
          {
              "title": "Ongeza Picha",
              "desc": "Chagua au buruta faili za JPG, PNG, au WebP kwenye kibana picha."
          },
          {
              "title": "Rekebisha Ubora",
              "desc": "Rekebisha kiwango cha ubora na ulinganishe picha halisi na iliyobanwa."
          },
          {
              "title": "Pakua Matokeo",
              "desc": "Hifadhi picha zilizobanwa moja moja au kama kifurushi kimoja cha ZIP."
          }
      ],
      "badge": "NexCompress — Ndani na Faragha",
      "h1": "Bana picha bila kuzipakia popote.",
      "p1": "Vibana picha vingine hutuma faili zako kwenye seva. NexCompress huendesha kanuni za ubanaji moja kwa moja kwenye kivinjari chako — haraka zaidi, bila kikomo cha ukubwa, na hakuna kinachotoka kwenye kifaa chako.",
      "schemaTitle": "NexCompress Kibana Picha",
      "schemaHome": "Nyumbani",
      "schemaToolkit": "Zana za Picha",
      "schemaTool": "Kibana Picha",
      "howToTitle": "Jinsi ya kubana picha nje ya mtandao",
      "diffTitle": "Kinachotutofautisha na TinyPNG",
      "diffDesc": "Vipengele muhimu unavyohitaji unapobana picha mara kwa mara.",
      "feat1Title": "Toa kama JPEG, PNG, au WebP",
      "feat1Desc": "Chagua umbizo la matokeo. Rekebisha ubora wa JPEG na WebP kuanzia 10% hadi 100% ukiona makadirio ya ukubwa papo hapo.",
      "feat2Title": "Ulinganisho wa ana kwa ana",
      "feat2Desc": "Kila picha iliyobanwa ina mwonekano wa kulinganisha kabla hujapakua chochote.",
      "feat3Title": "Uchakataji wa kundi kwa pamoja",
      "feat3Desc": "Weka folda nzima kwa wakati mmoja na upakue faili moja moja au zote kama ZIP.",
      "feat4Title": "Hakuna akaunti, hakuna kupakia, hakuna vikomo",
      "feat4Desc": "Hakuna kikomo cha MB 5. Kikomo pekee ni kumbukumbu ya kivinjari chako.",
      "faqTitle": "Maswali Yanayoulizwa Mara kwa Mara",
      "faqSubtitle": "Kila kitu unachohitaji kujua kuhusu ubanaji wa picha wa NexCompress.",
      "faqQ1": "Ubanaji wa picha wa ndani unafanyaje kazi?",
      "faqA1": "Inatumia Canvas API ya kivinjari chako kuchakata picha kwenye kifaa chako bila kuwasiliana na seva yoyote ya nje.",
      "faqQ2": "Je, picha zangu ziko salama na NexCompress?",
      "faqA2": "Ndiyo, kabisa. Picha zako hazitumwi kwenye seva yoyote.",
      "faqQ3": "Je, kuna kikomo cha ukubwa wa faili?",
      "faqA3": "Hapana, hakuna vikomo bandia vya ukubwa wa faili.",
      "faqQ4": "Je, NexCompress inafanya kazi nje ya mtandao?",
      "faqA4": "Ndiyo. Baada ya kufunguliwa mara ya kwanza, inafanya kazi bila mtandao.",
      "ctaTitle": "Uko tayari kupunguza ukubwa wa picha zako?",
      "ctaDesc": "Weka faili zako juu ya ukurasa. Inafanya kazi kwenye Chrome, Firefox, Safari na Edge.",
      "ctaButton": "Rudi kwenye Zana"
  },
  bn: {
      "title": "ইমেজ কম্প্রেসর — লোকালি JPG, PNG, WebP সাইজ কমান | TheNexTools",
      "description": "আপলোড ছাড়াই আপনার ব্রাউজারে ছবি কম্প্রেস করুন। কোয়ালিটি অ্যাডজাস্ট করুন, আগে ও পরে তুলনা করুন এবং আলাদাভাবে বা ZIP হিসেবে ডাউনলোড করুন।",
      "steps": [
          {
              "title": "ছবি যোগ করুন",
              "desc": "JPG, PNG বা WebP ফাইল নির্বাচন করুন অথবা কম্প্রেসরে ড্র্যাগ করুন।"
          },
          {
              "title": "কম্প্রেশন টিউন করুন",
              "desc": "কোয়ালিটি স্লাইডার সমন্বয় করুন এবং আসল ও কম্প্রেসড ছবি পাশাপাশি তুলনা করুন।"
          },
          {
              "title": "ডাউনলোড করুন",
              "desc": "কম্প্রেস করা ছবিগুলো আলাদাভাবে বা একটি একক ZIP ফাইল হিসেবে সেভ করুন।"
          }
      ],
      "badge": "NexCompress — লোকাল ও প্রাইভেট",
      "h1": "কোথাও আপলোড না করেই ছবি কম্প্রেস করুন।",
      "p1": "অন্যান্য ইমেজ কম্প্রেসর আপনার ফাইল সার্ভারে পাঠায়। NexCompress সরাসরি আপনার ব্রাউজারে কম্প্রেশন অ্যালগরিদম চালায় — দ্রুততর, কোনো সাইজ লিমিট নেই এবং আপনার ফাইল কখনোই আপনার ডিভাইস ছেড়ে যায় না।",
      "schemaTitle": "NexCompress ইমেজ কম্প্রেসর",
      "schemaHome": "হোম",
      "schemaToolkit": "ইমেজ টুলকিট",
      "schemaTool": "ইমেজ কম্প্রেসর",
      "howToTitle": "কীভাবে অফলাইনে ছবি কম্প্রেস করবেন",
      "diffTitle": "TinyPNG থেকে এটি কেন আলাদা",
      "diffDesc": "নিয়মিত ছবি কম্প্রেস করার সময় যে সুবিধাগুলো সত্যিই প্রয়োজন।",
      "feat1Title": "JPEG, PNG বা WebP ফরম্যাটে আউটপুট",
      "feat1Desc": "আউটপুট ফরম্যাট বেছে নিন। JPEG ও WebP-এর জন্য ১০% থেকে ১০০% পর্যন্ত কোয়ালিটি স্লাইডার অ্যাডজাস্ট করুন।",
      "feat2Title": "পূর্ণ রেজোলিউশনে পাশাপাশি তুলনা",
      "feat2Desc": "ডাউনলোড করার আগেই বাম পাশে আসল এবং ডান পাশে কম্প্রেসড ছবির পার্থক্য দেখুন।",
      "feat3Title": "ব্যাচ প্রসেসিং ও মোট সাশ্রয়",
      "feat3Desc": "একসাথে পুরো ফোল্ডার ড্রপ করুন এবং আলাদাভাবে বা একটি ZIP হিসেবে ডাউনলোড করুন।",
      "feat4Title": "কোনো অ্যাকাউন্ট নেই, আপলোড নেই, কৃত্রিম লিমিট নেই",
      "feat4Desc": "৫ এমবি লিমিট বা ওয়াটারমার্ক নেই। একমাত্র সীমা আপনার ব্রাউজারের মেমরি।",
      "faqTitle": "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী",
      "faqSubtitle": "NexCompress ইমেজ কম্প্রেশন সম্পর্কে যা জানা প্রয়োজন।",
      "faqQ1": "লোকাল ইমেজ কম্প্রেশন কীভাবে কাজ করে?",
      "faqA1": "এটি আপনার ব্রাউজারের নেটিভ Canvas API ব্যবহার করে লোকালি ছবি প্রসেস করে এবং কম্প্রেসড JPEG, PNG বা WebP হিসেবে এক্সপোর্ট করে।",
      "faqQ2": "NexCompress-এ আমার ছবিগুলো কি নিরাপদ?",
      "faqA2": "হ্যাঁ, সম্পূর্ণ নিরাপদ। আপনার ছবি কখনোই কোনো সার্ভারে পাঠানো হয় না।",
      "faqQ3": "ফাইল সাইজের কি কোনো সীমা আছে?",
      "faqA3": "না, কোনো কৃত্রিম ফাইল সাইজ সীমা নেই।",
      "faqQ4": "NexCompress কি অফলাইনে কাজ করে?",
      "faqA4": "হ্যাঁ। একবার লোড হওয়ার পর এটি ইন্টারনেট ছাড়াই সম্পূর্ণ অফলাইনে কাজ করে।",
      "ctaTitle": "আপনার ছবির সাইজ কমাতে প্রস্তুত?",
      "ctaDesc": "পেজের উপরের অংশে ফাইল ড্রপ করুন। Chrome, Firefox, Safari ও Edge-এ কাজ করে।",
      "ctaButton": "টুলে ফিরে যান"
  }
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return {
    title: t.title,
    description: t.description,
    manifest: '/image-manifest.json',
    alternates: {
      canonical: `/${lang}/image-compressor`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-compressor' : `/${l}/image-compressor`;
          return acc;
        }, {}),
        'x-default': '/image-compressor',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      url: `https://thenextools.com/${lang}/image-compressor`,
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

export default async function ImageCompressorLanding({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": t.faqQ1,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA1
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ2,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA2
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ3,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA3
                  }
                },
                {
                  "@type": "Question",
                  "name": t.faqQ4,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": t.faqA4
                  }
                }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": t.schemaTitle,
              "url": `https://thenextools.com/${lang}/image-compressor`,
              "inLanguage": lang,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": t.description,
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": t.schemaHome,
                  "item": `https://thenextools.com/${lang}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": t.schemaToolkit,
                  "item": `https://thenextools.com/${lang}/image-toolkit`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": t.schemaTool,
                  "item": `https://thenextools.com/${lang}/image-compressor`
                }
              ]
            }
          ])
        }}
      />

      <header className="hero container" style={{ paddingBottom: '3.5rem' }}>
        <div className="badge">{t.badge}</div>
        <h1>{t.h1}</h1>
        <p style={{ marginBottom: '3rem' }}>{t.p1}</p>
        <div id="tool" style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
          <ImageCompressorPageWrapper hideHeader={true} />
        </div>
      </header>

      <section className="divider" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>{t.howToTitle}</h2>
          <div className="premium-steps-grid">
            {t.steps.map((step, index) => (
              <div key={index} className="premium-step-card">
                <div className="premium-step-number">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="premium-step-badge">
                  {index + 1}
                </div>
                <h4 className="premium-step-title">{step.title}</h4>
                <p className="premium-step-text">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="divider">
        <div className="container">
          <div className="section-header">
            <h2>{t.diffTitle}</h2>
            <p>{t.diffDesc}</p>
          </div>
          <div className="grid-2">
            <div className="feature-card">
              <h3>{t.feat1Title}</h3>
              <p>{t.feat1Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.feat2Title}</h3>
              <p>{t.feat2Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.feat3Title}</h3>
              <p>{t.feat3Desc}</p>
            </div>
            <div className="feature-card">
              <h3>{t.feat4Title}</h3>
              <p>{t.feat4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="divider" style={{ background: 'var(--bg-body)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>{t.faqTitle}</h2>
            <p>{t.faqSubtitle}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ1}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA1}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ2}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA2}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ3}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA3}
              </p>
            </details>
            <details style={{ background: 'var(--bg-2)', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <summary style={{ fontWeight: '600', cursor: 'pointer', outline: 'none', userSelect: 'none' }}>
                {t.faqQ4}
              </summary>
              <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {t.faqA4}
              </p>
            </details>
          </div>
        </div>
      </section>

            <section className="divider related-image-tools" style={{ background: 'var(--bg-2)', padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>{t.schemaToolkit}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <Link href={`/${lang}/image-converter`} className="badge" style={{ textDecoration: 'none' }}>Image Converter</Link>
              <Link href={`/${lang}/image-redactor`} className="badge" style={{ textDecoration: 'none' }}>Image Redactor & Blur</Link>
              <Link href={`/${lang}/exif-stripper`} className="badge" style={{ textDecoration: 'none' }}>EXIF Metadata Stripper</Link>
              <Link href={`/${lang}/image-toolkit`} className="badge" style={{ textDecoration: 'none' }}>All Image Tools</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaDesc}</p>
          <a href="#tool" className="btn btn-primary">{t.ctaButton}</a>
        </div>
      </section>
    </>
  );
}
