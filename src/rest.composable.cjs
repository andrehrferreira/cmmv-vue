import { ref } from 'vue';
import { useRouter } from "vue-router";

export function useApi() {
    const router = useRouter();
    const user = ref<any>(null);
    const token = ref<string | null>(localStorage.getItem("token") || null);
    const isAuthenticated = computed(() => !!token.value);

    const authRequest = async (path, method, payload) => {
        try {
            const response = await fetch(`${API_URL}/${path}`, {
                method: method,
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    const login = async (credentials) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("token", data.token);
                token.value = data.token;
                user.value = data.user;
                return { success: true, user: data.user };
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        token.value = null;
        user.value = null;
        router.push("/login");
    };

    const methods = {
        //%API_FUNCTIONS_COMPOSABLE%
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        fetchUser,
        ...methods
    };
}