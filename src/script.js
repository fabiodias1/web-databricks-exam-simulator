let ctrl_timer;
let ctrl_time = {
    hour: 2,
    minutes: 0
};

let user_answers = [];
let obj_questions = {
    questions: [],
    answers: [],
    selectedQuestions:[]
};

const data_url = "http://localhost:8080/exam/data/";


function showTime() {
    let str_minutes = ctrl_time.minutes.toString();
    if (ctrl_time.minutes < 10) str_minutes = "0" + str_minutes;

    let str_hour = "0" + ctrl_time.hour;

    document.querySelector("#timer > span").innerHTML = str_hour + ":" + str_minutes;
}

function resetTimer() {
    ctrl_time.hour = 2;
    ctrl_time.minutes = 0;
    document.querySelector("#timer > span").innerHTML = "02:00";
}

function manageTime() {
    ctrl_time.minutes = ctrl_time.minutes - 1;

    if (ctrl_time.minutes < 0) {
        ctrl_time.hour = ctrl_time.hour - 1
        ctrl_time.minutes = 59;
    }

    showTime();

    if ((ctrl_time.minutes == 0) && (ctrl_time.hour == 0)) {
        handleBntTimer(document.querySelector("#btn_exam"));
        showMessageToUser("Your time is over!");
    }
}


function startExam() {
    ctrl_timer = setInterval(manageTime, 60000);
    obj_questions.selectedQuestions = [];
    user_answers = [];
}

function stopExam() {
    clearInterval(ctrl_timer);
    resetTimer() 
}

function checkUserResults()  {
    let int_hits = 0;
    let int_j;

    for (let i = 0; i < user_answers.length; i++) {
        int_j = obj_questions.selectedQuestions[i];
        if (user_answers[i] == obj_questions.answers[int_j])
            int_hits++;
    }

    showMessageToUser("You answered all of questions!<br />Your hints: " + int_hits.toString() );
}


function chooseQuestion() {
    let choosenQuestion;

    while (true) {
        choosenQuestion = Math.round(Math.random() * obj_questions.questions.length);

        if (
            (choosenQuestion >= 0 && choosenQuestion < obj_questions.questions.length) &&
            (
                (obj_questions.selectedQuestions.length == 0) ||
                (!obj_questions.selectedQuestions.includes(choosenQuestion) )
            )
        ) {
            break;
        }
    }
    
    obj_questions.selectedQuestions.push(choosenQuestion);

    return choosenQuestion;
}

function showQuestion(choosenQuestion) {
    let str_html_options = `
        <label for="form_alt1">
            <input type="radio" value="A" id="form_alt1" name="answer" required />Alternativa A
        </label>
        <label for="form_alt2">
            <input type="radio" value="B" id="form_alt2" name="answer" required />Alternativa B
        </label>
        <label for="form_alt3">
            <input type="radio" value="C" id="form_alt3" name="answer" required />Alternativa C
        </label>
        <label for="form_alt4">
            <input type="radio" value="D" id="form_alt4" name="answer" required />Alternativa D
        </label>
        <label for="form_alt5">
            <input type="radio" value="E" id="form_alt5" name="answer" required />Alternativa E
        </label>
        <input type="hidden" value="@0@" name="question_index" />
    `;

    let str_html_desc = obj_questions.questions[choosenQuestion].description;
    str_html_desc = str_html_desc.replace("\n", "<br />\n");

    document.querySelector("#form_description").innerHTML = str_html_desc;

    str_html_options = str_html_options.replace(
        "Alternativa A",
        obj_questions.questions[choosenQuestion].options[0]
    );
    str_html_options = str_html_options.replace(
        "Alternativa B",
        obj_questions.questions[choosenQuestion].options[1]
    );
    str_html_options = str_html_options.replace(
        "Alternativa C",
        obj_questions.questions[choosenQuestion].options[2]
    );
    str_html_options = str_html_options.replace(
        "Alternativa D",
        obj_questions.questions[choosenQuestion].options[3]
    );
    str_html_options = str_html_options.replace(
        "Alternativa E",
        obj_questions.questions[choosenQuestion].options[4]
    );

    document.querySelector("#form_alternatives").innerHTML = str_html_options;

}

function showMessageToUser(str_message) {
    document.querySelector("#user_message").innerHTML = str_message;
}

function handleBntTimer(obj_button) {

    let var_startExam = obj_button.dataset.startExam;

    if (var_startExam == "0") { //Start Exam
        obj_button.dataset.startExam = "1";
        startExam();
        showMessageToUser("");
        
        let indexChoosenQuestion = chooseQuestion();
        showQuestion(indexChoosenQuestion);
        
        document.querySelector("#form1").classList.add("formActive");
        obj_button.innerHTML = "Stop Exam";
        obj_button.classList.add("btn-stop-test");
   
    } else { //Stop Exam
        obj_button.dataset.startExam = "0";
        stopExam();
        
        document.querySelector("#form1").classList.remove("formActive");
        obj_button.innerHTML = "Start Exam";
        obj_button.classList.remove("btn-stop-test");
    }

}

function submitAnswer(event) {
    event.preventDefault();

    const obj_form = document.querySelector("form");

    user_answers.push(obj_form.answer.value);

    if (user_answers.length == obj_questions.answers.length) {
        checkUserResults();
        
        handleBntTimer(document.querySelector("#btn_exam"));
        
        return;
    }

    const choosenQuestion = chooseQuestion();
    showQuestion(choosenQuestion);
}

async function loadAllQuestions() {

    try {
        let obj_req = await fetch(data_url + "questions.json");
        let obj_json1 = await obj_req.json();

        if (obj_json1) {
            obj_questions.questions = obj_json1.questions;
        }

        obj_req = await fetch(data_url + "answers.json");
        let obj_json2 = await obj_req.json();

        if (obj_json2) {
            obj_questions.answers = obj_json2.answers;
        }

        if (
            (obj_questions.questions.length != 0) && 
            (obj_questions.answers.length != 0)
        ) {
            document.querySelector("#btn_exam").disabled = false;
        }

    } catch(e) {
        console.log("An error occurred!\n" + e.message);
        showMessageToUser("Loading questions failed!");
    }

}
