let ctrl_timer;
let ctrl_time = {
    hour: 2,
    minutes: 0
};

let user_answers = [];
let obj_question;



function showTime() {
    let str_minutes = ctrl_time.minutes.toString();
    if (ctrl_time.minutes < 10) str_minutes = "0" + str_minutes;

    let str_hour = "0" + ctrl_time.hour;

    document.querySelector("#timer > span").innerHTML = str_hour + ":" + str_minutes;
}

function startOrStopExam(bol_start) {
    if (bol_start) {
        ctrl_timer = setInterval(manageTime, 60000);
    } else {
        clearInterval(ctrl_timer);
        ctrl_time.hour = 2;
        ctrl_time.minutes = 0;
        document.querySelector("#timer > span").innerHTML = "02:00";
    }
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

function handleBntTimer(obj_button) {
    let var_startExam = obj_button.dataset.startExam;
    if (var_startExam == "0") { //Start Exam
        obj_button.dataset.startExam = "1";
        startOrStopExam(true);
        obj_button.classList.add("btn-stop-test");
        loadAllQuestions();
        showQuestion();
        user_answers = [];
        showMessageToUser("");
        document.querySelector("#form1").classList.add("formActive");
        obj_button.innerHTML = "Stop Exam";
    } else { //Stop Exam
        obj_button.dataset.startExam = "0";
        startOrStopExam(false);
        obj_button.classList.remove("btn-stop-test");
        showQuestion(false);
        document.querySelector("#form1").classList.remove("formActive");
        obj_button.innerHTML = "Start Exam";
    }
}

function showQuestion(bol_show = true) {
    let choosenQuestion;
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

    if (!bol_show) {
        document.querySelector("#form_description").innerHTML = "Enunciado.";

        document.querySelector("#form_alternatives").innerHTML = str_html_options;
        return;
    }

    while (true) {
        choosenQuestion = Math.round(Math.random() * obj_question.questions.length);

        if (
            (choosenQuestion >= 0 && choosenQuestion < obj_question.questions.length) &&
            (
                (obj_question.selectedQuestions.length == 0) ||
                (!obj_question.selectedQuestions.find(element => element == choosenQuestion) )
            )
        ) {
            break;
        }
    }
    
    obj_question.selectedQuestions.push(choosenQuestion);

    let str_html_desc = obj_question.questions[choosenQuestion].description;
    str_html_desc = str_html_desc.replace("\n", "<br />\n");

    document.querySelector("#form_description").innerHTML = str_html_desc;

    str_html_options = str_html_options.replace(
        "Alternativa A",
        obj_question.questions[choosenQuestion].options[0]
    );
    str_html_options = str_html_options.replace(
        "Alternativa B",
        obj_question.questions[choosenQuestion].options[1]
    );
    str_html_options = str_html_options.replace(
        "Alternativa C",
        obj_question.questions[choosenQuestion].options[2]
    );
    str_html_options = str_html_options.replace(
        "Alternativa D",
        obj_question.questions[choosenQuestion].options[3]
    );
    str_html_options = str_html_options.replace(
        "Alternativa E",
        obj_question.questions[choosenQuestion].options[4]
    );

    document.querySelector("#form_alternatives").innerHTML = str_html_options;

}

function submitAnswer(event) {
    event.preventDefault();

    let obj_form = document.querySelector("form");

    user_answers.push(obj_form.answer.value);

    if (user_answers.length == obj_question.answers.length) {
        checkUserResults();
        
        handleBntTimer(document.querySelector("#btn_exam"));
        
        return;
    }

    showQuestion();
}

function loadAllQuestions() {
    obj_question = {
        questions: [
            {
                id: 1,
                description: "Which of the following DataFrame operations is always classified as a narrow transformation?",
                options: [
                    "A. DataFrame.sort()",
                    "B. DataFrame.distinct()",
                    "C. DataFrame.repartition()",
                    "D. DataFrame.select()",
                    "E. DataFrame.join()"
                ]
            },
            {
                id: 2,
                description: "Which of the following is the default storage level for persist() for a non-streaming\nDataFrame/Dataset?",
                options: [
                    "A. MEMORY_AND_DISK",
                    "B. MEMORY_AND_DISK_SER",
                    "C. DISK_ONLY",
                    "D. MEMORY_ONLY_SER",
                    "E. MEMORY_ONLY"
                ]
            },
            {
                id: 3,
                description: "Which of the following operations is most likely to induce a skew in the size of your data's\npartitions?",
                options: [
                    "A. DataFrame.collect()",
                    "B. DataFrame.cache()",
                    "C. DataFrame.repartition(n)",
                    "D. DataFrame.coalesce(n)",
                    "E. DataFrame.persist()"
                ]
            }
            
        ],
        answers: ["D", "A", "C"],
        selectedQuestions: []
    }
}

function checkUserResults()  {
    let int_hits = 0;
    let int_j;

    for (let i = 0; i < user_answers.length; i++) {
        int_j = obj_question.selectedQuestions[i];
        if (user_answers[i] == obj_question.answers[int_j])
            int_hits++;
    }

    showMessageToUser("You answered all of questions!<br />Your hints: " + int_hits.toString() );

}

function showMessageToUser(str_message) {
    document.querySelector("#user_message").innerHTML = str_message;
}
