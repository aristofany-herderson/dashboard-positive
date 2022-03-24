import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/router";

type User = {
  id: string;
  name: string;
  year: string;
  picture: string;
};

type LoginContextData = {
  logIn: () => void;
  setPasswordState: (value: string) => void;
  redirectToDashboard: () => void;
  authenticationError: (value: boolean) => void;
  setUserInformationsState: (user: User) => void;
  setSearchTermState: (value: string) => void;
  setThemeState: (value: boolean) => void;
  setLocalStorageTheme: () => void;
  setInitialLocalStorage: () => void;
  setToggleThemeState: () => void;
  userInformations: any;
  isAuthenticationError: boolean;
  searchTerm: string;
  theme: boolean;
  toggleTheme: boolean;
};

export const LoginContext = createContext({} as LoginContextData);

type LoginContextProviderProps = {
  children: ReactNode;
};

export function LoginContextProvider({ children }: LoginContextProviderProps) {
  const [password, setPassword] = useState("");
  const [userInformations, setUserInformations] = useState({} as User);
  const [isAuthenticationError, setisAuthenticationError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [theme, setTheme] = useState(true);
  const [toggleTheme, setToggleTheme] = useState(true);

  const router = useRouter();

  function logIn() {
    router.push(`/${password}`);
  }

  function setPasswordState(value) {
    setPassword(value);
  }

  function redirectToDashboard() {
    router.push(`/dashboard/home/${userInformations.id}`);
  }

  function authenticationError(value) {
    setisAuthenticationError(value);
  }

  function setUserInformationsState(value) {
    setUserInformations(value);
  }

  function setSearchTermState(value) {
    setSearchTerm(value);
  }

  function setThemeState(value) {
    setTheme(value);
  }

  function setLocalStorageTheme() {
    if (
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme").valueOf() == "light"
    ) {
      localStorage.setItem("theme", "dark");
    } else if (localStorage.getItem("theme").valueOf() == "dark") {
      localStorage.setItem("theme", "light");
    }
  }

  function setInitialLocalStorage() {
    if (
      !localStorage.getItem("theme") ||
      localStorage.getItem("theme").valueOf() == "dark"
    ) {
      localStorage.setItem("theme", "light");
    } else if (localStorage.getItem("theme").valueOf() == "light") {
      localStorage.setItem("theme", "dark");
    }
  }

  function setToggleThemeState() {
    setToggleTheme(!toggleTheme);
  }

  return (
    <LoginContext.Provider
      value={{
        logIn,
        setPasswordState,
        redirectToDashboard,
        authenticationError,
        setUserInformationsState,
        setSearchTermState,
        setThemeState,
        setLocalStorageTheme,
        setInitialLocalStorage,
        setToggleThemeState,
        userInformations,
        isAuthenticationError,
        searchTerm,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLogin = () => {
  return useContext(LoginContext);
};
