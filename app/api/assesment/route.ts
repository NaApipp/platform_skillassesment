import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

// Format date to "DD/MM/YYYY HH:MM:SS"  For Message Date
function formatDateWIB(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  return `${map.day}/${map.month}/${map.year} ${map.hour}:${map.minute}:${map.second}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullname, nim, answers, scores, quadrant, recommendations } = body;

    if (!fullname || !nim) {
      return NextResponse.json(
        { errorCode: "BAD_REQUEST", message: "Nama dan NIM wajib diisi" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "platform_assesment");
    const collection = db.collection("students_submissions");

    const formattedDate = formatDateWIB(new Date());

    const result = await collection.insertOne({
      identity: {
        fullname: fullname.trim(),
        nim: nim.trim(),
      },
      answers: answers || {},
      scores: scores || {},
      quadrant: quadrant || "",
      recommendations: recommendations || [],
      createdAt: new Date(),
      createdAtWIB: formattedDate
    });

    return NextResponse.json(
      {
        success: true,
        id: result.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/assesment:", error);

    return NextResponse.json(
      {
        errorCode: "SERVER_ERROR",
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page   = Math.max(1, parseInt(searchParams.get("page")  ?? "1", 10));
    const limit  = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10)));
    const nim      = searchParams.get("nim")      ?? "";
    const fullname = searchParams.get("fullname") ?? "";

    const client = await clientPromise;
    const db     = client.db(process.env.MONGODB_DB || "platform_assesment");
    const collection = db.collection("students_submissions");

    // Build filter
    const filter: Record<string, unknown> = {};
    if (nim)      filter["identity.nim"]      = { $regex: nim,      $options: "i" };
    if (fullname) filter["identity.fullname"] = { $regex: fullname, $options: "i" };

    const [total, data] = await Promise.all([
      collection.countDocuments(filter),
      collection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
    ]);

    return NextResponse.json(
      {
        success: true,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/assesment:", error);
    return NextResponse.json(
      { errorCode: "SERVER_ERROR", message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}