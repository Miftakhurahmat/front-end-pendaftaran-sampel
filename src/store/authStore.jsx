import { create } from "zustand";
import api from "../api";

const useAuthStore = create((set) => ({
  name: null,
  email: null,
  token: null,
  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      set({ token: response.data.access_token });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Error dari server (status code bukan 2xx)
        console.log("registration failed:", error.response.data);
      } else if (error.request) {
        // Tidak ada respon dari server
        console.log("No Response from Server");
      } else {
        // Error lainnya
        console.log("Error:", error.message);
      }
      throw error;
    }
  },
  login: async (userData) => {
    try {
      const response = await api.post("/login", userData);
      set({ token: response.data.data.token, name: response.data.data.name });
      console.log("response authStore", response.data.data);
      sessionStorage.setItem("token", response.data.token);
    } catch (error) {
      if (error.response) {
        // Error dari server (status code bukan 2xx)
        console.log("Server Error:", error.response.data);
      } else if (error.request) {
        // Tidak ada respon dari server
        console.log("No Response from Server");
      } else {
        // Error lainnya
        console.log("Error:", error.message);
      }
      throw error;
    }
  },
  logout: async () => {
    const { id, token } = useAuthStore.getState();
    try {
      const response = await api.post(
        "/logout",
        { user_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await AsyncStorage.clear();
      return response;
    } catch (error) {
      console.log("error logout", error);
    }
  },
  getMe: async () => {
    try {
      const token = await useAuthStore.getState().token;
      const response = await api.post("/me", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
        role: response.data.role,
        gender: response.data.gender,
        phone: response.data.phone,
        id: response.data.id,
      });
      AsyncStorage.setItem("role", response.data.role);
    } catch (error) {
      // console.error('Failed to get role', error);
      throw error;
    }
  },
  fetchDataOrders: async () => {
    const access_token = await useAuthStore.getState().token;
    try {
      const responseWaiting = await api.get("/waiting", {
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${access_token}`,
        },
      });
      const responseProcess = await api.get("/process", {
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${access_token}`,
        },
      });
      set({
        dataWaitingOrders: responseWaiting.data.data,
        dataProcessOrders: responseProcess.data.data,
      });
    } catch (error) {
      // console.error('get datas', error);
      throw error;
    }
  },
}));

export default useAuthStore;
