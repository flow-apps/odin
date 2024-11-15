import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import React, { useEffect, memo, useState } from "react";
import LoadingAnimation from "../../animations/loading.json";
import { AnimationContainer, Container, MessageText } from "./styles";

interface ILoadingProps {
  message: string;
  showInterstitialAd?: boolean;
}

const Loading = ({ message, showInterstitialAd }: ILoadingProps) => {
  return (
    <Container>
      <AnimationContainer source={LoadingAnimation} autoPlay loop />
      <MessageText>{message}</MessageText>
    </Container>
  );
};

export default memo(Loading);
