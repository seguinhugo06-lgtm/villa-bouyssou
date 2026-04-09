import { NextRequest, NextResponse } from "next/server";
import { readReviews, addReview, approveReview } from "@/lib/storage";
import type { Review } from "@/lib/db/schema";

/**
 * GET /api/reviews?all=true
 * Returns approved reviews by default. Pass ?all=true for admin to see all.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    const reviews = await readReviews();
    const filtered = showAll ? reviews : reviews.filter((r) => r.approved);

    return NextResponse.json({ reviews: filtered });
  } catch (error) {
    console.error("Read reviews error:", error);
    return NextResponse.json(
      { error: "Failed to read reviews" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews
 * Submit a new review (pending moderation) or approve an existing one.
 * Body for new review: { author, country?, rating, text }
 * Body for approval: { action: "approve", id: "review-id" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Approve action ───────────────────────────────────────────────────
    if (body.action === "approve" && body.id) {
      const updated = await approveReview(body.id);
      if (!updated) {
        return NextResponse.json(
          { error: "Review not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, review: updated });
    }

    // ── Submit new review ────────────────────────────────────────────────
    const { author, country, rating, text } = body as {
      author: string;
      country?: string;
      rating: number;
      text: string;
    };

    if (!author || !rating || !text) {
      return NextResponse.json(
        { error: "Missing required fields: author, rating, text" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const review: Review = {
      id: `review-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      author,
      country: country || "",
      rating,
      date: new Date().toISOString().slice(0, 7), // YYYY-MM
      text,
      approved: false, // pending moderation
    };

    await addReview(review);

    return NextResponse.json({
      success: true,
      message: "Review submitted for moderation",
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
