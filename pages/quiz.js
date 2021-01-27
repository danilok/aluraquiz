import React from 'react';
import QuizBackground from '../src/components/QuizBackground';
import db from '../db.json';
import Widget from '../src/components/Widget';

export default function Quiz() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Widget>
        <Widget.Content>
          Quiz será aqui
        </Widget.Content>
      </Widget>
    </QuizBackground>
  );
}
