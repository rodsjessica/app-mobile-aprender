import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    background-color: ${({theme} : any) => theme.colors.gray_light};
`;

export const TableHeader = styled.View`
    border-style: solid;
    border-width: 1px;
    flex-direction: row;
    justify-content: space-around;
    background-color: rgba(0, 135, 136, 0.1);
    margin: 10px;
    margin-bottom: 5px;
    border-color: rgba(0, 0, 0, 0.1);
`;

export const ViewInfo = styled.View`
    padding: 15px;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    width: 50%;
    align-items: center;
`;

export const TextInfo = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({theme} : any) => theme.colors.gray_dark};
`;


export const TableRow = styled.View`
    flex-direction : row;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 10px;
    background-color: ${({theme} : any) => theme.colors.background};
`;

export const FirstColumn = styled.View`
    align-self: center;
    width: 50%;
    padding: 10px;
    border-right: solid;
    border-right-width: 1px;
    border-right-color:  rgba(0, 0, 0, 0.1);
`;

export const SecondColumn = styled.View`
    width: 50%;
    flex-direction: row;
    justify-content: center;
    align-self: center;
    border-style: solid;
    border-width: 1px;
    border-color: ${({theme} : any) => theme.colors.gray_dark};
    border-radius: 40px;
    padding: 10px;
    margin: 5px;
`;

export const ContentView = styled.View`
  flex: 1;
`;