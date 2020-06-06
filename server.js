//usei o express para criar e configurar o servidor
const express = require("express")
const server = express()

const db = require("./db")
/*   ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title:"Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse ea, consequatur necessitatibus nihil suscipit delectus labore qui ducimus harum",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title:"Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse ea, consequatur necessitatibus nihil suscipit delectus labore qui ducimus harum",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title:"Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse ea, consequatur necessitatibus nihil suscipit delectus labore qui ducimus harum",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title:"Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse ea, consequatur necessitatibus nihil suscipit delectus labore qui ducimus harum",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title:"Pintura",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse ea, consequatur necessitatibus nihil suscipit delectus labore qui ducimus harum",
        url: "https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title:"Recortes",
        category: "Criatividade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic esse ea, consequatur necessitatibus nihil suscipit delectus labore qui ducimus harum",
        url: "https://rocketseat.com.br"
    },
] */


//configurar arquivos estáticos(css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

///configuração do nunjucks que permite a criação de variáveis em HTML
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express:server,
    noCache: true, //boolean. 
})//cache é guardar em memória algumas informações que se considera relevante para uso posterior, ao invés de atualizar toda a aplicação, no processo de criação se percebe quando se esqueceu de desativar o cache do nunjucks porque você fará alterações que o servidor não passará para o front-end

// const cria uma variável que não pode variar. let permite mudar o valor de uma variável
//criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res){

     //consultar dados na tabela
     db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        const reversedIdeas = [...rows].reverse()//é necessário criar o array da variável que está fora da função porque se não o código sempre irá retornar a ela e quando o site reiniciar, terá sua config inicial
       
        let lastIdeas = []
        for(let idea of reversedIdeas){
            if(lastIdeas.length <2){
                lastIdeas.push(idea)
            }
        }
            return res.render("index.html", { ideas: lastIdeas })        
    })        
})

server.get("/ideias", function(req, res){

    //req.query ?title=asdfdasfd&category=asdfasdf essa ideia se usa

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas })
    })

    
})

server.post("/", function(req, res){
    //inserir dados na tabela
    const query = `
    INSERT INTO ideas(
        img,
        title,
        category,
        description,
        link
    ) VALUES(?,?,?,?,?);
    `
    const values = [
        req.body.img,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
    
        return res.redirect("/ideias")
    })
})
//liguei meu servidor na porta 3000
server.listen(3000)

//continuar nos 1:29 da aula 4

//vamos falar de coisas básicas da programação em Java Script
//Variáveis ??
/*const mensagem = "Oi, como vai?"// string
const number = 2.5 //number

function soma(numero1, numero2){//serve para que eu possa rodar uma estratégia de códigos mais de uma vez.
    //log é uma função que segue toda uma lógica para imprimir isso no terminal.
    const somar = numero1 + numero2
    return somar // return serve para extrair da função o resultado de sua execução. Ela pode ser retirada para outra variável, ou para ir direto para o console.log
    
}
//a função não basta ser definida, ela precisa ser chamada para ser executada.
const somar = soma(10, 20)

console.log(soma(5, 5))
console.log(somar)*/

//Objetos {todo objeto está entre chaves e tem propriedades, valores e funcionalidade}
/*const xicara = {
    cor: "branco",
    tamanho: 10,
    estaSujo(simNao){
        console.log(simNao)
        //lógica de programação.
    }
}

console.log(xicara.cor)
const cor = "preto"
const tamanho = 5
function sujo(esta){
    console.log(esta)
}
const xicara2 = {
    cor,
    tamanho,
    sujo
}

//array(vetores)
const latinhas = [
    {
        marca: "coca-cola"
    }
    {
        marca: "pepsi"
    }
]
*/