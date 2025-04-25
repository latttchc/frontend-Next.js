import api from "./index";

// ユーザAPIのエンドポイントを定義
const endpoints = {
    // ユーザ情報を取得
    getUser: async () => {
        return await api('user')
    },
};

export default endpoints;