/* eslint-disable linebreak-style */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
    // <div>
    //   <p>Quiz externo</p>


    //   <pre style={{ color: 'black' }}>
    //     {JSON.stringify(dbExterno, null, 4)}
    //   </pre>
    // </div>
  );
}

export async function getServerSideProps(context) {
  // console.log('Infos que o next da para nós:', context.query.id);
  const [projectName, githubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => console.log(err));

  // console.log('dbExterno', dbExterno);
  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
