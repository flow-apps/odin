import { check, request, RESULTS } from "react-native-permissions";

export const checkPermission = async (permission: any) => {
  return check(permission).then((res) => {
    if (res === RESULTS.GRANTED) {
      return {
        granted: true,
        requestable: false,
      };
    } else if (res === RESULTS.DENIED) {
      return {
        granted: false,
        requestable: true,
      };
    } else if (res === RESULTS.BLOCKED) {
      return {
        granted: false,
        requestable: false,
      };
    }
  });
};

export const requestPermission = async (permission: any) => {
  return request(permission).then((res) => {
    if (res === RESULTS.GRANTED) {
      return {
        granted: true,
        requestable: false,
      };
    } else if (res === RESULTS.DENIED) {
      return {
        granted: false,
        requestable: true,
      };
    } else if (res === RESULTS.BLOCKED) {
      return {
        granted: false,
        requestable: false,
      };
    }
  });
};
