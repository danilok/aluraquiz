import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Aluraquiz - Imersão React</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Quiz de educação financeira</h1>
          </Widget.Header>
          <Widget.Content>

            <p>Vamos ver se você tem investido bem seu tempo em conhecimento!</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                name="nomeDoJogador"
                onChange={(e) => {
                  // State
                  setName(e.target.value);
                }}
                placeholder="Diz seu nome aí, futuro bilionário!"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>Aqui terá uma lista de quizes</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/danilok/aluraquiz" />
    </QuizBackground>
  );
}
