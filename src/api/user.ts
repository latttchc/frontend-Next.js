import api from "./index";

// ユーザAPIのエンドポイントを定義
const endpoints = {
    // ユーザ情報を取得
    getUsers: async () => {
        return await api('users')
    }
};

export default endpoints;