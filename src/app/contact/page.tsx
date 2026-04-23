"use client"

import * as React from "react"
import { CheckCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { submitContactInquiry } from "@/lib/api/contact"

// ─── 한글 이름 유효성 검사 ──────────────────────────────────────────
const isKoreanName = (value: string) =>
  /^[가-힣\s]{2,20}$/.test(value.trim())

// ─── 상태 타입 ──────────────────────────────────────────────────────
type SubmitState = "idle" | "submitting" | "success" | "error"

export default function ContactPage() {
  const [name, setName] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [touched, setTouched] = React.useState({ name: false, message: false })
  const [submitState, setSubmitState] = React.useState<SubmitState>("idle")
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  // ── 유효성 ──
  const nameError = touched.name && name.length > 0 && !isKoreanName(name)
    ? "한글 이름만 입력 가능합니다 (2~20자)"
    : undefined

  const isNameValid = isKoreanName(name)
  const isMessageValid = message.trim().length >= 10

  // 버튼 활성화 조건: 이름+내용 모두 유효
  const canSubmit = isNameValid && isMessageValid

  // ── 제출 핸들러 ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, message: true })
    if (!canSubmit) return

    setSubmitState("submitting")
    setSubmitError(null)

    const result = await submitContactInquiry({ name, message })

    if (!result.success) {
      setSubmitError(result.error ?? "오류가 발생했습니다.")
      setSubmitState("error")
    } else {
      setSubmitState("success")
    }
  }

  // ── 재작성 핸들러 ──
  const handleReset = () => {
    setName("")
    setMessage("")
    setTouched({ name: false, message: false })
    setSubmitState("idle")
    setSubmitError(null)
  }

  return (
    <div className="min-h-screen bg-background-default-secondary flex flex-col">
      {/* ── Top Bar ── */}
      <div className="border-b border-border-default bg-background-default">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-neutral-1000 flex items-center justify-center transition-opacity group-hover:opacity-80">
              <span className="text-neutral-50 text-sm font-bold">F</span>
            </div>
            <span className="font-semibold text-text-default text-base">홈으로</span>
          </Link>
          <span className="text-sm text-text-default opacity-40">고객 문의</span>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          {/* ── Success State ── */}
          {submitState === "success" ? (
            <div className="flex flex-col items-center gap-6 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-positive-50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-positive-500" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-text-default">
                  문의가 접수되었습니다!
                </h1>
                <p className="text-base text-text-default opacity-60 leading-relaxed">
                  빠른 시일 내에 답변드리겠습니다.
                </p>
              </div>
              <Button variant="neutral" size="medium" onClick={handleReset}>
                새 문의 작성하기
              </Button>
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="text-3xl font-bold text-text-default leading-tight">
                  고객 문의
                </h1>
                <p className="text-base text-text-default opacity-60 leading-relaxed">
                  궁금하신 점이나 불편한 사항을 남겨주세요.
                  <br />
                  빠르게 확인하고 답변드리겠습니다.
                </p>
              </div>

              {/* ── Form ── */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-6"
              >
                {/* 이름 */}
                <Input
                  label="이름 (한글)"
                  description="실명을 한글로 입력해 주세요"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  hasError={!!nameError}
                  error={nameError}
                  autoComplete="name"
                />

                {/* 문의 내용 */}
                <Textarea
                  label="문의 내용"
                  description="10자 이상 입력해 주세요"
                  placeholder="문의하실 내용을 자유롭게 작성해 주세요."
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  hasError={touched.message && !isMessageValid}
                  error={
                    touched.message && !isMessageValid
                      ? `최소 10자 이상 입력해 주세요 (현재 ${message.trim().length}자)`
                      : undefined
                  }
                />

                {/* 글자 수 카운터 */}
                <div className="flex justify-end -mt-3">
                  <span
                    className={cn(
                      "text-xs font-mono transition-colors",
                      message.trim().length >= 10
                        ? "text-positive-600"
                        : "text-text-default opacity-40"
                    )}
                  >
                    {message.trim().length}자
                  </span>
                </div>

                {/* 서버 오류 메시지 */}
                {submitState === "error" && submitError && (
                  <div className="rounded-lg bg-danger-50 border border-danger-200 px-4 py-3">
                    <p className="text-sm text-danger-800">{submitError}</p>
                  </div>
                )}

                {/* 제출 버튼 — 상태에 따라 variant, disabled, 텍스트 변경 */}
                <Button
                  type="submit"
                  variant={canSubmit ? "primary" : "neutral"}
                  size="medium"
                  disabled={submitState === "submitting"}
                  className="w-full"
                  iconEnd={
                    submitState === "submitting" ? (
                      <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : canSubmit ? (
                      <Send className="size-4" />
                    ) : undefined
                  }
                >
                  {submitState === "submitting"
                    ? "제출 중..."
                    : canSubmit
                    ? "문의 제출하기"
                    : "내용을 입력해 주세요"}
                </Button>

                {/* 상태 안내 문구 */}
                {!canSubmit && (
                  <ul className="flex flex-col gap-1">
                    {!isNameValid && (
                      <li className="flex items-center gap-2 text-sm text-text-default opacity-50">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            name.length > 0 && isKoreanName(name)
                              ? "bg-positive-500"
                              : "bg-neutral-400"
                          )}
                        />
                        한글 이름 입력 (2~20자)
                      </li>
                    )}
                    {!isMessageValid && (
                      <li className="flex items-center gap-2 text-sm text-text-default opacity-50">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            message.trim().length >= 10
                              ? "bg-positive-500"
                              : "bg-neutral-400"
                          )}
                        />
                        문의 내용 10자 이상 입력
                      </li>
                    )}
                  </ul>
                )}
              </form>
            </>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
      <div className="border-t border-border-default bg-background-default">
        <div className="max-w-2xl mx-auto px-6 py-5">
          <p className="text-sm text-text-default opacity-40 text-center">
            © 2026 Figma Clone. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
