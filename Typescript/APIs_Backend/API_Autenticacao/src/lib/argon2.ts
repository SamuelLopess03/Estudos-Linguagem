import argon2 from "argon2";

export async function hash(password: string): Promise<string> {
  try {
    return await argon2.hash(password);
  } catch (error) {
    console.error("Erro ao gerar hash da senha:", error);
    throw new Error("Falha ao proteger a senha.");
  }
}

export async function verify(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    console.error("Erro ao verificar a senha:", error);
    throw new Error("Falha ao verificar a senha.");
  }
}
