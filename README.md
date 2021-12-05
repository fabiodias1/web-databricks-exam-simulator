# Databricks Certification Exam Web Simulator

Respositório com o projeto de simulador Web do exame de certificação do Databricks.

## Tecnologias

- HTML;
- CSS;
- JavaScript.

## Usuários

Quaisquer pessoas com acesso à Internet que desejem praticar seus conhecimentos em Spark usando questões da prova de certificação.
Recomendado o usuário possuir algum conhecimento na língua inglesa.

## Simulador

Para acessar a demo do simulador, acesse a url https://fabiodias1.github.io/web-databricks-exam-simulator/src/

## Fonte de Dados

As perguntas do simulador são baseadas no exame de certificação 'Databricks Certified Associate Developer for Apache Spark 3.0'.  
O simulado está disponível em <a href="https://files.training.databricks.com/assessments/practice-exams/PracticeExam-DCADAS3-Python.pdf" target="_blank">https://files.training.databricks.com/assessments/practice-exams/PracticeExam-DCADAS3-Python.pdf</a>

As perguntas e respostas desse teste foram convertidas para o formato Json com a seguinte estrutura:  

**Questões**

```json
{
    "questions":  [
        {
            "id": 1,
            "description": "Enunciado",
            "options": [
                "A. Opção 1",
                "B. Opção 2",
                "C. Opção 3",
                "D. Opção 4",
                "E. Opção 5"
            ]
        },
        {
            "id": 2,
            "description": "Enunciado da \npergunta.",
            "options": [
                "A. Opção 1",
                "B. Opção 2",
                "C. Opção 3",
                "D. Opção 4",
                "E. Opção 5"
            ]
        },
    ]
}

```

**Respostas**

```json
{
    "answers": ["A", "B", ]
}
```
## Para rodar em ambiente local

É necessário ter um servidor web local e um navegador web.

## Funcionamento.

Ao abrir a página, os dados das questões são baixados do servidor.  
Quando o internauta clica em "Start Exam", é escolhida uma pergunta aleatoriamente e mostrada na tela e o tempo começa a ser cronometrado.  
O internauta escolhe a opção que julga ser a correta e clica em "Send Answer", então é mostrada outra pergunta.  
Caso o visitante tenha respondido todas as perguntas disponíveis, é mostrado seu desempenho (quantidade de acertos).  
O internauta possui o tempo máximo de 2 horas para responder todas as questões, assim como no exame real. Em caso dele não conseguir responder todas as perguntas no tempo de 2 horas, ele é informado que o seu tempo acabou.  
O visitante pode interromper o teste a qualquer momento clicando em "Stop Exam".  

## Direitos autorais

O conteúdo das questões deste repositório são de propriedade intelectual da Databricks Inc. (<a href="https://academy.databricks.com" target="_blank">https://academy.databricks.com</a>). Todos os direitos reservados.  
