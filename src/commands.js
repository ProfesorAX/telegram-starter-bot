
import { InlineKeyboard } from "grammy"

const deleteUrl = "https://my.telegram.org/auth?to=delete"

export function registerCommands(bot) {
  bot.command("start", async (ctx) => {
    await ctx.reply(
      "أهلًا بك في DeleteSafe 🛡️\n\n" +
        "يساعدك هذا البوت على الوصول إلى صفحة حذف حساب تيليجرام الرسمية.\n\n" +
        "⚠️ حذف الحساب نهائي وقد يؤدي إلى فقدان بياناتك ومحادثاتك. لن نطلب منك كلمة المرور أو رمز تسجيل الدخول.",
      {
        reply_markup: new InlineKeyboard()
          .url("🔗 فتح صفحة الحذف الرسمية", deleteUrl)
          .row()
          .text("📋 خطوات الحذف", "steps"),
      },
    )
  })

  bot.command("help", (ctx) =>
    ctx.reply(
      "الأوامر المتاحة:\n" +
        "/start — بدء الاستخدام\n" +
        "/help — المساعدة\n" +
        "/delete — الوصول إلى صفحة الحذف الرسمية\n\n" +
        "لا ترسل إلى البوت كلمات المرور أو رموز تسجيل الدخول.",
    ),
  )

  bot.command("delete", (ctx) =>
    ctx.reply(
      "هل أنت مستعد للانتقال إلى صفحة تيليجرام الرسمية؟\n\n" +
        "راجع آثار الحذف قبل المتابعة. إكمال الحذف يتم على موقع تيليجرام، وليس داخل هذا البوت.",
      {
        reply_markup: new InlineKeyboard()
          .url("متابعة إلى تيليجرام الرسمي", deleteUrl)
          .row()
          .text("📋 خطوات الحذف", "steps"),
      },
    ),
  )

  bot.callbackQuery("steps", async (ctx) => {
    await ctx.answerCallbackQuery()
    await ctx.reply(
      "خطوات الحذف:\n\n" +
        "1. افتح صفحة تيليجرام الرسمية من الزر.\n" +
        "2. أدخل رقم هاتفك واتبع تعليمات التحقق على موقع تيليجرام الرسمي.\n" +
        "3. راجع التحذيرات وأكمل الحذف فقط إذا كنت متأكدًا.\n\n" +
        "لا تشارك رمز التحقق مع أي شخص أو بوت.",
      {
        reply_markup: new InlineKeyboard().url(
          "فتح صفحة الحذف الرسمية",
          deleteUrl,
        ),
      },
    )
  })

  bot.command("ping", (ctx) => ctx.reply("البوت يعمل ✅"))

  bot.on("message:text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) return

    await ctx.reply(
      "استخدم /start لعرض الخيارات، أو /delete للوصول إلى صفحة الحذف الرسمية.",
    )
  })
}
