import React, { useState } from "react";

import {
    Container,
    ContentView,
    ContentIcon,
    IconImage,
    ContentTitle,
    Title,
    ContentPlayerAudio,
    ContentViewTitleCourse,
    TitleCourse,
} from "./styles";

import WebView from "react-native-webview";

import { Loading } from "../Loading";

export interface IProps {
    titleCourse: string;
    contentPodcast: string;
}

export function PodCast({ titleCourse, contentPodcast }: IProps) {

    return (
        <Container>
            <ContentView>
                <ContentIcon>
                    <IconImage source={require('../../assets/images/podcast.png')} />
                </ContentIcon>
                <ContentTitle>
                    <Title>Podcast</Title>
                </ContentTitle>
            </ContentView >
            <ContentPlayerAudio renderToHardwareTextureAndroid={true}>
                <WebView
                    source={{
                        uri: `BASE_URL/${contentPodcast}`,
                        headers: {
                          "Content-Type": "application/json; charset=utf-8",
                        },
                    }}
                    renderLoading={() => <Loading />}
                    startInLoadingState={true}
                    scalesPageToFit={false}
                    androidHardwareAccelerationDisabled={true}
                    sharedCookiesEnabled={true}
                    javaScriptEnabled={true}
                />
            </ContentPlayerAudio>
            <ContentViewTitleCourse>
                <TitleCourse>{titleCourse}</TitleCourse>
            </ContentViewTitleCourse>
        </Container>
    )
}