import { SignJWT, jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    // Fallback to a hardcoded string ONLY for dev if not provided.
    console.warn("JWT_SECRET_KEY is not set. Using a fallback secret.");
    return new TextEncoder().encode("air-and-edge-super-secret-fallback-2026");
  }
  return new TextEncoder().encode(secret);
};

export async function signJwtToken(payload: { username: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getJwtSecretKey());
  return token;
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
