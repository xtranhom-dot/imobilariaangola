import { db } from "../server/db";
import { users } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  const email = "imobiliarioangola@admin.com";
  const password = "Imobiliario909192";
  const hashedPassword = await hashPassword(password);

  try {
    const [admin] = await db
      .insert(users)
      .values({
        username: "Admin Angola Imobiliária",
        email: email,
        password: hashedPassword,
        role: "admin",
      })
      .returning();

    console.log("Admin user created successfully!");
    console.log("Email:", email);
    console.log("ID:", admin.id);
    process.exit(0);
  } catch (error: any) {
    if (error.code === "23505") {
      console.log("Admin user already exists with this email.");
      process.exit(0);
    }
    console.error("Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
