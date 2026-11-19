import Link from 'next/link';
import { ImageConverterPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';
import { locales, ogLocales } from '@/lib/i18n-config';
import { getDictionary } from '@/dictionaries';

const TRANSLATIONS = {
  en: {
    title: 'Image Format Converter — JPG to WebP, PNG to JPG, Locally | TheNexTools',
    description: 'Convert images between JPG, PNG, and WebP without uploading them. Batch-convert entire folders, preserve transparency, and download as a ZIP — all in your browser.',
    steps: [
      { title: 'Select Files', desc: 'Select or drag raw images of any format into the workspace.' },
      { title: 'Select Format', desc: 'Choose output format (JPG, PNG, WebP) and define quality options.' },
      { title: 'Batch Export', desc: 'Click convert and download the converted files as a clean ZIP package.' }
    ],
    badge: 'NexConvert — Local & Private',
    h1: 'Stop uploading images just to change the format.',
    p1: 'You have a folder of PNGs that need to be WebP for your website. Or a batch of WebPs that a client needs as JPEGs. Every online converter wants you to upload them one at a time, wait, download, repeat. NexConvert handles the whole folder at once — locally, in your browser, with no queue and no file size cap.',
    schemaTitle: 'NexConvert Image Converter',
    schemaHome: 'Home',
    schemaToolkit: 'Image Toolkit',
    schemaTool: 'Image Converter',
    howToTitle: 'How to convert images offline',
    diffTitle: 'How it works',
    diffDesc: 'Your browser already knows how to decode and re-encode images through the Canvas API. NexConvert just gives you a proper interface for it.',
    feat1Title: 'Every format combination',
    feat1Desc: 'JPG to WebP, PNG to JPG, WebP to PNG — any direction. Drop a mixed folder and convert everything to one target format in a single operation. Adjust quality for JPG and WebP output with a slider.',
    feat2Title: 'Transparency handled correctly',
    feat2Desc: 'Converting to PNG? Alpha channels are preserved exactly. You won\'t end up with a white rectangle where your transparent logo used to be. Converting from PNG to JPG? The background is filled cleanly instead of turning black.',
    feat3Title: 'No upload, no sign-up, no daily limit',
    feat3Desc: 'Most free converters cap at 5MB or 20 files per day. NexConvert has no limits because there\'s no server involved — it\'s just your CPU doing the work. The only practical ceiling is your browser\'s available memory.',
    feat4Title: 'Works offline after first visit',
    feat4Desc: 'NexConvert is a Progressive Web App. Load it once, and it works without an internet connection going forward. Pin it to your dock or home screen and it behaves like a native app.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about NexConvert format conversion.',
    faqQ1: 'How does browser-based image conversion work?',
    faqA1: 'It uses the HTML5 Canvas API in your browser to decode the uploaded image format (like PNG, JPG, or WebP) and re-encode it directly to your desired target format. The process executes locally on your CPU.',
    faqQ2: 'Will image transparency be preserved during conversion?',
    faqA2: 'Yes. If converting to PNG or WebP, transparency is fully preserved. When converting transparent images to JPEG (which does not support alpha channels), transparency is cleanly filled with a solid white background.',
    faqQ3: 'How many files can I convert at once?',
    faqA3: 'You can select and convert dozens or hundreds of files simultaneously. Since processing occurs locally on your machine, there are no cloud queuing delays or daily caps.',
    faqQ4: 'Are my files safe during format conversion?',
    faqA4: 'Completely. Because the utility runs purely inside your browser client without server-side uploads, your photos never leave your device.',
    ctaTitle: 'Ready to convert your images?',
    ctaDesc: 'Drop your files at the top of the page. Runs in any modern browser offline.',
    ctaButton: 'Back to Tool'
  },
  es: {
    title: 'Convertidor de Formatos de Imagen — JPG a WebP, PNG a JPG, Localmente | TheNexTools',
    description: 'Convierte imágenes entre JPG, PNG y WebP sin subirlas. Convierte carpetas enteras por lotes, conserva la transparencia y descarga en ZIP.',
    steps: [
      { title: 'Seleccionar Archivos', desc: 'Selecciona o arrastra imágenes sin procesar de cualquier formato al espacio de trabajo.' },
      { title: 'Elegir Formato', desc: 'Elige el formato de salida (JPG, PNG, WebP) y define las opciones de calidad.' },
      { title: 'Exportar en Lote', desc: 'Haz clic en convertir y descarga los archivos convertidos como un paquete ZIP limpio.' }
    ],
    badge: 'NexConvert — Local y Privado',
    h1: 'Deja de subir imágenes solo para cambiar el formato.',
    p1: 'Tienes una carpeta de imágenes PNG que deben ser WebP para tu web. O un lote de WebP que un cliente necesita en JPEG. Todos los convertidores online te piden que las subas de una en una, esperes y descargues. NexConvert maneja toda la carpeta a la vez — localmente, en tu navegador, sin colas ni límites de tamaño.',
    schemaTitle: 'NexConvert Convertidor de Formatos',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Convertir Formato',
    howToTitle: 'Cómo convertir imágenes sin conexión',
    diffTitle: 'Cómo funciona',
    diffDesc: 'Tu navegador ya sabe cómo decodificar y volver a codificar imágenes a través de la API Canvas. NexConvert simplemente te ofrece una interfaz adecuada para ello.',
    feat1Title: 'Cualquier combinación de formatos',
    feat1Desc: 'JPG a WebP, PNG a JPG, WebP a PNG... en cualquier dirección. Suelta una carpeta con varios formatos y conviértelos a un único formato de destino. Ajusta la calidad de salida para JPG y WebP.',
    feat2Title: 'Transparencia manejada correctamente',
    feat2Desc: '¿Vas a convertir a PNG? Los canales alfa se conservan exactamente. No tendrás un rectángulo blanco donde solía estar tu logotipo transparente. ¿De PNG a JPG? El fondo se rellena limpiamente de blanco.',
    feat3Title: 'Sin cargas, sin registros, sin límites diarios',
    feat3Desc: 'La mayoría de convertidores gratuitos limitan a 5MB o 20 archivos por día. NexConvert no tiene límites porque no hay servidor implicado: es solo tu CPU haciendo el trabajo.',
    feat4Title: 'Funciona sin conexión tras la primera visita',
    feat4Desc: 'NexConvert es una Aplicación Web Progresiva (PWA). Cárgala una vez y funcionará sin conexión a Internet en el futuro. Agrégala a tu dock o pantalla de inicio.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre la conversión local con NexConvert.',
    faqQ1: '¿Cómo funciona la conversión de imágenes en el navegador?',
    faqA1: 'Utiliza la API Canvas de HTML5 en tu navegador para decodificar el formato de imagen cargado (como PNG, JPG o WebP) y volver a codificarlo directamente al formato de destino. El proceso se ejecuta localmente en tu CPU.',
    faqQ2: '¿Se conservará la transparencia de la imagen durante la conversión?',
    faqA2: 'Sí. Al convertir a PNG o WebP, la transparencia se conserva por completo. Al convertir a JPEG (que no admite transparencia), el fondo transparente se rellena con color blanco.',
    faqQ3: '¿Cuántos archivos puedo convertir a la vez?',
    faqA3: 'Puedes seleccionar y convertir docenas o cientos de archivos simultáneamente. Como el procesamiento ocurre localmente en tu máquina, no hay colas ni límites de uso.',
    faqQ4: '¿Están seguros mis archivos durante la conversión?',
    faqA4: 'Totalmente. Como la utilidad se ejecuta puramente dentro de tu navegador cliente sin cargas al servidor, tus fotos nunca salen de tu dispositivo.',
    ctaTitle: '¿Listo para convertir tus imágenes?',
    ctaDesc: 'Suelta tus archivos en la parte superior de la página. Funciona en cualquier navegador moderno sin conexión.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Conversor de Formatos de Imagem — JPG para WebP, PNG para JPG, Localmente | TheNexTools',
    description: 'Converta imagens entre JPG, PNG e WebP sem fazer upload. Converta pastas inteiras em lote, preserve a transparência e baixe como ZIP — tudo no seu navegador.',
    steps: [
      { title: 'Selecionar Arquivos', desc: 'Selecione ou arraste imagens brutas de qualquer formato para o espaço de trabalho.' },
      { title: 'Selecionar Formato', desc: 'Escolha o formato de saída (JPG, PNG, WebP) e defina as opções de qualidade.' },
      { title: 'Exportar em Lote', desc: 'Clique em converter e baixe os arquivos convertidos como um pacote ZIP limpo.' }
    ],
    badge: 'NexConvert — Local e Privado',
    h1: 'Pare de enviar imagens apenas para alterar o formato.',
    p1: 'Você tem uma pasta de PNGs que precisam ser WebP para o seu site. Ou um lote de WebPs que um cliente precisa como JPEGs. Cada conversor online quer que você os envie um de cada vez, espere, baixe, repita. NexConvert lida com a pasta inteira de uma vez — localmente, em seu navegador, sem fila e sem limite de tamanho de arquivo.',
    schemaTitle: 'Conversor de Imagem NexConvert',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Converter Formato',
    howToTitle: 'Como converter imagens offline',
    diffTitle: 'Como funciona',
    diffDesc: 'Seu navegador já sabe decodificar e recodificar imagens por meio da API Canvas. NexConvert apenas fornece uma interface adequada para isso.',
    feat1Title: 'Todas as combinações de formatos',
    feat1Desc: 'JPG para WebP, PNG para JPG, WebP para PNG — qualquer direção. Solte uma pasta mista e converta tudo para um formato de destino em uma única operação. Ajuste a qualidade para saída JPG e WebP com um controle deslizante.',
    feat2Title: 'Transparência tratada corretamente',
    feat2Desc: 'Convertendo para PNG? Os canais alfa são preservados exatamente. Você não terminará com um retângulo branco onde costumava ficar seu logotipo transparente. Convertendo de PNG para JPG? O fundo é preenchido de forma limpa com branco.',
    feat3Title: 'Sem upload, sem registro, sem limite diário',
    feat3Desc: 'A maioria dos conversores gratuitos limita você a 5 MB ou 20 arquivos por dia. NexConvert não tem limites porque não há servidor envolvido — é apenas a sua CPU fazendo o trabalho.',
    feat4Title: 'Funciona offline após a primeira visita',
    feat4Desc: 'NexConvert é um Progressive Web App (PWA). Carregue-o uma vez e ele funcionará sem conexão com a internet de agora em diante. Adicione-o ao seu dock ou tela inicial.',
    faqTitle: 'Perguntas Frecuentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre a conversão local com o NexConvert.',
    faqQ1: 'Como funciona a conversão de imagem baseada em navegador?',
    faqA1: 'Ele usa a API HTML5 Canvas no seu navegador para decodificar o formato de imagem enviado (como PNG, JPG ou WebP) e codificá-lo novamente direto para o formato de destino desejado. O processo é executado localmente na sua CPU.',
    faqQ2: 'A transparência da imagem será preservada durante a conversão?',
    faqA2: 'Sim. Se estiver convertendo para PNG ou WebP, a transparência é totalmente preservada. Ao converter imagens transparentes para JPEG (que não suporta canais alfa), a transparência é preenchida de forma limpa com um fundo branco sólido.',
    faqQ3: 'Quantos arquivos posso converter de uma vez?',
    faqA3: 'Você pode selecionar e converter dezenas ou centenas de arquivos simultaneamente. Como o processamento ocorre localmente na sua máquina, não há atrasos em filas na nuvem ou limites diários.',
    faqQ4: 'Meus arquivos estão seguros durante a conversão do formato?',
    faqA4: 'Totalmente. Como o utilitário roda puramente dentro do seu navegador cliente sem uploads no servidor, suas fotos nunca saem do seu dispositivo.',
    ctaTitle: 'Pronto para converter suas imagens?',
    ctaDesc: 'Solte seus arquivos no topo da página. Funciona em qualquer navegador moderno offline.',
    ctaButton: 'Voltar à Ferramenta'
  },
  fr: {
      "title": "Convertisseur de Format d'Image — JPG en WebP, PNG en JPG Localement | TheNexTools",
      "description": "Convertissez des images entre JPG, PNG et WebP sans les téléverser. Conversion par lots, transparence préservée et téléchargement ZIP dans votre navigateur.",
      "steps": [
          {
              "title": "Sélectionner les Fichiers",
              "desc": "Sélectionnez ou glissez vos images de n'importe quel format dans l'espace de travail."
          },
          {
              "title": "Choisir le Format",
              "desc": "Choisissez le format cible (JPG, PNG, WebP) et définissez la qualité."
          },
          {
              "title": "Exporter par Lots",
              "desc": "Cliquez sur convertir et téléchargez les fichiers convertis dans une archive ZIP."
          }
      ],
      "badge": "NexConvert — Local et Privé",
      "h1": "Arrêtez d'envoyer vos images juste pour changer leur format.",
      "p1": "Convertissez un dossier entier de PNG en WebP ou de WebP en JPEG d'un seul coup — localement dans votre navigateur, sans file d'attente et sans limite de taille.",
      "schemaTitle": "Convertisseur d'Images NexConvert",
      "schemaHome": "Accueil",
      "schemaToolkit": "Boîte à Outils Image",
      "schemaTool": "Convertisseur d'Images",
      "howToTitle": "Comment convertir des images hors ligne",
      "diffTitle": "Comment ça marche",
      "diffDesc": "Votre navigateur sait déjà décoder et ré-encoder des images via l'API Canvas. NexConvert vous offre une interface rapide et privée.",
      "feat1Title": "Toutes les combinaisons de formats",
      "feat1Desc": "JPG vers WebP, PNG vers JPG, WebP vers PNG — dans tous les sens. Ajustez la qualité pour JPG et WebP.",
      "feat2Title": "Transparence gérée correctement",
      "feat2Desc": "Les canaux alpha sont préservés vers PNG et WebP, et remplis proprement en blanc lors d'une conversion vers JPEG.",
      "feat3Title": "Sans envoi, sans inscription, sans limite quotidienne",
      "feat3Desc": "Aucune limite de 5 Mo ou de 20 fichiers par jour : c'est votre processeur local qui fait le travail.",
      "feat4Title": "Fonctionne hors ligne après la première visite",
      "feat4Desc": "NexConvert est une Progressive Web App qui fonctionne sans connexion Internet après le premier chargement.",
      "faqTitle": "Questions Fréquentes",
      "faqSubtitle": "Tout savoir sur la conversion de formats avec NexConvert.",
      "faqQ1": "Comment fonctionne la conversion d'images dans le navigateur ?",
      "faqA1": "Elle utilise l'API HTML5 Canvas de votre navigateur pour décoder l'image et la ré-encoder directement dans le format cible sur votre processeur local.",
      "faqQ2": "La transparence est-elle conservée ?",
      "faqA2": "Oui pour PNG et WebP. Lors d'une conversion vers JPEG, le fond transparent est rempli de blanc.",
      "faqQ3": "Combien de fichiers puis-je convertir à la fois ?",
      "faqA3": "Des dizaines ou des centaines simultanément, sans file d'attente serveur.",
      "faqQ4": "Mes fichiers sont-ils en sécurité ?",
      "faqA4": "Totalement. Vos photos ne quittent jamais votre appareil.",
      "ctaTitle": "Prêt à convertir vos images ?",
      "ctaDesc": "Déposez vos fichiers en haut de la page. Fonctionne hors ligne dans tout navigateur moderne.",
      "ctaButton": "Retour à l'outil"
  },
  de: {
      "title": "Bildformat-Konverter — JPG zu WebP, PNG zu JPG Lokal | TheNexTools",
      "description": "Konvertieren Sie Bilder zwischen JPG, PNG und WebP ohne Upload. Ganze Ordner stapelweise umwandeln, Transparenz erhalten und als ZIP herunterladen.",
      "steps": [
          {
              "title": "Dateien Auswählen",
              "desc": "Wählen Sie Bilder beliebiger Formate aus oder ziehen Sie sie in den Arbeitsbereich."
          },
          {
              "title": "Format Wählen",
              "desc": "Wählen Sie das Ausgabeformat (JPG, PNG, WebP) und die Qualitätsoptionen."
          },
          {
              "title": "Stapel-Export",
              "desc": "Klicken Sie auf Konvertieren und laden Sie alle Dateien als ZIP-Paket herunter."
          }
      ],
      "badge": "NexConvert — Lokal & Privat",
      "h1": "Laden Sie Bilder nicht mehr hoch, nur um das Format zu ändern.",
      "p1": "Wandeln Sie ganze Ordner von PNGs in WebP oder WebP in JPEG auf einmal um — lokal in Ihrem Browser, ohne Warteschlange und ohne Dateigrößenlimit.",
      "schemaTitle": "NexConvert Bildkonverter",
      "schemaHome": "Startseite",
      "schemaToolkit": "Bild-Toolkit",
      "schemaTool": "Bildkonverter",
      "howToTitle": "So konvertieren Sie Bilder offline",
      "diffTitle": "Wie es funktioniert",
      "diffDesc": "Ihr Browser kann Bilder über die Canvas-API bereits dekodieren und neu kodieren. NexConvert bietet Ihnen dafür die optimale Oberfläche.",
      "feat1Title": "Jede Formatkombination",
      "feat1Desc": "JPG zu WebP, PNG zu JPG, WebP zu PNG — in jede Richtung, inklusive Qualitätsregler.",
      "feat2Title": "Transparenz sauber verarbeitet",
      "feat2Desc": "Alphakanäle bleiben bei PNG und WebP erhalten; beim Export nach JPG wird der Hintergrund sauber weiß gefüllt.",
      "feat3Title": "Kein Upload, keine Anmeldung, kein Tageslimit",
      "feat3Desc": "Keine künstlichen Beschränkungen — Ihre lokale CPU übernimmt die Verarbeitung.",
      "feat4Title": "Funktioniert offline nach dem ersten Besuch",
      "feat4Desc": "Als Progressive Web App funktioniert NexConvert nach dem ersten Laden auch ohne Internetverbindung.",
      "faqTitle": "Häufig gestellte Fragen",
      "faqSubtitle": "Alles über die Formatkonvertierung mit NexConvert.",
      "faqQ1": "Wie funktioniert die browserbasierte Bildkonvertierung?",
      "faqA1": "Über die HTML5-Canvas-API Ihres Browsers wird das Bild lokal dekodiert und direkt im gewünschten Zielformat neu kodiert.",
      "faqQ2": "Bleibt die Bildtransparenz erhalten?",
      "faqA2": "Ja, bei PNG und WebP vollständig. Bei JPEG wird Transparenz durch einen weißen Hintergrund ersetzt.",
      "faqQ3": "Wie viele Dateien kann ich gleichzeitig konvertieren?",
      "faqA3": "Dutzende oder Hunderte Dateien gleichzeitig ohne Cloud-Warteschlangen.",
      "faqQ4": "Sind meine Dateien während der Konvertierung sicher?",
      "faqA4": "Vollständig. Ihre Fotos verlassen niemals Ihr Gerät.",
      "ctaTitle": "Bereit, Ihre Bilder zu konvertieren?",
      "ctaDesc": "Legen Sie Ihre Dateien oben auf der Seite ab. Läuft in jedem modernen Browser offline.",
      "ctaButton": "Zurück zum Tool"
  },
  nl: {
      "title": "Afbeeldingsformaat Converter — JPG naar WebP, PNG naar JPG Lokaal | TheNexTools",
      "description": "Converteer afbeeldingen tussen JPG, PNG en WebP zonder uploaden. Batch-converteer mappen, behoud transparantie en download als ZIP in uw browser.",
      "steps": [
          {
              "title": "Bestanden Selecteren",
              "desc": "Selecteer of sleep afbeeldingen van elk formaat naar de werkruimte."
          },
          {
              "title": "Formaat Kiezen",
              "desc": "Kies het uitvoerformaat (JPG, PNG, WebP) en stel de kwaliteit in."
          },
          {
              "title": "Batch Exporteren",
              "desc": "Klik op converteren en download de geconverteerde bestanden als ZIP-pakket."
          }
      ],
      "badge": "NexConvert — Lokaal & Privé",
      "h1": "Stop met het uploaden van afbeeldingen alleen om het formaat te wijzigen.",
      "p1": "Converteer een hele map PNG's naar WebP of WebP's naar JPEG in één keer — lokaal in uw browser, zonder wachtrij en zonder limiet.",
      "schemaTitle": "NexConvert Afbeelding Converter",
      "schemaHome": "Home",
      "schemaToolkit": "Afbeelding Toolkit",
      "schemaTool": "Afbeelding Converter",
      "howToTitle": "Hoe afbeeldingen offline te converteren",
      "diffTitle": "Hoe het werkt",
      "diffDesc": "Uw browser kan afbeeldingen al decoderen en hercoderen via de Canvas API. NexConvert biedt hier een snelle interface voor.",
      "feat1Title": "Elke formaatcombinatie",
      "feat1Desc": "JPG naar WebP, PNG naar JPG, WebP naar PNG — elke richting met instelbare kwaliteit.",
      "feat2Title": "Transparantie correct afgehandeld",
      "feat2Desc": "Alfakanaal blijft behouden bij PNG en WebP, en wordt netjes wit gevuld bij conversie naar JPG.",
      "feat3Title": "Geen upload, geen registratie, geen dagelijkse limiet",
      "feat3Desc": "Geen limiet van 5 MB of 20 bestanden per dag — uw eigen CPU doet het werk.",
      "feat4Title": "Werkt offline na eerste bezoek",
      "feat4Desc": "NexConvert is een Progressive Web App die na één keer laden zonder internet werkt.",
      "faqTitle": "Veelgestelde Vragen",
      "faqSubtitle": "Alles over formaatconversie met NexConvert.",
      "faqQ1": "Hoe werkt beeldconversie in de browser?",
      "faqA1": "Het gebruikt de HTML5 Canvas API om het geüploade formaat te decoderen en direct naar het doelformaat te hercoderen op uw CPU.",
      "faqQ2": "Blijft transparantie behouden tijdens conversie?",
      "faqA2": "Ja, volledig bij PNG en WebP. Bij JPEG wordt transparantie gevuld met een witte achtergrond.",
      "faqQ3": "Hoeveel bestanden kan ik tegelijk converteren?",
      "faqA3": "Tientallen of honderden bestanden tegelijkertijd zonder wachtrij.",
      "faqQ4": "Zijn mijn bestanden veilig tijdens het converteren?",
      "faqA4": "Volledig. Uw foto's verlaten uw apparaat nooit.",
      "ctaTitle": "Klaar om uw afbeeldingen te converteren?",
      "ctaDesc": "Sleep uw bestanden naar de bovenkant van de pagina. Werkt offline in elke moderne browser.",
      "ctaButton": "Terug naar Tool"
  },
  it: {
      "title": "Convertitore Formato Immagine — Da JPG a WebP, da PNG a JPG Localmente | TheNexTools",
      "description": "Converti immagini tra JPG, PNG e WebP senza caricarle. Converti intere cartelle in batch, preserva la trasparenza e scarica in ZIP nel browser.",
      "steps": [
          {
              "title": "Seleziona File",
              "desc": "Seleziona o trascina immagini di qualsiasi formato nell'area di lavoro."
          },
          {
              "title": "Scegli Formato",
              "desc": "Scegli il formato di output (JPG, PNG, WebP) e definisci le opzioni di qualità."
          },
          {
              "title": "Esporta in Batch",
              "desc": "Clicca su converti e scarica i file convertiti in un pacchetto ZIP."
          }
      ],
      "badge": "NexConvert — Locale e Privato",
      "h1": "Smetti di caricare immagini solo per cambiarne il formato.",
      "p1": "Converti un'intera cartella di PNG in WebP o di WebP in JPEG in una sola volta — localmente nel tuo browser, senza code e senza limiti di dimensione.",
      "schemaTitle": "Convertitore Immagini NexConvert",
      "schemaHome": "Home",
      "schemaToolkit": "Toolkit Immagini",
      "schemaTool": "Convertitore Immagini",
      "howToTitle": "Come convertire immagini offline",
      "diffTitle": "Come funziona",
      "diffDesc": "Il tuo browser sa già come decodificare e ricodificare immagini tramite l'API Canvas. NexConvert ti offre un'interfaccia completa per farlo.",
      "feat1Title": "Ogni combinazione di formato",
      "feat1Desc": "Da JPG a WebP, da PNG a JPG, da WebP a PNG — in qualsiasi direzione con controllo qualità.",
      "feat2Title": "Trasparenza gestita correttamente",
      "feat2Desc": "I canali alfa sono preservati in PNG e WebP, e riempiti di bianco pulito quando convertiti in JPG.",
      "feat3Title": "Nessun upload, nessuna registrazione, nessun limite giornaliero",
      "feat3Desc": "Nessun limite di 5 MB o 20 file al giorno: è la tua CPU a fare il lavoro.",
      "feat4Title": "Funziona offline dopo la prima visita",
      "feat4Desc": "NexConvert è una Progressive Web App che funziona senza connessione Internet dopo il primo caricamento.",
      "faqTitle": "Domande Frequenti",
      "faqSubtitle": "Tutto sulla conversione di formato con NexConvert.",
      "faqQ1": "Come funziona la conversione immagini nel browser?",
      "faqA1": "Usa l'API HTML5 Canvas del browser per decodificare l'immagine e ricodificarla direttamente nel formato di destinazione sulla tua CPU.",
      "faqQ2": "La trasparenza viene preservata durante la conversione?",
      "faqA2": "Sì, completamente per PNG e WebP. Per JPEG la trasparenza viene riempita con uno sfondo bianco.",
      "faqQ3": "Quanti file posso convertire contemporaneamente?",
      "faqA3": "Decine o centinaia di file contemporaneamente senza code cloud.",
      "faqQ4": "I miei file sono al sicuro durante la conversione?",
      "faqA4": "Completamente. Le tue foto non lasciano mai il tuo dispositivo.",
      "ctaTitle": "Pronto a convertire le tue immagini?",
      "ctaDesc": "Trascina i tuoi file in cima alla pagina. Funziona offline in qualsiasi browser moderno.",
      "ctaButton": "Torna allo Strumento"
  },
  ja: {
      "title": "画像フォーマット変換 — JPGからWebP、PNGからJPGへローカル変換 | TheNexTools",
      "description": "画像をアップロードせずにJPG、PNG、WebP間で相互変換。フォルダ一括変換、透過保持、ZIPダウンロードにブラウザ内で対応。",
      "steps": [
          {
              "title": "ファイルを選択",
              "desc": "任意のフォーマットの画像を選択するかワークスペースにドラッグします。"
          },
          {
              "title": "フォーマットを選択",
              "desc": "出力形式（JPG、PNG、WebP）と品質オプションを選択します。"
          },
          {
              "title": "一括エクスポート",
              "desc": "変換をクリックし、変換されたファイルをZIPパッケージとしてダウンロードします。"
          }
      ],
      "badge": "NexConvert — ローカル＆プライベート",
      "h1": "フォーマット変更のためだけに画像をアップロードするのはやめましょう。",
      "p1": "フォルダ内のPNGをWebPへ、またはWebPをJPEGへ一括変換。ブラウザ内でローカル処理されるため、待ち時間やファイルサイズ制限はありません。",
      "schemaTitle": "NexConvert 画像コンバーター",
      "schemaHome": "ホーム",
      "schemaToolkit": "画像ツールキット",
      "schemaTool": "画像コンバーター",
      "howToTitle": "オフラインで画像を変換する方法",
      "diffTitle": "仕組み",
      "diffDesc": "ブラウザのCanvas APIを活用し、ローカルCPU上で高速にデコード・再エンコードを行います。",
      "feat1Title": "あらゆるフォーマット間の変換に対応",
      "feat1Desc": "JPGからWebP、PNGからJPG、WebPからPNGなど全方向に対応し、品質スライダーで調整可能です。",
      "feat2Title": "透過処理を適切に維持",
      "feat2Desc": "PNGやWebPへの変換ではアルファチャンネルを維持し、JPGへの変換では背景をきれいに白で塗りつぶします。",
      "feat3Title": "アップロード不要・登録不要・1日の制限なし",
      "feat3Desc": "サーバーを介さずお使いのCPUで処理するため、ファイル数や容量の制限はありません。",
      "feat4Title": "初回アクセス後はオフラインで動作",
      "feat4Desc": "プログレッシブウェブアプリ（PWA）として、一度読み込めばオフラインでも動作します。",
      "faqTitle": "よくある質問",
      "faqSubtitle": "NexConvertのフォーマット変換に関するよくある質問。",
      "faqQ1": "ブラウザベースの画像変換はどのように動作しますか？",
      "faqA1": "HTML5 Canvas APIを使用して画像をデコードし、指定されたターゲット形式へローカルCPU上で直接再エンコードします。",
      "faqQ2": "変換時に画像の透過は維持されますか？",
      "faqA2": "はい。PNGまたはWebPへの変換では透過が完全に維持され、JPEGへの変換では白い背景で塗りつぶされます。",
      "faqQ3": "一度に何枚のファイルを変換できますか？",
      "faqA3": "数十〜数百枚のファイルを同時に一括変換できます。",
      "faqQ4": "変換中のファイルの安全性は保たれますか？",
      "faqA4": "完全に安全です。写真が端末から外部に送信されることはありません。",
      "ctaTitle": "画像を変換する準備はできましたか？",
      "ctaDesc": "ページ上部にファイルをドロップしてください。最新のブラウザでオフライン動作します。",
      "ctaButton": "ツールに戻る"
  },
  hi: {
      "title": "इमेज फ़ॉर्मेट कन्वर्टर — JPG से WebP, PNG से JPG लोकली बदलें | TheNexTools",
      "description": "अपलोड किए बिना JPG, PNG और WebP के बीच इमेज बदलें। पूरे फ़ोल्डर को बैच में कन्वर्ट करें, पारदर्शिता बनाए रखें और ZIP के रूप में डाउनलोड करें।",
      "steps": [
          {
              "title": "फ़ाइलें चुनें",
              "desc": "वर्कस्पेस में किसी भी फ़ॉर्मेट की इमेज चुनें या ड्रैग करें।"
          },
          {
              "title": "फ़ॉर्मेट चुनें",
              "desc": "आउटपुट फ़ॉर्मेट (JPG, PNG, WebP) और क्वालिटी विकल्प चुनें।"
          },
          {
              "title": "बैच एक्सपोर्ट",
              "desc": "कन्वर्ट पर क्लिक करें और परिवर्तित फ़ाइलों को ZIP पैकेज के रूप में डाउनलोड करें।"
          }
      ],
      "badge": "NexConvert — लोकल और प्राइवेट",
      "h1": "केवल फ़ॉर्मेट बदलने के लिए इमेज अपलोड करना बंद करें।",
      "p1": "अपने ब्राउज़र में स्थानीय रूप से बिना किसी कतार और बिना फ़ाइल आकार सीमा के पूरे फ़ोल्डर को एक साथ PNG से WebP या JPG में बदलें।",
      "schemaTitle": "NexConvert इमेज कन्वर्टर",
      "schemaHome": "होम",
      "schemaToolkit": "इमेज टूलकिट",
      "schemaTool": "इमेज कन्वर्टर",
      "howToTitle": "ऑफ़लाइन इमेज कैसे कन्वर्ट करें",
      "diffTitle": "यह कैसे काम करता है",
      "diffDesc": "आपका ब्राउज़र Canvas API के माध्यम से इमेज को डिकोड और री-एनकोड करता है।",
      "feat1Title": "हर फ़ॉर्मेट संयोजन",
      "feat1Desc": "JPG से WebP, PNG से JPG, WebP से PNG — किसी भी दिशा में कन्वर्ट करें।",
      "feat2Title": "पारदर्शिता का सही प्रबंधन",
      "feat2Desc": "PNG और WebP में अल्फा चैनल सुरक्षित रहते हैं, और JPG में बदलते समय पृष्ठभूमि साफ सफेद रंग से भर जाती है।",
      "feat3Title": "कोई अपलोड नहीं, कोई साइन-अप नहीं, कोई दैनिक सीमा नहीं",
      "feat3Desc": "कोई सर्वर शामिल नहीं है — केवल आपका CPU काम करता है।",
      "feat4Title": "पहली बार खोलने के बाद ऑफ़लाइन काम करता है",
      "feat4Desc": "NexConvert एक PWA है जो एक बार लोड होने के बाद बिना इंटरनेट के काम करता है।",
      "faqTitle": "अक्सर पूछे जाने वाले प्रश्न",
      "faqSubtitle": "NexConvert फ़ॉर्मेट कन्वर्ज़न के बारे में सब कुछ।",
      "faqQ1": "ब्राउज़र-आधारित इमेज कन्वर्ज़न कैसे काम करता है?",
      "faqA1": "यह आपके ब्राउज़र में HTML5 Canvas API का उपयोग करके इमेज को डिकोड और लक्षित फ़ॉर्मेट में री-एनकोड करता है।",
      "faqQ2": "क्या कन्वर्ज़न के दौरान पारदर्शिता बनी रहेगी?",
      "faqA2": "हाँ, PNG या WebP में बदलते समय पारदर्शिता पूरी तरह सुरक्षित रहती है।",
      "faqQ3": "मैं एक बार में कितनी फ़ाइलें कन्वर्ट कर सकता हूँ?",
      "faqA3": "आप एक साथ दर्जनों या सैकड़ों फ़ाइलें कन्वर्ट कर सकते हैं।",
      "faqQ4": "क्या फ़ॉर्मेट कन्वर्ज़न के दौरान मेरी फ़ाइलें सुरक्षित हैं?",
      "faqA4": "पूरी तरह से। आपकी तस्वीरें कभी आपके डिवाइस से बाहर नहीं जातीं।",
      "ctaTitle": "अपनी इमेज कन्वर्ट करने के लिए तैयार हैं?",
      "ctaDesc": "पृष्ठ के शीर्ष पर अपनी फ़ाइलें ड्रॉप करें।",
      "ctaButton": "टूल पर वापस जाएं"
  },
  tr: {
      "title": "Görsel Format Dönüştürücü — JPG'den WebP'ye, PNG'den JPG'ye Yerel Dönüşüm | TheNexTools",
      "description": "Görselleri yüklemeden JPG, PNG ve WebP arasında dönüştürün. Klasörleri topluca dönüştürün, şeffaflığı koruyun ve ZIP olarak indirin.",
      "steps": [
          {
              "title": "Dosyaları Seçin",
              "desc": "Herhangi bir formattaki görselleri seçin veya çalışma alanına sürükleyin."
          },
          {
              "title": "Format Seçin",
              "desc": "Çıktı formatını (JPG, PNG, WebP) ve kalite seçeneklerini belirleyin."
          },
          {
              "title": "Toplu Dışa Aktarın",
              "desc": "Dönüştür'e tıklayın ve dosyaları temiz bir ZIP paketi olarak indirin."
          }
      ],
      "badge": "NexConvert — Yerel ve Gizli",
      "h1": "Sadece format değiştirmek için görsellerinizi yüklemeyi bırakın.",
      "p1": "Tüm klasörü tek seferde — yerel olarak tarayıcınızda, sıra beklemeden ve dosya boyutu sınırı olmadan dönüştürün.",
      "schemaTitle": "NexConvert Görsel Dönüştürücü",
      "schemaHome": "Ana Sayfa",
      "schemaToolkit": "Görsel Araç Seti",
      "schemaTool": "Görsel Dönüştürücü",
      "howToTitle": "Görseller çevrimdışı nasıl dönüştürülür",
      "diffTitle": "Nasıl çalışır",
      "diffDesc": "Tarayıcınız Canvas API aracılığıyla görselleri yerel olarak çözer ve hedef formatta yeniden kodlar.",
      "feat1Title": "Her format kombinasyonu",
      "feat1Desc": "JPG'den WebP'ye, PNG'den JPG'ye, WebP'den PNG'ye — her yönde dönüşüm.",
      "feat2Title": "Şeffaflık doğru şekilde korunur",
      "feat2Desc": "PNG ve WebP dönüşümlerinde alfa kanalları korunur; JPG dönüşümünde arka plan temiz beyazla doldurulur.",
      "feat3Title": "Yükleme yok, kayıt yok, günlük sınır yok",
      "feat3Desc": "Sunucu olmadığı için hiçbir yapay sınır yoktur.",
      "feat4Title": "İlk ziyaretten sonra çevrimdışı çalışır",
      "feat4Desc": "NexConvert bir PWA'dır; bir kez yüklendiğinde internetsiz çalışır.",
      "faqTitle": "Sıkça Sorulan Sorular",
      "faqSubtitle": "NexConvert format dönüştürme hakkında bilmeniz gereken her şey.",
      "faqQ1": "Tarayıcı tabanlı görsel dönüştürme nasıl çalışır?",
      "faqA1": "HTML5 Canvas API'sini kullanarak görseli yerel işlemcinizde hedef formata yeniden kodlar.",
      "faqQ2": "Dönüştürme sırasında şeffaflık korunur mu?",
      "faqA2": "Evet. PNG ve WebP'de şeffaflık tamamen korunur.",
      "faqQ3": "Aynı anda kaç dosya dönüştürebilirim?",
      "faqA3": "Onlarca veya yüzlerce dosyayı aynı anda dönüştürebilirsiniz.",
      "faqQ4": "Dönüştürme sırasında dosyalarım güvende mi?",
      "faqA4": "Tamamen. Fotoğraflarınız cihazınızdan asla ayrılmaz.",
      "ctaTitle": "Görsellerinizi dönüştürmeye hazır mısınız?",
      "ctaDesc": "Dosyalarınızı sayfanın üst kısmına bırakın.",
      "ctaButton": "Araca Dön"
  },
  sw: {
      "title": "Kibadilisha Umbizo la Picha — JPG kwenda WebP, PNG kwenda JPG Ndani ya Kifaa | TheNexTools",
      "description": "Badilisha picha kati ya JPG, PNG, na WebP bila kuzipakia. Badilisha folda nzima kwa pamoja, hifadhi uwazi, na pakua kama ZIP kwenye kivinjari chako.",
      "steps": [
          {
              "title": "Chagua Faili",
              "desc": "Chagua au buruta picha za umbizo lolote kwenye eneo la kazi."
          },
          {
              "title": "Chagua Umbizo",
              "desc": "Chagua umbizo la matokeo (JPG, PNG, WebP) na chaguo za ubora."
          },
          {
              "title": "Hamisha kwa Pamoja",
              "desc": "Bofya badilisha na upakue faili zilizobadilishwa kama kifurushi cha ZIP."
          }
      ],
      "badge": "NexConvert — Ndani na Faragha",
      "h1": "Acha kupakia picha ili tu kubadilisha umbizo.",
      "p1": "NexConvert hushughulikia folda nzima kwa wakati mmoja — ndani ya kivinjari chako, bila foleni na bila kikomo cha ukubwa wa faili.",
      "schemaTitle": "NexConvert Kibadilisha Picha",
      "schemaHome": "Nyumbani",
      "schemaToolkit": "Zana za Picha",
      "schemaTool": "Kibadilisha Picha",
      "howToTitle": "Jinsi ya kubadilisha picha nje ya mtandao",
      "diffTitle": "Jinsi inavyofanya kazi",
      "diffDesc": "Kivinjari chako hutumia Canvas API kusimbua na kusimba upya picha moja kwa moja kwenye kifaa chako.",
      "feat1Title": "Kila mchanganyiko wa umbizo",
      "feat1Desc": "JPG kwenda WebP, PNG kwenda JPG, WebP kwenda PNG — mwelekeo wowote.",
      "feat2Title": "Uwazi unashughulikiwa ipasavyo",
      "feat2Desc": "Uwazi huhifadhiwa kwenye PNG na WebP, na hujazwa rangi nyeupe safi unapobadilisha kwenda JPG.",
      "feat3Title": "Hakuna kupakia, hakuna kujisajili, hakuna kikomo cha kila siku",
      "feat3Desc": "Hakuna seva inayohusika — ni CPU yako pekee inayofanya kazi.",
      "feat4Title": "Inafanya kazi nje ya mtandao baada ya ziara ya kwanza",
      "feat4Desc": "NexConvert ni PWA inayofanya kazi bila mtandao baada ya kufunguliwa mara moja.",
      "faqTitle": "Maswali Yanayoulizwa Mara kwa Mara",
      "faqSubtitle": "Kila kitu unachohitaji kujua kuhusu NexConvert.",
      "faqQ1": "Ubadilishaji wa picha kwenye kivinjari unafanyaje kazi?",
      "faqA1": "Inatumia HTML5 Canvas API kwenye kivinjari chako kubadilisha picha moja kwa moja kwenye CPU yako.",
      "faqQ2": "Je, uwazi wa picha utahifadhiwa?",
      "faqA2": "Ndiyo, kwa PNG na WebP uwazi huhifadhiwa kikamilifu.",
      "faqQ3": "Ninaweza kubadilisha faili ngapi kwa wakati mmoja?",
      "faqA3": "Unaweza kubadilisha makumi auamia ya faili kwa wakati mmoja.",
      "faqQ4": "Je, faili zangu ziko salama?",
      "faqA4": "Kabisa. Picha zako hazitoki kwenye kifaa chako.",
      "ctaTitle": "Uko tayari kubadilisha picha zako?",
      "ctaDesc": "Weka faili zako juu ya ukurasa.",
      "ctaButton": "Rudi kwenye Zana"
  },
  bn: {
      "title": "ইমেজ ফরম্যাট কনভার্টার — লোকালি JPG থেকে WebP, PNG থেকে JPG | TheNexTools",
      "description": "আপলোড ছাড়াই JPG, PNG এবং WebP-এর মধ্যে ছবি রূপান্তর করুন। পুরো ফোল্ডার ব্যাচ কনভার্ট করুন, ট্রান্সপারেন্সি বজায় রাখুন এবং ZIP হিসেবে ডাউনলোড করুন।",
      "steps": [
          {
              "title": "ফাইল নির্বাচন করুন",
              "desc": "যেকোনো ফরম্যাটের ছবি নির্বাচন করুন বা ওয়ার্কস্পেসে ড্র্যাগ করুন।"
          },
          {
              "title": "ফরম্যাট বেছে নিন",
              "desc": "আউটপুট ফরম্যাট (JPG, PNG, WebP) এবং কোয়ালিটি অপশন নির্ধারণ করুন।"
          },
          {
              "title": "ব্যাচ এক্সপোর্ট",
              "desc": "কনভার্ট ক্লিক করুন এবং রূপান্তরিত ফাইলগুলো ZIP প্যাকেজ হিসেবে ডাউনলোড করুন।"
          }
      ],
      "badge": "NexConvert — লোকাল ও প্রাইভেট",
      "h1": "শুধু ফরম্যাট পরিবর্তনের জন্য ছবি আপলোড করা বন্ধ করুন।",
      "p1": "NexConvert পুরো ফোল্ডার একসাথে প্রসেস করে — সরাসরি আপনার ব্রাউজারে, কোনো কিউ বা ফাইল সাইজ লিমিট ছাড়াই।",
      "schemaTitle": "NexConvert ইমেজ কনভার্টার",
      "schemaHome": "হোম",
      "schemaToolkit": "ইমেজ টুলকিট",
      "schemaTool": "ইমেজ কনভার্টার",
      "howToTitle": "কীভাবে অফলাইনে ছবি কনভার্ট করবেন",
      "diffTitle": "এটি কীভাবে কাজ করে",
      "diffDesc": "আপনার ব্রাউজার Canvas API-এর মাধ্যমে লোকালি ছবি ডিকোড এবং পুনরায় এনকোড করে।",
      "feat1Title": "সব ফরম্যাট কম্বিনেশন",
      "feat1Desc": "JPG থেকে WebP, PNG থেকে JPG, WebP থেকে PNG — যেকোনো দিকে রূপান্তর করুন।",
      "feat2Title": "ট্রান্সপারেন্সি সঠিকভাবে বজায় থাকে",
      "feat2Desc": "PNG ও WebP-তে আলফা চ্যানেল অক্ষুণ্ণ থাকে এবং JPG-তে রূপান্তরের সময় ব্যাকগ্রাউন্ড সাদা রঙে পূর্ণ হয়।",
      "feat3Title": "আপলোড নেই, সাইন-আপ নেই, দৈনিক লিমিট নেই",
      "feat3Desc": "কোনো সার্ভার জড়িত নেই — আপনার লোকাল CPU সব কাজ করে।",
      "feat4Title": "প্রথমবার ভিজিটের পর অফলাইনে কাজ করে",
      "feat4Desc": "NexConvert একটি PWA যা একবার লোড হলে ইন্টারনেট ছাড়াই কাজ করে।",
      "faqTitle": "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী",
      "faqSubtitle": "NexConvert ফরম্যাট রূপান্তর সম্পর্কে যা জানা প্রয়োজন।",
      "faqQ1": "ব্রাউজার-ভিত্তিক ইমেজ কনভার্সন কীভাবে কাজ করে?",
      "faqA1": "এটি HTML5 Canvas API ব্যবহার করে আপনার লোকাল CPU-তে সরাসরি কাঙ্ক্ষিত ফরম্যাটে ছবি এনকোড করে।",
      "faqQ2": "রূপান্তরের সময় কি ছবির ট্রান্সপারেন্সি বজায় থাকবে?",
      "faqA2": "হ্যাঁ, PNG বা WebP-তে রূপান্তরের সময় ট্রান্সপারেন্সি সম্পূর্ণ বজায় থাকে।",
      "faqQ3": "একসাথে কতগুলো ফাইল কনভার্ট করা যায়?",
      "faqA3": "আপনি একসাথে ডজন বা শত শত ফাইল কনভার্ট করতে পারেন।",
      "faqQ4": "ফরম্যাট রূপান্তরের সময় আমার ফাইলগুলো কি নিরাপদ?",
      "faqA4": "সম্পূর্ণ নিরাপদ। আপনার ছবি কখনোই আপনার ডিভাইস ছেড়ে যায় না।",
      "ctaTitle": "আপনার ছবি কনভার্ট করতে প্রস্তুত?",
      "ctaDesc": "পেজের উপরের অংশে আপনার ফাইল ড্রপ করুন।",
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
      canonical: `/${lang}/image-converter`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-converter' : `/${l}/image-converter`;
          return acc;
        }, {}),
        'x-default': '/image-converter',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      siteName: 'TheNexTools',
      locale: ogLocales[lang] || 'en_US',
      url: `https://thenextools.com/${lang}/image-converter`,
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

export default async function ImageConverterLanding({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const d = await getDictionary(lang);

  return (
    <main>
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
              "url": `https://thenextools.com/${lang}/image-converter`,
              "inLanguage": lang,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires HTML5 Canvas support",
              "description": t.description,
              "publisher": {
                "@type": "Organization",
                "name": "TheNexTools",
                "url": "https://thenextools.com/"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": t.howToTitle,
              "description": t.description,
              "inLanguage": lang,
              "step": t.steps.map((step, idx) => ({
                "@type": "HowToStep",
                "position": idx + 1,
                "name": step.title,
                "text": step.desc
              }))
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
                  "item": `https://thenextools.com/${lang}/image-converter`
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
          <ImageConverterPageWrapper hideHeader={true} />
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
                <h3 className="premium-step-title">{step.title}</h3>
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
              <Link href={`/${lang}/image-compressor`} className="badge" style={{ textDecoration: 'none' }}>{d.nav.imageCompressTitle}</Link>
              <Link href={`/${lang}/image-redactor`} className="badge" style={{ textDecoration: 'none' }}>{d.nav.imageRedactTitle}</Link>
              <Link href={`/${lang}/exif-stripper`} className="badge" style={{ textDecoration: 'none' }}>{d.nav.exifStripperTitle}</Link>
              <Link href={`/${lang}/image-toolkit`} className="badge" style={{ textDecoration: 'none' }}>{d.home.imageToolkitTitle}</Link>
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
    </main>
  );
}
