//obtendo todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

//se o botão para iniciar o questionário foi clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //vou mostrar o card info box
}

//se o botão para iniciar o questionário foi clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //vou esconder o card info box
}
//se o botão continue for apertado
continue_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
}


