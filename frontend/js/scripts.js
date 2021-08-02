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
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
}


//pegando as questões

let que_count = 0;
let que_numb = 1;

const next_btn = quiz_box.querySelector(".next_btn");

next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);

    }
    else{
        console.log("questions completed");
    }
   
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+questions[index].numb+". "+ questions[index].question +'</span>';
    

    const option_list = document.querySelector(".option_list");
    let option_tag = '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[1]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[2]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[3]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[4]+'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//pegando a resposta do aluno. -- talvez seja aqui que eu tenha que implementar o websockt
function optionSelected(answer){
    let respostaAluno = answer.textContent;
    let respostaCerta = questions[que_count].answer;
    //verificar a resposta do aluno
    if(respostaAluno == respostaCerta){
        console.log("aluno acertou! " + respostaCerta);
    }else{
        console.log("aluno errou! " + respostaAluno) ;
    }
    
}

function queCounter(index){
    const fo_quest_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>de<p>'+questions.length+'</p>Questões</span>';
    fo_quest_counter.innerHTML = totalQuesCountTag;
}

