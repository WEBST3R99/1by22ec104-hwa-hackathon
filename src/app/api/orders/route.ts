import { NextResponse } from "next/server";

interface CartItem {
  kitId: string;
  kitName: string;
  price: number;
  pods: number;
  color: string;
  chew: string;
  scentRefill: boolean;
  qty: number;
}

interface Shipping {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface OrderBody {
  items: CartItem[];
  shipping: Shipping;
  subtotal: number;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body: OrderBody = await req.json();

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const { shipping } = body;
    const ship = shipping as unknown as Record<string, unknown>;
    const required = ["name", "email", "address", "city", "state", "zip", "phone"];
    for (const field of required) {
      const val = ship[field];
      if (typeof val !== "string" || val.trim() === "") {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    if (!validateEmail(String(ship.email))) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    for (const item of body.items) {
      if (
        typeof item.price !== "number" ||
        typeof item.qty !== "number" ||
        item.qty < 1 ||
        !item.kitName
      ) {
        return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
      }
    }

    const orderId = "ST" + Math.random().toString(36).slice(2, 10).toUpperCase();

    return NextResponse.json({
      ok: true,
      orderId,
      status: "confirmed",
      email: String(ship.email),
      total: body.subtotal,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
