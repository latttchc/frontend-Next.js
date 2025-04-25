// 各ドメインごとのAPIエンドポイントを統合するオブジェクト
// ここではユーザー関連のエンドポイント（userEndpoints）を users にまとめている

import userEndpoints from './user';

const endpoints = {
    users: userEndpoints, // ユーザーAPIエンドポイント群（/user 系）
};

export default endpoints;
