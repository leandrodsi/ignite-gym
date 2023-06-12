import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};

export const storageAuthTokenSave = async (tokens: StorageAuthTokenProps) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(tokens));
};

export const storageAuthTokenGet = async () => {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const tokens: StorageAuthTokenProps = storage ? JSON.parse(storage) : {};

  return tokens;
};

export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
