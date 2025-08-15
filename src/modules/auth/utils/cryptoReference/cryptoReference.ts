// Archivo server action
"use server";
import { randomBytes, createCipheriv } from "crypto";

/*
// Cifra un texto en AES-CBC con PKCS7 y devuelve Base64(IV || CIPHERTEXT).
// @param plainText Texto plano (UTF-8).
// @param key Clave de 16, 24 o 32 bytes (AES-128/192/256).
*/

export default async function encryptUserAndPassword(userAndPassword: string) {
  if (process.env.AES_TOKEN) {
    const key: Buffer = Buffer.from(process.env.AES_TOKEN, "utf8");
    if (![16, 24, 32].includes(key.length)) {
      throw new Error("La clave debe tener 16, 24 o 32 bytes");
    }

    const iv = randomBytes(16); // equivalente a aes.GenerateIV()
    const cipher = createCipheriv(`aes-${key.length * 8}-cbc`, key, iv); // PKCS7 por defecto

    const ciphertext = Buffer.concat([
      cipher.update(userAndPassword, "utf8"),
      cipher.final(),
    ]);
    const ivPlusCiphertext = Buffer.concat([iv, ciphertext]);

    return ivPlusCiphertext.toString("base64"); // equivalente a Convert.ToBase64String(ms.ToArray())
  } else {
    return undefined;
  }
}
