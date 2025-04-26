import api from "./index";

type Endpoints = {
    getUsers: () => Promise<APISchema.User[]>
}

// ユーザAPIのエンドポイントを定義
const endpoints: Endpoints = {
    // ユーザ情報を取得
    getUsers: async () => {
        return await api('users')
    }
};

export default endpoints;