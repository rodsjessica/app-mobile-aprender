import React from "react";

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
    question: string;
    alternative: string[];
}

export function CardEvaluation({
    numberQuestion,
    question,
    alternative,
}: IProps) {
    const [checked, setChecked] = React.useState('');
    // console.log('checked =====>', checked)

    return (
        <Container>
            <ContentQuestion>
                <ContentNumberQuestion>
                    <NumberQuestion>{numberQuestion}. </NumberQuestion>
                </ContentNumberQuestion>
                <ContentQuestionText>
                    <QuestionText>{question}</QuestionText>
                </ContentQuestionText>
            </ContentQuestion>
            <ContentRadioButton>
                <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                    <RadioButton.Item
                        mode="android"
                        label={String(alternative[0])}
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
                        value={String(alternative[0])} />
                    <RadioButton.Item
                        mode="android"
                        label={String(alternative[1])}
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
                        value={String(alternative[1])} />
                    <RadioButton.Item
                        mode="android"
                        label={String(alternative[2])}
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
                        value={String(alternative[2])} />
                    <RadioButton.Item
                        mode="android"
                        label={String(alternative[3])}
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
                        value={String(alternative[3])} />
                </RadioButton.Group>
            </ContentRadioButton>
        </Container>
    )
}