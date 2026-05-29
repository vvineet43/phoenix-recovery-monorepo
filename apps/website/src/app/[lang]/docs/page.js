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
  },
  de: {
    title: 'Dokumentation | TheNexTools',
    description: 'Erfahren Sie, wie Sie die datenschutzfreundliche Utility-Suite von TheNexTools verwenden.',
    h1: 'Dokumentation',
    textMuted: 'Anleitungen und Schnellstart-Tipps für TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData scannt die physischen Sektoren der Festplatte. Für beste Ergebnisse:',
    sec1Li1: 'Schließen Sie das Ziellaufwerk über eine stabile USB- oder SATA-Verbindung an.',
    sec1Li2: 'Stellen Sie sicher, dass Sie auf einem **anderen** Laufwerk genügend freien Speicherplatz haben, um die wiederhergestellten Dateien zu speichern.',
    sec1Li3: 'Vermeiden Sie es, neue Daten auf das Laufwerk zu schreiben, das Sie scannen.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Alle PDF-Operationen werden in Ihrem Browser unter Verwendung der lokalen CPU ausgeführt. Zu den unterstützten Funktionen gehören:',
    sec2Li1: '<strong>Zusammenführen:</strong> Kombinieren Sie mehrere Dateien in beliebiger Reihenfolge.',
    sec2Li2: '<strong>Unterschreiben:</strong> Platzieren Sie Unterschriften als flache Vektorelemente.',
    sec2Li3: '<strong>Komprimieren:</strong> Reduzieren Sie die Dateigröße mit Echtzeit-Qualitätsvoreinstellungen.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Verarbeiten Sie Fotos vollständig offline in Ihrem Browser. Unterstützte Aktionen:',
    secImgLi1: '<strong>EXIF-Stripper:</strong> Entfernen Sie GPS-Koordinaten, Kameramodell und Zeitstempel.',
    secImgLi2: '<strong>Kompressor:</strong> Optimieren Sie Dateigrößen mit Echtzeit-Komprimierungsvorschau.',
    secImgLi3: '<strong>Konverter:</strong> Konvertieren Sie stapelweise zwischen den Formaten (JPG, PNG, WebP).',
    secImgLi4: '<strong>Schwärzer:</strong> Machen Sie Gesichter, Nummernschilder und sensible Details unkenntlich.',
    sec3Title: 'PWA-Fehlerbehebung',
    sec3Desc: 'So installieren Sie unsere Werkzeuge als eigenständige Apps:',
    sec3Li1: '<strong>Chrome:</strong> Suchen Sie nach dem &quot;Installieren&quot;-Symbol auf der rechten Seite der Adressleiste.',
    sec3Li2: '<strong>iOS Safari:</strong> Tippen Sie auf Teilen &rarr; Zum Home-Bildschirm.',
    sec3Li3: '<strong>Android:</strong> Tippen Sie auf das Banner &quot;Zum Startbildschirm hinzufügen&quot; oder das Browsermenü.'
  },
  nl: {
    title: 'Documentatie | TheNexTools',
    description: 'Leer hoe u de privacy-prioritaire utility suite van TheNexTools gebruikt.',
    h1: 'Documentatie',
    textMuted: 'Handleidingen en snelstarttips voor TheNexTools.',
    sec1Title: 'NexData Herstel',
    sec1Desc: 'NexData scant fysieke schijfsectoren. Voor de beste resultaten:',
    sec1Li1: 'Sluit de doelschijf aan via een stabiele USB- of SATA-verbinding.',
    sec1Li2: 'Zorg ervoor dat u voldoende vrije ruimte heeft op een **andere** schijf om de herstelde bestanden op te slaan.',
    sec1Li3: 'Schrijf geen nieuwe gegevens naar de schijf die u scant.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Alle PDF-bewerkingen vinden plaats in uw browser met behulp van de lokale CPU. Ondersteunde functies zijn onder meer:',
    sec2Li1: '<strong>Samenvoegen:</strong> Combineer meerdere bestanden in elke volgorde.',
    sec2Li2: '<strong>Ondertekenen:</strong> Plaats handtekeningen als platte vectorelementen.',
    sec2Li3: '<strong>Comprimeren:</strong> Verklein de bestandsgrootte met real-time kwaliteitsinstellingen.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Verwerk foto\'s volledig offline in uw browser. Ondersteunde bewerkingen:',
    secImgLi1: '<strong>EXIF-Stripper:</strong> Verwijder GPS-coördinaten, cameramodel en tijdstempels.',
    secImgLi2: '<strong>Compressor:</strong> Optimaliseer bestandsgroottes met real-time compressievoorbeelden.',
    secImgLi3: '<strong>Converter:</strong> Converteer batchgewijs tussen formaten (JPG, PNG, WebP).',
    secImgLi4: '<strong>Anonimiser:</strong> Vervag gezichten, kentekenplaten en gevoelige details.',
    sec3Title: 'PWA Probleemoplossing',
    sec3Desc: 'Om onze tools als stand-alone apps te installeren:',
    sec3Li1: '<strong>Chrome:</strong> Zoek naar het &quot;Installeren&quot;-icoon aan de rechterkant van de adresbalk.',
    sec3Li2: '<strong>iOS Safari:</strong> Tik op Delen &rarr; Zet op beginscherm.',
    sec3Li3: '<strong>Android:</strong> Tik op de banner &quot;Toevoegen aan startscherm&quot; of het browsermenu.'
  },
  it: {
    title: 'Documentazione | TheNexTools',
    description: 'Scopri come utilizzare la suite di utility di TheNexTools con priorità alla privacy.',
    h1: 'Documentazione',
    textMuted: 'Guide e consigli per iniziare rapidamente con TheNexTools.',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexData funziona scansionando i settori fisici del disco. Per ottenere i migliori risultati:',
    sec1Li1: 'Collega l\'unità di destinazione tramite una connessione USB o SATA stabile.',
    sec1Li2: 'Assicurati di avere abbastanza spazio libero su un disco **diverso** per salvare i file recuperati.',
    sec1Li3: 'Evita di scrivere nuovi dati sull\'unità che stai scansionando.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Tutte le operazioni PDF avvengono nel tuo browser utilizzando la CPU locale. Le funzionalità supportate includono:',
    sec2Li1: '<strong>Unisci:</strong> Combina più file in qualsiasi ordine.',
    sec2Li2: '<strong>Firma:</strong> Posiziona le firme come elementi vettoriali appiattiti.',
    sec2Li3: '<strong>Comprimi:</strong> Riduci le dimensioni del file con impostazioni di qualità in tempo reale.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Elabora le foto completamente offline nel tuo browser. Operazioni supportate:',
    secImgLi1: '<strong>EXIF Stripper:</strong> Rimuovi coordinate GPS, modello di fotocamera e timestamp.',
    secImgLi2: '<strong>Compressore:</strong> Ottimizza le dimensioni dei file con anteprime di compressione in tempo reale.',
    secImgLi3: '<strong>Convertitore:</strong> Converti in batch tra formati (JPG, PNG, WebP).',
    secImgLi4: '<strong>Redattore:</strong> Sfoca volti, targhe e dettagli sensibili.',
    sec3Title: 'Risoluzione dei Problemi PWA',
    sec3Desc: 'Per installare i nostri strumenti come app autonome:',
    sec3Li1: '<strong>Chrome:</strong> Cerca l\'icona &quot;Installa&quot; sul lato destro della barra degli indirizzi.',
    sec3Li2: '<strong>iOS Safari:</strong> Tocca Condividi &rarr; Aggiungi alla schermata Home.',
    sec3Li3: '<strong>Android:</strong> Tocca il banner &quot;Aggiungi a schermata Home&quot; o il menu del browser.'
  },
  ja: {
    title: 'ドキュメント | TheNexTools',
    description: 'プライバシー最優先のTheNexToolsユーティリティスイートの使用方法を学びます。',
    h1: 'ドキュメント',
    textMuted: 'TheNexToolsのクイックスタートガイドとヒント。',
    sec1Title: 'NexData Recovery',
    sec1Desc: 'NexDataは、物理ディスクセクタをスキャンして動作します。最良の結果を得るために：',
    sec1Li1: '安定したUSBまたはSATA接続を使用してターゲットドライブを接続します。',
    sec1Li2: '復元されたファイルを保存するために、**別の**ドライブに十分な空き容量があることを確認してください。',
    sec1Li3: 'スキャン中のドライブに新しいデータを書き込まないでください。',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'すべてのPDF操作は、ローカルCPUを使用してブラウザ内で行われます。サポートされている機能は以下の通りです：',
    sec2Li1: '<strong>結合：</strong> 複数のファイルを任意の順序で結合します。',
    sec2Li2: '<strong>署名：</strong> 署名をフラット化されたベクトル要素として配置します。',
    sec2Li3: '<strong>圧縮：</strong> リアルタイムの品質プリセットでファイルサイズを削減します。',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'ブラウザ内で完全にオフラインで写真を処理します。サポートされている処理：',
    secImgLi1: '<strong>EXIF削除：</strong> GPS座標、カメラモデル、およびタイムスタンプデータを削除します。',
    secImgLi2: '<strong>圧縮：</strong> リアルタイムプレビューで画像ファイルサイズを最適化します。',
    secImgLi3: '<strong>変換：</strong> フォーマット（JPG、PNG、WebP）間の一括変換を行います。',
    secImgLi4: '<strong>ぼかし：</strong> 顔、ナンバープレート、および機密情報をぼかします。',
    sec3Title: 'PWAトラブルシューティング',
    sec3Desc: 'ツールをスタンドアロンアプリとしてインストールするには：',
    sec3Li1: '<strong>Chrome：</strong> アスクルの右側にある「インストール」アイコンを探します。',
    sec3Li2: '<strong>iOS Safari：</strong> [共有] &rarr; [ホーム画面に追加] をタップします。',
    sec3Li3: '<strong>Android：</strong> 「ホーム画面に追加」バナーまたはブラウザメニューをタップします。'
  },
  sw: {
    title: 'Nyaraka | TheNexTools',
    description: 'Jifunze jinsi ya kutumia mkusanyiko wa zana za TheNexTools zenye kipaumbele cha faragha.',
    h1: 'Nyaraka',
    textMuted: 'Miongozo na vidokezo vya kuanza haraka kwa ajili ya TheNexTools.',
    sec1Title: 'Urejeshaji wa NexData',
    sec1Desc: 'NexData inafanya kazi kwa kutafuta sekta za kimwili za diski. Kwa matokeo bora zaidi:',
    sec1Li1: 'Unganisha diski inayolengwa kupitia muunganisho thabiti wa USB au SATA.',
    sec1Li2: 'Hakikisha una nafasi ya kutosha kwenye diski **tofauti** ili kuhifadhi faili zilizorejeshwa.',
    sec1Li3: 'Epuka kuandika data yoyote mpya kwenye diski unayotafuta.',
    sec2Title: 'NexPDF Toolkit',
    sec2Desc: 'Shughuli zote za PDF zinafanyika kwenye kivinjari chako kwa kutumia CPU ya ndani. Vipengele vinavyosaidiwa ni pamoja na:',
    sec2Li1: '<strong>Unganisha:</strong> Changanya faili nyingi katika mpangilio wowote.',
    sec2Li2: '<strong>Saini:</strong> Weka saini kama vipengele vya vector vilivyobanwa.',
    sec2Li3: '<strong>Bana:</strong> Punguza ukubwa wa faili kwa mipangilio ya ubora wa wakati halisi.',
    secImgTitle: 'NexImage Toolkit',
    secImgDesc: 'Sakinisha picha nje ya mtandao kabisa kwenye kivinjari chako. Shughuli zinazosaidiwa:',
    secImgLi1: '<strong>Kiondoa EXIF:</strong> Ondoa uratibu wa GPS, mfano wa kamera, na data ya alama za muda.',
    secImgLi2: '<strong>Kibana:</strong> Punguza ukubwa wa faili za picha kwa hakikisho la wakati halisi.',
    secImgLi3: '<strong>Kibadilisha:</strong> Badilisha kati ya umbizo (JPG, PNG, WebP) kwa pamoja.',
    secImgLi4: '<strong>Kifuta:</strong> Futa nyuso, nambari za magari, na maelezo nyeti.',
    sec3Title: 'Utatuzi wa PWA',
    sec3Desc: 'Ili kusakinisha zana zetu kama programu zinazojitegemea:',
    sec3Li1: '<strong>Chrome:</strong> Tafuta alama ya &quot;Sakinisha&quot; upande wa kulia wa upau wa anuani.',
    sec3Li2: '<strong>iOS Safari:</strong> Gonga Shiriki &rarr; Ongeza kwenye Skrini ya Nyumbani.',
    sec3Li3: '<strong>Android:</strong> Gonga bendera ya &quot;Ongeza kwenye Skrini ya Nyumbani&quot; au menyu ya kivinjari.'
  },
  bn: {
    title: 'ডকুমেন্টেশন | TheNexTools',
    description: 'TheNexTools-এর গোপনীয়তা-প্রথম ইউটিলিটিগুলো কীভাবে ব্যবহার করবেন তা শিখুন।',
    h1: 'ডকুমেন্টেশন',
    textMuted: 'TheNexTools-এর জন্য গাইড এবং কুইক-স্টার্ট টিপস।',
    sec1Title: 'NexData পুনরুদ্ধার',
    sec1Desc: 'NexData ফিজিক্যাল ড্রাইভ সেক্টর স্ক্যান করে কাজ করে। সেরা ফলাফলের জন্য:',
    sec1Li1: 'একটি স্থিতিশীল USB বা SATA সংযোগের মাধ্যমে টার্গেট ড্রাইভটি সংযুক্ত করুন।',
    sec1Li2: 'উদ্ধারকৃত ফাইলগুলো সংরক্ষণ করার জন্য একটি **ভিন্ন** ড্রাইভে পর্যাপ্ত খালি জায়গা রয়েছে কিনা তা নিশ্চিত করুন।',
    sec1Li3: 'আপনি যে ড্রাইভটি স্ক্যান করছেন তাতে নতুন কোনো ডেটা লেখা এড়িয়ে চলুন।',
    sec2Title: 'NexPDF টুলকিট',
    sec2Desc: 'সব পিডিএফ অপারেশন আপনার লোকাল সিপিইউ ব্যবহার করে ব্রাউজারের ভেতরে সম্পন্ন হয়। সমর্থিত বৈশিষ্ট্যগুলো হলো:',
    sec2Li1: '<strong>একত্রিত করুন:</strong> যেকোনো ক্রমে একাধিক ফাইল একসাথে যুক্ত করুন।',
    sec2Li2: '<strong>স্বাক্ষর:</strong> পিডিএফ ডকুমেন্টে ফ্ল্যাট ভেক্টর উপাদান হিসেবে স্বাক্ষর বসান।',
    sec2Li3: '<strong>সাইজ কমান:</strong> রিয়েল-টাইম কোয়ালিটি প্রিভিউ সহ ছবির সাইজ অপ্টিমাইজ করুন।',
    secImgTitle: 'NexImage টুলকিট',
    secImgDesc: 'আপনার ব্রাউজারে সম্পূর্ণ অফলাইনে ছবি প্রসেস করুন। সমর্থিত কাজসমূহ:',
    secImgLi1: '<strong>EXIF মেটাডেটা স্ট্রিপার:</strong> ছবি শেয়ার করার আগে জিপিএস লোকেশন, ক্যামেরা মডেল এবং টাইমেস্ট্যাম্প ডেটা মুছে ফেলুন।',
    secImgLi2: '<strong>কম্প্রেসর:</strong> রিয়েল-টাইম কম্প্রেশন প্রিভিউ সহ ছবির সাইজ অপ্টিমাইজ করুন।',
    secImgLi3: '<strong>কনভার্টার:</strong> একসাথে একাধিক ছবির ফরম্যাট (JPG, PNG, WebP) রূপান্তর করুন।',
    secImgLi4: '<strong>রিডাক্টর:</strong> মুখমণ্ডল, লাইসেন্স প্লেট এবং সংবেদনশীল অংশ ব্লার করুন।',
    sec3Title: 'PWA ট্রাবলশুটিং',
    sec3Desc: 'আমাদের টুলগুলো অ্যাপ্লিকেশন হিসেবে ইনস্টল করতে:',
    sec3Li1: '<strong>Chrome:</strong> অ্যাড্রেস বারের ডান পাশে থাকা &quot;Install&quot; আইকনটিতে ক্লিক করুন।',
    sec3Li2: '<strong>iOS Safari:</strong> Share &rarr; Add to Home Screen-এ ট্যাপ করুন।',
    sec3Li3: '<strong>Android:</strong> &quot;Add to Home Screen&quot; ব্যানার বা ব্রাউজার মেনুতে ট্যাপ করুন।'
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
      url: `https://thenextools.com/${lang}/docs`,
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
