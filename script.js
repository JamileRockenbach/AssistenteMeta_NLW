const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const perguntaLOL = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responsda itens que vc não tenha certeza de que existe no patch atual.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracteres
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

    ## Exemplo de resposta
    pergunta do usuário: Melhor build rengar jungle
    resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui.\n\n**Runas:**\n\nexemplo de runas\n\n

    ---
    Aqui está a pergunta do usuário: ${question}
  `
    const contents = [{
        role: "user",
        parts: [{
            text: pergunta
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}

const perguntaValornt = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
  ## Especialidade
  Você é um especialista tático em ${game}

  ## Tarefa
  Responda perguntas sobre agentes, mapas, economia e estratégias do jogo Valorant.

  ## Regras
  - Se não souber, diga 'Não sei'.
  - Se for fora do tema, diga 'Essa pergunta não está relacionada ao jogo'.
  - Data: ${new Date().toLocaleDateString()}
  - Use o patch atual como base.

  ## Resposta
  - Seja direto (até 500 caracteres)
  - Use markdown
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Melhor agente para Fracture?  
  resposta: **Breach** é forte no Fracture por sua utilidade para iniciar confrontos e desestabilizar os inimigos.

  ---
  Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const perguntaCs = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
  ## Especialidade
  Você é um especialista em estratégias de ${game}

  ## Tarefa
  Responda perguntas sobre armas, economia, mapas e granadas táticas no jogo cs:go.

  ## Regras
  - Não sabe? Diga 'Não sei'.
  - Fora do jogo? Diga 'Essa pergunta não está relacionada ao jogo'.
  - Data: ${new Date().toLocaleDateString()}
  - Use informações do patch atual.

  ## Resposta
  - Direto ao ponto (500 caracteres máx.)
  - Use markdown
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Qual melhor granada para B Mirage?  
  resposta: *Smoke para Van* ajuda a bloquear visão de CT e facilita entrada no bomb.

  ---
  Pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const perguntaFortnite = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    ## Especialidade
  Você é um especialista do jogo ${game}

  ## Tarefa
  Responda sobre armas, rotação, estratégia de zona segura e metas da temporada do jogo Fortnite.

  ## Regras
  - Se não souber, diga 'Não sei'.
  - Se for fora do jogo, diga 'Essa pergunta não está relacionada ao jogo'.
  - Data: ${new Date().toLocaleDateString()}
  - Responda com base no patch atual.

  ## Resposta
  - Use markdown, direto ao ponto (500 caracteres máx.)
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Qual arma está forte na Season 5?  
  resposta: *Rifle Tático* é uma escolha sólida, com boa precisão e dano médio-alto, ideal para médio alcance.

  ---
  Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const perguntaMine = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    ## Especialidade
  Você é um especialista do ${game}

  ## Tarefa
  Responda perguntas sobre construção, sobrevivência, encantamentos, cheats e mecânicas do jogo Minecraft.

  ## Regras
  - Se não souber, diga 'Não sei'.
  - Fora do contexto? Responda 'Essa pergunta não está relacionada ao jogo'.
  - Data: ${new Date().toLocaleDateString()}
  - Utilize a versão mais recente do jogo.

  ## Resposta
  - Use markdown
  - Seja direto (até 500 caracteres)
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Como fazer farm de ferro eficiente?  
  resposta: Construa uma vila com 3 aldeões e 1 zumbi cercado. Os golems nascerão perto das camas e cairão em lava.

  ---
  Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const perguntaSims = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    ## Especialidade
  Você é especialista em mecânicas e dicas do ${game}

  ## Tarefa
  Responda sobre habilidades, modos de vida, cheats, dicas e construção do jogo The Sims.

  ## Regras
  - Não sabe? Diga 'Não sei'.
  - Fora do tema? Diga 'Essa pergunta não está relacionada ao jogo'.
  - Data atual: ${new Date().toLocaleDateString()}
  - Use informações atuais.

  ## Resposta
  - Use markdown 
  - Seja conciso (máx. 500 caracteres)
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Como ganhar dinheiro rápido no The Sims 4?  
  resposta: Use o código *motherlode* para ganhar §50.000 instantaneamente.

  ---
  Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const perguntaGenshin = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
    ## Especialidade
  Você é um especialista em builds e times no jogo ${game}

  ## Tarefa
  Responda sobre artefatos, armas, times e reações elementares.

  ## Regras
  - Se não souber, diga 'Não sei'.
  - Se for fora do jogo, diga 'Essa pergunta não está relacionada ao jogo'.
  - Data: ${new Date().toLocaleDateString()}
  - Use informações atuais do patch.

  ## Resposta
  - Responda com até 500 caracteres
  - Use markdown
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Melhor build para Raiden Shogun?  
  resposta: *Artefatos:* Emblema do Destino Quebrado / *Arma:* Lança Engulfing Lightning / *Time:* Raiden, Xingqiu, Xiangling, Bennett.

  ---
  Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const perguntaStardew = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const pergunta = `
     ## Especialidade
  Você é um especialista no jogo ${game}

  ## Tarefa
  Responda sobre cultivo, personagens, eventos, pesca e otimização da fazenda do jogo Stardew Valley.

  ## Regras
  - Se não souber, diga 'Não sei'.
  - Fora do tema? Diga 'Essa pergunta não está relacionada ao jogo'.
  - Considere a data atual: ${new Date().toLocaleDateString()}

  ## Resposta
  - Até 500 caracteres, direto e claro
  - Use markdown
  - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

  ## Exemplo
  pergunta: Melhor plantação da primavera?  
  resposta: *Morango* é o mais lucrativo, mas só pode ser comprado no Egg Festival (dia 13). Plante assim que possível.

  ---
  Aqui está a pergunta do usuário: ${question}
  `
  const contents = [{ role: "user", parts: [{ text: pergunta }] }]
  const tools = [{ google_search: {} }]

  const response = await fetch(geminiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents, tools })
  })

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}

const enviarFormulario = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value

    let pergunta = ''

    if (game === 'lol') pergunta = perguntaLOL
    else if (game === 'valorant') pergunta = perguntaValornt
    else if (game === 'cs') pergunta = perguntaCs
    else if (game === 'fortnite') pergunta = perguntaFortnite
    else if (game === 'minecraft') pergunta = perguntaMine
    else if (game === 'the sims') pergunta = perguntaSims
    else if (game === 'genshin impact') pergunta = perguntaGenshin
    else if (game === 'stardew valley') pergunta = perguntaStardew
    else {
    alert("Jogo inválido selecionado")
    return
  }

    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')

    try {
        const text = await pergunta(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text)
        aiResponse.classList.remove('hidden')
    } catch (error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')
    }
}

form.addEventListener('submit', enviarFormulario)