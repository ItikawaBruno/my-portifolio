import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: "bruno.itikawa@gmail.com",
      subject: `Nova mensagem de ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #18181b;">Nova mensagem do portfólio</h2>
          <hr style="border: 1px solid #e4e4e7;" />
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="background: #f4f4f5; padding: 16px; border-radius: 8px;">${message}</p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao enviar email." },
      { status: 500 }
    )
  }
}
