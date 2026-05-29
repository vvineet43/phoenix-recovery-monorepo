import Link from 'next/link';
import { locales } from '@/lib/i18n-config';

const TRANSLATIONS = {
  es: {
    title: 'Política de Reembolso | TheNexTools',
    description: 'Nuestra política de reembolso para NexData Recovery Pro y otros softwares de pago. Conoce cómo solicitar un reembolso y qué está cubierto.',
    h1: 'Política de Reembolso',
    lastUpdated: 'Última actualización: 20 de mayo de 2026',
    sec1Title: 'Descripción General',
    sec1Desc: 'Si NexData Recovery Pro no funciona correctamente en tu sistema, puedes solicitar un reembolso completo. Solo te pedimos que cumplas con las condiciones detalladas a continuación.',
    sec2Title: 'Elegibilidad para Reembolsos',
    sec2Desc: 'Para ser elegible para un reembolso, se deben cumplir <strong>todas</strong> las siguientes condiciones:',
    sec2Li1: 'La solicitud de reembolso se envía <strong>dentro de los 10 días</strong> posteriores a la fecha de compra original.',
    sec2Li2: 'Proporcionas pruebas claras de que el software no funciona correctamente, como una <strong>captura de pantalla o grabación de pantalla</strong> que muestre el error o fallo.',
    sec2Li3: 'El problema es un defecto real del software, no una limitación inherente de la tecnología de recuperación de datos (consulta las exclusiones a continuación).',
    sec3Title: 'Lo que NO es elegible para un reembolso',
    sec3Desc: 'La recuperación depende del estado físico de tu unidad. Estas situaciones <strong>no</strong> son fallos del software y <strong>no</strong> están cubiertas por nuestra política de reembolso:',
    sec3Li1: '<strong>Datos sobrescritos:</strong> Cuando se han escrito nuevos datos en los mismos sectores del disco después de la eliminación, los archivos originales se destruyen permanentemente. Ningún software puede recuperar datos sobrescritos.',
    sec3Li2: '<strong>Unidades dañadas físicamente:</strong> Si el dispositivo de almacenamiento tiene daños físicos (por ejemplo, cabezal dañado, daño por agua, circuitos quemados), la recuperación basada en software no puede acceder al medio. Esto requiere servicios profesionales de laboratorio.',
    sec3Li3: '<strong>Archivos muy fragmentados:</strong> Los archivos grandes (especialmente los videos) que se almacenaron en sectores no contiguos del disco pueden recuperarse parcialmente pero no reproducirse por completo. Esta es una limitación fundamental de la reconstrucción de archivos, no un fallo del software.',
    sec3Li4: '<strong>Volúmenes cifrados sin la clave:</strong> Si se pierde la contraseña de cifrado original o la clave de recuperación, ninguna herramienta podrá descifrar los datos.',
    sec3Li5: '<strong>Datos eliminados por TRIM en SSD:</strong> Los SSD modernos con TRIM habilitado borran permanentemente los bloques eliminados a nivel de hardware. Una vez que TRIM se ha ejecutado, los datos desaparecen físicamente.',
    sec3Li6: '<strong>Formatos de archivo no compatibles:</strong> NexData recupera archivos haciendo coincidir firmas binarias conocidas. Es posible que no se admitan formatos propietarios o extremadamente raros.',
    sec3Li7: '<strong>Resultados de recuperación parciales o dañados:</strong> Los archivos recuperados no siempre están 100% intactos. La recuperación parcial de algunos archivos de un disco dañado o sobrescrito es el comportamiento esperado, no un defecto.',
    sec4Title: 'Cómo solicitar un reembolso',
    sec4Li1: 'Envía un correo electrónico a <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> con el asunto: <strong>&quot;Solicitud de Reembolso — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Incluye tu <strong>correo de confirmación de pedido</strong> o <strong>clave de licencia</strong> para verificación.',
    sec4Li3: 'Adjunta una <strong>captura de pantalla o grabación de pantalla</strong> que muestre claramente el problema que estás experimentando.',
    sec4Li4: 'Describe brevemente el problema y los pasos que realizaste antes de encontrarlo.',
    sec5Title: 'Tiempo de procesamiento',
    sec5Desc: 'Nuestro objetivo es revisar todas las solicitudes de reembolso en un plazo de <strong>3 días hábiles</strong>. Si se aprueba, el reembolso se procesará a tu método de pago original en un plazo de 5 a 10 días hábiles, según tu banco o proveedor de pago.',
    sec6Title: 'Notas importantes',
    sec6Li1: 'No se aceptarán solicitudes de reembolso enviadas <strong>después de 10 días</strong> desde la fecha de compra.',
    sec6Li2: 'Te recomendamos encarecidamente utilizar primero la <strong>Versión Gratuita</strong>: permite un escaneo ilimitado y vistas previas completas de los archivos para que puedas verificar que tus datos son recuperables <em>antes</em> de comprar una licencia Pro.',
    sec6Li3: 'Una vez aprobado el reembolso, tu clave de licencia será desactivada.',
    sec7Title: 'Contacto',
    sec7Desc: 'Para cualquier pregunta sobre esta política, escríbenos a '
  },
  pt: {
    title: 'Política de Reembolso | TheNexTools',
    description: 'Nossa política de reembolso para o NexData Recovery Pro e outros softwares pagos. Saiba como solicitar um reembolso e o que está coberto.',
    h1: 'Política de Reembolso',
    lastUpdated: 'Última atualização: 20 de maio de 2026',
    sec1Title: 'Visão Geral',
    sec1Desc: 'Se o NexData Recovery Pro não funcionar corretamente em seu sistema, você poderá solicitar um reembolso total. Apenas pedimos que você atenda às condições detalhadas abaixo.',
    sec2Title: 'Elegibilidade para Reembolso',
    sec2Desc: 'Para ser elegível para um reembolso, <strong>todas</strong> as seguintes condições devem ser atendidas:',
    sec2Li1: 'A solicitação de reembolso deve ser enviada <strong>dentro de 10 dias</strong> a partir da data de compra original.',
    sec2Li2: 'Você deve fornecer evidências claras de que o software está com defeito, como uma <strong>captura de tela ou gravação de tela</strong> mostrando o erro ou falha.',
    sec2Li3: 'O problema deve ser um defeito genuíno do software — não uma limitação inerente da tecnologia de recuperação de dados (veja as exclusões abaixo).',
    sec3Title: 'O que NÃO é elegível para reembolso',
    sec3Desc: 'A recuperação depende da condição física da sua unidade. Estas situações <strong>não</strong> são bugs de software e <strong>não</strong> são cobertas pela nossa política de reembolso:',
    sec3Li1: '<strong>Dados substituídos:</strong> Quando novos dados são gravados nos mesmos setores do disco após a exclusão, os arquivos originais são destruídos permanentemente. Nenhum software pode recuperar dados substituídos.',
    sec3Li2: '<strong>Unidades danificadas fisicamente:</strong> Se o dispositivo de armazenamento tiver danos físicos (por exemplo, falha mecânica de cabeçote, danos causados por água, circuitos queimados), a recuperação baseada em software não poderá acessar a mídia. Isso requer serviços profissionais de laboratório.',
    sec3Li3: '<strong>Arquivos muito fragmentados:</strong> Arquivos grandes (especialmente vídeos) que foram armazenados em setores de disco não contíguos podem ser parcialmente recuperados, mas não totalmente reproduzíveis. Esta é uma limitação fundamental da reconstrução de arquivos, não um bug do software.',
    sec3Li4: '<strong>Volumes criptografados sem a chave:</strong> Se a senha de criptografia original ou a chave de recuperação for perdida, os dados não poderão ser descriptografados por nenhuma ferramenta.',
    sec3Li5: '<strong>Dados apagados por TRIM em SSD:</strong> SSDs modernos com TRIM ativado apagam permanentemente os blocos excluídos no nível de hardware. Assim que o TRIM for executado, os dados desaparecerão fisicamente.',
    sec3Li6: '<strong>Formatos de arquivo não suportados:</strong> NexData recupera arquivos correspondendo a assinaturas binárias conhecidas. Formatos proprietários ou extremamente raros podem não ser suportados.',
    sec3Li7: '<strong>Resultados de recuperação parciais ou corrompidos:</strong> Os arquivos recuperados podem nem sempre estar 100% intactos. A recuperação parcial de alguns arquivos de um disco danificado ou substituído é o comportamento esperado, não um defeito.',
    sec4Title: 'Como solicitar um reembolso',
    sec4Li1: 'Envie um e-mail para <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> com o assunto: <strong>&quot;Solicitação de Reembolso — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Inclua o seu <strong>e-mail de confirmação do pedido</strong> ou <strong>chave de licença</strong> para verificação.',
    sec4Li3: 'Anexe uma <strong>captura de tela ou gravação de tela</strong> mostrando claramente o problema que você está enfrentando.',
    sec4Li4: 'Descreva brevemente o problema e as etapas que você seguiu antes de encontrá-lo.',
    sec5Title: 'Tempo de Processamento',
    sec5Desc: 'Nosso objetivo é analisar todas as solicitações de reembolso em até <strong>3 dias úteis</strong>. Se aprovado, o reembolso será processado para o seu método de pagamento original dentro de 5 a 10 dias úteis, dependendo do seu banco ou provedor de pagamento.',
    sec6Title: 'Notas importantes',
    sec6Li1: 'Solicitações de reembolso enviadas <strong>após 10 dias</strong> a partir da data de compra não serão aceitas.',
    sec6Li2: 'Recomendamos fortemente que você use a <strong>Versão Gratuita</strong> primeiro — ela permite varredura ilimitada e pré-visualizações completas dos arquivos para que você possa verificar se seus dados são recuperáveis <em>antes</em> de comprar uma licença Pro.',
    sec6Li3: 'Após a aprovação do reembolso, sua chave de licença será desativa.',
    sec7Title: 'Contato',
    sec7Desc: 'Para qualquer dúvida sobre esta política, entre em contato conosco pelo e-mail '
  },
  sw: {
    title: 'Sera ya Urejeshaji Fedha | TheNexTools',
    description: 'Sera yetu ya urejeshaji fedha kwa NexData Recovery Pro na programu zingine za kulipia. Jifunze jinsi ya kuomba urejeshaji fedha na kile kinacholindwa.',
    h1: 'Sera ya Urejeshaji Fedha',
    lastUpdated: 'Ilisasishwa mwisho: Mei 20, 2026',
    sec1Title: 'Maelezo ya Jumla',
    sec1Desc: 'Ikiwa NexData Recovery Pro haifanyi kazi vizuri kwenye mfumo wako, unaweza kuomba urejeshaji kamili wa fedha. Tunaomba tu utimize masharti yaliyotajwa hapa chini.',
    sec2Title: 'Vigezo vya Urejeshaji Fedha',
    sec2Desc: 'Ili ustahili kurejeshewa fedha, masharti <strong>yote</strong> yafuatayo lazima yatimizwe:',
    sec2Li1: 'Ombi la urejeshaji fedha linatumwa <strong>ndani ya siku 10</strong> tangu tarehe ya ununuzi wa awali.',
    sec2Li2: 'Unatoa ushahidi wazi kwamba programu haifanyi kazi vizuri, kama vile <strong>picha ya skrini au kurekodi skrini</strong> inayoonyesha hitilafu au kufeli.',
    sec2Li3: 'Tatizo ni hitilafu halisi ya programu, sio ukomo wa asili wa teknolojia ya kurejesha data (angalia vizuizi hapa chini).',
    sec3Title: 'Kile ambacho HAKISTAHILI kurejeshewa fedha',
    sec3Desc: 'Urejeshaji unategemea hali halisi ya diski yako. Hali hizi <strong>sio</strong> hitilafu za programu na <strong>hazijalindwa</strong> na sera yetu ya urejeshaji fedha:',
    sec3Li1: '<strong>Data iliyoandikwa juu yake:</strong> Mara tu data mpya inapoandikwa kwenye sekta zilezile za diski baada ya kufutwa, faili asili zinaharibiwa kabisa. Hakuna programu inayoweza kurejesha data iliyoandikwa juu yake.',
    sec3Li2: '<strong>Diski zilizoharibika kimwili:</strong> Ikiwa kifaa cha kuhifadhia kina uharibifu wa kimwili (kwa mfano, kichwa kilichoharibika, uharibifu wa maji, mizunguko iliyochomwa), urejeshaji wa programu hauwezi kufikia kifaa. Hiyo inahitaji huduma za kitaalamu za maabara.',
    sec3Li3: '<strong>Faili zilizogawanyika sana:</strong> Faili kubwa (hasa video) ambazo zilihifadhiwa kwenye sekta zisizo mfululizo za diski zinaweza kurejeshwa kwa sehemu lakini zisicheze kikamilifu. Hii ni ukomo wa kimsingi wa uundaji upya vya faili, sio hitilafu ya programu.',
    sec3Li4: '<strong>Diski zilizosimbwa bila ufunguo:</strong> Ikiwa nenosiri la awali la usimbaji au ufunguo wa urejeshaji umepotea, hakuna zana inayoweza kufungua data.',
    sec3Li5: '<strong>Data iliyofutwa na TRIM kwenye SSD:</strong> SSD za kisasa zilizo na TRIM iliyowezeshwa zinafuta kabisa vitalu vilivyofutwa katika kiwango cha vifaa. Mara tu TRIM inapoendeshwa, data inapotea kimwili.',
    sec3Li6: '<strong>Aina za faili zisizosaidiwa:</strong> NexData inarejesha faili kwa kulinganisha sahihi saini za binary zinazojulikana. Aina za faili za wamiliki au zisizo za kawaida zinaweza zisisaidiwe.',
    sec3Li7: '<strong>Matokeo ya urejeshaji ya sehemu au yaliyoharibika:</strong> Faili zilizorejeshwa sio kila wakati zinakuwa 100% sawa. Urejeshaji wa sehemu ya baadhi ya faili kutoka kwa diski iliyoharibika au iliyoandikwa juu yake ni tabia inayotarajiwa, sio hitilafu.',
    sec4Title: 'Jinsi ya kuomba urejeshaji fedha',
    sec4Li1: 'Tuma barua pepe kwa <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> ukiwa na mada: <strong>&quot;Ombi la Urejeshaji Fedha — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Jumuisha <strong>barua pepe yako ya kuthibitisha agizo</strong> au <strong>ufunguo wa leseni</strong> kwa uhakiki.',
    sec4Li3: 'Ambatanisha <strong>picha ya skrini au kurekodi skrini</strong> inayoonyesha wazi tatizo unalokumbana nalo.',
    sec4Li4: 'Eleza kwa kifupi tatizo na hatua ulizochukua kabla ya kulipata.',
    sec5Title: 'Muda wa kushughulikia',
    sec5Desc: 'Lengo letu ni kupitia maombi yote ya kurejesha fedha ndani ya <strong>siku 3 za kazi</strong>. Ikiidhinishwa, urejeshaji fedha utashughulikiwa kwenye njia yako ya malipo ya awali ndani ya siku 5 hadi 10 za kazi, kulingana na benki yako au mtoa huduma wa malipo.',
    sec6Title: 'Ujumbe muhimu',
    sec6Li1: 'Maombi ya urejeshaji fedha yaliyotumwa <strong>baada ya siku 10</strong> tangu tarehe ya ununuzi hayatakubaliwa.',
    sec6Li2: 'Tunakupendekezea sana kutumia <strong>Toleo la Bure</strong> kwanza: inaruhusu utafutaji usio na kikomo na hakikisho kamili la faili ili uweze kuthibitisha kuwa data yako inaweza kurejesha <em>kabla</em> ya kununua leseni ya Pro.',
    sec6Li3: 'Mara tu ombi la kurejesha fedha linapoidhinishwa, ufunguo wako wa leseni utazimwa.',
    sec7Title: 'Wasiliana Nasi',
    sec7Desc: 'Kwa maswali yoyote kuhusu sera hii, tuandikie kwa '
  },
  bn: {
    title: 'রিফান্ড পলিসি | TheNexTools',
    description: 'NexData Recovery Pro এবং অন্যান্য পেইড সফটওয়্যারের জন্য আমাদের রিফান্ড পলিসি। কীভাবে রিফান্ড অনুরোধ করবেন এবং কী কী এর আওতাভুক্ত তা জানুন।',
    h1: 'রিফান্ড পলিসি',
    lastUpdated: 'সর্বশেষ আপডেট: ২০ মে, ২০২৬',
    sec1Title: 'সাধারণ বিবরণ',
    sec1Desc: 'যদি NexData Recovery Pro আপনার সিস্টেমে সঠিকভাবে কাজ না করে, তবে আপনি সম্পূর্ণ রিফান্ডের অনুরোধ করতে পারেন। আমরা কেবল অনুরোধ করি যে আপনি নিচে বর্ণিত শর্তাবলী পূরণ করুন।',
    sec2Title: 'রিফান্ডের যোগ্যতা',
    sec2Desc: 'রিফান্ডের জন্য যোগ্য হতে হলে নিচের <strong>সবগুলো</strong> শর্ত পূরণ করতে হবে:',
    sec2Li1: 'রিফান্ড অনুরোধ মূল ক্রয়ের তারিখ থেকে <strong>১০ দিনের মধ্যে</strong> পাঠাতে হবে।',
    sec2Li2: 'সফটওয়্যারটি যে সঠিকভাবে কাজ করছে না তার স্পষ্ট প্রমাণ দিতে হবে, যেমন একটি <strong>স্ক্রিনশট বা স্ক্রিন রেকর্ডিং</strong> যা ত্রুটি বা ক্র্যাশ দেখায়।',
    sec2Li3: 'সমস্যাটি সফটওয়্যারের আসল ত্রুটি হতে হবে, ডেটা রিকভারি প্রযুক্তির স্বাভাবিক সীমাবদ্ধতা নয় (নিচে বর্জনীয় তালিকা দেখুন)।',
    sec3Title: 'যা রিফান্ডের যোগ্য নয়',
    sec3Desc: 'রিকভারি মূলত আপনার ড্রাইভের ফিজিক্যাল অবস্থার ওপর নির্ভর করে। এই পরিস্থিতিগুলো সফটওয়্যারের কোনো বাগ <strong>নয়</strong> এবং আমাদের রিফান্ড পলিসির আওতায় পড়ে <strong>না</strong>:',
    sec3Li1: '<strong>ওভাররাইট হওয়া ডেটা:</strong> ফাইল ডিলিট হওয়ার পর ড্রাইভে নতুন ডেটা লেখা হলে আগের ফাইল চিরতরে মুছে যায়। কোনো সফটওয়্যারই তা উদ্ধার করতে পারে না।',
    sec3Li2: '<strong>শারীরিকভাবে ক্ষতিগ্রস্ত ড্রাইভ:</strong> ড্রাইভ ফিজিক্যালি ড্যামেজ থাকলে সফটওয়্যার দিয়ে তা স্ক্যান করা সম্ভব নয়। এর জন্য ল্যাব সার্ভিসের প্রয়োজন হয়।',
    sec3Li3: '<strong>অত্যধিক ফ্র্যাগমেন্টেড ফাইল:</strong> বড় ফাইল (বিশেষ করে ভিডিও) ড্রাইভের বিভিন্ন জায়গায় ছড়িয়ে থাকলে রিকভারির পর আংশিক ফাইল প্লে নাও হতে পারে। এটি প্রযুক্তির সীমাবদ্ধতা।',
    sec3Li4: '<strong>পাসওয়ার্ড ছাড়া এনক্রিপ্ট করা ফাইল:</strong> মূল এনক্রিপশন পাসওয়ার্ড বা রিকভারি কি হারিয়ে গেলে ফাইল ডিক্রিপ্ট করা সম্ভব নয়।',
    sec3Li5: '<strong>SSD-তে TRIM দ্বারা মুছে ফেলা ডেটা:</strong> TRIM চালিত এসএসডি ফাইল ডিলিট হওয়ার পর হার্ডওয়্যার লেভেলে ডেটা সম্পূর্ণ মুছে দেয়।',
    sec3Li6: '<strong>অসমর্থিত ফাইল ফরম্যাট:</strong> NexData পরিচিত বাইনারি সিগনেচার দেখে ফাইল চেনে। অত্যন্ত বিরল বা কাস্টম ফাইল ফরম্যাট সাপোর্ট নাও করতে পারে।',
    sec3Li7: '<strong>আংশিক বা নষ্ট ফাইল উদ্ধার:</strong> ক্ষতিগ্রস্ত বা ওভাররাইট ড্রাইভ থেকে আংশিক ফাইল রিকভার হওয়াই স্বাভাবিক নিয়ম, এটি সফটওয়্যারের ত্রুটি নয়।',
    sec4Title: 'কীভাবে রিফান্ড অনুরোধ করবেন',
    sec4Li1: 'নিম্নোক্ত বিষয় (Subject) লিখে <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a>-এ ইমেল করুন: <strong>&quot;Refund Request — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'যাচাইকরণের জন্য আপনার <strong>অর্ডার কনফার্মেশন ইমেইল</strong> বা <strong>লাইসেন্স কি</strong> প্রদান করুন।',
    sec4Li3: 'যে समस्याটির সম্মুখীন হচ্ছেন তার একটি স্পষ্ট <strong>স্ক্রিনশট বা স্ক্রিন রেকর্ডিং</strong> যুক্ত করুন।',
    sec4Li4: 'সমস্যাটি এবং এটি ঘটার আগের ধাপগুলো সংক্ষেপে বর্ণনা করুন।',
    sec5Title: 'প্রসেসিং এর সময়সীমা',
    sec5Desc: 'আমরা সাধারণত <strong>৩ কার্যদিবসের</strong> মধ্যে সব রিফান্ড অনুরোধ পর্যালোচনা করে থাকি। অনুমোদিত হলে, আপনার ব্যাংক বা পেমেন্ট গেটওয়ের নিয়ম অনুযায়ী ৫ থেকে ১০ কার্যদিবসের মধ্যে মূল পেমেন্ট মাধ্যমে টাকা ফেরত দেওয়া হবে।',
    sec6Title: 'গুরুত্বপূর্ণ নোট',
    sec6Li1: 'ক্রয়ের <strong>১০ দিন পার হয়ে যাওয়ার পর</strong> পাঠানো কোনো রিফান্ড অনুরোধ গ্রহণযোগ্য হবে না।',
    sec6Li2: 'আমরা দৃঢ়ভাবে সুপারিশ করি প্রথমে <strong>ফ্রি সংস্করণ</strong> ব্যবহার করার: এটি দিয়ে সীমাহীন স্ক্যান ও ফাইলের প্রিভিউ দেখা যায়, যাতে কেনার <em>আগেই</em> আপনি নিশ্চিত হতে পারেন আপনার ফাইল উদ্ধার সম্ভব কিনা।',
    sec6Li3: 'রিফান্ড অনুমোদিত হওয়ার পর আপনার লাইসেন্স কি-টি নিষ্ক্রিয় করে দেওয়া হবে।',
    sec7Title: 'যোগাযোগ',
    sec7Desc: 'এই নীতি সম্পর্কে যেকোনো প্রশ্নের জন্য আমাদের লিখুন: '
  },
  de: {
    title: 'Rückerstattungsrichtlinie | TheNexTools',
    description: 'Unsere Rückerstattungsrichtlinie für NexData Recovery Pro und andere kostenpflichtige Software. Erfahren Sie, wie Sie eine Rückerstattung beantragen und was abgedeckt ist.',
    h1: 'Rückerstattungsrichtlinie',
    lastUpdated: 'Zuletzt aktualisiert: 20. Mai 2026',
    sec1Title: 'Allgemeiner Überblick',
    sec1Desc: 'Wenn NexData Recovery Pro auf Ihrem System nicht ordnungsgemäß funktioniert, können Sie eine vollständige Rückerstattung beantragen. Wir bitten Sie lediglich, die unten beschriebenen Bedingungen zu erfüllen.',
    sec2Title: 'Berechtigung für Rückerstattungen',
    sec2Desc: 'Um für eine Rückerstattung berechtigt zu sein, müssen <strong>alle</strong> folgenden Bedingungen erfüllt sein:',
    sec2Li1: 'Der Rückerstattungsantrag wird <strong>innerhalb von 10 Tagen</strong> nach dem ursprünglichen Kaufdatum eingereicht.',
    sec2Li2: 'Sie legen eindeutige Beweise dafür vor, dass die Software nicht ordnungsgemäß funktioniert, z. B. einen <strong>Screenshot oder eine Bildschirmaufnahme</strong>, die den Fehler oder Absturz zeigt.',
    sec2Li3: 'Das Problem ist ein tatsächlicher Softwarefehler, keine inhärente Einschränkung der Datenrettungstechnologie (siehe Ausschlüsse unten).',
    sec3Title: 'Was NICHT für eine Rückerstattung berechtigt ist',
    sec3Desc: 'Die Wiederherstellung hängt vom physischen Zustand Ihres Laufwerks ab. Diese Situationen sind <strong>keine</strong> Softwarefehler und werden <strong>nicht</strong> von unserer Rückerstattungsrichtlinie abgedeckt:',
    sec3Li1: '<strong>Überschriebene Daten:</strong> Wenn nach dem Löschen neue Daten in dieselben physischen Sektoren geschrieben wurden, sind die Originaldateien dauerhaft zerstört. Keine Software kann überschriebene Daten wiederherstellen.',
    sec3Li2: '<strong>Physisch beschädigte Laufwerke:</strong> Wenn das Speichergerät physisch beschädigt ist (z. B. defekter Schreib-/Lesekopf, Wasserschaden, verbrannte Schaltkreise), kann softwarebasierte Datenrettung nicht auf das Medium zugreifen. Dies erfordert professionelle Labordienstleistungen.',
    sec3Li3: '<strong>Stark fragmentierte Dateien:</strong> Große Dateien (insbesondere Videos), die in nicht zusammenhängenden Sektoren gespeichert wurden, können zwar teilweise wiederhergestellt, aber nicht vollständig abgespielt werden. Dies ist eine grundlegende technologische Einschränkung, kein Softwarefehler.',
    sec3Li4: '<strong>Verschlüsselte Volumes ohne Schlüssel:</strong> Wenn das ursprüngliche Verschlüsselungspasswort oder der Wiederherstellungsschlüssel verloren geht, können die Daten mit keinem Werkzeug entschlüsselt werden.',
    sec3Li5: '<strong>Durch TRIM gelöschte SSD-Daten:</strong> Moderne SSDs mit aktiviertem TRIM löschen gelöschte Blöcke dauerhaft auf Hardwareebene. Sobald TRIM ausgeführt wurde, sind die Daten physisch verschwunden.',
    sec3Li6: '<strong>Nicht unterstützte Dateiformate:</strong> NexData stellt Dateien wieder her, indem es bekannte binäre Signaturen abgleicht. Proprietäre oder extrem seltene Formate werden möglicherweise nicht unterstützt.',
    sec3Li7: '<strong>Teilweise oder beschädigte Wiederherstellungsergebnisse:</strong> Wiederhergestellte Dateien sind nicht immer zu 100 % intakt. Eine teilweise Wiederherstellung einiger Dateien von einer beschädigten oder überschriebenen Festplatte ist das erwartete Verhalten, kein Defekt.',
    sec4Title: 'So beantragen Sie eine Rückerstattung',
    sec4Li1: 'Senden Sie eine E-Mail an <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> mit dem Betreff: <strong>&quot;Rückerstattungsantrag — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Fügen Sie Ihre <strong>Bestellbestätigung</strong> oder Ihren <strong>Lizenzschlüssel</strong> zur Überprüfung bei.',
    sec4Li3: 'Hängen Sie einen <strong>Screenshot oder eine Bildschirmaufnahme</strong> an, die das Problem, das Sie haben, deutlich zeigt.',
    sec4Li4: 'Beschreiben Sie kurz das Problem und die Schritte, die Sie vor dem Auftreten des Problems durchgeführt haben.',
    sec5Title: 'Bearbeitungszeit',
    sec5Desc: 'Unser Ziel ist es, alle Rückerstattungsanträge innerhalb von <strong>3 Werktagen</strong> zu prüfen. Wenn dem Antrag stattgegeben wird, wird die Rückerstattung innerhalb von 5 bis 10 Werktagen auf Ihre ursprüngliche Zahlungsmethode zurückgebucht, abhängig von Ihrer Bank.',
    sec6Title: 'Wichtige Hinweise',
    sec6Li1: 'Rückerstattungsanträge, die <strong>später als 10 Tage</strong> nach dem Kaufdatum eingehen, werden nicht akzeptiert.',
    sec6Li2: 'Wir empfehlen Ihnen dringend, zuerst die <strong>kostenlose Version</strong> zu verwenden: Sie ermöglicht unbegrenztes Scannen und vollständige Dateivorschauen, sodass Sie vor dem Kauf einer Pro-Lizenz prüfen können, ob Ihre Daten rettbar sind.',
    sec6Li3: 'Sobald die Rückerstattung genehmigt wurde, wird Ihr Lizenzschlüssel deaktiviert.',
    sec7Title: 'Kontakt',
    sec7Desc: 'Bei Fragen zu dieser Richtlinie schreiben Sie uns an '
  },
  nl: {
    title: 'Terugbetalingsbeleid | TheNexTools',
    description: 'Ons terugbetalingsbeleid voor NexData Recovery Pro en andere betaalde software. Lees hoe u een terugbetaling aanvraagt en wat gedekt is.',
    h1: 'Terugbetalingsbeleid',
    lastUpdated: 'Laatst bijgewerkt: 20 mei 2026',
    sec1Title: 'Algemeen Overzicht',
    sec1Desc: 'Als NexData Recovery Pro niet correct werkt op uw systeem, kunt u een volledige terugbetaling aanvragen. We vragen u alleen te voldoen aan de hieronder beschreven voorwaarden.',
    sec2Title: 'Geschiktheid voor Terugbetaling',
    sec2Desc: 'Om in aanmerking te komen voor een terugbetaling, moet aan <strong>alle</strong> volgende voorwaarden worden voldaan:',
    sec2Li1: 'Het terugbetalingsverzoek wordt ingediend <strong>binnen 10 dagen</strong> na de oorspronkelijke aankoopdatum.',
    sec2Li2: 'U levert duidelijk bewijs dat de software niet goed werkt, zoals een <strong>screenshot of schermopname</strong> die de fout of crash toont.',
    sec2Li3: 'Het probleem is een werkelijke softwarefout, geen inherente beperking van datahersteltechnologie (zie uitsluitingen hieronder).',
    sec3Title: 'Wat NIET in aanmerking komt voor terugbetaling',
    sec3Desc: 'Herstel is afhankelijk van de fysieke staat van uw schijf. Deze situaties zijn <strong>geen</strong> softwarefouten en worden <strong>niet</strong> gedekt door ons terugbetalingsbeleid:',
    sec3Li1: '<strong>Overschreven gegevens:</strong> Wanneer er na verwijdering nieuwe gegevens naar dezelfde fysieke sectoren zijn geschreven, zijn de originele bestanden permanent vernietigd. Geen enkele software kan overschreven gegevens herstellen.',
    sec3Li2: '<strong>Fysiek beschadigde schijven:</strong> Als het opslagapparaat fysieke schade heeft (bijv. defecte lees-/schrijfkop, waterschade, doorgebrande circuits), heeft softwarematige herstel geen toegang tot de media. Dit vereist professionele laboratoriumdiensten.',
    sec3Li3: '<strong>Sterk gefragmenteerde bestanden:</strong> Grote bestanden (vooral video\'s) die in niet-aaneengesloten sectoren zijn opgeslagen, kunnen gedeeltelijk worden hersteld, maar niet volledig worden afgespeeld. Dit is een technologische beperking, geen softwarefout.',
    sec3Li4: '<strong>Gecodeerde volumes zonder sleutel:</strong> Als het oorspronkelijke encryptiewachtwoord of de herstelsleutel verloren is gegaan, kunnen de gegevens met geen enkele tool worden gedecodeerd.',
    sec3Li5: '<strong>Door TRIM verwijderde SSD-gegevens:</strong> Moderne SSD\'s met geactiveerd TRIM wissen verwijderde blokken permanent op hardwareniveau. Zodra TRIM is uitgevoerd, zijn de gegevens fysiek verdwenen.',
    sec3Li6: '<strong>Niet-ondersteunde bestandsformaten:</strong> NexData herstelt bestanden door bekende binaire handtekeningen te vergelijken. Eigen of extreem zeldzame formaten worden mogelijk niet ondersteund.',
    sec3Li7: '<strong>Gedeeltelijke of beschadigde herstelresultaten:</strong> Herstelde bestanden zijn niet altijd 100% intact. Gedeeltelijk herstel van sommige bestanden van een beschadigde of overschreven schijf is het verwachte gedrag, geen defect.',
    sec4Title: 'Hoe een terugbetaling aanvragen',
    sec4Li1: 'Stuur een e-mail naar <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> met het onderwerp: <strong>&quot;Terugbetalingsverzoek — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Voeg uw <strong>bestelbevestiging</strong> of <strong>licentiesleutel</strong> toe voor verificatie.',
    sec4Li3: 'Voeg een <strong>screenshot of schermopname</strong> toe die het probleem dat u ervaart duidelijk laat zien.',
    sec4Li4: 'Beschrijf kort het probleem en de stappen die u heeft genomen voordat het probleem optrad.',
    sec5Title: 'Verwerkingstijd',
    sec5Desc: 'We streven ernaar om alle terugbetalingsverzoeken binnen <strong>3 werkdagen</strong> te beoordelen. Indien goedgekeurd, wordt de terugbetaling binnen 5 tot 10 werkdagen verwerkt naar uw oorspronkelijke betaalmethode, afhankelijk van uw bank.',
    sec6Title: 'Belangrijke Opmerkingen',
    sec6Li1: 'Terugbetalingsverzoeken die <strong>later dan 10 dagen</strong> na de aankoopdatum worden ingediend, worden niet geaccepteerd.',
    sec6Li2: 'We raden u ten zeerste aan om eerst de <strong>gratis versie</strong> te gebruiken: deze maakt onbeperkt scannen en volledige bestandsvoorbeelden mogelijk, zodat u kunt controleren of uw gegevens herstelbaar zijn voordat u een Pro-licentie koopt.',
    sec6Li3: 'Zodra de terugbetaling is goedgekeurd, wordt uw licentiesleutel gedeactiveerd.',
    sec7Title: 'Contact',
    sec7Desc: 'Voor eventuele vragen over dit beleid kunt u ons schrijven op '
  },
  it: {
    title: 'Politica di Rimborso | TheNexTools',
    description: 'La nostra politica di rimborso per NexData Recovery Pro e altri software a pagamento. Scopri come richiedere un rimborso e cosa è coperto.',
    h1: 'Politica di Rimborso',
    lastUpdated: 'Ultimo aggiornamento: 20 maggio 2026',
    sec1Title: 'Panoramica Generale',
    sec1Desc: 'Se NexData Recovery Pro non funziona correttamente sul tuo sistema, puoi richiedere un rimborso completo. Ti chiediamo solo di soddisfare le condizioni dettagliate di seguito.',
    sec2Title: 'Idoneità al Rimborso',
    sec2Desc: 'Per essere idonei a un rimborso, devono essere soddisfatte <strong>tutte</strong> le seguenti condizioni:',
    sec2Li1: 'La richiesta di rimborso deve essere inviata <strong>entro 10 giorni</strong> dalla data di acquisto originale.',
    sec2Li2: 'Fornisci una prova evidente che il software non funziona correttamente, ad esempio uno <strong>screenshot o una registrazione dello schermo</strong> che mostri l\'errore o il crash.',
    sec2Li3: 'Il problema deve essere un difetto reale del software, non una limitazione intrinseca della tecnologia di recupero dati (vedi le esclusioni di seguito).',
    sec3Title: 'Cosa NON è idoneo al rimborso',
    sec3Desc: 'Il recupero dipende dallo stato fisico della tua unità. Queste situazioni <strong>non</strong> sono bug del software e <strong>non</strong> sono coperte dalla nostra politica di rimborso:',
    sec3Li1: '<strong>Dati sovrascritti:</strong> Quando nuovi dati vengono scritti sui medesimi settori del disco dopo l\'eliminazione, i file originali vengono distrutti in modo permanente. Nessun software può recuperare dati sovrascritti.',
    sec3Li2: '<strong>Unità danneggiate fisicamente:</strong> Se il dispositivo di archiviazione presenta danni fisici (ad esempio, guasto meccanico della testina, danni causati da acqua, circuiti bruciati), il recupero basato su software non può accedere al supporto. Ciò richiede servizi di laboratorio professionali.',
    sec3Li3: '<strong>File molto frammentati:</strong> I file di grandi dimensioni (specialmente i video) che sono stati memorizzati in settori non contigui del disco possono essere recuperati parzialmente ma non riprodotti del tutto. Questa è una limitazione fondamentale della ricostruzione dei file, non un bug del software.',
    sec3Li4: '<strong>Volumi crittografati senza chiave:</strong> Se la password di crittografia originale o la chiave di recupero vengono perse, i dati non possono essere decrittografati da alcuno strumento.',
    sec3Li5: '<strong>Dati eliminati dal TRIM su SSD:</strong> I moderni SSD con TRIM abilitato cancellano permanentemente i blocchi eliminati a livello hardware. Una volta eseguito il TRIM, i dati sono fisicamente scomparsi.',
    sec3Li6: '<strong>Formati di file non supportati:</strong> NexData recupera i file confrontando firme binarie note. Formati proprietari o estremamente rari potrebbero non essere supportati.',
    sec3Li7: '<strong>Risultati di recupero parziali o corrotti:</strong> I file recuperati non sono sempre intatti al 100%. Il recupero parziale di alcuni file da un disco danneggiato o sovrascritto è il comportamento previsto, non un difetto.',
    sec4Title: 'Come richiedere un rimborso',
    sec4Li1: 'Invia un\'email a <a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a> con oggetto: <strong>&quot;Richiesta di Rimborso — NexData Recovery Pro&quot;</strong>',
    sec4Li2: 'Includi la tua <strong>email di conferma dell\'ordine</strong> o la <strong>chiave di licenza</strong> per la verifica.',
    sec4Li3: 'Allega uno <strong>screenshot o una registrazione dello schermo</strong> che mostri chiaramente il problema riscontrato.',
    sec4Li4: 'Descrivi brevemente il problema e i passaggi eseguiti prima di riscontrarlo.',
    sec5Title: 'Tempi di elaborazione',
    sec5Desc: 'Il nostro obiettivo è esaminare tutte le richieste di rimborso entro <strong>3 giorni lavorativi</strong>. Se approvato, il rimborso verrà accreditato sul metodo di pagamento originale entro 5-10 giorni lavorativi, a seconda della banca o del fornitore di servizi di pagamento.',
    sec6Title: 'Note importanti',
    sec6Li1: 'Non saranno accettate richieste di rimborso inviate <strong>dopo 10 giorni</strong> dalla data di acquisto.',
    sec6Li2: 'Ti consigliamo vivamente di utilizzare prima la <strong>Versione Gratuita</strong>: consente scansioni illimitate e anteprime complete dei file in modo da poter verificare che i dati siano recuperabili <em>prima</em> di acquistare una licenza Pro.',
    sec6Li3: 'Una volta approvato il rimborso, la tua chiave di licenza verrà disattivata.',
    sec7Title: 'Contatti',
    sec7Desc: 'Per qualsiasi domanda su questa politica, scrivici a '
  },
  ja: {
    title: '返金ポリシー | TheNexTools',
    description: 'NexData Recovery Proおよびその他の有料ソフトウェアに関する返金ポリシー。返金リクエストの方法と適用範囲について説明します。',
    h1: '返金ポリシー',
    lastUpdated: '最終更新日: 2026年5月20日',
    sec1Title: '概要',
    sec1Desc: 'NexData Recovery Proがシステム上で正常に動作しない場合、全額返金をリクエストできます。以下の条件を満たしていることをご確認ください。',
    sec2Title: '返金の対象条件',
    sec2Desc: '返金の対象となるには、以下の条件を<strong>すべて</strong>満たす必要があります。',
    sec2Li1: '購入日から<strong>10日以内</strong>に返金リクエストが送信されていること。',
    sec2Li2: 'ソフトウェアが正常に動作しない明確な証拠（エラーやクラッシュを示す<strong>スクリーンショットまたは画面録画</strong>）を提供すること。',
    sec2Li3: '問題がデータ復元技術の限界ではなく、ソフトウェア自体の不具合であること（以下の除外事項を参照）。',
    sec3Title: '返金対象外となる事例',
    sec3Desc: 'データ復元はドライブ of 物理的な状態に依存します。以下の状況はソフトウェアの不具合ではなく、返金ポリシーの<strong>対象外</strong>となります。',
    sec3Li1: '<strong>データの上書き:</strong> 削除後に新しいデータが書き込まれた場合、元のデータは破壊されます。いかなるソフトでも復元できません。',
    sec3Li2: '<strong>物理的破損:</strong> ドライブの物理的な故障（ヘッド破損、水没、回路の焼損など）は、専門の復元ラボでの対応が必要です。',
    sec3Li3: '<strong>断片化されたファイル:</strong> 不連続なセクタに保存されていた大きなファイル（特にビデオ）は、修復しても再生できない場合があります。これは技術的限界です。',
    sec3Li4: '<strong>キーのない暗号化:</strong> 暗号化パスワードや回復キーを紛失した場合、データを復号することはできません。',
    sec3Li5: '<strong>TRIMによる削除:</strong> SSDでTRIMが実行された場合、データは物理的に消去されており復元不可能です。',
    sec3Li6: '<strong>未対応フォーマット:</strong> 極めて稀な、または独自のファイル形式はサポートされていない場合があります。',
    sec3Li7: '<strong>一部の破損や不完全な復元:</strong> 破損したドライブや上書きされたドライブから、一部のファイルのみが不完全な形で復元されるのは予測される動作であり、不具合ではありません。',
    sec4Title: '返金リクエストの手順',
    sec4Li1: '件名を<strong>「返金リクエスト — NexData Recovery Pro」</strong>として、<a href="mailto:contact@thenextools.com" style="color: var(--primary); font-weight: 600;">contact@thenextools.com</a>までメールをお送りください。',
    sec4Li2: '確認のため、<strong>注文確認メール</strong>または<strong>ライセンスキー</strong>を記載してください。',
    sec4Li3: '発生している問題を明確に示す<strong>スクリーンショットまたは画面録画</strong>を添付してください。',
    sec4Li4: '発生した問題と、問題が発生するまでに行った操作について簡潔に説明してください。',
    sec5Title: '処理にかかる時間',
    sec5Desc: 'すべての返金リクエストは<strong>3営業日</strong>以内に審査されます。承認された場合、銀行や決済機関の処理に基づき、5〜10営業日以内にお支払い方法へ返金されます。',
    sec6Title: '重要事項',
    sec6Li1: '購入から<strong>10日を経過</strong>した返金リクエストは受け付けられません。',
    sec6Li2: 'Proライセンスを購入する<em>前に</em>、まず<strong>無料版</strong>をお試しいただくことを強くお勧めします。無料版では無制限のスキャンとプレビューにより、復元可能かどうかを事前に確認できます。',
    sec6Li3: '返金が承認されると、ライセンスキーは無効化されます。',
    sec7Title: 'お問い合わせ',
    sec7Desc: '本ポリシーに関するご質問は、以下までご連絡ください: '
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
      canonical: `/${lang}/refund-policy`,
      languages: {
        ...locales.reduce((acc, l) => {
          acc[l] = l === 'en' ? '/refund-policy' : `/${l}/refund-policy`;
          return acc;
        }, {}),
        'x-default': '/refund-policy',
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

export default async function RefundPolicyPage({ params }) {
  const resolvedParams = await params;
  const { lang } = resolvedParams || {};
  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;

  return (
    <main className="container" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '6rem', maxWidth: '800px' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1>{t.h1}</h1>
        <p className="text-muted">{t.lastUpdated}</p>
      </header>

      <section className="text-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>{t.sec1Title}</h3>
          <p>{t.sec1Desc}</p>
        </div>

        <div>
          <h3>{t.sec2Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec2Desc }} />
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec2Li3 }} />
          </ol>
        </div>

        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚠️</span> {t.sec3Title}
          </h3>
          <p style={{ marginBottom: '1rem' }}>{t.sec3Desc}</p>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li3 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li4 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li5 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li6 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec3Li7 }} />
          </ul>
        </div>

        <div>
          <h3>{t.sec4Title}</h3>
          <ol style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li3 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec4Li4 }} />
          </ol>
        </div>

        <div>
          <h3>{t.sec5Title}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.sec5Desc }} />
        </div>

        <div>
          <h3>{t.sec6Title}</h3>
          <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            <li dangerouslySetInnerHTML={{ __html: t.sec6Li1 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec6Li2 }} />
            <li dangerouslySetInnerHTML={{ __html: t.sec6Li3 }} />
          </ul>
        </div>

        <div>
          <h3>{t.sec7Title}</h3>
          <p>
            {t.sec7Desc}
            <a href="mailto:contact@thenextools.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact@thenextools.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
