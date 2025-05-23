import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const BACKEND_URL = process.env.BACKEND_BASE_URL || "http://localhost:3000";

// export async function GET(req: NextRequest) {
//   // Forward cookies for authentication
//   const cookie = req.headers.get("cookie") || "";
//   const res = await fetch(`${BACKEND_URL}/api/profile`, {
//     headers: { cookie },
//     credentials: "include",
//   });
//   const data = await res.json();
//   return new NextResponse(JSON.stringify(data), {
//     status: res.status,
//     headers: { "Content-Type": "application/json" },
//   });
// }

export async function getUserProfile() {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BACKEND_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });
  return res.data;
}

export async function updateUserProfile(req: NextRequest) {
  const body = await req.text();
  const token = localStorage.getItem("token");
  const res = await axios.patch(`${BACKEND_URL}/api/user/profile`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
