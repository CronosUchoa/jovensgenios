//obtendo todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

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
    startTimer(timeValue);
    startTimerLine(0)
}


//pegando as questões

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 10;
    widthValue = 0;
    userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter)
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Tempo";
    
    
}

quit_quiz.onclick = () =>{
    window.location.reload();
}

next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Tempo";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("questions completed");
        showResultBox();
    }
   
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+questions[index].numb+". "+ questions[index].question +'</span>';
    

   
    let option_tag = '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[1]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[2]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[3]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[4]+'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    let o = option.length;
    for(let i = 0; i < o; i++){
        option[i].setAttribute("onclick", "optionSelected(this), verResposta(this)");
    }

}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';



//pegando a resposta do aluno. -- talvez seja aqui que eu tenha que implementar o websockt
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let respostaAluno = answer.textContent;
    let respostaCerta = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    //verificar a resposta do aluno
    if(respostaAluno == respostaCerta){
        userScore +=1;
        answer.classList.add("correct");
        // console.log(respostaAluno);
        console.log("A resposta do aluno está certa.");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("A resposta do aluno está errada.");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        //quando a resposta for errada, eu automaticamente mostro a resposta certa. --
        for(let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == respostaCerta){

                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //quando o aluno selecionar uma opção todas as outras ficam desabilitada
    for(let i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }

    next_btn.style.display = "block";
    
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //esconder
    quiz_box.classList.remove("activeQuiz");//esconder
    result_box.classList.add("activeResult");//mostrar
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>Parabéns você acertou <p>'+userScore+'</p> de <p>'+questions.length+'</p></span>'
        scoreText.innerHTML = scoreTag;
    } else if(userScore > 1){
        let scoreTagg = '<span>Sempre aprendendo, você acertou <p>'+userScore+'</p> de <p>'+questions.length+'</p></span>'
        scoreText.innerHTML = scoreTagg;
    }else {
        let scoreTaggg = '<span>Sempre aprendendo, sua pontuação <p>'+userScore+'</p> de <p>'+questions.length+'</p></span>'
        scoreText.innerHTML = scoreTaggg;
    }
}

function startTimer(time)
{
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0)
        {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Acabou o tempo";

            let respostaCerta = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == respostaCerta){
    
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for(let i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");
                }
    
            next_btn.style.display = "block";
        }
    }    

}

function startTimerLine(time){
    counterLine = setInterval(timer, 20);
    function timer(){
        
        time+=1;
        timeLine.style.width = time+"px";
        if(time > 549)
        {
            clearInterval(counterLine);
        }
    }

}



function queCounter(index){
    const fo_quest_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index +'</p>de<p>'+questions.length+'</p>Questões</span>';
    fo_quest_counter.innerHTML = totalQuesCountTag;
}