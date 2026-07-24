import { NextResponse } from "next/server";
import { verifySession } from "../../../../lib/session";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are evaluating a prompt written by a bank relationship manager (RM) trainee.
The trainee was asked to write a single prompt they would give to an AI assistant to draft a
first-pass account plan for a client. You are evaluating the SUBMITTED PROMPT ITSELF -- not
any account plan it might produce.

Score the prompt against two rubrics. For every item, answer true ONLY if the prompt text
clearly and explicitly includes it. Do not give credit for something merely implied or
something a good prompt COULD have included -- only what is actually there.

RUBRIC 1 -- SCOPE prompting best practice:
1. source_pack: Does the prompt specify which source documents or data the AI may use
   (e.g. financials, call memos, RM notes, product holdings)?
2. client_archetype: Does the prompt specify what kind of client this is (private/local,
   public/listed, public sector or SOE, or global/group)?
3. output_format: Does the prompt specify the structure or format of the output (e.g.
   named sections, length, a confidence rating per section)?
4. proof_and_gaps: Does the prompt instruct the AI to cite evidence, flag missing data, or
   avoid inventing unsupported figures, stakeholders, or priorities?
5. escalate_to_action: Does the prompt ask for RM validation questions or a concrete next
   action/follow-up?

RUBRIC 2 -- Account plan coverage. Does the prompt explicitly ask the AI to address each
of these account plan sections?
1. company_overview
2. financial_performance
3. relationships_and_risks
4. strategic_priorities
5. opportunity_pipeline

Return ONLY valid JSON, no other text, no markdown fences, in exactly this shape:
{
  "scope": {"source_pack": boolean, "client_archetype": boolean, "output_format": boolean, "proof_and_gaps": boolean, "escalate_to_action": boolean},
  "sections": {"company_overview": boolean, "financial_performance": boolean, "relationships_and_risks": boolean, "strategic_priorities": boolean, "opportunity_pipeline": boolean},
  "strengths": ["short string", "short string"],
  "gaps": ["short, specific, actionable string", "short, specific, actionable string"],
  "overall_verdict": "one short sentence"
}
Keep "strengths" to at most 3 items and "gaps" to at most 4 items. If the prompt is empty or
nonsensical, mark everything false and say so plainly in overall_verdict.`;

export async function POST(req) {
  const token = req.cookies.get("session")?.value;
  const payload = await verifySession(token);
  if (!payload || !payload.email) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const userPrompt = (body.prompt || "").trim();
  if (!userPrompt) {
    return NextResponse.json({ error: "Please write a prompt first." }, { status: 400 });
  }
  if (userPrompt.length > 4000) {
    return NextResponse.json(
      { error: "That's much longer than a real prompt needs to be. Please shorten it." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI evaluation isn't configured on the server yet." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = msg.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");
    const cleaned = text.replace(/```json|```/g, "").trim();
    const evaluation = JSON.parse(cleaned);

    return NextResponse.json({ ok: true, evaluation });
  } catch (err) {
    console.error("Prompt evaluation failed:", err);
    return NextResponse.json(
      { error: "Couldn't evaluate that right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
