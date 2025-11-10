import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export function createJwtToken(
  id: string,
  email: string,
  role: string
): string {
  const jwtSecret = process.env.JWT_SECRET!;

  const token = jwt.sign({ id: id, email: email, role: role }, jwtSecret);
  return token;
}

export function verifyJwtToken(
  token: string,
  role?: string
): JwtPayload | null {
  const jwtSecret = process.env.JWT_SECRET!;
  if (token == null) {
    return null;
  }
  if (token && token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  const decoded = jwt.verify(token, jwtSecret);
  if (decoded == null) {
    return null;
  }
  const payload = decoded as JwtPayload;
  if (role && payload.role !== role) {
    return null;
  }
  return payload;
}

