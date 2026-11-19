import Link from 'next/link';
import { ImageBlurPageWrapper } from '@/components/image-tools/ImageCompressorWrapper';
import { locales, ogLocales } from '@/lib/i18n-config';
import { getDictionary } from '@/dictionaries';

const TRANSLATIONS = {
  en: {
    title: 'Image Redactor — Blur Faces, Plates & Sensitive Areas Locally | TheNexTools',
    description: 'Draw blur zones over faces, license plates, addresses, and sensitive data in your photos. The blur is permanent and irreversible. Runs locally in your browser — files never leave your device.',
    steps: [
      { title: 'Add Image', desc: 'Select or drag your image into the secure editor window.' },
      { title: 'Censor Fields', desc: 'Draw blur areas over faces, names, plates, or private details.' },
      { title: 'Export Flattened', desc: 'Download a clean, flattened file where original data is permanently destroyed.' }
    ],
    badge: 'NexRedact — Private by Default',
    h1: 'Some things in a photo aren\'t meant to be shared.',
    p1: 'You\'re selling a car and need to blur the plates. You\'re sharing a screenshot of a receipt but the card number is visible. You took a great event photo but a stranger\'s kid is in frame. NexRedact lets you draw blur zones over anything sensitive, then saves a flattened image where the blur is permanent and cannot be undone.',
    schemaTitle: 'NexRedact Image Redactor',
    schemaHome: 'Home',
    schemaToolkit: 'Image Toolkit',
    schemaTool: 'Redact & Blur',
    howToTitle: 'How to redact images offline',
    diffTitle: 'Simple redaction that actually works',
    diffDesc: 'No layers, no Photoshop, no uploading sensitive images to someone else\'s server. Just draw, blur, download.',
    feat1Title: 'Draw blur zones with your mouse',
    feat1Desc: 'Click and drag to select a rectangular area. Adjust the blur intensity — from a subtle gaussian to a heavy pixelation that makes text completely unreadable. Add as many zones as you need before saving.',
    feat2Title: 'Permanent, irreversible redaction',
    feat2Desc: 'The downloaded image is flattened. The blurred pixels are baked into the file — there\'s no hidden layer underneath that someone could extract. This matters for legal, medical, and journalistic work where partial redaction isn\'t acceptable.',
    feat3Title: 'Common use cases',
    feat3Desc: 'Blurring license plates in vehicle listings. Redacting account numbers on invoice screenshots. Hiding bystander faces in crowd photos for news use. Removing your address from a photo before posting it to a marketplace. All of this takes about ten seconds.',
    feat4Title: 'Nothing gets uploaded',
    feat4Desc: 'The image stays in your browser the entire time. NexRedact uses the Canvas API to apply the blur filter locally — no server, no account, no file size cap. Download the result as JPG or PNG and you\'re done.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about NexRedact privacy redaction.',
    faqQ1: 'Is the blur permanent on my redacted images?',
    faqA1: 'Yes, completely. The blur and blackout zones are permanently drawn and rasterized onto the image canvas before download. There are no layers, masks, or metadata tags left behind that could be undone.',
    faqQ2: 'Can someone extract the unblurred image?',
    faqA2: 'No. Unlike PDF editors that sometimes hide original text under a black box, NexRedact performs a destructive pixel edit. The original pixels in the blurred/blackout zones are completely replaced and destroyed.',
    faqQ3: 'What image formats are supported?',
    faqA3: 'NexRedact supports JPG, PNG, WebP, and other standard browser-compatible image formats.',
    faqQ4: 'Are my sensitive screenshots uploaded to a server?',
    faqA4: 'No, they never touch any server. The redaction is done entirely inside your local browser client to guarantee maximum privacy for financial, legal, or personal data.',
    ctaTitle: 'Ready to redact your images?',
    ctaDesc: 'Drop your files at the top of the page. Everything is processed purely client-side.',
    ctaButton: 'Back to Tool'
  },
  es: {
    title: 'Redactor de Privacidad — Difuminar Rostros, Matrículas y Datos Sensibles | TheNexTools',
    description: 'Dibuja zonas de difuminado sobre rostros, matrículas, direcciones y datos confidenciales en tus fotos de forma permanente e irreversible. Se ejecuta en tu navegador.',
    steps: [
      { title: 'Añadir Imagen', desc: 'Selecciona o arrastra tu imagen a la ventana del editor seguro.' },
      { title: 'Censurar Campos', desc: 'Dibuja áreas de difuminado sobre rostros, nombres, matrículas o detalles privados.' },
      { title: 'Exportar Plano', desc: 'Descarga un archivo plano y limpio donde los datos originales se destruyen permanentemente.' }
    ],
    badge: 'NexRedact — Privado por Defecto',
    h1: 'Algunas cosas en una foto no están hechas para compartirse.',
    p1: 'Vas a vender un coche y necesitas difuminar las matrículas. Compartes una captura de pantalla de un recibo pero el número de tarjeta es visible. Tomaste una gran foto pero un niño desconocido sale al fondo. NexRedact te permite aplicar zonas de difuminado permanente sobre cualquier elemento sensible y guardar una imagen plana.',
    schemaTitle: 'NexRedact Redactor de Privacidad',
    schemaHome: 'Inicio',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Redactar y Difuminar',
    howToTitle: 'Cómo redactar imágenes sin conexión',
    diffTitle: 'Redacción simple que realmente funciona',
    diffDesc: 'Sin capas, sin Photoshop, sin subir imágenes sensibles a servidores de terceros. Simplemente dibuja, difumina y descarga.',
    feat1Title: 'Dibuja zonas de desenfoque con tu ratón',
    feat1Desc: 'Haz clic y arrastra para seleccionar un área rectangular. Ajusta la intensidad del desenfoque: desde un gaussiano sutil hasta una pixelación pesada que hace el texto completamente ilegible.',
    feat2Title: 'Redacción permanente e irreversible',
    feat2Desc: 'La imagen descargada está aplanada. Los píxeles difuminados están integrados en el archivo: no hay capas ocultas debajo que alguien pueda extraer. Esto es vital para contextos legales.',
    feat3Title: 'Casos de uso comunes',
    feat3Desc: 'Difuminar matrículas en listados de coches. Ocultar números de cuentas en facturas. Ocultar rostros en fotos multitudinarias para uso periodístico. Eliminar tu dirección física de capturas de pantalla.',
    feat4Title: 'Nada se sube a internet',
    feat4Desc: 'La imagen permanece en tu navegador todo el tiempo. NexRedact utiliza la API Canvas para aplicar filtros localmente: sin servidores, sin cuentas, sin límites de tamaño. Descarga en JPG o PNG.',
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Todo lo que necesitas saber sobre el difuminador NexRedact.',
    faqQ1: '¿Es el difuminado permanente en las imágenes redactadas?',
    faqA1: 'Sí, completamente. Las zonas de desenfoque y censura se dibujan de forma destructiva y se rasterizan en el lienzo de la imagen antes de la descarga. No quedan capas ni máscaras que se puedan deshacer.',
    faqQ2: '¿Puede alguien extraer la imagen sin difuminar?',
    faqA2: 'No. A diferencia de los editores de PDF que a veces solo ocultan texto bajo una caja negra, NexRedact realiza una edición destructiva de píxeles. Los píxeles originales en las zonas difuminadas se destruyen por completo.',
    faqQ3: '¿Qué formatos de imagen son compatibles?',
    faqA3: 'NexRedact es compatible con JPG, PNG, WebP y otros formatos de imagen estándar admitidos por los navegadores modernos.',
    faqQ4: '¿Se suben mis capturas de pantalla sensibles a un servidor?',
    faqA4: 'No, nunca tocan ningún servidor. La redacción se realiza completamente dentro de tu navegador local para garantizar la máxima privacidad de tus datos financieros o personales.',
    ctaTitle: '¿Listo para redactar tus imágenes?',
    ctaDesc: 'Suelta tus archivos en la parte superior de la página. Todo el procesamiento se realiza de forma local.',
    ctaButton: 'Volver a la herramienta'
  },
  pt: {
    title: 'Redator de Privacidade — Desfocar Rostos, Placas e Áreas Sensíveis | TheNexTools',
    description: 'Desenhe zonas de desfoque sobre rostos, placas de veículos, endereços e dados confidenciais em suas fotos. O desfoque é permanente e irreversível. Executado localmente em seu navegador.',
    steps: [
      { title: 'Adicionar Imagem', desc: 'Selecione ou arraste sua imagem para a janela do editor seguro.' },
      { title: 'Censurar Campos', desc: 'Desenhe áreas de desfoque sobre rostos, nomes, placas ou detalhes privados.' },
      { title: 'Exportar Achatado', desc: 'Baixe um arquivo limpo e achatado onde os dados originais são destruídos permanentemente.' }
    ],
    badge: 'NexRedact — Privado por Padrão',
    h1: 'Algumas coisas em uma foto não devem ser compartilhadas.',
    p1: 'Você está vendendo um carro e precisa desfocar as placas. Você está compartilhando uma captura de tela de um recibo, mas o número do cartão está visível. Você tirou uma ótima foto de um evento, mas o filho de um estranho está no enquadramento. NexRedact permite que você desenhe zonas de desfoque sobre qualquer coisa sensível e salve uma imagem achatada.',
    schemaTitle: 'Redator de Imagem NexRedact',
    schemaHome: 'Início',
    schemaToolkit: 'NexImage Toolkit',
    schemaTool: 'Redigir e Desfocar',
    howToTitle: 'Como redigir imagens offline',
    diffTitle: 'Redação simples que realmente funciona',
    diffDesc: 'Sem camadas, sem Photoshop, sem fazer upload de imagens confidenciais para servidores de terceiros. Basta desenhar, desfocar e baixar.',
    feat1Title: 'Desenhe zonas de desfoque com o mouse',
    feat1Desc: 'Clique e arraste para selecionar uma área retangular. Ajuste a intensidade do desfoque — de um gaussiano sutil a uma pixelização pesada que torna o texto completamente ilegível.',
    feat2Title: 'Redação permanente e irreversível',
    feat2Desc: 'A imagem baixada é achatada. Os pixels desfocados são gravados no arquivo — não há nenhuma camada oculta por baixo que alguém possa extrair. Isso importa para trabalhos jurídicos e médicos.',
    feat3Title: 'Casos de uso comuns',
    feat3Desc: 'Desfocar placas de veículos em anúncios. Ocultar números de contas em capturas de faturas. Ocultar rostros de transeuntes em fotos de multidões para fins jornalísticos. Remover seu endereço de fotos.',
    feat4Title: 'Nada é carregado',
    feat4Desc: 'A imagem permanece no seu navegador o tempo todo. NexRedact usa a API Canvas para aplicar o filtro de desfoque localmente — sem servidor, sem conta, sem limite de tamanho de arquivo. Baixe como JPG ou PNG.',
    faqTitle: 'Perguntas Frequentes',
    faqSubtitle: 'Tudo o que você precisa saber sobre o redator de privacidade NexRedact.',
    faqQ1: 'O desfoque é permanente nas minhas imagens redigidas?',
    faqA1: 'Sim, completamente. O desfoque e as zonas de blackout são permanentemente desenhados e rasterizados na tela da imagem antes do download. Não há camadas, máscaras ou tags de metadados deixadas para trás.',
    faqQ2: 'Alguém pode extrair a imagem sem desfoque?',
    faqA2: 'Não. Ao contrário dos editores de PDF que às vezes ocultam o texto original sob uma caixa preta, o NexRedact realiza uma edição destrutiva de pixels. Os pixels originais nas zonas desfocadas são totalmente substituídos e destruídos.',
    faqQ3: 'Quais formatos de imagem são suportados?',
    faqA3: 'NexRedact suporta JPG, PNG, WebP e outros formatos de imagem padrão compatíveis com navegadores.',
    faqQ4: 'Minhas capturas de tela confidenciais são enviadas para um servidor?',
    faqA4: 'Não, elas nunca tocam em nenhum servidor. A redação é feita inteiramente dentro do seu navegador local para garantir a máxima privacidade para dados financeiros, jurídicos ou pessoais.',
    ctaTitle: 'Pronto para redigir suas imagens?',
    ctaDesc: 'Solte seus arquivos no topo da página. Todo o processamento é feito localmente.',
    ctaButton: 'Voltar à Ferramenta'
  },
  fr: {
      "title": "Outil de Floutage d'Image — Flouter Visages, Plaques et Zones Sensibles | TheNexTools",
      "description": "Dessinez des zones de floutage sur les visages, plaques d'immatriculation et données sensibles. Le floutage est permanent et irréversible dans votre navigateur.",
      "steps": [
          {
              "title": "Ajouter une Image",
              "desc": "Sélectionnez ou glissez votre image dans l'éditeur sécurisé."
          },
          {
              "title": "Masquer les Zones",
              "desc": "Dessinez des zones de floutage sur les visages, noms, plaques ou détails privés."
          },
          {
              "title": "Exporter Aplati",
              "desc": "Téléchargez un fichier aplati où les pixels d'origine sont définitivement détruits."
          }
      ],
      "badge": "NexRedact — Privé par Défaut",
      "h1": "Certaines choses sur une photo ne doivent pas être partagées.",
      "p1": "NexRedact vous permet de dessiner des zones de floutage sur tout élément sensible, puis d'enregistrer une image aplatie où le floutage est permanent et irréversible.",
      "schemaTitle": "Outil de Floutage NexRedact",
      "schemaHome": "Accueil",
      "schemaToolkit": "Boîte à Outils Image",
      "schemaTool": "Flouter et Masquer",
      "howToTitle": "Comment flouter des images hors ligne",
      "diffTitle": "Un masquage simple qui fonctionne vraiment",
      "diffDesc": "Pas de calques, pas de Photoshop, pas d'envoi d'images sensibles sur un serveur tiers.",
      "feat1Title": "Dessinez des zones de flou à la souris",
      "feat1Desc": "Cliquez et glissez pour sélectionner une zone rectangulaire et ajustez l'intensité du flou.",
      "feat2Title": "Masquage permanent et irréversible",
      "feat2Desc": "L'image téléchargée est aplatie : les pixels floutés remplacent définitivement les originaux.",
      "feat3Title": "Cas d'usage courants",
      "feat3Desc": "Plaques d'immatriculation, numéros de compte sur des factures, visages de passants ou adresses personnelles.",
      "feat4Title": "Rien n'est téléversé",
      "feat4Desc": "L'image reste dans votre navigateur du début à la fin grâce à l'API Canvas locale.",
      "faqTitle": "Questions Fréquentes",
      "faqSubtitle": "Tout savoir sur le masquage de confidentialité avec NexRedact.",
      "faqQ1": "Le floutage est-il permanent sur mes images ?",
      "faqA1": "Oui, totalement. Les zones floutées sont rastérisées directement sur le canevas avant le téléchargement.",
      "faqQ2": "Quelqu'un peut-il extraire l'image non floutée ?",
      "faqA2": "Non. NexRedact effectue une modification destructive des pixels : les données d'origine sont détruites.",
      "faqQ3": "Quels formats d'image sont pris en charge ?",
      "faqA3": "NexRedact prend en charge JPG, PNG, WebP et les autres formats compatibles avec le navigateur.",
      "faqQ4": "Mes captures d'écran sensibles sont-elles envoyées sur un serveur ?",
      "faqA4": "Non, elles ne touchent jamais aucun serveur.",
      "ctaTitle": "Prêt à masquer vos images ?",
      "ctaDesc": "Déposez vos fichiers en haut de la page. Tout est traité côté client.",
      "ctaButton": "Retour à l'outil"
  },
  de: {
      "title": "Bild-Schwärzer & Unschärfe — Gesichter, Kennzeichen & Sensible Daten Verpixeln | TheNexTools",
      "description": "Zeichnen Sie Unschärfezonen über Gesichter, Nummernschilder und sensible Daten. Permanent, unumkehrbar und lokal in Ihrem Browser.",
      "steps": [
          {
              "title": "Bild Hinzufügen",
              "desc": "Wählen Sie Ihr Bild aus oder ziehen Sie es in das sichere Editorfenster."
          },
          {
              "title": "Bereiche Zensieren",
              "desc": "Zeichnen Sie Unschärfebereiche über Gesichter, Namen, Kennzeichen oder private Details."
          },
          {
              "title": "Abgeflacht Exportieren",
              "desc": "Laden Sie eine bereinigte Datei herunter, in der die Originalpixel dauerhaft überschrieben sind."
          }
      ],
      "badge": "NexRedact — Standardmäßig Privat",
      "h1": "Manche Dinge auf einem Foto sind nicht zum Teilen bestimmt.",
      "p1": "Mit NexRedact zeichnen Sie Unschärfezonen über sensible Bereiche und speichern ein abgeflachtes Bild, bei dem die Unschärfe dauerhaft und nicht rückgängig zu machen ist.",
      "schemaTitle": "NexRedact Bild-Schwärzer",
      "schemaHome": "Startseite",
      "schemaToolkit": "Bild-Toolkit",
      "schemaTool": "Schwärzen & Verpixeln",
      "howToTitle": "So schwärzen Sie Bilder offline",
      "diffTitle": "Einfache Schwärzung, die wirklich funktioniert",
      "diffDesc": "Keine Ebenen, kein Photoshop, kein Hochladen sensibler Bilder auf fremde Server.",
      "feat1Title": "Unschärfezonen mit der Maus zeichnen",
      "feat1Desc": "Markieren Sie per Drag & Drop einen Bereich und passen Sie die Unschärfeintensität flexibel an.",
      "feat2Title": "Permanente, unumkehrbare Schwärzung",
      "feat2Desc": "Das heruntergeladene Bild ist abgeflacht — es gibt keine versteckten Ebenen, die wiederhergestellt werden könnten.",
      "feat3Title": "Typische Anwendungsfälle",
      "feat3Desc": "Kfz-Kennzeichen, Kontonummern auf Belegen, Gesichter auf Fotos oder Adressdaten vor dem Teilen unkenntlich machen.",
      "feat4Title": "Nichts wird hochgeladen",
      "feat4Desc": "Das Bild bleibt die gesamte Zeit in Ihrem Browser und wird lokal über die Canvas-API verarbeitet.",
      "faqTitle": "Häufig gestellte Fragen",
      "faqSubtitle": "Alles über den Datenschutz-Schwärzer NexRedact.",
      "faqQ1": "Ist die Unschärfe auf meinen Bildern dauerhaft?",
      "faqA1": "Ja, vollständig. Die Zonen werden vor dem Download destruktiv in das Bild gerastert.",
      "faqQ2": "Kann jemand das ursprüngliche Bild wiederherstellen?",
      "faqA2": "Nein. Die ursprünglichen Pixel in den geschwärzten oder verpixelten Bereichen werden komplett ersetzt und zerstört.",
      "faqQ3": "Welche Bildformate werden unterstützt?",
      "faqA3": "NexRedact unterstützt JPG, PNG, WebP und weitere gängige Browser-Bildformate.",
      "faqQ4": "Werden meine sensiblen Screenshots auf einen Server geladen?",
      "faqA4": "Nein, sie berühren niemals einen Server.",
      "ctaTitle": "Bereit, Ihre Bilder zu schwärzen?",
      "ctaDesc": "Legen Sie Ihre Dateien oben auf der Seite ab. Alles wird rein clientseitig verarbeitet.",
      "ctaButton": "Zurück zum Tool"
  },
  nl: {
      "title": "Afbeelding Anonimiser — Vervaag Gezichten, Kentekens & Gevoelige Data Lokaal | TheNexTools",
      "description": "Teken vervagingszones over gezichten, kentekenplaten, adressen en gevoelige gegevens. De vervaging is permanent en onomkeerbaar in uw browser.",
      "steps": [
          {
              "title": "Afbeelding Toevoegen",
              "desc": "Selecteer of sleep uw afbeelding naar het veilige editorvenster."
          },
          {
              "title": "Velden Censureren",
              "desc": "Teken vervagingsgebieden over gezichten, namen, kentekens of privégegevens."
          },
          {
              "title": "Plat Exporteren",
              "desc": "Download een afgevlakt bestand waarin de originele gegevens permanent zijn vernietigd."
          }
      ],
      "badge": "NexRedact — Standaard Privé",
      "h1": "Sommige dingen op een foto zijn niet bedoeld om te delen.",
      "p1": "Met NexRedact tekent u vervagingszones over alles wat gevoelig is en slaat u een afgevlakte afbeelding op waarin de vervaging permanent en onomkeerbaar is.",
      "schemaTitle": "NexRedact Afbeelding Anonimiser",
      "schemaHome": "Home",
      "schemaToolkit": "Afbeelding Toolkit",
      "schemaTool": "Anonimiseren & Vervagen",
      "howToTitle": "Hoe afbeeldingen offline te anonimiseren",
      "diffTitle": "Eenvoudige anonimisering die echt werkt",
      "diffDesc": "Geen lagen, geen Photoshop, geen gevoelige foto's uploaden naar de server van iemand anders.",
      "feat1Title": "Teken vervagingszones met uw muis",
      "feat1Desc": "Klik en sleep om een rechthoekig gebied te selecteren en pas de vervagingsintensiteit aan.",
      "feat2Title": "Permanente, onomkeerbare vervaging",
      "feat2Desc": "De gedownloade afbeelding is afgevlakt — er zit geen verborgen laag onder die iemand kan herstellen.",
      "feat3Title": "Veelvoorkomende toepassingen",
      "feat3Desc": "Kentekenplaten vervagen, rekeningnummers op facturen afschermen of gezichten onherkenbaar maken.",
      "feat4Title": "Er wordt niets geüpload",
      "feat4Desc": "De afbeelding blijft de hele tijd in uw browser via de lokale Canvas API.",
      "faqTitle": "Veelgestelde Vragen",
      "faqSubtitle": "Alles wat u moet weten over NexRedact privacy-anonimisering.",
      "faqQ1": "Is de vervaging permanent op mijn afbeeldingen?",
      "faqA1": "Ja, volledig. De zones worden vóór het downloaden permanent op het canvas gerasterd.",
      "faqQ2": "Kan iemand de onvervaagde afbeelding extraheren?",
      "faqA2": "Nee. De originele pixels in de vervaagde zones worden volledig vervangen en vernietigd.",
      "faqQ3": "Welke beeldformaten worden ondersteund?",
      "faqA3": "NexRedact ondersteunt JPG, PNG, WebP en andere standaard beeldformaten.",
      "faqQ4": "Worden mijn gevoelige screenshots geüpload naar een server?",
      "faqA4": "Nee, ze raken nooit een server aan.",
      "ctaTitle": "Klaar om uw afbeeldingen te anonimiseren?",
      "ctaDesc": "Sleep uw bestanden naar de bovenkant van de pagina. Alles wordt lokaal verwerkt.",
      "ctaButton": "Terug naar Tool"
  },
  it: {
      "title": "Redattore Immagini — Sfoca Volti, Targhe e Aree Sensibili Localmente | TheNexTools",
      "description": "Disegna zone di sfocatura su volti, targhe, indirizzi e dati sensibili nelle tue foto. La sfocatura è permanente e irreversibile nel tuo browser.",
      "steps": [
          {
              "title": "Aggiungi Immagine",
              "desc": "Seleziona o trascina l'immagine nella finestra dell'editor sicuro."
          },
          {
              "title": "Oscura Campi",
              "desc": "Disegna aree di sfocatura su volti, nomi, targhe o dettagli privati."
          },
          {
              "title": "Esporta Appiattito",
              "desc": "Scarica un file pulito e appiattito in cui i dati originali sono distrutti permanentemente."
          }
      ],
      "badge": "NexRedact — Privato per Impostazione",
      "h1": "Alcune cose in una foto non sono fatte per essere condivise.",
      "p1": "NexRedact ti permette di disegnare zone di sfocatura su qualsiasi elemento sensibile e salvare un'immagine appiattita in cui la sfocatura è permanente e irreversibile.",
      "schemaTitle": "Redattore Immagini NexRedact",
      "schemaHome": "Home",
      "schemaToolkit": "Toolkit Immagini",
      "schemaTool": "Oscura e Sfoca",
      "howToTitle": "Come oscurare immagini offline",
      "diffTitle": "Oscuramento semplice che funziona davvero",
      "diffDesc": "Nessun livello, nessun Photoshop, nessun caricamento di immagini sensibili su server esterni.",
      "feat1Title": "Disegna zone di sfocatura con il mouse",
      "feat1Desc": "Clicca e trascina per selezionare un'area rettangolare e regola l'intensità della sfocatura.",
      "feat2Title": "Oscuramento permanente e irreversibile",
      "feat2Desc": "L'immagine scaricata è appiattita: non esistono livelli nascosti sottostanti che qualcuno possa estrarre.",
      "feat3Title": "Casi d'uso comuni",
      "feat3Desc": "Sfocare targhe di veicoli, oscurare numeri di conto su ricevute, nascondere volti o indirizzi privati.",
      "feat4Title": "Nulla viene caricato online",
      "feat4Desc": "L'immagine resta sempre nel tuo browser grazie all'API Canvas locale.",
      "faqTitle": "Domande Frequenti",
      "faqSubtitle": "Tutto sull'oscuramento privacy con NexRedact.",
      "faqQ1": "La sfocatura è permanente sulle immagini oscurate?",
      "faqA1": "Sì, completamente. Le zone di sfocatura vengono rasterizzate in modo permanente prima del download.",
      "faqQ2": "Qualcuno può recuperare l'immagine non sfocata?",
      "faqA2": "No. I pixel originali nelle zone sfocate vengono completamente sostituiti e distrutti.",
      "faqQ3": "Quali formati immagine sono supportati?",
      "faqA3": "NexRedact supporta JPG, PNG, WebP e gli altri formati standard compatibili con il browser.",
      "faqQ4": "I miei screenshot sensibili vengono caricati su un server?",
      "faqA4": "No, non toccano mai alcun server.",
      "ctaTitle": "Pronto a oscurare le tue immagini?",
      "ctaDesc": "Trascina i tuoi file in cima alla pagina. Tutto viene elaborato lato client.",
      "ctaButton": "Torna allo Strumento"
  },
  ja: {
      "title": "画像モザイク・ぼかしツール — 顔・ナンバープレート・機密情報をローカルで隠す | TheNexTools",
      "description": "写真内の顔、ナンバープレート、住所、機密データにぼかし領域を描画。ぼかしは永久的かつ不可逆で、ブラウザ内でローカル処理されます。",
      "steps": [
          {
              "title": "画像を追加",
              "desc": "安全なエディタ画面に画像を選択またはドラッグします。"
          },
          {
              "title": "機密箇所を隠す",
              "desc": "顔、名前、ナンバープレート、個人情報の部分にぼかし領域を描画します。"
          },
          {
              "title": "フラット化して保存",
              "desc": "元のピクセルデータが完全に消去されたクリーンな画像をダウンロードします。"
          }
      ],
      "badge": "NexRedact — デフォルトでプライベート",
      "h1": "写真の中には、共有すべきでない情報があります。",
      "p1": "NexRedactを使えば、機密性の高い部分にぼかし領域を描画し、ぼかしが焼き付けられた復元不可能なフラット化画像を保存できます。",
      "schemaTitle": "NexRedact 画像ぼかしツール",
      "schemaHome": "ホーム",
      "schemaToolkit": "画像ツールキット",
      "schemaTool": "ぼかし＆黒塗り",
      "howToTitle": "オフラインで画像にぼかしを入れる方法",
      "diffTitle": "確実に機能するシンプルな墨消し・ぼかし",
      "diffDesc": "レイヤー不要、Photoshop不要、機密画像を外部サーバーにアップロードする必要もありません。",
      "feat1Title": "マウスでぼかし領域をドラッグ描画",
      "feat1Desc": "クリック＆ドラッグで矩形範囲を選択し、ぼかし強度を自在に調整できます。",
      "feat2Title": "永久的で復元不可能な処理",
      "feat2Desc": "ダウンロードされる画像はフラット化されており、下のレイヤーから元画像を抽出することは不可能です。",
      "feat3Title": "主な活用シーン",
      "feat3Desc": "出品写真のナンバープレート隠し、領収書スクショの口座番号隠し、通行人の顔ぼかしなどに最適です。",
      "feat4Title": "外部へのアップロードはゼロ",
      "feat4Desc": "画像は最後までブラウザ内に留まり、Canvas APIでローカル処理されます。",
      "faqTitle": "よくある質問",
      "faqSubtitle": "NexRedactのプライバシー保護ぼかしに関するよくある質問。",
      "faqQ1": "画像のぼかしは永久的ですか？",
      "faqA1": "はい、完全に永久的です。ダウンロード前にキャンバス上でラスタライズされ、元に戻すことはできません。",
      "faqQ2": "誰かがぼかし前の画像を抽出することはできますか？",
      "faqA2": "いいえ。元のピクセルデータは破壊的に置き換えられ、完全に消去されます。",
      "faqQ3": "どの画像フォーマットに対応していますか？",
      "faqA3": "JPG、PNG、WebPなど標準的なブラウザ対応画像フォーマットをサポートしています。",
      "faqQ4": "機密スクリーンショットがサーバーに送信されますか？",
      "faqA4": "いいえ、サーバーには一切送信されません。",
      "ctaTitle": "画像の機密部分を隠す準備はできましたか？",
      "ctaDesc": "ページ上部にファイルをドロップしてください。すべてクライアント側で処理されます。",
      "ctaButton": "ツールに戻る"
  },
  hi: {
      "title": "इमेज रेडैक्टर — चेहरे, नंबर प्लेट और संवेदनशील क्षेत्रों को लोकली ब्लर करें | TheNexTools",
      "description": "अपनी तस्वीरों में चेहरे, लाइसेंस प्लेट, पते और संवेदनशील डेटा पर ब्लर ज़ोन बनाएं। ब्लर स्थायी है और आपके ब्राउज़र में लोकली चलता है।",
      "steps": [
          {
              "title": "इमेज जोड़ें",
              "desc": "सुरक्षित एडिटर विंडो में अपनी इमेज चुनें या ड्रैग करें।"
          },
          {
              "title": "संवेदनशील भाग छुपाएं",
              "desc": "चेहरे, नाम, नंबर प्लेट या निजी विवरणों पर ब्लर क्षेत्र बनाएं।"
          },
          {
              "title": "फ्लैटन एक्सपोर्ट करें",
              "desc": "एक साफ फ़ाइल डाउनलोड करें जहाँ मूल पिक्सेल डेटा स्थायी रूप से नष्ट हो जाता है।"
          }
      ],
      "badge": "NexRedact — डिफ़ॉल्ट रूप से प्राइवेट",
      "h1": "फ़ोटो में कुछ चीज़ें साझा करने के लिए नहीं होतीं।",
      "p1": "NexRedact आपको किसी भी संवेदनशील चीज़ पर ब्लर ज़ोन बनाने और एक फ्लैटन इमेज सहेजने देता है जहाँ ब्लर स्थायी होता है और पूर्ववत नहीं किया जा सकता।",
      "schemaTitle": "NexRedact इमेज रेडैक्टर",
      "schemaHome": "होम",
      "schemaToolkit": "इमेज टूलकिट",
      "schemaTool": "रेडैक्ट और ब्लर",
      "howToTitle": "ऑफ़लाइन इमेज को ब्लर कैसे करें",
      "diffTitle": "सरल रेडैक्शन जो वास्तव में काम करता है",
      "diffDesc": "कोई लेयर नहीं, कोई फ़ोटोशॉप नहीं, किसी बाहरी सर्वर पर संवेदनशील इमेज अपलोड करने की आवश्यकता नहीं।",
      "feat1Title": "माउस से ब्लर ज़ोन बनाएं",
      "feat1Desc": "आयताकार क्षेत्र चुनने के लिए क्लिक और ड्रैग करें और ब्लर की तीव्रता समायोजित करें।",
      "feat2Title": "स्थायी, अपरिवर्तनीय रेडैक्शन",
      "feat2Desc": "डाउनलोड की गई इमेज फ्लैटन होती है — नीचे कोई छुपी हुई लेयर नहीं होती जिसे कोई निकाल सके।",
      "feat3Title": "सामान्य उपयोग",
      "feat3Desc": "वाहन की नंबर प्लेट, रसीद के स्क्रीनशॉट पर खाता संख्या, या भीड़ की तस्वीरों में चेहरे छुपाना।",
      "feat4Title": "कुछ भी अपलोड नहीं होता",
      "feat4Desc": "इमेज पूरे समय आपके ब्राउज़र में रहती है और लोकल Canvas API से प्रोसेस होती है।",
      "faqTitle": "अक्सर पूछे जाने वाले प्रश्न",
      "faqSubtitle": "NexRedact प्राइवेसी रेडैक्शन के बारे में सब कुछ।",
      "faqQ1": "क्या मेरी तस्वीरों पर किया गया ब्लर स्थायी है?",
      "faqA1": "हाँ, पूरी तरह से। डाउनलोड से पहले ब्लर ज़ोन को इमेज कैनवास पर स्थायी रूप से रास्टराइज़ किया जाता है।",
      "faqQ2": "क्या कोई बिना ब्लर वाली इमेज निकाल सकता है?",
      "faqA2": "नहीं। ब्लर किए गए क्षेत्रों में मूल पिक्सेल पूरी तरह से बदल और नष्ट कर दिए जाते हैं।",
      "faqQ3": "कौन से इमेज फ़ॉर्मेट समर्थित हैं?",
      "faqA3": "NexRedact JPG, PNG, WebP और अन्य मानक इमेज फ़ॉर्मेट का समर्थन करता है।",
      "faqQ4": "क्या मेरे संवेदनशील स्क्रीनशॉट किसी सर्वर पर अपलोड होते हैं?",
      "faqA4": "नहीं, वे कभी किसी सर्वर को नहीं छूते।",
      "ctaTitle": "अपनी इमेज को रेडैक्ट करने के लिए तैयार हैं?",
      "ctaDesc": "पृष्ठ के शीर्ष पर अपनी फ़ाइलें ड्रॉप करें। सब कुछ क्लाइंट-साइड प्रोसेस होता है।",
      "ctaButton": "टूल पर वापस जाएं"
  },
  tr: {
      "title": "Görsel Sansürleyici — Yüzleri, Plakaları ve Hassas Alanları Yerel Olarak Bulanıklaştırın | TheNexTools",
      "description": "Fotoğraflarınızdaki yüzlerin, plakaların, adreslerin ve hassas verilerin üzerine bulanıklaştırma alanları çizin. Kalıcıdır ve tarayıcınızda yerel olarak çalışır.",
      "steps": [
          {
              "title": "Görsel Ekleyin",
              "desc": "Görselinizi güvenli düzenleyici penceresine seçin veya sürükleyin."
          },
          {
              "title": "Alanları Sansürleyin",
              "desc": "Yüzlerin, isimlerin, plakaların veya özel detayların üzerine bulanıklaştırma alanları çizin."
          },
          {
              "title": "Düzleştirilmiş Dışa Aktarın",
              "desc": "Orijinal verilerin kalıcı olarak yok edildiği temiz, düzleştirilmiş bir dosya indirin."
          }
      ],
      "badge": "NexRedact — Varsayılan Olarak Gizli",
      "h1": "Bir fotoğraftaki bazı şeyler paylaşılmak için değildir.",
      "p1": "NexRedact hassas olan her şeyin üzerine bulanıklaştırma bölgeleri çizmenize ve bulanıklığın kalıcı olduğu düzleştirilmiş bir görsel kaydetmenize olanak tanır.",
      "schemaTitle": "NexRedact Görsel Sansürleyici",
      "schemaHome": "Ana Sayfa",
      "schemaToolkit": "Görsel Araç Seti",
      "schemaTool": "Sansürle ve Bulanıklaştır",
      "howToTitle": "Görseller çevrimdışı nasıl sansürlenir",
      "diffTitle": "Gerçekten işe yarayan basit sansürleme",
      "diffDesc": "Katman yok, Photoshop yok, hassas görselleri başkasının sunucusuna yüklemek yok.",
      "feat1Title": "Farenizle bulanıklaştırma alanları çizin",
      "feat1Desc": "Dikdörtgen bir alan seçmek için tıklayıp sürükleyin ve bulanıklık yoğunluğunu ayarlayın.",
      "feat2Title": "Kalıcı, geri döndürülemez sansürleme",
      "feat2Desc": "İndirilen görsel düzleştirilmiştir — altında birinin çıkarabileceği gizli bir katman yoktur.",
      "feat3Title": "Yaygın kullanım alanları",
      "feat3Desc": "Araç ilanlarında plakaları, fatura ekran görüntülerinde hesap numaralarını veya kalabalık fotoğraflarda yüzleri gizleme.",
      "feat4Title": "Hiçbir şey yüklenmez",
      "feat4Desc": "Görsel tüm süre boyunca tarayıcınızda kalır ve yerel Canvas API ile işlenir.",
      "faqTitle": "Sıkça Sorulan Sorular",
      "faqSubtitle": "NexRedact gizlilik sansürleme hakkında bilmeniz gereken her şey.",
      "faqQ1": "Sansürlenen görsellerimdeki bulanıklık kalıcı mı?",
      "faqA1": "Evet, tamamen. Bulanıklık bölgeleri indirilmeden önce görsel tuvaline kalıcı olarak işlenir.",
      "faqQ2": "Birisi bulanıklaştırılmamış görseli çıkarabilir mi?",
      "faqA2": "Hayır. Bulanıklaştırılan bölgelerdeki orijinal pikseller tamamen değiştirilir ve yok edilir.",
      "faqQ3": "Hangi görsel formatları destekleniyor?",
      "faqA3": "NexRedact JPG, PNG, WebP ve diğer standart tarayıcı uyumlu formatları destekler.",
      "faqQ4": "Hassas ekran görüntülerim bir sunucuya yükleniyor mu?",
      "faqA4": "Hayır, hiçbir zaman bir sunucuya değmezler.",
      "ctaTitle": "Görsellerinizi sansürlemeye hazır mısınız?",
      "ctaDesc": "Dosyalarınızı sayfanın üst kısmına bırakın. Her şey tamamen istemci tarafında işlenir.",
      "ctaButton": "Araca Dön"
  },
  sw: {
      "title": "Kifuta Picha — Tia Ukungu Nyuso, Nambari za Magari na Maelezo Nyeti | TheNexTools",
      "description": "Chora maeneo yenye ukungu juu ya nyuso, nambari za magari, anwani na data nyeti kwenye picha zako. Ukungu ni wa kudumu na hufanyika kwenye kivinjari chako.",
      "steps": [
          {
              "title": "Ongeza Picha",
              "desc": "Chagua au buruta picha yako kwenye dirisha salama la kuhariri."
          },
          {
              "title": "Ficha Sehemu",
              "desc": "Chora maeneo ya ukungu juu ya nyuso, majina, nambari za magari au maelezo ya faragha."
          },
          {
              "title": "Pakua Picha Safi",
              "desc": "Pakua faili iliyounganishwa ambapo data ya awali imefutwa kabisa."
          }
      ],
      "badge": "NexRedact — Faragha kwa Chaguomsingi",
      "h1": "Baadhi ya vitu kwenye picha havipaswi kushirikiwa.",
      "p1": "NexRedact hukuruhusu kuchora maeneo ya ukungu juu ya kitu chochote nyeti, kisha kuhifadhi picha ambapo ukungu huo ni wa kudumu na hauwezi kutenduliwa.",
      "schemaTitle": "NexRedact Kifuta Picha",
      "schemaHome": "Nyumbani",
      "schemaToolkit": "Zana za Picha",
      "schemaTool": "Futa na Tia Ukungu",
      "howToTitle": "Jinsi ya kuficha maelezo kwenye picha nje ya mtandao",
      "diffTitle": "Ufutaji rahisi unaofanya kazi kweli",
      "diffDesc": "Hakuna tabaka, hakuna Photoshop, hakuna kupakia picha nyeti kwenye seva ya mtu mwingine.",
      "feat1Title": "Chora maeneo ya ukungu kwa kipanya chako",
      "feat1Desc": "Bofya na uburute ili kuchagua eneo na urekebishe kiwango cha ukungu.",
      "feat2Title": "Ufutaji wa kudumu usiotenduliwa",
      "feat2Desc": "Picha inayopakuliwa haina tabaka zilizofichwa chini ambazo mtu anaweza kuzitoa.",
      "feat3Title": "Matumizi ya kawaida",
      "feat3Desc": "Kuficha nambari za magari, nambari za akaunti kwenye risiti, au nyuso za watu.",
      "feat4Title": "Hakuna kinachopakiwa mtandaoni",
      "feat4Desc": "Picha hubaki kwenye kivinjari chako wakati wote kupitia Canvas API.",
      "faqTitle": "Maswali Yanayoulizwa Mara kwa Mara",
      "faqSubtitle": "Kila kitu unachohitaji kujua kuhusu NexRedact.",
      "faqQ1": "Je, ukungu ni wa kudumu kwenye picha zangu?",
      "faqA1": "Ndiyo, kabisa. Maeneo yenye ukungu huunganishwa moja kwa moja kwenye picha kabla ya kupakuliwa.",
      "faqQ2": "Je, mtu anaweza kutoa picha isiyo na ukungu?",
      "faqA2": "Hapana. Pikseli za awali katika maeneo yaliyotiwa ukungu zinaharibiwa kabisa.",
      "faqQ3": "Ni umbizo gani za picha zinazosaidiwa?",
      "faqA3": "NexRedact inasaidia JPG, PNG, WebP na umbizo zingine za kawaida.",
      "faqQ4": "Je, picha zangu nyeti zinapakiwa kwenye seva?",
      "faqA4": "Hapana, hazigusi seva yoyote.",
      "ctaTitle": "Uko tayari kuficha maelezo nyeti kwenye picha zako?",
      "ctaDesc": "Weka faili zako juu ya ukurasa.",
      "ctaButton": "Rudi kwenye Zana"
  },
  bn: {
      "title": "ইমেজ রিডাক্টর — লোকালি মুখমণ্ডল, লাইসেন্স প্লেট ও সংবেদনশীল অংশ ব্লার করুন | TheNexTools",
      "description": "আপনার ছবিতে মুখমণ্ডল, লাইসেন্স প্লেট, ঠিকানা ও সংবেদনশীল তথ্যের ওপর ব্লার জোন আঁকুন। ব্লার স্থায়ী ও অপরিবর্তনীয় এবং ব্রাউজারে লোকালি চলে।",
      "steps": [
          {
              "title": "ছবি যোগ করুন",
              "desc": "নিরাপদ এডিটর উইন্ডোতে আপনার ছবি নির্বাচন বা ড্র্যাগ করুন।"
          },
          {
              "title": "সংবেদনশীল অংশ ঢেকে দিন",
              "desc": "মুখমণ্ডল, নাম, প্লেট বা ব্যক্তিগত তথ্যের ওপর ব্লার এরিয়া আঁকুন।"
          },
          {
              "title": "ফ্ল্যাটেনড এক্সপোর্ট করুন",
              "desc": "এমন একটি ফাইল ডাউনলোড করুন যেখানে মূল ডেটা স্থায়ীভাবে মুছে গেছে।"
          }
      ],
      "badge": "NexRedact — ডিফল্টভাবে প্রাইভেট",
      "h1": "ছবির কিছু জিনিস শেয়ার করার জন্য নয়।",
      "p1": "NexRedact আপনাকে যেকোনো সংবেদনশীল অংশের ওপর ব্লার জোন আঁকতে এবং স্থায়ীভাবে ব্লার করা ফ্ল্যাটেনড ছবি সেভ করতে দেয়।",
      "schemaTitle": "NexRedact ইমেজ রিডাক্টর",
      "schemaHome": "হোম",
      "schemaToolkit": "ইমেজ টুলকিট",
      "schemaTool": "রিডাক্ট ও ব্লার",
      "howToTitle": "কীভাবে অফলাইনে ছবি রিডাক্ট করবেন",
      "diffTitle": "সহজ রিডাকশন যা সত্যিই কাজ করে",
      "diffDesc": "কোনো লেয়ার নেই, ফটোশপ নেই, অন্য কারো সার্ভারে সংবেদনশীল ছবি আপলোড করার প্রয়োজন নেই।",
      "feat1Title": "মাউস দিয়ে ব্লার জোন আঁকুন",
      "feat1Desc": "ক্লিক ও ড্র্যাগ করে আয়তাকার অংশ নির্বাচন করুন এবং ব্লারের মাত্রা নিয়ন্ত্রণ করুন।",
      "feat2Title": "স্থায়ী ও অপরিবর্তনীয় রিডাকশন",
      "feat2Desc": "ডাউনলোড করা ছবিটি ফ্ল্যাটেনড — নিচে কোনো লুকানো লেয়ার থাকে না যা কেউ পুনরুদ্ধার করতে পারে।",
      "feat3Title": "সাধারণ ব্যবহার",
      "feat3Desc": "গাড়ির লাইসেন্স প্লেট, ইনভয়েস স্ক্রিনশটে অ্যাকাউন্ট নম্বর বা ভিড়ের ছবিতে মুখমণ্ডল ব্লার করা।",
      "feat4Title": "কিছুই আপলোড হয় না",
      "feat4Desc": "ছবিটি পুরো সময় আপনার ব্রাউজারেই থাকে এবং লোকাল Canvas API দিয়ে প্রসেস হয়।",
      "faqTitle": "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী",
      "faqSubtitle": "NexRedact প্রাইভেসি রিডাকশন সম্পর্কে যা জানা প্রয়োজন।",
      "faqQ1": "রিডাক্ট করা ছবিতে ব্লার কি স্থায়ী?",
      "faqA1": "হ্যাঁ, সম্পূর্ণ স্থায়ী। ডাউনলোডের আগে ব্লার জোনগুলো ক্যানভাসে স্থায়ীভাবে রাস্টারাইজ করা হয়।",
      "faqQ2": "কেউ কি আনব্লার করা ছবি বের করতে পারবে?",
      "faqA2": "না। ব্লার করা অংশের মূল পিক্সেলগুলো সম্পূর্ণ প্রতিস্থাপিত ও ধ্বংস হয়ে যায়।",
      "faqQ3": "কোন কোন ইমেজ ফরম্যাট সমর্থিত?",
      "faqA3": "NexRedact JPG, PNG, WebP এবং অন্যান্য ব্রাউজার-সমর্থিত ফরম্যাট সাপোর্ট করে।",
      "faqQ4": "আমার সংবেদনশীল স্ক্রিনশটগুলো কি সার্ভারে আপলোড হয়?",
      "faqA4": "না, সেগুলো কখনোই কোনো সার্ভারে যায় না।",
      "ctaTitle": "আপনার ছবি রিডাক্ট করতে প্রস্তুত?",
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
      canonical: `/${lang}/image-redactor`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/image-redactor' : `/${l}/image-redactor`;
          return acc;
        }, {}),
        'x-default': '/image-redactor',
      }
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      siteName: 'TheNexTools',
      locale: ogLocales[lang] || 'en_US',
      url: `https://thenextools.com/${lang}/image-redactor`,
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

export default async function ImageRedactorLanding({ params }) {
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
              "url": `https://thenextools.com/${lang}/image-redactor`,
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
                  "item": `https://thenextools.com/${lang}/image-redactor`
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
          <ImageBlurPageWrapper hideHeader={true} />
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
              <Link href={`/${lang}/image-converter`} className="badge" style={{ textDecoration: 'none' }}>{d.nav.imageConvertTitle}</Link>
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
