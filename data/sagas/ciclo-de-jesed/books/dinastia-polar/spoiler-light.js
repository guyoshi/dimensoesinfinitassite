/* Apresentações das fichas sem spoilers maiores. O texto dos capítulos continua completo. */
(() => {
  const X = window.JESED_POLAR_CONTEXT; if (!X) return;
  const { D } = X;
  const P = {
    'elis': ['Nular de Maruva · treze ciclos', 'Garota de treze ciclos criada em Maruva. Curiosa, ágil e acostumada a atravessar lugares proibidos, é irmã de Kalan e vive numa casa onde nada é simples.'],
    'kalan': ['Morador de Maruva · dezessete ciclos', 'Irmão mais velho de Elis, trabalha na Balança Azul e tem uma percepção incomum de peso. Responde cotidianamente pela casa.'],
    'tair': ['Morador de Maruva · copista', 'Jovem alfabetizado que ajuda a casa com contas, cobranças e registros.'],
    'orel': ['Morador de Maruva', 'Jovem grande e vulnerável, que fala com dificuldade e depende da presença de Elis como referência de segurança.'],
    'karesis': ['Responsável legal da casa de Maruva', 'Adulto ausente e frequentemente ferido, que funciona mal como responsável cotidiano e guarda um conhecimento incomum sobre o passado de Kaeliran.'],
    'dareth-quatro-dedos': ['Campeão Polar · ex-Segundo Kae', 'Veterano transformado em lenda por feitos de guerra que ele próprio rejeita como medida de uma vida. Volta a Kaeliran depois de cerca de vinte ciclos.'],
    'selina': ['Cadeira dos Caminhos e Estandartes', 'Membro da Câmara dos Onze e administradora extremamente competente, que confia em procedimentos, padrões e explicações plausíveis.'],
    'vetarius-polar': ['Soberano Polar', 'Soberano carismático e inteligente, acostumado a decidir por antecipação. Criou o Torneio Decenal como alternativa às guerras.'],
    'caeren-polar': ['Filho e herdeiro de Vetarius', 'Herdeiro jovem criado dentro de Kaendar, que repete preconceitos aprendidos e tem curiosidade por violência.'],
    'alveris-polar': ['Proprietário da Companhia da Balança Azul', 'Magnata logístico que acredita que o sistema hereditário Polar precisa mudar e que os Nular sustentam a cidade sem possuir direitos equivalentes.'],
    'sumo-vigia': ['Autoridade máxima do Culto da Raiz Eterna', 'Líder religioso que combina cuidado real com poder coercivo. Acredita que confissão, punição e pertencimento fazem parte de uma mesma ordem protetora.'],
    'hadris': ['Investigador do Culto da Raiz Eterna', 'Investigador metódico do Culto, que transforma medo, informação e geografia em ferramentas.'],
    'amira': ['Assistente de Selina', 'Assistente eficiente que vive com Selina desde a morte do pai. Percebe padrões nas autorizações da Balança.'],
    'vesna-da-permanencia': ['Curadora e agente registral em Maruva', 'Curadora de Maruva, discreta e meticulosa com os registros da casa.'],
    'ladira-polar': ['Mulher Polar da Cidade Interna', 'Mulher Polar da Cidade Interna, ligada ao passado de uma das pessoas desaparecidas de Maruva.'],
    'corven': ['Supervisor da Balança Azul', 'Supervisor cordial e experiente da Companhia da Balança Azul.'],
    'cairon': ['Encarregado de Kalan na Balança Azul', 'Encarregado que conhece Kalan como trabalhador e se preocupa com ele.'],
    'amaric': ['Primeiro Kae', 'Antigo companheiro de armas de Dareth e atual Primeiro Kae.'],
    'renar-polar': ['Treinador de combate em Kaendar', 'Treinador indicado por Orvath, que não bajula lendas.'],
    'mestre-orvath': ['Mestre de forja de Kaendar', 'Ferreiro que restaura armas antigas sem apagar suas marcas.'],
    'barek-braidar': ['Campeão Braedar', 'Campeão Braedar, ex-integrante de unidade de ruptura. Luta com malho e leitura estrutural.'],
    'edria-cendar': ['Engenheira Cendar', 'Engenheira Cendar, acostumada a coordenar passagens e travessias perigosas e a pôr a segurança das pessoas antes da carga.'],
    'karev-quendrar': ['Campeão Quendrar', 'Campeão Quendrar jovem e carismático.'],
    'kerath-polar': ['Calandrir de Vetarius', 'Comandante da Guarda Soberana. Disciplinado, cortês e pouco expansivo; representa a continuidade militar dentro de Kaendar.'],
    'neris-nular': ['Escriturária da Balança Azul', 'Escriturária que transforma suspeitas em números, separando pesos, destinos e lotes.'],
    'orven-vendrar': ['Campeão Vendrar', 'Campeão Vendrar que luta com mecanismos e fogo.'],
    'rhevara-mardrar': ['Campeã Mardrar', 'Campeã Mardrar especializada em contenção e captura.'],
    'tavena-grastar': ['Campeã Grastar', 'Campeã Grastar que usa corda e controle de espaço.'],
    'saren-luzdar': ['Campeão Lusdar', 'Campeão Lusdar de postura tranquila, cujo estilo prioriza proximidade e contenção.'],
    'serka-cendar': ['Campeã Cendar', 'Campeã Cendar que usa corda, vara e leitura estrutural do terreno.'],
    'talira-leidar': ['Campeã Leidar', 'Campeã Leidar, representante de sua dinastia no Torneio.'],
    'saelira-buldar': ['Delegação Buldar', 'Integrante da delegação Buldar no Torneio.'],
    'khalir-buldar': ['Campeão Buldar', 'Campeão Buldar no Primeiro Torneio Decenal.']
  };
  D.characters.forEach(c => { const p = P[c.slug]; if (p) { c.alias = p[0]; c.subtitle = p[0]; c.summary = p[1]; } c.status = ''; });
})();
