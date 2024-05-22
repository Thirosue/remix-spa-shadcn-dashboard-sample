import pino from "pino"; // eslint-disable-line

// マスキングするフィールドを含むオブジェクトの型定義
interface MaskableObject {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
  refreshToken?: string;
  password?: string;
  tel?: string;
  [key: string]: string | number | boolean | undefined; // 他の任意のフィールドも許容
}

// カスタムログメッセージの型定義
interface CustomLogMessage {
  object?: MaskableObject;
  message: string;
}

// マスキングに使用する文字列
const Hidden = "[******]";

// 指定されたフィールドをマスキングする関数
function maskObject(obj: MaskableObject): MaskableObject {
  const fieldsToMask = [
    "id",
    "name",
    "email",
    "token",
    "refreshToken",
    "password",
    "tel",
  ];
  const maskedObj = { ...obj };

  fieldsToMask.forEach((field) => {
    if (field in maskedObj) {
      maskedObj[field] = Hidden;
    }
  });

  return maskedObj;
}

// Pinoロガーの設定
const logger = pino({
  serializers: {
    // objectフィールドのマスキング設定
    object: (obj) => maskObject(obj),
  },
  browser: {
    serialize: ["object"],
  },
});

// ログを出力する関数（カスタム型を使用）
function logMessage(logData: CustomLogMessage) {
  logger.info(logData);
}

export { logMessage };
