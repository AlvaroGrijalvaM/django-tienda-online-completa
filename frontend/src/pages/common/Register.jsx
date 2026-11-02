import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerApi } from "../../api/user";
import { useNavigate, Link } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            password_confirm: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("El nombre de usuario es obligatorio")
                .matches(/^\S*$/, "El username no debe contener espacios"),
            email: Yup.string()
                .email("Correo no válido")
                .required("El correo es obligatorio"),
            password: Yup.string()
                .required("La contraseña es obligatoria")
                .min(6, "Debe tener al menos 6 caracteres"),
            password_confirm: Yup.string()
                .required("Confirma tu contraseña")
                .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
        }),
        onSubmit: async (formValues) => {
            try {
                const dataToSend = {
                    username: formValues.username,
                    email: formValues.email,
                    password: formValues.password,
                };
                await registerApi(dataToSend);
                toast.success("¡Registro completado! Ahora puedes iniciar sesión.");
                navigate("/login");
            } catch (error) {
                toast.error(error.message || "Error al registrarse. Verifica los datos.");
            }
        },
    });

    return (
        <div className="register-admin">
            <div className="login-admin__content">
                <h1>Registro de Usuario</h1>
                <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <label>Nombre de Usuario</label>
                        <Form.Input
                            name="username"
                            placeholder="Ej. juanperez"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.errors.username && { content: formik.errors.username }}
                        />
                    </div>
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
                            placeholder="Mínimo 6 caracteres"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.errors.password && { content: formik.errors.password }}
                        />
                    </div>
                    <div className="field">
                        <label>Confirmar Contraseña</label>
                        <Form.Input
                            name="password_confirm"
                            type="password"
                            placeholder="Repite la contraseña"
                            value={formik.values.password_confirm}
                            onChange={formik.handleChange}
                            error={formik.errors.password_confirm && { content: formik.errors.password_confirm }}
                        />
                    </div>
                    <Button type="submit" primary fluid content="Crear Cuenta" />
                </Form>
                <Link to="/login" className="auth-switch-link">
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
            </div>
        </div>
    );
}

