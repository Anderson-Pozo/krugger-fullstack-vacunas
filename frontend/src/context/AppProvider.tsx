import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { IEmployee, ILoginResponse, IUser } from "@/types/definitions";
import { SERVER_URL } from "@/config";
import { AppContext } from "./AppContext";

interface Props {
  children: ReactElement | ReactElement[];
}

export const AppProvider = ({ children }: Props) => {
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/auth/login");
      return;
    }
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const { data, status } = await axios.post<ILoginResponse>(
        `${SERVER_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      if (status === 200) {
        const { token, user } = data;

        setUser(user);
        Cookies.set("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        router.replace("/");
      }
    } catch (error: any) {
      console.error({ error });
      throw new Error("Error al iniciar sesión, intente nuevamente");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(undefined);
    localStorage.removeItem("user");
    router.replace("/auth/login");
  };

  return (
    <AppContext.Provider
      value={{
        selectedEmployee,
        setSelectedEmployee,
        openModal,
        setOpenModal,
        // auth methods and state
        user,
        loginUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
