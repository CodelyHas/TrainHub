import {
  randomBytes,
  createCipheriv,
  createDecipheriv,
  createHmac,
} from "node:crypto";

const ALGORITHM = "aes-256-gcm";

const getEncryptionKey = (): Buffer => {
  const keyHex = process.env.ENCRYPTION_KEY;

  if (!keyHex || keyHex.length !== 64) {
    throw new Error("ENCRYPTION_KEY must be a 64-character hex string in .env");
  }

  return Buffer.from(keyHex, "hex");
};

export const encryptNationalId = (plainText: string): string => {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText.trim(), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decryptNationalId = (cipherText: string): string => {
  const parts = cipherText.split(":");

  if (parts.length !== 3) {
    return cipherText;
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = getEncryptionKey();

  const decipher = createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivHex, "hex")
  );
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};

export const hashNationalId = (plainText: string): string => {
  const key = getEncryptionKey();
  return createHmac("sha256", key)
    .update(plainText.trim())
    .digest("hex");
};