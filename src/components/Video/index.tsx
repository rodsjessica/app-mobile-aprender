import React, { useState } from "react";

import {
    Container,
    ContentViewTitleCourse,
    TitleCourse,
    ContentVideo,
} from "./styles";

import { WebView } from 'react-native-webview';

import { Loading } from "../Loading";
import { useAuth } from '../../contexts/AuthProvider';

export interface IProps {
    titleCourse: string;
    contentVideo: string;
}

export function Video({ titleCourse, contentVideo }: IProps) {
    const { auth } = useAuth();
    const token = auth?.data.accessToken;
    const [clicked, setClicked] = useState(false);
    const [paused, setPaused] = useState();

    return (
        <Container>
            <ContentVideo renderToHardwareTextureAndroid={true}>
                <WebView
                    source={{
                        uri: `https://player.vimeo.com/video/${contentVideo}`,
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
            </ContentVideo>
            <ContentViewTitleCourse>
                <TitleCourse>{titleCourse}</TitleCourse>
            </ContentViewTitleCourse>
        </Container>
    )
}