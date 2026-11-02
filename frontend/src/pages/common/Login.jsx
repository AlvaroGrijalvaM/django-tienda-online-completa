import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginApi } from "../../api/user";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Correo no válido").required("El correo es obligatorio"),
            password: Yup.string().required("La contraseña es obligatoria"),
        }),
        onSubmit: async (formValues) => {
            try {
                const response = await loginApi(formValues);
                const { access } = response;
                await login(access);
                toast.success("¡Bienvenido al sistema!");
                navigate("/dashboard");
            } catch (error) {
                toast.error(error.message || "Correo o contraseña incorrectos");
            }
        },
    });

    return (
        <div className="login-admin">
            <div className="login-admin__content">
                <h1>Iniciar Sesión</h1>
                <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <label>Correo Electrónico</label>
                        <Form.Input
                            name="email"
                            placeholder="ejemplo@correo.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.errors.email && { content: formik.errors.email }}
                        />
                    </div>
                    <div className="field">
                        <label>Contraseña</label>
                        <Form.Input
                            name="password"
                            type="password"
                            placeholder="Tu contraseña"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password && { content: formik.errors.password }}
                        />
                    </div>
                    <Button type="submit" primary fluid content="Iniciar Sesión" />
                </Form>
                <Link to="/register" className="auth-switch-link">
                    ¿No tienes una cuenta? Regístrate aquí
                </Link>
            </div>
        </div>
    );
}

