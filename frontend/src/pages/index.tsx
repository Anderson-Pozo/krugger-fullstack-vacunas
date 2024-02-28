import { Inter } from "next/font/google";
import Head from "next/head";
import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeForm } from "@/components/EmployeeForm";
import { ReactNode, useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { USER_ROLES } from "@/constants/user";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Navbar } from "@/components/Navbar";
import { getEmployeByDni } from "@/service/employee";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { user, setSelectedEmployee } = useContext(AppContext);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    if (user?.role === USER_ROLES.EMPLOYEE) {
      getEmployeByDni(user?.username).then((resp) => {
        if (resp.status === 200) setSelectedEmployee(resp.data);
      });
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Inicio</title>
        <meta name="description" content="Inicio del sistema" />
      </Head>
      <Navbar />
      <main
        className={`flex flex-col items-center justify-between p-4 ${inter.className}`}
      >
        {user?.role === USER_ROLES.ADMIN ? (
          <Content title="Empleados">
            <EmployeeTable />
          </Content>
        ) : (
          <Content title="Actualizar información">
            <EmployeeForm />
          </Content>
        )}
      </main>
    </>
  );
}

const Content = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode | ReactNode[];
}) => (
  <>
    <h1 className="text-lg font-medium my-4">{title}</h1>
    {children}
  </>
);
