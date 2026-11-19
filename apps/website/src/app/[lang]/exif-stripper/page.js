import Link from 'next/link';
import { ExifStripperPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  en: {
    title: 'EXIF Metadata Stripper — Remove GPS & Camera Data from Photos | TheNexTools',
    description: 'See the hidden data embedded in your photos — GPS location, device model, timestamps — and strip all of it before sharing. Runs locally in your browser.',
    steps: [
      { title: 'Drop Photos', desc: 'Select or drag your photos into the EXIF analyzer area.' },
      { title: 'Inspect Metadata', desc: 'View all embedded GPS coordinates, camera models, and timestamps.' },
      { title: 'Strip & Download', desc: 'Click strip EXIF to generate sanitized image files without any hidden fields.' }
    ],
    badge: 'NexStrip — Free & Private',
    h1: 'Your photos know where you live. Seriously.',
    p1: 'Every photo from your phone has GPS coordinates baked into the file — accurate to a few meters. It also has your device model, the exact time you took the shot, and sometimes your name. Most people have no idea this data is there. NexStrip shows you everything, then strips it out before you share the photo with anyone.',
    schemaTitle: 'NexStrip EXIF Metadata Stripper',
    schemaHome: 'Home',
    schemaToolkit: 'Image Toolkit',
    schemaTool: 'EXIF Stripper',
    howToTitle: 'How to strip EXIF data offline',
    diffTitle: 'What\'s actually hiding in your photos',
    diffDesc: 'EXIF metadata was designed for camera manufacturers, not for social media. Here\'s what gets embedded by default.',
    feat1Title: 'GPS coordinates',
    feat1Desc: 'If location services were on when you took the photo (and on most phones, they are by default), the file contains exact latitude and longitude. Posting a photo of your living room? You just posted your home address to anyone who knows how to right-click and check file properties.',
    feat2Title: 'Device fingerprint',
    feat2Desc: 'Camera make, model, serial number, software version, lens data — all of it is stored in the image file. In legal or investigative contexts, this can directly link a photo to a specific device and person. Most people sharing vacation photos don\'t realize they\'re also sharing their phone\'s identity.',
    feat3Title: 'Timestamps and capture settings',
    feat3Desc: 'The original capture time, any editing timestamps, ISO, shutter speed, aperture — it\'s all there. If you\'d rather not broadcast exactly when and how you took every photo, stripping this is basic digital hygiene.',
    feat4Title: 'Everything processed locally',
    feat4Desc: 'NexStrip reads and removes metadata entirely inside your browser. No server involved. Batch-process a whole folder and download clean copies individually or as a ZIP. After the first page load, it even works offline.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about NexStrip metadata stripping.',
    faqQ1: 'What is EXIF metadata?',
    faqA1: 'EXIF (Exchangeable Image File Format) is data embedded directly inside image files when photos are captured. It contains details like camera models, timestamps, exposure settings, and sometimes exact GPS coordinates.',
    faqQ2: 'How does NexStrip remove this data?',
    faqA2: 'It loads the photo inside your local browser client, extracts the raw image canvas data, and re-exports it back as a clean image without copying the metadata headers. This destroys the EXIF data permanently.',
    faqQ3: 'Is my privacy guaranteed?',
    faqA3: 'Yes. NexStrip operates entirely client-side. The metadata parsing and stripping happen in your browser context. No data, files, or location coordinates are uploaded to any server.',
    faqQ4: 'What image formats are supported by EXIF Stripper?',
    faqA4: 'NexStrip supports JPEG, JPG, and PNG image files, which are the most common formats that embed camera metadata.',
    ctaTitle: 'Ready to clean your photos?',
    ctaDesc: 'Drop your files at the top of the page. All metadata is stripped in your browser.',
    ctaButton: 'Back to Tool'
  },
  es: {
    title: 'Limpiador de Metadatos EXIF — Eliminar Datos de GPS y Cámara de Fotos | TheNexTools',
    description: 'Mira los datos ocultos en tus fotos — ubicación GPS, modelo de dispositivo, marcas de tiempo — y elimínalos antes de compartir. Se ejecuta en tu navegador.',
    steps: [
      { title: 'Soltar Fotos', desc: 'Selecciona o arrastra tus fotos al área del analizador EXIF.' },
      { title: 'Inspeccionar Metadados', desc: 'Ver todas las coordenadas GPS incrustadas, modelos de cámara y marcas de tiempo.' },
      { title: 'Limpiar y Descargar', desc: 'Haz clic en limpiar EXIF para generar archivos de imagen sanitizados sin campos ocultos.' }
    ],
    badge: 'NexStrip — Gratis y Privado',
    h1: 'Tus fotos saben dónde vives. En serio.',
    p1: 'Cada foto de tu teléfono tiene coordenadas GPS guardadas en el archivo, con precisión de pocos metros. También tiene el modelo de tu dispositivo, la hora exacta de la captura y, a veces, tu nombre. La mayoría de la gente no sabe que estos datos existen. NexStrip te muestra todo y luego lo elimina antes de que compartas la foto.',
    schemaTitle: 'NexStrip Limpiador de Metadatos EXIF',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Limpiar EXIF',
    howToTitle: 'Cómo eliminar datos EXIF sin conexión',
    diffTitle: 'Lo que realmente se esconde en tus fotos',
    diffDesc: 'Los metadatos EXIF fueron diseñados para fabricantes de cámaras, no para redes sociales. Esto es lo que se incrusta por defecto.',
    feat1Title: 'Coordenadas GPS',
    feat1Desc: 'Si los servicios de ubicación estaban activos al tomar la foto, el archivo contiene la latitud y longitud exactas. ¿Publicas una foto de tu salón? Acabas de publicar tu dirección para cualquiera que sepa cómo verificar las propiedades del archivo.',
    feat2Title: 'Huella digital del dispositivo',
    feat2Desc: 'Marca de la cámara, modelo, número de serie, versión de software, datos de la lente... todo se almacena en la imagen. En contextos legales o de investigación, esto puede vincular una foto a un dispositivo específico.',
    feat3Title: 'Marcas de tiempo y ajustes de captura',
    feat3Desc: 'La hora de captura original, las marcas de tiempo de edición, ISO, velocidad de obturación, apertura... todo está allí. Si prefieres no difundir exactamente cuándo y cómo tomaste cada foto, limpiar esto es higiene digital básica.',
    feat4Title: 'Procesamiento 100% local',
    feat4Desc: 'NexStrip lee y elimina metadatos por completo dentro de tu navegador. Sin servidores. Procesa lotes completos de carpetas y descarga copias limpias de forma individual o en un ZIP. Funciona sin conexión.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre la limpieza de metadatos con NexStrip.',
    faqQ1: '¿Qué son los metadatos EXIF?',
    faqA1: 'EXIF (Exchangeable Image File Format) son datos incrustados directamente dentro de los archivos de imagen al capturar fotos. Contiene detalles como modelos de cámara, marcas de tiempo, ajustes de exposición y, a veces, coordenadas GPS exactas.',
    faqQ2: '¿Cómo elimina NexStrip estos datos?',
    faqA2: 'Carga la foto en tu navegador local, extrae los datos de píxeles sin procesar y la vuelve a exportar como una imagen limpia sin copiar los encabezados de metadatos. Esto destruye los datos EXIF de forma permanente.',
    faqQ3: '¿Está garantizada mi privacidad?',
    faqA3: 'Sí. NexStrip funciona completamente del lado del cliente. El análisis y la eliminación de metadatos ocurren en tu navegador. Ningún archivo, dato o coordenada se sube a ningún servidor.',
    faqQ4: '¿Qué formatos de imagen son compatibles?',
    faqA4: 'NexStrip es compatible con archivos de imagen JPEG, JPG y PNG, que son los formatos más comunes que incrustan metadatos de cámara.',
    ctaTitle: '¿Listo para limpiar tus fotos?',
    ctaDesc: 'Suelta tus archivos en la parte superior de la página. Todos los metadatos se eliminan en tu navegador.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Removedor de Metadados EXIF — Remover Dados de GPS e Câmera das Fotos | TheNexTools',
    description: 'Veja os dados ocultos em suas fotos — localização GPS, modelo do dispositivo, carimbos de data/hora — e remova tudo antes de compartilhar. Funciona localmente em seu navegador.',
    steps: [
      { title: 'Soltar Fotos', desc: 'Selecione ou arraste suas fotos para a área do analisador EXIF.' },
      { title: 'Inspecionar Metadados', desc: 'Visualizar todas as coordenadas GPS incorporadas, modelos de câmera e carimbos de data/hora.' },
      { title: 'Remover e Baixar', desc: 'Clique em remover EXIF para gerar arquivos de imagem limpos e sem campos ocultos.' }
    ],
    badge: 'NexStrip — Grátis e Privado',
    h1: 'Suas fotos sabem onde você mora. Sério.',
    p1: 'Cada foto do seu telefone tem coordenadas GPS gravadas no arquivo — precisas a poucos metros. Também tem o modelo do seu dispositivo, a hora exata em que tirou a foto e, às vezes, seu nome. A maioria das pessoas não tem ideia de que esses dados estão lá. NexStrip mostra tudo a você e, em seguida, remove antes de você compartilhar a foto.',
    schemaTitle: 'Removedor de Metadados EXIF NexStrip',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Removedor EXIF',
    howToTitle: 'Como remover dados EXIF offline',
    diffTitle: 'O que está realmente escondido em suas fotos',
    diffDesc: 'Os metadatos EXIF foram projetados para fabricantes de câmeras, não para redes sociais. Aqui está o que é incorporado por padrão.',
    feat1Title: 'Coordenadas GPS',
    feat1Desc: 'Se os serviços de localização estavam ativos ao tirar a foto, o arquivo contém a latitude e longitude exatas. Postando uma foto da sua sala? Você acabou de postar seu endereço residencial para quem souber verificar as propriedades do arquivo.',
    feat2Title: 'Impressão digital do dispositivo',
    feat2Desc: 'Marca da câmera, modelo, número de série, versão do software, dados da lente... tudo é armazenado no arquivo de imagem. Em contextos legais ou investigativos, isso pode vincular diretamente uma foto a um dispositivo específico.',
    feat3Title: 'Carimbos de data/hora e configurações de captura',
    feat3Desc: 'A hora de captura original, marcas de tempo de edição, ISO, velocidade do obturador, abertura... está tudo lá. Se você preferir não transmitir exatamente quando e como tirou cada foto, remover isso é higiene digital básica.',
    feat4Title: 'Tudo processado localmente',
    feat4Desc: 'NexStrip lê e remove metadatos inteiramente dentro do seu navegador. Sem servidor envolvido. Processe pastas inteiras em lote e baixe cópias limpas individualmente ou como ZIP. Funciona offline.',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre a remoção de metadatos com o NexStrip.',
    faqQ1: 'O que são metadatos EXIF?',
    faqA1: 'EXIF (Exchangeable Image File Format) são dados incorporados diretamente nos arquivos de imagem ao capturar fotos. Contém detalhes como modelos de câmera, carimbos de data/hora, configurações de exposição e, às vezes, coordenadas GPS exatas.',
    faqQ2: 'Como o NexStrip remove esses dados?',
    faqA2: 'Ele carrega a foto no seu navegador local, extrai os dados brutos de pixels da imagem e a exporta de volta como uma imagem limpa sem copiar os cabeçalhos de metadatos. Isso destrói os dados EXIF permanentemente.',
    faqQ3: 'Minha privacidade está garantida?',
    faqA3: 'Sim. NexStrip opera inteiramente do lado do cliente. A análise e remoção de metadatos acontecem no seu navegador. Nenhum arquivo, dado ou coordenada é enviado para qualquer servidor.',
    faqQ4: 'Quais formatos de imagem são suportados?',
    faqA4: 'NexStrip suporta arquivos de imagem JPEG, JPG e PNG, que são os formatos mais comuns que incorporam metadatos de câmera.',
    ctaTitle: 'Pronto para limpar suas fotos?',
    ctaDesc: 'Solte seus arquivos no topo da página. Todos os metadatos são removidos no seu navegador.',
    ctaButton: 'Voltar à Ferramenta'
  },
  fr: {
      "title": "Suppresseur de Métadonnées EXIF — Retirer GPS et Données Caméra des Photos | TheNexTools",
      "description": "Visualisez les données cachées dans vos photos — position GPS, modèle d'appareil, horodatage — et supprimez-les avant de partager. Exécuté localement dans votre navigateur.",
      "steps": [
          {
              "title": "Déposer des Photos",
              "desc": "Sélectionnez ou glissez vos photos dans la zone d'analyse EXIF."
          },
          {
              "title": "Inspecter les Métadonnées",
              "desc": "Consultez les coordonnées GPS, modèles d'appareils et dates intégrés."
          },
          {
              "title": "Nettoyer et Télécharger",
              "desc": "Cliquez sur supprimer EXIF pour générer des fichiers propres sans champs cachés."
          }
      ],
      "badge": "NexStrip — Gratuit et Privé",
      "h1": "Vos photos savent où vous habitez. Sérieusement.",
      "p1": "Chaque photo prise avec votre téléphone contient des coordonnées GPS précises à quelques mètres près ainsi que le modèle de votre appareil. NexStrip vous montre tout, puis l'efface avant que vous ne partagiez la photo.",
      "schemaTitle": "Suppresseur de Métadonnées EXIF NexStrip",
      "schemaHome": "Accueil",
      "schemaToolkit": "Boîte à Outils Image",
      "schemaTool": "Suppresseur EXIF",
      "howToTitle": "Comment supprimer les données EXIF hors ligne",
      "diffTitle": "Ce qui se cache réellement dans vos photos",
      "diffDesc": "Les métadonnées EXIF ont été conçues pour les fabricants d'appareils photo, pas pour les réseaux sociaux.",
      "feat1Title": "Coordonnées GPS",
      "feat1Desc": "Si la localisation était activée lors de la prise de vue, le fichier contient la latitude et la longitude exactes.",
      "feat2Title": "Empreinte de l'appareil",
      "feat2Desc": "Marque, modèle, numéro de série, version logicielle et données d'objectif sont stockés dans le fichier image.",
      "feat3Title": "Horodatage et réglages de capture",
      "feat3Desc": "Date et heure exactes de prise de vue, ISO, vitesse d'obturation et ouverture sont enregistrés par défaut.",
      "feat4Title": "Tout est traité localement",
      "feat4Desc": "NexStrip lit et supprime les métadonnées entièrement dans votre navigateur, sans aucun serveur.",
      "faqTitle": "Questions Fréquentes",
      "faqSubtitle": "Tout savoir sur la suppression de métadonnées avec NexStrip.",
      "faqQ1": "Qu'est-ce que les métadonnées EXIF ?",
      "faqA1": "Les données EXIF sont des informations intégrées directement dans les fichiers image lors de la prise de vue (modèle d'appareil, date, réglages et coordonnées GPS).",
      "faqQ2": "Comment NexStrip supprime-t-il ces données ?",
      "faqA2": "Il charge la photo dans votre navigateur, extrait les pixels bruts sur un canevas et ré-exporte une image propre sans les en-têtes de métadonnées.",
      "faqQ3": "Ma vie privée est-elle garantie ?",
      "faqA3": "Oui. L'analyse et la suppression s'effectuent à 100 % côté client dans votre navigateur.",
      "faqQ4": "Quels formats d'image sont pris en charge ?",
      "faqA4": "NexStrip prend en charge les fichiers JPEG, JPG et PNG.",
      "ctaTitle": "Prêt à nettoyer vos photos ?",
      "ctaDesc": "Déposez vos fichiers en haut de la page. Toutes les métadonnées sont supprimées dans votre navigateur.",
      "ctaButton": "Retour à l'outil"
  },
  de: {
      "title": "EXIF-Metadaten Entferner — GPS- & Kameradaten aus Fotos Löschen | TheNexTools",
      "description": "Sehen Sie versteckte Daten in Ihren Fotos — GPS-Standort, Gerätemodell, Zeitstempel — und entfernen Sie alles vor dem Teilen lokal im Browser.",
      "steps": [
          {
              "title": "Fotos Ablegen",
              "desc": "Wählen Sie Ihre Fotos aus oder ziehen Sie sie in den EXIF-Analysebereich."
          },
          {
              "title": "Metadaten Prüfen",
              "desc": "Sehen Sie alle eingebetteten GPS-Koordinaten, Kameramodelle und Zeitstempel ein."
          },
          {
              "title": "Bereinigen & Laden",
              "desc": "Klicken Sie auf EXIF entfernen, um bereinigte Bilddateien ohne versteckte Felder zu erzeugen."
          }
      ],
      "badge": "NexStrip — Kostenlos & Privat",
      "h1": "Ihre Fotos wissen, wo Sie wohnen. Ernsthaft.",
      "p1": "Jedes Smartphone-Foto enthält metergenaue GPS-Koordinaten, Ihr Gerätemodell und die genaue Aufnahmezeit. NexStrip zeigt Ihnen alle Daten und entfernt sie vor dem Teilen.",
      "schemaTitle": "NexStrip EXIF-Metadaten Entferner",
      "schemaHome": "Startseite",
      "schemaToolkit": "Bild-Toolkit",
      "schemaTool": "EXIF-Entferner",
      "howToTitle": "So entfernen Sie EXIF-Daten offline",
      "diffTitle": "Was sich wirklich in Ihren Fotos versteckt",
      "diffDesc": "EXIF-Metadaten wurden für Kamerahersteller entwickelt, nicht für soziale Netzwerke.",
      "feat1Title": "GPS-Koordinaten",
      "feat1Desc": "Wenn Standortdienste aktiviert waren, enthält die Datei den exakten Breiten- und Längengrad der Aufnahme.",
      "feat2Title": "Geräte-Fingerabdruck",
      "feat2Desc": "Kamerahersteller, Modell, Seriennummer, Softwareversion und Objektivdaten sind direkt im Bild gespeichert.",
      "feat3Title": "Zeitstempel und Aufnahmeeinstellungen",
      "feat3Desc": "Aufnahmezeitpunkt, Bearbeitungszeitstempel, ISO, Belichtungszeit und Blende lassen sich restlos entfernen.",
      "feat4Title": "Alles lokal verarbeitet",
      "feat4Desc": "NexStrip liest und löscht Metadaten komplett innerhalb Ihres Browsers ohne Serverkontakt.",
      "faqTitle": "Häufig gestellte Fragen",
      "faqSubtitle": "Alles über die Metadaten-Bereinigung mit NexStrip.",
      "faqQ1": "Was sind EXIF-Metadaten?",
      "faqA1": "EXIF-Daten werden beim Fotografieren direkt in die Bilddatei eingebettet und enthalten Kameramodell, Zeitstempel, Belichtungswerte und oft genaue GPS-Koordinaten.",
      "faqQ2": "Wie entfernt NexStrip diese Daten?",
      "faqA2": "Es lädt das Foto lokal im Browser, extrahiert die reinen Bildpixel und exportiert eine neue, saubere Bilddatei ohne Metadaten-Header.",
      "faqQ3": "Ist meine Privatsphäre garantiert?",
      "faqA3": "Ja. NexStrip arbeitet vollständig clientseitig in Ihrem Browser.",
      "faqQ4": "Welche Bildformate werden unterstützt?",
      "faqA4": "NexStrip unterstützt JPEG-, JPG- und PNG-Bilddateien.",
      "ctaTitle": "Bereit, Ihre Fotos zu bereinigen?",
      "ctaDesc": "Legen Sie Ihre Dateien oben auf der Seite ab. Alle Metadaten werden im Browser entfernt.",
      "ctaButton": "Zurück zum Tool"
  },
  nl: {
      "title": "EXIF Metadata Verwijderaar — Verwijder GPS & Cameragegevens uit Foto's | TheNexTools",
      "description": "Bekijk de verborgen gegevens in uw foto's — GPS-locatie, apparaatmodel, tijdstempels — en verwijder alles voordat u ze deelt. Werkt lokaal in uw browser.",
      "steps": [
          {
              "title": "Foto's Slepen",
              "desc": "Selecteer of sleep uw foto's naar het EXIF-analysegebied."
          },
          {
              "title": "Metadata Inspecteren",
              "desc": "Bekijk alle ingesloten GPS-coördinaten, cameramodellen en tijdstempels."
          },
          {
              "title": "Wissen & Downloaden",
              "desc": "Klik op EXIF wissen om schone afbeeldingsbestanden zonder verborgen velden te genereren."
          }
      ],
      "badge": "NexStrip — Gratis & Privé",
      "h1": "Uw foto's weten waar u woont. Echt waar.",
      "p1": "Elke foto van uw telefoon bevat exacte GPS-coördinaten, uw toestelmodel en het tijdstip van de opname. NexStrip laat u alles zien en verwijdert het voordat u de foto deelt.",
      "schemaTitle": "NexStrip EXIF Metadata Verwijderaar",
      "schemaHome": "Home",
      "schemaToolkit": "Afbeelding Toolkit",
      "schemaTool": "EXIF Verwijderaar",
      "howToTitle": "Hoe EXIF-gegevens offline te verwijderen",
      "diffTitle": "Wat er echt verborgen zit in uw foto's",
      "diffDesc": "EXIF-metadata is ontworpen voor camerafabrikanten, niet voor sociale media.",
      "feat1Title": "GPS-coördinaten",
      "feat1Desc": "Als locatiediensten aan stonden, bevat het bestand de exacte breedte- en lengtegraad.",
      "feat2Title": "Apparaat-vingerafdruk",
      "feat2Desc": "Cameramerk, model, serienummer, softwareversie en lensgegevens worden standaard opgeslagen.",
      "feat3Title": "Tijdstempels en opname-instellingen",
      "feat3Desc": "De originele opnametijd, ISO, sluitertijd en diafragma zijn allemaal zichtbaar tenzij u ze wist.",
      "feat4Title": "Alles lokaal verwerkt",
      "feat4Desc": "NexStrip leest en verwijdert metadata volledig binnen uw browser zonder server.",
      "faqTitle": "Veelgestelde Vragen",
      "faqSubtitle": "Alles wat u moet weten over het wissen van metadata met NexStrip.",
      "faqQ1": "Wat is EXIF-metadata?",
      "faqA1": "EXIF is informatie die direct in afbeeldingsbestanden wordt opgeslagen wanneer foto's worden gemaakt, zoals cameramodel, tijdstempels en GPS-coördinaten.",
      "faqQ2": "Hoe verwijdert NexStrip deze gegevens?",
      "faqA2": "Het laadt de foto lokaal in uw browser, haalt de ruwe canvas-pixels op en exporteert een schone afbeelding zonder metadata-headers.",
      "faqQ3": "Is mijn privacy gegarandeerd?",
      "faqA3": "Ja. NexStrip werkt volledig aan de clientzijde in uw browser.",
      "faqQ4": "Welke beeldformaten worden ondersteund?",
      "faqA4": "NexStrip ondersteunt JPEG-, JPG- en PNG-bestanden.",
      "ctaTitle": "Klaar om uw foto's op te schonen?",
      "ctaDesc": "Sleep uw bestanden naar de bovenkant van de pagina. Alle metadata wordt in uw browser gewist.",
      "ctaButton": "Terug naar Tool"
  },
  it: {
      "title": "Rimozione Metadati EXIF — Rimuovi Dati GPS e Fotocamera dalle Foto | TheNexTools",
      "description": "Visualizza i dati nascosti nelle tue foto — posizione GPS, modello del dispositivo, timestamp — e rimuovili prima di condividere. Funziona localmente nel browser.",
      "steps": [
          {
              "title": "Trascina Foto",
              "desc": "Seleziona o trascina le tue foto nell'area di analisi EXIF."
          },
          {
              "title": "Ispeziona Metadati",
              "desc": "Visualizza tutte le coordinate GPS, i modelli di fotocamera e i timestamp incorporati."
          },
          {
              "title": "Pulisci e Scarica",
              "desc": "Clicca su rimuovi EXIF per generare file immagine puliti senza campi nascosti."
          }
      ],
      "badge": "NexStrip — Gratuito e Privato",
      "h1": "Le tue foto sanno dove vivi. Sul serio.",
      "p1": "Ogni foto scattata col telefono contiene coordinate GPS precise a pochi metri, il modello del dispositivo e l'ora esatta dello scatto. NexStrip ti mostra tutto e lo rimuove prima che tu condivida la foto.",
      "schemaTitle": "Rimozione Metadati EXIF NexStrip",
      "schemaHome": "Home",
      "schemaToolkit": "Toolkit Immagini",
      "schemaTool": "EXIF Stripper",
      "howToTitle": "Come rimuovere i dati EXIF offline",
      "diffTitle": "Cosa si nasconde davvero nelle tue foto",
      "diffDesc": "I metadati EXIF sono stati progettati per i produttori di fotocamere, non per i social media.",
      "feat1Title": "Coordinate GPS",
      "feat1Desc": "Se i servizi di localizzazione erano attivi, il file contiene latitudine e longitudine esatte.",
      "feat2Title": "Impronta digitale del dispositivo",
      "feat2Desc": "Marca, modello, numero di serie, versione software e dati dell'obiettivo sono memorizzati nel file immagine.",
      "feat3Title": "Timestamp e impostazioni di scatto",
      "feat3Desc": "Ora di scatto originale, ISO, velocità dell'otturatore e apertura sono tutti registrati.",
      "feat4Title": "Tutto elaborato localmente",
      "feat4Desc": "NexStrip legge e rimuove i metadati interamente nel tuo browser senza alcun server.",
      "faqTitle": "Domande Frequenti",
      "faqSubtitle": "Tutto sulla rimozione dei metadati con NexStrip.",
      "faqQ1": "Cosa sono i metadati EXIF?",
      "faqA1": "EXIF è un formato di dati incorporati direttamente nei file immagine al momento dello scatto (modello fotocamera, timestamp e coordinate GPS).",
      "faqQ2": "Come fa NexStrip a rimuovere questi dati?",
      "faqA2": "Carica la foto nel browser locale, estrae i pixel grezzi su canvas e riesporta un'immagine pulita senza copiare le intestazioni dei metadati.",
      "faqQ3": "La mia privacy è garantita?",
      "faqA3": "Sì. NexStrip opera interamente lato client nel tuo browser.",
      "faqQ4": "Quali formati immagine sono supportati?",
      "faqA4": "NexStrip supporta file immagine JPEG, JPG e PNG.",
      "ctaTitle": "Pronto a pulire le tue foto?",
      "ctaDesc": "Trascina i tuoi file in cima alla pagina. Tutti i metadati vengono rimossi nel browser.",
      "ctaButton": "Torna allo Strumento"
  },
  ja: {
      "title": "EXIFメタデータ削除ツール — 写真からGPS位置情報やカメラデータを消去 | TheNexTools",
      "description": "写真に埋め込まれたGPS位置情報、端末モデル、撮影日時などの隠しデータを確認し、共有前に一括削除。ブラウザ内でローカル動作します。",
      "steps": [
          {
              "title": "写真をドロップ",
              "desc": "EXIF解析エリアに写真を選択またはドラッグ＆ドロップします。"
          },
          {
              "title": "メタデータを確認",
              "desc": "埋め込まれたGPS座標、カメラモデル、タイムスタンプを一覧表示します。"
          },
          {
              "title": "削除してダウンロード",
              "desc": "EXIF削除をクリックし、隠しフィールドのないクリーンな画像を保存します。"
          }
      ],
      "badge": "NexStrip — 無料＆プライベート",
      "h1": "あなたの写真は、あなたの自宅を知っています。",
      "p1": "スマートフォンで撮影した写真には、数メートル単位の正確なGPS座標や端末モデル、撮影日時が記録されています。NexStripはそれらを可視化し、共有前に完全に消去します。",
      "schemaTitle": "NexStrip EXIFメタデータ削除ツール",
      "schemaHome": "ホーム",
      "schemaToolkit": "画像ツールキット",
      "schemaTool": "EXIF削除ツール",
      "howToTitle": "オフラインでEXIFデータを削除する方法",
      "diffTitle": "写真に隠されている情報とは",
      "diffDesc": "EXIFメタデータはカメラメーカー向けに設計されたものであり、SNS共有向けではありません。",
      "feat1Title": "GPS座標",
      "feat1Desc": "撮影時に位置情報サービスがオンだった場合、正確な緯度と経度がファイルに含まれています。",
      "feat2Title": "デバイスのフィンガープリント",
      "feat2Desc": "カメラのメーカー、モデル、シリアル番号、ソフトウェアバージョン、レンズ情報などが保存されています。",
      "feat3Title": "タイムスタンプと撮影設定",
      "feat3Desc": "撮影日時、編集日時、ISO感度、シャッタースピード、絞り値などをまとめて消去できます。",
      "feat4Title": "すべてローカルで処理",
      "feat4Desc": "メタデータの読み取りと削除はすべてブラウザ内で完結し、サーバーには一切送信されません。",
      "faqTitle": "よくある質問",
      "faqSubtitle": "NexStripによるメタデータ削除に関するよくある質問。",
      "faqQ1": "EXIFメタデータとは何ですか？",
      "faqA1": "写真撮影時に画像ファイル内に直接埋め込まれるデータで、カメラモデル、撮影日時、露出設定、GPS座標などが含まれます。",
      "faqQ2": "NexStripはどのようにデータを削除しますか？",
      "faqA2": "ブラウザ内で画像を読み込み、ピクセルデータのみを抽出してメタデータヘッダーを含まないクリーンな画像として再出力します。",
      "faqQ3": "プライバシーは保証されますか？",
      "faqA3": "はい。解析と削除はすべてブラウザ内でローカルに実行されます。",
      "faqQ4": "対応している画像フォーマットは？",
      "faqA4": "JPEG、JPG、PNG形式の画像ファイルに対応しています。",
      "ctaTitle": "写真をクリーンにする準備はできましたか？",
      "ctaDesc": "ページ上部にファイルをドロップしてください。すべてのメタデータがブラウザ内で削除されます。",
      "ctaButton": "ツールに戻る"
  },
  hi: {
      "title": "EXIF मेटाडेटा स्ट्रिपर — फ़ोटो से GPS और कैमरा डेटा हटाएं | TheNexTools",
      "description": "अपनी तस्वीरों में छुपे डेटा — GPS लोकेशन, डिवाइस मॉडल, टाइमस्टैम्प — को देखें और साझा करने से पहले हटा दें। आपके ब्राउज़र में लोकली चलता है।",
      "steps": [
          {
              "title": "फ़ोटो ड्रॉप करें",
              "desc": "EXIF विश्लेषक क्षेत्र में अपनी तस्वीरें चुनें या ड्रैग करें।"
          },
          {
              "title": "मेटाडेटा जांचें",
              "desc": "सभी एम्बेडेड GPS निर्देशांक, कैमरा मॉडल और टाइमस्टैम्प देखें।"
          },
          {
              "title": "हटाएं और डाउनलोड करें",
              "desc": "बिना किसी छुपे फ़ील्ड के साफ इमेज फ़ाइलें बनाने के लिए स्ट्रिप EXIF पर क्लिक करें।"
          }
      ],
      "badge": "NexStrip — मुफ़्त और प्राइवेट",
      "h1": "आपकी तस्वीरें जानती हैं कि आप कहाँ रहते हैं। सच में।",
      "p1": "आपके फ़ोन से ली गई हर तस्वीर में कुछ मीटर तक सटीक GPS निर्देशांक, डिवाइस मॉडल और समय दर्ज होता है। NexStrip आपको सब कुछ दिखाता है और फ़ोटो साझा करने से पहले उसे हटा देता है।",
      "schemaTitle": "NexStrip EXIF मेटाडेटा स्ट्रिपर",
      "schemaHome": "होम",
      "schemaToolkit": "इमेज टूलकिट",
      "schemaTool": "EXIF स्ट्रिपर",
      "howToTitle": "ऑफ़लाइन EXIF डेटा कैसे हटाएं",
      "diffTitle": "आपकी तस्वीरों में वास्तव में क्या छुपा है",
      "diffDesc": "EXIF मेटाडेटा कैमरा निर्माताओं के लिए डिज़ाइन किया गया था, सोशल मीडिया के लिए नहीं।",
      "feat1Title": "GPS निर्देशांक",
      "feat1Desc": "यदि फ़ोटो लेते समय लोकेशन चालू थी, तो फ़ाइल में सटीक अक्षांश और देशांतर शामिल होते हैं।",
      "feat2Title": "डिवाइस फ़िंगरप्रिंट",
      "feat2Desc": "कैमरा मेक, मॉडल, सीरियल नंबर, सॉफ़्टवेयर वर्ज़न और लेंस डेटा इमेज फ़ाइल में संग्रहीत होते हैं।",
      "feat3Title": "टाइमस्टैम्प और कैप्चर सेटिंग्स",
      "feat3Desc": "मूल कैप्चर समय, ISO, शटर स्पीड और अपर्चर — यह सब साफ किया जा सकता है।",
      "feat4Title": "सब कुछ लोकली प्रोसेस किया गया",
      "feat4Desc": "NexStrip बिना किसी सर्वर के पूरी तरह से आपके ब्राउज़र के अंदर मेटाडेटा पढ़ता और हटाता है।",
      "faqTitle": "अक्सर पूछे जाने वाले प्रश्न",
      "faqSubtitle": "NexStrip मेटाडेटा स्ट्रिपिंग के बारे में सब कुछ।",
      "faqQ1": "EXIF मेटाडेटा क्या है?",
      "faqA1": "EXIF वह डेटा है जो फ़ोटो लेते समय सीधे इमेज फ़ाइलों के अंदर एम्बेड हो जाता है, जैसे कैमरा मॉडल, समय और GPS निर्देशांक।",
      "faqQ2": "NexStrip इस डेटा को कैसे हटाता है?",
      "faqA2": "यह आपके लोकल ब्राउज़र में फ़ोटो लोड करता है, रॉ इमेज कैनवास डेटा निकालता है, और मेटाडेटा हेडर के बिना साफ इमेज एक्सपोर्ट करता है।",
      "faqQ3": "क्या मेरी गोपनीयता की गारंटी है?",
      "faqA3": "हाँ। NexStrip पूरी तरह से क्लाइंट-साइड काम करता है।",
      "faqQ4": "EXIF स्ट्रिपर द्वारा कौन से इमेज फ़ॉर्मेट समर्थित हैं?",
      "faqA4": "NexStrip JPEG, JPG और PNG इमेज फ़ाइलों का समर्थन करता है।",
      "ctaTitle": "अपनी तस्वीरें साफ करने के लिए तैयार हैं?",
      "ctaDesc": "पृष्ठ के शीर्ष पर अपनी फ़ाइलें ड्रॉप करें। सभी मेटाडेटा आपके ब्राउज़र में हटा दिया जाता है।",
      "ctaButton": "टूल पर वापस जाएं"
  },
  tr: {
      "title": "EXIF Meta Veri Temizleyici — Fotoğraflardan GPS ve Kamera Verilerini Kaldırın | TheNexTools",
      "description": "Fotoğraflarınıza gömülü gizli verileri — GPS konumu, cihaz modeli, zaman damgaları — görün ve paylaşmadan önce temizleyin. Tarayıcınızda yerel olarak çalışır.",
      "steps": [
          {
              "title": "Fotoğrafları Bırakın",
              "desc": "Fotoğraflarınızı EXIF analiz alanına seçin veya sürükleyin."
          },
          {
              "title": "Meta Verileri İnceleyin",
              "desc": "Gömülü tüm GPS koordinatlarını, kamera modellerini ve zaman damgalarını görüntüleyin."
          },
          {
              "title": "Temizleyin ve İndirin",
              "desc": "Gizli alanlar içermeyen temiz görsel dosyaları oluşturmak için EXIF temizle'ye tıklayın."
          }
      ],
      "badge": "NexStrip — Ücretsiz ve Gizli",
      "h1": "Fotoğraflarınız nerede yaşadığınızı biliyor. Cidden.",
      "p1": "Telefonunuzdan çekilen her fotoğraf birkaç metre hassasiyetinde GPS koordinatları, cihaz modeliniz ve çekim zamanını içerir. NexStrip size her şeyi gösterir ve fotoğrafı paylaşmadan önce bunları temizler.",
      "schemaTitle": "NexStrip EXIF Meta Veri Temizleyici",
      "schemaHome": "Ana Sayfa",
      "schemaToolkit": "Görsel Araç Seti",
      "schemaTool": "EXIF Temizleyici",
      "howToTitle": "EXIF verileri çevrimdışı nasıl temizlenir",
      "diffTitle": "Fotoğraflarınızda aslında neler gizleniyor",
      "diffDesc": "EXIF meta verileri sosyal medya için değil, kamera üreticileri için tasarlanmıştır.",
      "feat1Title": "GPS koordinatları",
      "feat1Desc": "Fotoğrafı çekerken konum servisleri açıksa, dosya tam enlem ve boylam bilgilerini içerir.",
      "feat2Title": "Cihaz parmak izi",
      "feat2Desc": "Kamera markası, modeli, seri numarası, yazılım sürümü ve lens verileri görsel dosyasında saklanır.",
      "feat3Title": "Zaman damgaları ve çekim ayarları",
      "feat3Desc": "Orijinal çekim zamanı, ISO, enstantane hızı ve diyafram bilgilerinin tamamı temizlenir.",
      "feat4Title": "Her şey yerel olarak işlenir",
      "feat4Desc": "NexStrip meta verileri hiçbir sunucu olmadan tamamen tarayıcınızın içinde okur ve kaldırır.",
      "faqTitle": "Sıkça Sorulan Sorular",
      "faqSubtitle": "NexStrip meta veri temizleme hakkında bilmeniz gereken her şey.",
      "faqQ1": "EXIF meta verisi nedir?",
      "faqA1": "EXIF, fotoğraflar çekildiğinde doğrudan görsel dosyalarının içine gömülen kamera modeli, zaman damgası ve GPS koordinatları gibi verilerdir.",
      "faqQ2": "NexStrip bu verileri nasıl kaldırır?",
      "faqA2": "Fotoğrafı yerel tarayıcınızda yükler, ham piksel verilerini çıkarır ve meta veri başlıklarını kopyalamadan temiz bir görsel olarak dışa aktarır.",
      "faqQ3": "Gizliliğim garanti altında mı?",
      "faqA3": "Evet. NexStrip tamamen istemci tarafında çalışır.",
      "faqQ4": "Hangi görsel formatları destekleniyor?",
      "faqA4": "NexStrip JPEG, JPG ve PNG dosyalarını destekler.",
      "ctaTitle": "Fotoğraflarınızı temizlemeye hazır mısınız?",
      "ctaDesc": "Dosyalarınızı sayfanın üst kısmına bırakın. Tüm meta veriler tarayıcınızda kaldırılır.",
      "ctaButton": "Araca Dön"
  },
  sw: {
      "title": "Kiondoa Metadata cha EXIF — Ondoa Data ya GPS na Kamera kwenye Picha | TheNexTools",
      "description": "Ona data iliyofichwa ndani ya picha zako — eneo la GPS, muundo wa kifaa, alama za muda — na uiondoe yote kabla ya kushiriki. Inafanya kazi kwenye kivinjari chako.",
      "steps": [
          {
              "title": "Weka Picha",
              "desc": "Chagua au buruta picha zako kwenye eneo la uchambuzi wa EXIF."
          },
          {
              "title": "Kagua Metadata",
              "desc": "Tazama uratibu wote wa GPS, miundo ya kamera na alama za muda zilizomo."
          },
          {
              "title": "Ondoa na Pakua",
              "desc": "Bofya ondoa EXIF ili kutoa faili safi za picha bila sehemu zilizofichwa."
          }
      ],
      "badge": "NexStrip — Bure na Faragha",
      "h1": "Picha zako zinajua unapoishi. Kweli kabisa.",
      "p1": "Kila picha kutoka kwa simu yako ina uratibu wa GPS, muundo wa kifaa chako na muda halisi uliopiga picha. NexStrip inakuonyesha kila kitu, kisha inakiondoa kabla hujashiriki picha hiyo.",
      "schemaTitle": "NexStrip Kiondoa Metadata cha EXIF",
      "schemaHome": "Nyumbani",
      "schemaToolkit": "Zana za Picha",
      "schemaTool": "Kiondoa EXIF",
      "howToTitle": "Jinsi ya kuondoa data ya EXIF nje ya mtandao",
      "diffTitle": "Kinachojificha ndani ya picha zako",
      "diffDesc": "Metadata ya EXIF iliundwa kwa ajili ya watengenezaji wa kamera, si mitandao ya kijamii.",
      "feat1Title": "Uratibu wa GPS",
      "feat1Desc": "Ikiwa huduma za eneo zilikuwa zimewashwa ulipopiga picha, faili ina latitudo na longitudo kamili.",
      "feat2Title": "Utambulisho wa kifaa",
      "feat2Desc": "Aina ya kamera, muundo, nambari ya mfululizo na toleo la programu huhifadhiwa kwenye faili ya picha.",
      "feat3Title": "Alama za muda na mipangilio ya picha",
      "feat3Desc": "Muda halisi wa kupiga picha, ISO, kasi ya shutter na aperture vyote vinaweza kuondolewa.",
      "feat4Title": "Kila kitu kinachakatwa ndani ya kifaa",
      "feat4Desc": "NexStrip husoma na kuondoa metadata ndani ya kivinjari chako bila seva yoyote.",
      "faqTitle": "Maswali Yanayoulizwa Mara kwa Mara",
      "faqSubtitle": "Kila kitu unachohitaji kujua kuhusu uondoaji wa metadata wa NexStrip.",
      "faqQ1": "Metadata ya EXIF ni nini?",
      "faqA1": "EXIF ni data inayopachikwa moja kwa moja ndani ya faili za picha wakati picha zinapigwa, ikijumuisha muundo wa kamera, muda na GPS.",
      "faqQ2": "NexStrip huondoaje data hii?",
      "faqA2": "Inapakia picha kwenye kivinjari chako, hutoa pikseli ghafi za picha, na kuihamisha tena kama picha safi bila vichwa vya metadata.",
      "faqQ3": "Je, faragha yangu imehakikishwa?",
      "faqA3": "Ndiyo. NexStrip inafanya kazi upande wa mteja pekee kwenye kivinjari chako.",
      "faqQ4": "Ni umbizo gani za picha zinazosaidiwa?",
      "faqA4": "NexStrip inasaidia faili za picha za JPEG, JPG na PNG.",
      "ctaTitle": "Uko tayari kusafisha picha zako?",
      "ctaDesc": "Weka faili zako juu ya ukurasa. Metadata yote inaondolewa kwenye kivinjari chako.",
      "ctaButton": "Rudi kwenye Zana"
  },
  bn: {
      "title": "EXIF মেটাডেটা স্ট্রিপার — ছবি থেকে GPS ও ক্যামেরা ডেটা মুছে ফেলুন | TheNexTools",
      "description": "আপনার ছবিতে লুকানো ডেটা — GPS লোকেশন, ডিভাইস মডেল, টাইমস্ট্যাম্প — দেখুন এবং শেয়ার করার আগে সব মুছে ফেলুন। আপনার ব্রাউজারে লোকালি চলে।",
      "steps": [
          {
              "title": "ছবি ড্রপ করুন",
              "desc": "EXIF অ্যানালাইজার এরিয়ায় আপনার ছবি নির্বাচন বা ড্র্যাগ করুন।"
          },
          {
              "title": "মেটাডেটা দেখুন",
              "desc": "ছবিতে থাকা সব GPS কোঅর্ডিনেট, ক্যামেরা মডেল ও টাইমস্ট্যাম্প পরীক্ষা করুন।"
          },
          {
              "title": "মুছুন ও ডাউনলোড করুন",
              "desc": "লুকানো ফিল্ড ছাড়া পরিষ্কার ইমেজ ফাইল পেতে স্ট্রিপ EXIF-এ ক্লিক করুন।"
          }
      ],
      "badge": "NexStrip — ফ্রি ও প্রাইভেট",
      "h1": "আপনার ছবি জানে আপনি কোথায় থাকেন। সত্যিই।",
      "p1": "আপনার ফোনে তোলা প্রতিটি ছবিতে কয়েক মিটার নিখুঁত GPS কোঅর্ডিনেট, ডিভাইসের মডেল এবং ছবি তোলার সঠিক সময় লেখা থাকে। NexStrip আপনাকে সব দেখায় এবং শেয়ার করার আগে তা মুছে ফেলে।",
      "schemaTitle": "NexStrip EXIF মেটাডেটা স্ট্রিপার",
      "schemaHome": "হোম",
      "schemaToolkit": "ইমেজ টুলকিট",
      "schemaTool": "EXIF স্ট্রিপার",
      "howToTitle": "কীভাবে অফলাইনে EXIF ডেটা মুছবেন",
      "diffTitle": "আপনার ছবিতে আসলে কী লুকিয়ে থাকে",
      "diffDesc": "EXIF মেটাডেটা ক্যামেরা নির্মাতাদের জন্য তৈরি হয়েছিল, সোশ্যাল মিডিয়ার জন্য নয়।",
      "feat1Title": "GPS কোঅর্ডিনেট",
      "feat1Desc": "ছবি তোলার সময় লোকেশন সার্ভিস চালু থাকলে ফাইলটিতে সঠিক অক্ষাংশ ও দ্রাঘিমাংশ জমা থাকে।",
      "feat2Title": "ডিভাইস ফিঙ্গারপ্রিন্ট",
      "feat2Desc": "ক্যামেরার ব্র্যান্ড, মডেল, সিরিয়াল নম্বর, সফটওয়্যার ভার্সন এবং লেন্স ডেটা ছবির ভেতর সংরক্ষিত থাকে।",
      "feat3Title": "টাইমস্ট্যাম্প ও ক্যাপচার সেটিংস",
      "feat3Desc": "ছবি তোলার সময়, এডিটিং টাইমস্ট্যাম্প, ISO, শাটার স্পিড ও অ্যাপারচার — সবই মুছে ফেলা যায়।",
      "feat4Title": "সবকিছু লোকালি প্রসেস হয়",
      "feat4Desc": "NexStrip কোনো সার্ভার ছাড়াই সম্পূর্ণ আপনার ব্রাউজারের ভেতরে মেটাডেটা পড়ে এবং মুছে ফেলে।",
      "faqTitle": "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী",
      "faqSubtitle": "NexStrip মেটাডেটা স্ট্রিপিং সম্পর্কে যা জানা প্রয়োজন।",
      "faqQ1": "EXIF মেটাডেটা কী?",
      "faqA1": "ছবি তোলার সময় ইমেজ ফাইলের ভেতর সরাসরি যে তথ্য (ক্যামেরা মডেল, সময়, এক্সপোজার ও GPS কোঅর্ডিনেট) যুক্ত হয় তাকে EXIF মেটাডেটা বলে।",
      "faqQ2": "NexStrip কীভাবে এই ডেটা মুছে ফেলে?",
      "faqA2": "এটি আপনার লোকাল ব্রাউজারে ছবিটি লোড করে, ক্যানভাস থেকে শুধু পিক্সেল ডেটা নেয় এবং মেটাডেটা হেডার ছাড়াই নতুন পরিষ্কার ছবি হিসেবে এক্সপোর্ট করে।",
      "faqQ3": "আমার গোপনীয়তা কি নিশ্চিত?",
      "faqA3": "হ্যাঁ। NexStrip সম্পূর্ণ ক্লায়েন্ট-সাইডে আপনার ব্রাউজারে কাজ করে।",
      "faqQ4": "EXIF স্ট্রিপার কোন কোন ইমেজ ফরম্যাট সাপোর্ট করে?",
      "faqA4": "NexStrip JPEG, JPG এবং PNG ইমেজ ফাইল সাপোর্ট করে।",
      "ctaTitle": "আপনার ছবিগুলো পরিষ্কার করতে প্রস্তুত?",
      "ctaDesc": "পেজের উপরের অংশে আপনার ফাইল ড্রপ করুন। সব মেটাডেটা আপনার ব্রাউজারেই মুছে ফেলা হয়।",
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
    manifest: '/exif-manifest.json',
    alternates: {
      canonical: `/${lang}/exif-stripper`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/exif-stripper' : `/${l}/exif-stripper`;
          return acc;
        }, {}),
        'x-default': '/exif-stripper',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      url: `https://thenextools.com/${lang}/exif-stripper`,
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

export default async function ExifStripperLanding({ params }) {
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
              "url": `https://thenextools.com/${lang}/exif-stripper`,
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
                  "item": `https://thenextools.com/${lang}/exif-stripper`
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
          <ExifStripperPageWrapper hideHeader={true} />
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
              <Link href={`/${lang}/image-compressor`} className="badge" style={{ textDecoration: 'none' }}>Image Compressor</Link>
              <Link href={`/${lang}/image-converter`} className="badge" style={{ textDecoration: 'none' }}>Image Converter</Link>
              <Link href={`/${lang}/image-redactor`} className="badge" style={{ textDecoration: 'none' }}>Image Redactor & Blur</Link>
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
