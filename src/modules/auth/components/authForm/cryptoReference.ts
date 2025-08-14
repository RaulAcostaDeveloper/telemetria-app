// Archivo server action
"use server";
import { randomBytes, createCipheriv } from "crypto";
// funciones adicionales que existen pero no se usarán en este momento:
// import {createDecipheriv, scryptSync} from "crypto"

/*
// Cifra un texto en AES-CBC con PKCS7 y devuelve Base64(IV || CIPHERTEXT).
// @param plainText Texto plano (UTF-8).
// @param key Clave de 16, 24 o 32 bytes (AES-128/192/256).
*/

export default async function encryptAesCbc(plainText: string) {
  //process.env.AES_TOKEN está disponible solo para el servidor, en el cliente o navegador no.
  //se configura creando archivo en raiz .env.local
  if (process.env.AES_TOKEN) {
    const key: Buffer = Buffer.from(process.env.AES_TOKEN, "utf8");
    if (![16, 24, 32].includes(key.length)) {
      throw new Error("La clave debe tener 16, 24 o 32 bytes");
    }

    const iv = randomBytes(16); // equivalente a aes.GenerateIV()
    const cipher = createCipheriv(`aes-${key.length * 8}-cbc`, key, iv); // PKCS7 por defecto

    const ciphertext = Buffer.concat([
      cipher.update(plainText, "utf8"),
      cipher.final(),
    ]);
    const ivPlusCiphertext = Buffer.concat([iv, ciphertext]);

    return ivPlusCiphertext.toString("base64"); // equivalente a Convert.ToBase64String(ms.ToArray())
  } else {
    return "";
  }
}

// ⚠️ Usa la clave como bytes UTF-8 (igual que en C# si hacías Encoding.UTF8.GetBytes)
//const key = Buffer.from("^epc8xtv_f))nw1XwTwN}G=v0n.4)t2z", "utf8");
//const b64 = encryptAesCbc("demottlrx:123456", key);
//console.log(b64);
