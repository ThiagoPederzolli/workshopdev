//document é a forma utilizada para o JavaScript encontrar as propriedades ou funções do HTML
//querySelector seleciona o que queremos pegar especificamente no nosso arquivo HTML
//toggle significa colocar e tirar

function onOff(){
    document
    .querySelector("#modal")
    .classList            
    .toggle("hide")
    
    document
    .querySelector("body")
    .classList
    .toggle("hideScroll")

    document
    .querySelector("#modal")
    .classList
    .toggle("addScroll")
}
function checkFields(event){
     const valuesToCheck = [
        "title",
        "category",
        "image",
        "description",
        "link",
    ]
    const isEmpty = valuesToCheck.find(function(value){
        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        if(checkIfIsString && checkIfIsEmpty){
            return true
        }

    })
    if(isEmpty){
        event.preventDefault()
        alert("Por favor, preencha todos os campos")
    }
}
/*
for( let value of valuesToCheck){

    } 
document
.querySelector("button.fat")
.addEventListener("click", onOff)*/