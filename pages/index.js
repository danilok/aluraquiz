import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import Widget from '../src/components/Widget';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import QuizContainer from '../src/components/QuizContainer';

// const QuizContainer = styled.div`
//   width: 100%;
//   max-width: 350px;
//   padding-top: 45px;
//   margin: auto 10%;
//   @media screen and (max-width: 500px) {
//     margin: auto;
//     padding: 15px;
//   }
// `;

const Input = styled.input`
  width: 283px;
  height: 40px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */
  letter-spacing: 0.15px;

  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);

  border-radius: 3.5px;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ButtonPlay = styled.button`
  background: #FFFFFF;
  width: 100%;
  font-size: 20px;
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.primary};

  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;

  &:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

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
                onChange={(e) => {
                  // State
                  setName(e.target.value);
                }}
                placeholder="Diz seu nome aí, futuro bilionário!"
              />
              <br />
              <ButtonPlay type="submit" disabled={name.length === 0}>
                {'Jogar '}
                {name}
              </ButtonPlay>
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
