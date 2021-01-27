import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';

export default function Quiz() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Content>
            <p>
              <span>Bem-vindo ao quiz, jogador </span>
              <b>{name}</b>
              !!
            </p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Perguntas</h1>
          </Widget.Header>
          <Widget.Content>
            <p>As perguntas estarão aqui, aguarde!</p>
            <ul>
              <li>Resposta 1</li>
              <li>Resposta 2</li>
              <li>Resposta 3</li>
              <li>Resposta 4</li>
            </ul>
            <button type="button">Confirmar</button>
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}
