/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid ${({ theme }) => theme.colors.secondary};
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-left: 40%;

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Loader />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
                  style={{ display: 'none' }}
                  name={questionId}
                  id={alternativeId}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">Confirmar</Button>
        </form>
        {/* <pre>
          {JSON.stringify(question, null, 4)}
        </pre> */}
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const router = useRouter();
  const { name } = router.query;

  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const total = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce == didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < total) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  // [React chama de: Efeitos || Effects]
  // nasce === didMount
  // atualizado === willUpdate
  // morre === willUnmount

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Content>
            {`Bem-vindo ao quiz, jogador ${name}!!`}
          </Widget.Content>
        </Widget>

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={total}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <Widget>
            <Widget.Content>
              <p>Você acertou X questões, parabéns!</p>
            </Widget.Content>
          </Widget>
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

// QuestionWidget.propTypes = {
//   question: PropTypes.objectOf.isRequired,
//   total: PropTypes.number.isRequired,
//   questionIndex: PropTypes.number.isRequired,
// };
