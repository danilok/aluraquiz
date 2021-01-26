import styled from 'styled-components'
import db from '../db.json';
import Widget from '../src/components/Widget'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'

import Head from 'next/head'
import Link from 'next/link'

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Aluraquiz - Imersão React</title>
        <meta property="og:title" content="Aluraquiz - Imersão React" key="title" />
        <meta property="og:image" content={db.bg} key="title" />
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Quiz de educação financeira</h1>
          </Widget.Header>
          <Widget.Content>

            <p>Vamos ver se você tem investido bem seu tempo em conhecimento!</p>
            <Link href="/quiz"><button>Desafio! Link para Quiz</button></Link>
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
  )
}
