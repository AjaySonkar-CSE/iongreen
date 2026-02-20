
import { NextRequest, NextResponse } from "next/server";
import { getDbPool } from "@/lib/db";
import { compare } from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "ion-green-secret-key-change-this-in-env";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password are required" },
                { status: 400 }
            );
        }

        const pool = getDbPool();
        const [rows] = await pool.query(
            "SELECT * FROM admins WHERE email = ? LIMIT 1",
            [email]
        ) as any[];

        const admin = rows[0];

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const passwordMatch = await compare(password, admin.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Update last login
        await pool.query("UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?", [admin.id]);

        // Create JWT token
        const token = await new SignJWT({
            id: admin.id,
            email: admin.email,
            name: admin.name
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(new TextEncoder().encode(JWT_SECRET));

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name
            }
        });

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return NextResponse.json({ success: true, message: "Logged out" });
}
