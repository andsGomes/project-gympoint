import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import {
  Container,
  Content,
  QuestionContent,
  QuestionHeader,
  QuestionDate,
  Question,
  QuestionLabel,
  AnswerLabel,
  Answer,
} from './styles';

export default function HelpOrder({ navigation }) {
  const helpOrder = navigation.getParam('item');

  return (
    <>
      <Container>
        <Header />

        <Content>
          <QuestionContent>
            <QuestionHeader>
              <QuestionLabel>PERGUNTA</QuestionLabel>
              <QuestionDate>{helpOrder.formattedDate}</QuestionDate>
            </QuestionHeader>
            <Question>{helpOrder.question}</Question>

            {helpOrder.answer && (
              <>
                <AnswerLabel>RESPOSTA</AnswerLabel>
                <Answer>{helpOrder.answer}</Answer>
              </>
            )}
          </QuestionContent>
        </Content>
      </Container>
    </>
  );
}

HelpOrder.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
