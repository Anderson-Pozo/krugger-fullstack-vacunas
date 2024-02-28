import { Inter } from "next/font/google";
import Head from "next/head";
import { EmployeeTable } from "@/components/EmployeeTable";
import { EmployeeForm } from "@/components/EmployeeForm";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const USER_ROL = "ADMINISTRADOR";
  const USER_ROLES = {
    ADMIN: "ADMINISTRADOR",
    // Add other roles as needed
  };
  return (
    <>
      <Head>
        <title>Inicio</title>
        <meta name="description" content="Inicio del sistema" />
      </Head>
      <main
        className={`flex flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {USER_ROL === USER_ROLES.ADMIN ? (
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
    <h1 className="text-lg font-medium mt-4">{title}</h1>
    {children}
  </>
);
