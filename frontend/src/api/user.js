const API_URL = import.meta.env.VITE_BASE_API_URL || "http://localhost:8000";

export async function loginApi(formData) {
    try {
        const url = `${API_URL}/api/v1/auth/token/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const response = await fetch(url, params);
        if (response.status !== 200) {
            throw new Error("Correo o contraseña incorrectos");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function registerApi(formData) {
    try {
        const url = `${API_URL}/api/v1/users/`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        const response = await fetch(url, params);
        if (response.status !== 201) {
            const errData = await response.json();
            throw new Error(JSON.stringify(errData) || "Error al registrar usuario");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getMeApi(token) {
    try {
        const url = `${API_URL}/api/v1/auth/me/`;
        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, params);
        if (response.status !== 200) {
            throw new Error("No se pudo obtener la información del usuario");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}
