(() => {
  'use strict';
  const D=window.DI_DATA;if(!D||!Array.isArray(D.clans))return;
  const profiles={
  "polar": {
    "populationLabel": "28.000–32.000 pessoas",
    "populationDetail": "Cerca de 22.000 em Kaendar e 6.000–10.000 nas terras externas dependentes.",
    "militaryLabel": "2.500–4.000 combatentes",
    "militaryDetail": "A defesa desesperada de Kaendar pode mobilizar até cerca de 5.500 pessoas, incluindo guardas, veteranos e trabalhadores armados.",
    "origin": "Os Polar descendem de Marv, Jokara, Loutes e outros sobreviventes antigos da Queda. A memória real perdeu-se, e a versão oficial passou a afirmar que seus ancestrais vieram dos céus para fixar a Raiz e ensinar permanência aos povos da superfície.",
    "territory": "Vivem em Kaendar e nas terras controladas ao redor do Rio Grande, da Garganta de Kaendar, dos campos de apoio, das aldeias dependentes, das rotas de sal e dos postos de vigia. O território reúne água, pedra, madeira, solo útil e passagens defensáveis.",
    "culture": "A cultura Polar transforma estabilidade em valor moral. Registos, promessas públicas, portões, ritos da Raiz e punições visíveis sustentam a ideia de que a ordem de Kaendar é necessária, mas também alimentam a crença de superioridade do clã.",
    "economy": "A riqueza nasce do controlo de sal, forjas, armas, armazenamento, pesca, tributos e passagem. Kaendar concentra produção, depósitos e rotas, tornando outros clãs dependentes da cidade mesmo quando a desprezam.",
    "wayOfLife": "A vida muda conforme os três anéis. O Anel Alto concentra poder e memória; o Médio sustenta ofícios, comércio e administração; o Baixo reúne trabalho pesado, cais, depósitos e maior vulnerabilidade. Todos crescem sob a presença constante da Dinastia.",
    "socialStructure": "A Dinastia governa ao lado do Conselho da Raiz e de uma burocracia de registos. Soberanas, conselheiros, Kaes, Calandrir, vigias, escribas, ferreiros e famílias dos anéis formam uma sociedade centralizada, desigual e capaz de mobilização rápida.",
    "food": "A alimentação combina grão-de-caule, raízes secas, peixe do Rio Grande, sal negro, caldos de vigia e pães densos. A comida também é política: pão distribuído, sal guardado e celeiros controlados ajudam a legitimar o poder.",
    "strengths": [
      "Muralhas, anéis e gargantas defensáveis.",
      "Logística, armazenamento e registos centralizados.",
      "Sal, forjas, armas e grande população urbana.",
      "Capacidade de resistir a cercos e reorganizar a cidade."
    ],
    "weaknesses": [
      "Arrogância institucional e crença na superioridade.",
      "Dependência da autoridade da Dinastia e do Conselho.",
      "Quarenta ciclos de paz reduziram experiência de guerra aberta.",
      "Desigualdade entre anéis e incapacidade de reconhecer o custo imposto aos outros clãs."
    ],
    "warRole": "A morte de Orionus deixa Kaendar sob as gêmeas e expõe as fissuras da Dinastia. Alyra tenta fabricar e controlar uma guerra; Kaelina procura preservar a cidade sem repetir o pai. As manipulações de Daryon e Ylvena transformam os Polar no centro político e moral do conflito.",
    "finalSituation": "Kaendar sobrevive ao ataque, mas a autoridade antiga é quebrada. Alyra perde títulos e é exilada; Daryon e Ylvena morrem; Kaelina suspende a autoridade executiva do Conselho, governa sozinha e reconstrói a cidade durante vinte ciclos."
  },
  "tondrar": {
    "populationLabel": "18.000–24.000 pessoas",
    "populationDetail": "Cerca de 9.000–12.000 em Khar-Tondr e o restante distribuído por vilas, poços e regiões secas.",
    "militaryLabel": "2.500–4.000 combatentes",
    "militaryDetail": "São muito perigosos na Garganta Seca, mas uma marcha prolongada fora de casa reduz drasticamente sua força sustentável.",
    "origin": "Descendem de grupos que se afastaram dos primeiros Polar antes da Dinastia, embora essa ligação tenha sido esquecida. A tradição Tondrar afirma que seus antepassados escolheram a terra onde a sede rachava a língua e aprenderam que nada é recebido sem custo.",
    "territory": "O clã ocupa a Garganta Seca, Khar-Tondr, poços isolados, cavernas, campos pobres, barro seco e antigas zonas de rio. A escassez de água organiza horários, defesa, comércio e religião.",
    "culture": "Cabeças raspadas, pinturas negras, ossos, tambores e ritos de sobrevivência não são desordem, mas linguagem social. O clã valoriza resistência, memória da fome, disciplina coletiva e a capacidade de suportar dor sem oferecer fraqueza ao inimigo.",
    "economy": "Produzem pigmentos, couro, tendões, minerais, pedras luminosas e bens adaptados à escassez. Cobram passagem por suas terras e dependem de comércio para água, grão, sal e materiais que a região não oferece.",
    "wayOfLife": "A rotina é organizada ao redor da busca de água, da conservação de alimento, dos túneis e dos sinais dos tambores. O afeto é duro, a infância é disciplinada e cada hábito precisa justificar o gasto de força ou recurso.",
    "socialStructure": "A Voz de Tondrar governa após sobreviver ao Círculo da Voz. Pintores sagrados, guardiões de poço, responsáveis por tambores e guerreiros de garganta sustentam uma sociedade coesa cuja legitimidade nasce da resistência demonstrada.",
    "food": "Comem carne seca, raízes resistentes, pequenos animais de garganta e preparações capazes de suportar calor e armazenamento. A água é sempre contabilizada, e oferecer ou negar bebida possui valor político.",
    "strengths": [
      "Defesa excepcional em gargantas, muralhas e túneis.",
      "Alta proporção de pessoas treinadas para lutar.",
      "Coesão cultural mantida por pintura, tambor e rito.",
      "Capacidade de sobreviver com poucos recursos."
    ],
    "weaknesses": [
      "Dependência de água externa e rotas de abastecimento.",
      "Desconfiança extrema que dificulta alianças duradouras.",
      "Culto à força pode transformar liderança em violência ritual.",
      "Campanhas longas e estratégia de campo aberto desgastam o clã."
    ],
    "warRole": "São incriminados pelas primeiras mortes e depois perdem a antiga Voz durante uma negociação sob a Lei do Portão. Kharvok assume após o círculo e entra na aliança movido por luto, humilhação e medo de que Kaendar possa apagar um povo e escrever outra versão dos fatos.",
    "finalSituation": "Kaelina revela publicamente a armação contra os Tondrar e desmonta a justificativa inicial da guerra. Quando Nynestra retira os Buldar, Kharvok fica isolado e o avanço perde força; o clã recua sem conquistar Kaendar, mas com a inocência política reconhecida."
  },
  "buldar": {
    "populationLabel": "35.000–45.000 pessoas",
    "populationDetail": "O clã mais populoso distribui-se por Nyn-Harad, campos centrais, aldeias, canais, celeiros e Casas de Terra.",
    "militaryLabel": "2.000–3.500 combatentes",
    "militaryDetail": "Podem chegar a cerca de 5.000 numa defesa de campos e celeiros, mas não podem retirar gente demais da produção sem provocar fome.",
    "origin": "Descendem dos sobreviventes antigos que compreenderam que sobreviver um dia não bastava: era preciso guardar semente para a próxima estação. A memória de Etérea desapareceu, substituída pela narrativa de uma terra escura e exigente que devolvia multiplicado o que recebia.",
    "territory": "Vivem em Nyn-Harad e numa extensa rede de campos, canais, aldeias, celeiros e rotas agrícolas. O poder do território não está numa única muralha, mas na distribuição de produção e reserva.",
    "culture": "Valorizam previsão, família, terra, ancestralidade e capacidade de alimentar o futuro. A mesma cultura que protege sementes também justifica desigualdade entre proprietários, trabalhadores e famílias que controlam celeiros e canais.",
    "economy": "Produzem grãos, raízes, farinha, animais de carga, carne, fibras e grande parte do alimento comercializado em Jesed. Celeiros, dívidas, comboios e acordos de fornecimento tornam a fome uma ferramenta política.",
    "wayOfLife": "A vida segue plantio, colheita, irrigação, pesagem, conservação e transporte. Famílias inteiras trabalham na terra, enquanto guardas protegem cargas e reservas; decisões de guerra são medidas pelo número de mãos que deixam os campos.",
    "socialStructure": "A Mão da Colheita governa por linhagem, equilibrando Famílias de Terra, Mestres de Celeiro, Chefes de Canal, Guardiões de Semente e trabalhadores pobres. A autoridade depende de manter alimento circulando e reservas intactas.",
    "food": "A culinária usa grão-de-caule, raízes, pães densos, carnes de campo, caldos, sementes e produtos de celeiro. Comer também expressa posição social: a qualidade e a variedade mudam entre proprietários, guardas e trabalhadores.",
    "strengths": [
      "Maior população e grande capacidade produtiva.",
      "Controle de alimento, sementes, comboios e reservas.",
      "Logística essencial para qualquer campanha prolongada.",
      "Defesa distribuída em campos, aldeias e celeiros."
    ],
    "weaknesses": [
      "Não podem mobilizar grande força sem abandonar a produção.",
      "Desigualdade interna entre Famílias de Terra e trabalhadores.",
      "Campos e celeiros são vulneráveis a fogo e sabotagem.",
      "Dependência de canais, estações e rotas de transporte."
    ],
    "warRole": "Nynestra transforma alimento em estratégia. Os Buldar sustentam a marcha, atacam o estômago de Kaendar em Alestir e entram na aliança para limitar o poder Polar sem destruir a ordem comercial que permite vender pão.",
    "finalSituation": "Nynestra compreende que a guerra foi alimentada por uma armação e retira os Buldar diante de Kaendar. O clã evita perder mais trabalhadores e reservas, preserva sua força agrícola e termina o livro como poder político indispensável, mas desconfiado da Dinastia."
  },
  "fendelar": {
    "populationLabel": "Menos de 40 pessoas",
    "populationDetail": "Velarim é uma comunidade familiar pequena, escondida na Floresta de Mirval.",
    "militaryLabel": "Sem exército formal",
    "militaryDetail": "A defesa depende de caçadores, trilhas falsas, pontes ocultas, leitura da mata e retirada antes do confronto aberto.",
    "origin": "A memória remota liga os Fendelar aos sobreviventes da Queda, mas o clã conta que seus antepassados foram exilados de um povo maior por se recusarem a morrer numa guerra alheia. Essa origem sustenta a recusa de grandes estruturas políticas.",
    "territory": "Vivem em Velarim, entre plataformas, pontes falsas, copas, musgo, cipós e trilhas escondidas da Floresta de Mirval. A floresta não é aliada nem sagrada; é um ambiente perigoso que só tolera quem aprende a escutar.",
    "culture": "A virtude central é a leitura: rastros, silêncio, cheiro, peso e comportamento animal. O clã valoriza voltar vivo, evitar ostentação, esconder caminhos e desconfiar de provas fáceis demais. O isolamento, porém, pode impedir alianças e ajuda.",
    "economy": "A economia é pequena e irregular, baseada em caça, carne, couro, gordura, dentes, garras, resinas, fibras e conhecimento de caminhos. Não há produção em escala nem grandes excedentes.",
    "wayOfLife": "Famílias caçam, conservam carne, ensinam crianças a reconhecer perigos e mantêm fumaça baixa para não revelar Velarim. Jantares silenciosos, retorno de caçadores e manutenção das pontes fazem parte da sobrevivência cotidiana.",
    "socialStructure": "Avara exerce liderança prática e familiar, sem trono ou conselho formal. Autoridade vem de experiência, capacidade de ler a floresta e responsabilidade por crianças, caçadores e caminhos de volta.",
    "food": "A alimentação usa dorvek assado em folhas, carne suspensa e defumada, gordura com ervas, raízes, caça pequena e caldos de retorno. O objetivo é conservar cheiro, evitar predadores e aproveitar cada parte da caça.",
    "strengths": [
      "Leitura excepcional de rastros, animais e silêncio.",
      "Ocultação, emboscada e caminhos falsos.",
      "Coesão familiar e adaptação à floresta.",
      "Capacidade de sobreviver sem chamar atenção de clãs maiores."
    ],
    "weaknesses": [
      "População mínima e ausência de força militar organizada.",
      "Pouco excedente, pouca capacidade de reposição e isolamento.",
      "Qualquer massacre ameaça extinguir toda a cultura.",
      "Dependência do conhecimento local de Mirval."
    ],
    "warRole": "O massacre de Velarim, fabricado para sustentar uma mentira Polar, transforma a guerra em ferida moral. Rendar sobrevive e articula a aliança, levando o nome dos Fendelar até Kaendar e expondo o mecanismo político que destruiu sua família.",
    "finalSituation": "Velarim permanece destruída, e Rendar é morto por Alyra depois de receber passagem de Kaelina. No fim, os nomes de Vita, Nara, Ilo, Avara e dos demais Fendelar são inscritos no Registo do Portão, impedindo que o clã seja apagado pela versão oficial."
  },
  "glydar": {
    "populationLabel": "9.000–12.000 pessoas",
    "populationDetail": "Cerca de 3.000–5.000 na Margem dos Zírrios e o restante em vilas, pontes e margens do rio.",
    "militaryLabel": "500–1.200 combatentes",
    "militaryDetail": "São fracos em campo seco, mas barcos, corrente, cordas, fogo e conhecimento do rio tornam uma força Glydar muito mais perigosa na água.",
    "origin": "Os Glydar descendem de grupos antigos que seguiram a água e descobriram que rios, peixes e barcos ofereciam uma forma mais segura de sobreviver do que disputar terra alta. A tradição começa com fome resolvida, não com glória.",
    "territory": "O território acompanha as nascentes e trechos altos do Rio Grande, com cidades pequenas, casas sobre estacas, pontes, oficinas de barco, zonas de pesca, margens de cultivo e regiões de lodo. Os Polar controlam o curso inferior, criando tensão permanente.",
    "culture": "São prudentes, caseiros e acostumados a medir risco antes de provocar clãs maiores. Crianças aprendem a nadar cedo, travessias podem exigir silêncio e a vida social gira em torno de cais, redes, correnteza e mudanças da água.",
    "economy": "A riqueza vem de peixe, ovas, barcos, redes, fibras de margem, plantas aquáticas, travessias e reparos. Dependem do sal Polar para conservar parte da produção, o que transforma comércio em vulnerabilidade política.",
    "wayOfLife": "Pescadores, barqueiros, tecelões de rede e guardiões de ponte vivem próximos da água. Roupas, casas, ferramentas e horários adaptam-se à umidade, à corrente e às estações do rio.",
    "socialStructure": "Não há governo central forte. Casas hereditárias, donos de cais, mestres de rede e líderes de cada povoado negociam alianças temporárias. Quem controla passagem e troca acumula poder sobre as margens.",
    "food": "Peixe fresco ou seco, ulmara, krolho de lama, ovas, raízes de margem e caldos aquáticos dominam a alimentação. A qualidade varia conforme a posição no rio e o acesso ao sal.",
    "strengths": [
      "Conhecimento do Rio Grande, correntezas e travessias.",
      "Barcos, pesca, redes e mobilidade fluvial.",
      "Capacidade de emboscada e sabotagem na água.",
      "Economia útil a vários clãs sem grande exército."
    ],
    "weaknesses": [
      "Pouca força em campo aberto e longe do rio.",
      "Fragmentação política entre casas e povoados.",
      "Dependência do sal Polar e de rotas comerciais.",
      "Medo de represálias pode prolongar neutralidade e indecisão."
    ],
    "warRole": "Ossar envolve os Glydar na aliança por temor do controle Polar. Barcos, margens e conhecimento do rio ajudam a pressão contra Kaendar, enquanto a ocupação Polar e a morte de Varael tornam impossível retornar à neutralidade anterior.",
    "finalSituation": "A ocupação da Margem dos Zírrios é quebrada, mas Varael morre e o clã termina dividido entre culpa, luto e medo de retaliação. Os Glydar sobrevivem e recuperam espaço, sem obter uma vitória limpa nem apagar o custo de terem entrado na guerra."
  },
  "vendrar": {
    "populationLabel": "15.000–22.000 pessoas",
    "populationDetail": "Cerca de 6.000–9.000 em Varkhama e o restante em rotas, postos e famílias móveis.",
    "militaryLabel": "1.800–3.000 combatentes",
    "militaryDetail": "Mercenários e guardas podem elevar a força total para cerca de 4.000, mas retirar gente demais ameaça as oficinas, rotas e contratos.",
    "origin": "Os Vendrar nasceram de grupos que aprenderam a transformar fogo, minério e movimento em sobrevivência. A origem antiga perdeu-se, e a identidade atual está ligada a forjas, famílias móveis, contratos e capacidade de vender a qualquer lado.",
    "territory": "O clã ocupa Varkhama, túneis vulcânicos, florestas do norte, o Rio Varkhan, rotas de cinza e campos frios. Oficinas, depósitos e caminhos de carga conectam uma população parcialmente móvel.",
    "culture": "Qualidade de trabalho é tratada como valor moral, enquanto risco e dor são aceitos como parte da profissão. Os Vendrar orgulham-se da independência e dizem vender objetos, não intenções, embora saibam que a culpa acompanha armas e óleo.",
    "economy": "Forjas, ferramentas, lâminas, peças de barco, ferragens, óleo incendiário, Bafo-de-Fenda, escoltas e mercenários sustentam o clã. Vendem a quase todos e dependem de alimento externo para manter oficinas e rotas.",
    "wayOfLife": "Famílias organizam-se ao redor de ofícios, contratos e deslocamentos. Ferreiros, guardas, mercenários e comerciantes convivem com acidentes, queimaduras e a necessidade constante de proteger fórmulas e clientes.",
    "socialStructure": "A liderança, chamada Verkan, depende de famílias de ofício e de quem controla produção, contratos e homens armados. Prestígio vem da qualidade, da riqueza e da capacidade de cumprir ou romper acordos sem destruir a reputação.",
    "food": "A alimentação combina provisões compradas de outros clãs, carne conservada, raízes resistentes e refeições rápidas de oficina ou estrada. A dependência alimentar limita campanhas longas e aumenta a importância dos Buldar.",
    "strengths": [
      "Melhor metalurgia, armas e materiais incendiários.",
      "Mercenários e guardas com experiência real de combate.",
      "Rede comercial ampla e capacidade de adaptação.",
      "Tecnologia manual e conhecimento de risco."
    ],
    "weaknesses": [
      "Dependência de alimento e compradores externos.",
      "Ganância e contratos contraditórios reduzem confiança.",
      "Acidentes, fogo e armas podem causar dano aos próprios aliados.",
      "Famílias e interesses comerciais dificultam decisão coletiva."
    ],
    "warRole": "Entram primeiro de forma indireta, fornecendo armas, óleo e Bafo-de-Fenda. Tavra rompe a prudência comercial e leva o clã para a ação aberta, tornando a tecnologia Vendrar decisiva na invasão e também no dano causado dentro de Kaendar.",
    "finalSituation": "Tavra cai da torre após Alyra cortar seu mecanismo de fogo; a arma danificada é usada pela soberana e explode. O clã não conquista posição política clara, mas demonstra que vender guerra à distância não impede que o fogo volte para quem o fabricou."
  },
  "cendar": {
    "populationLabel": "14.000–20.000 pessoas",
    "populationDetail": "Cerca de 7.000–9.000 em Cendar-Vel e o restante em pântanos, passagens, oficinas e vilas.",
    "militaryLabel": "1.500–2.800 combatentes",
    "militaryDetail": "A defesa é forte em portões, passagens e pântanos; a força ofensiva sustentável fora do território é pequena, cerca de 500–900 pessoas.",
    "origin": "Descendem de sobreviventes que se fixaram numa região de pântanos, colunas de pedra e caminhos instáveis. A cultura nasceu da necessidade de medir peso, equilíbrio, umidade e tempo antes de abrir qualquer passagem.",
    "territory": "Vivem em Cendar-Vel, nos Dois Pilares, nos Pântanos de Surran, em bosques de madeira flexível, campos, oficinas e passagens que mudam conforme a estação. A geografia favorece defesa, controle de caminho e mecanismos manuais.",
    "culture": "Prudência, espera e responsabilidade pela passagem definem o clã. Mulheres ocupam a defesa pública; homens aparecem em ofícios, memória, suporte estrutural e trabalho cotidiano. Os mecanismos são ferramenta cultural, não religião nem explicação total do povo.",
    "economy": "Cobram passagem, constroem pontes, portões, roldanas, ferramentas e estruturas defensivas. Também vivem de campo, caça, madeira, oficina, escrita e comércio regional, sem vocação expansiva.",
    "wayOfLife": "A rotina exige manutenção de caminhos, leitura de pântanos, inspeção de peso e disciplina de fronteira. Famílias aprendem cedo que abrir uma porta no momento errado pode trazer inimigo, enquanto fechá-la por tempo demais pode trazer fome.",
    "socialStructure": "A Senhora dos Dois Pilares governa entre Casas de Pedra e Ofício, Guardiãs de Passagem, Mestres de Oficina e Anciãos de Rota. Decisões tendem a ser lentas porque cada caminho aberto cria responsabilidade política.",
    "food": "Usam produtos de campo e pântano, raízes, caça, peixes menores, grãos comprados e preparações conservadas para postos de passagem. A cozinha é variada e prática, não centrada em mecanismos.",
    "strengths": [
      "Defesa de portões, passagens, pântanos e estruturas estreitas.",
      "Conhecimento de pontes, pesos e mecanismos manuais.",
      "Território difícil de invadir e fácil de fechar.",
      "Prudência política e capacidade de esperar."
    ],
    "weaknesses": [
      "Força ofensiva pequena fora de casa.",
      "Lentidão decisória pode transformar prudência em omissão.",
      "Casas internas possuem interesses diferentes.",
      "Dependência de rotas abertas para comércio e alimento."
    ],
    "warRole": "A ausência Cendar pesa durante a formação da aliança. O clã avalia o risco de Kaendar, dos Urtistar e das próprias fronteiras, mas não entra como força decisiva no ataque final do livro.",
    "finalSituation": "Cendar-Vel permanece fora da destruição direta e preserva seus portões, porém a neutralidade deixa um débito político com todos os lados. O clã termina intacto, ainda necessário para rotas futuras e ainda difícil de interpretar."
  },
  "urtistar": {
    "populationLabel": "10.000–16.000 pessoas",
    "populationDetail": "Cerca de 5.000–7.000 em Urtar-Vesh e o restante em cavernas, currais, poços e rotas secas.",
    "militaryLabel": "1.800–3.000 combatentes",
    "militaryDetail": "Uma parcela alta dos homens é treinada; grupos pequenos já alteram negociações, embora apenas 400–900 possam ser enviados por muito tempo sem risco interno.",
    "origin": "Vieram do antigo Veshadar, dividido por conflitos entre expansão, criação animal, pedra, rota e interpretação religiosa. Os antepassados Urtistar exterminaram os Arvaktar e Kardar e passaram a tratar essa vitória como prova de fé e força.",
    "territory": "O centro é Urtar-Vesh, uma cidade de cavernas, salões de pedra, clareiras de luz, currais e câmaras sagradas. O clã também controla o Bosque Seco de Ardash, as Areias de Veshkar e os Poços de Ardel.",
    "culture": "Fé, medo, honra brutal e imprevisibilidade formam a identidade Urtistar. Homens lutam e mulheres portam as escrituras consideradas divinas. O clã prefere ser temido a ser compreendido e não aceita que contratos expliquem toda decisão.",
    "economy": "Criação animal, carne seca, couro, gordura, escoltas, contratos e intimidação sustentam o clã. Compram armas dos Polar e Vendrar, negociam com outros povos quando convém e tratam o medo como parte do preço.",
    "wayOfLife": "Crianças crescem entre currais, cavernas, treino e histórias de fé. A vida cotidiana combina criação, conservação de carne, manutenção de armas, viagens de escolta e obediência às Casas e às portadoras das escrituras.",
    "socialStructure": "Sete capitães governam Casas de sangue em equilíbrio instável. Mulheres sagradas guardam e interpretam as escrituras; homens ocupam a guerra e a política das Casas. Fé e interesse raramente podem ser separados.",
    "food": "Carne seca, gordura, leite e produtos dos animais criados dominam a alimentação, acompanhados de raízes de água, plantas do deserto e provisões compradas. A comida precisa suportar estrada, calor e longas escoltas.",
    "strengths": [
      "Guerreiros experientes, precisos e móveis.",
      "Fé e coragem tornam o clã difícil de intimidar.",
      "Economia de animais, couro e escoltas.",
      "Cidade cavernosa e entrada fácil de defender."
    ],
    "weaknesses": [
      "Sete capitães podem competir ou interpretar ordens de modos diferentes.",
      "Fanatismo torna alianças e contratos imprevisíveis.",
      "Histórico de massacres alimenta inimigos antigos.",
      "Dependência de armas e parte dos alimentos comprados."
    ],
    "warRole": "Alyra usa a disposição Urtistar para ampliar a pressão sobre os Tondrar e a aliança. O clã participa como ameaça móvel e religiosa, mas sua fidelidade nunca é completa: quando o custo cresce em Kaendar, recusa sustentar a guerra da soberana até o fim.",
    "finalSituation": "Os Urtistar retiram apoio no momento decisivo e preservam a maior parte de sua força. Saem sem vitória territorial, reforçando a reputação de aliados úteis, perigosos e impossíveis de controlar por contrato ou promessa."
  }
};
  const fendelarMark='';
  for(const clan of D.clans){
    const profile=profiles[clan.slug];
    if(profile)clan.profile=profile;
    if(clan.slug==='fendelar'&&!clan.emblem)clan.contextMark=fendelarMark;
  }
})();
