import { useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { AppContext } from "@/context/AppContext";

interface FormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const { loginUser } = useContext(AppContext);

  const onSubmit = async ({ username, password }: FormData) => {
    try {
      await loginUser(username, password);
      return;
    } catch (error) {
      toast.error("Credenciales incorrectas");
      return;
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Iniciar sesión</title>
        <meta name="description" content="Inicio de sesion" />
      </Head>
      <div className="h-screen flex flex-row justify-center items-center bg-orange-50">
        <div className="flex flex-col gap-y-4 w-1/3 border-2 rounded-lg px-4 py-6 shadow-md">
          <h1 className="text-center text-2xl font-semibold text-orange-500">
            Iniciar sesión
          </h1>
          <InputText
            {...register("username", {
              required: "Este campo es requerido",
              minLength: {
                value: 10,
                message: "Debe tener 10 dígitos",
              },
            })}
            className={classNames(
              { "p-invalid": errors.username },
              "p-inputtext-sm"
            )}
            placeholder="Número de cédula"
            maxLength={10}
            keyfilter="int"
          />
          <span className="text-red-500 text-xs">
            {errors.username?.message}
          </span>
          <InputText
            {...register("password", { required: "Campo requerido" })}
            className={`p-inputtext-sm ${errors.password && "p-invalid"}`}
            type="password"
            placeholder="Contraseña"
          />
          <span className="text-red-500 text-xs">
            {errors.password?.message}
          </span>
          <Button
            label="Ingresar"
            size="small"
            severity="info"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </>
  );
}
