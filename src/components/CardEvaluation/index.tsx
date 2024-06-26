import React, { useState } from "react";

import {
    Container,
    ContentQuestion,
    ContentNumberQuestion,
    NumberQuestion,
    ContentQuestionText,
    QuestionText,
    ContentRadioButton
} from "./styles";

import { RadioButton } from 'react-native-paper';
import theme from "../../global/styles/theme";

export interface IProps {
    numberQuestion: number;
    codeQuestion: string;
    question: string;
    alternative: string[];
    codeAlternative: string[];
    codEvaluation: number;
    onValueChange: (codeQuestion: string, codeResponse: string, codEvaluation: number) => void;
}

export function CardEvaluation({
    numberQuestion,
    codeQuestion,
    question,
    alternative,
    codeAlternative,
    codEvaluation,
    onValueChange
}: IProps) {
    const [checked, setChecked] = useState('');

    const handleValueChange = (newValue: string) => {

        setChecked(newValue);
        onValueChange(codeQuestion, newValue, codEvaluation);
    }

    return (
        <Container>
            <ContentQuestion>
                <ContentNumberQuestion>
                    <NumberQuestion>{numberQuestion}. </NumberQuestion>
                </ContentNumberQuestion>
                <ContentQuestionText>
                    <QuestionText key={String(codeQuestion)}>{question}</QuestionText>
                </ContentQuestionText>
            </ContentQuestion>
            <ContentRadioButton>
                <RadioButton.Group onValueChange={handleValueChange} value={checked}>
                    {
                        alternative.map((item, index) => (
                            <RadioButton.Item
                            mode="android"
                            key={codeAlternative[index]}
                            label={String(item)}
                            labelStyle={{
                                textAlign: "left",
                                marginLeft: 5,
                                color: theme.colors.gray_dark,
                                fontSize: 16
                            }}
                            style={{
                                flexDirection: "row",
                                margin: 10
                            }}
                            position="leading"
                            color={theme.colors.fourth}
                            uncheckedColor={theme.colors.gray_dark}
                            value={String(codeAlternative[index])} />
                        ))
                    }
                </RadioButton.Group>
            </ContentRadioButton>
        </Container>
    )
}