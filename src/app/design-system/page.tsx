import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { primitives, semantic } from "@/styles/tokens"

// ─── Section Wrapper ────────────────────────────────────────────────
function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-8">
      <div className="border-b border-border-default pb-4">
        <h2 className="text-2xl font-semibold text-text-default">{title}</h2>
        {description && (
          <p className="mt-1 text-base text-text-default opacity-60">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

// ─── Code Block ─────────────────────────────────────────────────────
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="rounded-xl bg-neutral-1100 text-neutral-50 text-sm px-5 py-4 overflow-x-auto leading-relaxed">
      <code>{code.trim()}</code>
    </pre>
  )
}

// ─── Color Swatch ───────────────────────────────────────────────────
function ColorSwatch({
  label,
  hex,
}: {
  label: string
  hex: string
}) {
  return (
    <div className="flex flex-col gap-2 min-w-[80px]">
      <div
        className="h-12 w-full rounded-lg border border-border-default shadow-sm"
        style={{ backgroundColor: hex }}
      />
      <p className="text-xs font-medium text-text-default leading-tight">{label}</p>
      <p className="text-xs text-text-default opacity-50 font-mono">{hex}</p>
    </div>
  )
}

// ─── Card (inline, no separate file needed per component rules) ──────
function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-border-default bg-background-default p-6 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  )
}

// ─── Badge ──────────────────────────────────────────────────────────
function Badge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode
  variant?: "neutral" | "positive" | "warning" | "danger" | "brand"
}) {
  const styles = {
    neutral: "bg-background-neutral-tertiary text-text-neutral border-border-neutral",
    positive: "bg-positive-50 text-positive-800 border-positive-200",
    warning: "bg-warning-50 text-warning-950 border-warning-100",
    danger: "bg-danger-50 text-danger-800 border-danger-100",
    brand: "bg-background-brand text-text-brand-onBrand border-border-brand",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const neutralPrimitives = Object.entries(primitives.neutral).map(([key, val]) => ({
    label: `neutral-${key}`,
    hex: val,
  }))

  const statusPrimitives = [
    ...Object.entries(primitives.positive).map(([k, v]) => ({ label: `positive-${k}`, hex: v })),
    ...Object.entries(primitives.warning).map(([k, v]) => ({ label: `warning-${k}`, hex: v })),
    ...Object.entries(primitives.danger).map(([k, v]) => ({ label: `danger-${k}`, hex: v })),
  ]

  const semanticBgGroups = Object.entries(semantic.background).map(([group, values]) => ({
    group,
    swatches: Object.entries(values).map(([key, val]) => ({
      label: key === "DEFAULT" ? group : `${group}-${key}`,
      hex: val,
    })),
  }))

  return (
    <div className="min-h-screen bg-background-default-secondary">
      {/* ── Header ── */}
      <div className="border-b border-border-default bg-background-default sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-1000 flex items-center justify-center">
              <span className="text-neutral-50 text-sm font-bold">DS</span>
            </div>
            <span className="font-semibold text-text-default text-lg">Design System</span>
          </div>
          <Badge variant="brand">v1.0</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-20">

        {/* ── Hero ── */}
        <div className="flex flex-col gap-4 max-w-2xl">
          <h1 className="text-5xl font-bold text-text-default leading-tight">
            디자인 시스템 쇼케이스
          </h1>
          <p className="text-lg text-text-default opacity-60 leading-relaxed">
            Primitive / Semantic 2-tier 토큰 기반으로 구축된 재사용 컴포넌트 라이브러리입니다.
            모든 색상, 간격, 타이포그래피는 <code className="bg-background-neutral-tertiary px-1 py-0.5 rounded text-sm font-mono">tokens.ts</code>에서 관리됩니다.
          </p>
        </div>

        {/* ── 1. Color Palette ── */}
        <Section
          title="1. 색상 팔레트 (Color Palette)"
          description="Primitive(원시 색) → Semantic(용도 기반) 2-tier 구조"
        >
          {/* Primitive - Neutral */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">
              Primitive — Neutral
            </h3>
            <div className="flex flex-wrap gap-4">
              {neutralPrimitives.map(({ label, hex }) => (
                <ColorSwatch key={label} label={label} hex={hex} />
              ))}
            </div>
          </div>

          {/* Primitive - Status */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">
              Primitive — Status (Positive / Warning / Danger)
            </h3>
            <div className="flex flex-wrap gap-4">
              {statusPrimitives.map(({ label, hex }) => (
                <ColorSwatch key={label} label={label} hex={hex} />
              ))}
            </div>
          </div>

          {/* Semantic */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">
              Semantic — Background
            </h3>
            {semanticBgGroups.map(({ group, swatches }) => (
              <div key={group} className="flex flex-col gap-3">
                <p className="text-xs font-mono text-text-default opacity-50">{group}</p>
                <div className="flex flex-wrap gap-4">
                  {swatches.map(({ label, hex }) => (
                    <ColorSwatch key={label} label={label} hex={hex} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 2. Typography ── */}
        <Section title="2. 타이포그래피 (Typography)">
          <div className="flex flex-col gap-6">
            {[
              { size: "text-5xl", weight: "font-bold", label: "Display / Bold", sample: "디자인 시스템" },
              { size: "text-4xl", weight: "font-semibold", label: "Heading 1 / Semibold", sample: "페이지 제목" },
              { size: "text-3xl", weight: "font-semibold", label: "Heading 2 / Semibold", sample: "섹션 타이틀" },
              { size: "text-2xl", weight: "font-medium", label: "Heading 3 / Medium", sample: "카드 헤딩" },
              { size: "text-xl", weight: "font-medium", label: "Heading 4 / Medium", sample: "서브 헤딩" },
              { size: "text-base", weight: "font-normal", label: "Body Base / Regular", sample: "본문 텍스트입니다. 기본 폰트 사이즈와 행간을 확인할 수 있습니다." },
              { size: "text-sm", weight: "font-normal", label: "Body Small / Regular", sample: "소형 텍스트. 부가 설명이나 캡션에 사용됩니다." },
              { size: "text-xs", weight: "font-medium", label: "Caption / Medium", sample: "LABEL / BADGE" },
            ].map(({ size, weight, label, sample }) => (
              <div key={label} className="flex flex-col gap-1 border-b border-border-default pb-6 last:border-0 last:pb-0">
                <p className="text-xs text-text-default opacity-40 font-mono mb-2">{label}</p>
                <p className={`${size} ${weight} text-text-default leading-tight`}>{sample}</p>
              </div>
            ))}
          </div>
          <CodeBlock code={`// 타이포그래피 예시
<h1 className="text-5xl font-bold text-text-default">디자인 시스템</h1>
<p className="text-base font-normal text-text-default opacity-60">본문 텍스트</p>
<span className="text-xs font-medium uppercase tracking-widest">LABEL</span>`} />
        </Section>

        {/* ── 3. Spacing ── */}
        <Section title="3. 스페이싱 스케일 (Spacing)">
          <div className="flex flex-col gap-3">
            {[
              { label: "space-1 (4px)", size: "w-1", px: 4 },
              { label: "space-2 (8px)", size: "w-2", px: 8 },
              { label: "space-3 (12px)", size: "w-3", px: 12 },
              { label: "space-4 (16px)", size: "w-4", px: 16 },
              { label: "space-5 (20px)", size: "w-5", px: 20 },
              { label: "space-6 (24px)", size: "w-6", px: 24 },
              { label: "space-8 (32px)", size: "w-8", px: 32 },
              { label: "space-10 (40px)", size: "w-10", px: 40 },
              { label: "space-12 (48px)", size: "w-12", px: 48 },
              { label: "space-16 (64px)", size: "w-16", px: 64 },
            ].map(({ label, size, px }) => (
              <div key={label} className="flex items-center gap-4">
                <p className="text-xs font-mono text-text-default opacity-50 w-36 shrink-0">{label}</p>
                <div className={`h-5 rounded bg-neutral-1000 ${size}`} style={{ minWidth: px }} />
              </div>
            ))}
          </div>
          <CodeBlock code={`// Tailwind 스페이싱 클래스 예시
<div className="p-4">   // 16px padding
<div className="gap-6">  // 24px gap
<div className="mt-8">   // 32px margin-top`} />
        </Section>

        {/* ── 4. Button Variants ── */}
        <Section title="4. 버튼 (Button Variants)">
          <div className="flex flex-col gap-8">
            {/* Primary */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">Primary</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="medium">Medium Button</Button>
                <Button variant="primary" size="small">Small Button</Button>
                <Button variant="primary" size="medium" disabled>Disabled</Button>
              </div>
              <CodeBlock code={`<Button variant="primary" size="medium">Medium Button</Button>
<Button variant="primary" size="small">Small Button</Button>
<Button variant="primary" size="medium" disabled>Disabled</Button>`} />
            </div>

            {/* Neutral */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">Neutral</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="neutral" size="medium">Medium Button</Button>
                <Button variant="neutral" size="small">Small Button</Button>
                <Button variant="neutral" size="medium" disabled>Disabled</Button>
              </div>
              <CodeBlock code={`<Button variant="neutral" size="medium">Medium Button</Button>
<Button variant="neutral" size="small">Small Button</Button>
<Button variant="neutral" size="medium" disabled>Disabled</Button>`} />
            </div>

            {/* Subtle */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">Subtle</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="subtle" size="medium">Medium Button</Button>
                <Button variant="subtle" size="small">Small Button</Button>
                <Button variant="subtle" size="medium" disabled>Disabled</Button>
              </div>
              <CodeBlock code={`<Button variant="subtle" size="medium">Medium Button</Button>
<Button variant="subtle" size="small">Small Button</Button>
<Button variant="subtle" size="medium" disabled>Disabled</Button>`} />
            </div>
          </div>
        </Section>

        {/* ── 5. Input ── */}
        <Section title="5. 인풋 (Input)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">Default</h3>
              <Input label="이름" description="본명을 입력해 주세요" placeholder="홍길동" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">Error</h3>
              <Input label="이메일" placeholder="example@email.com" hasError error="올바른 이메일 형식이 아닙니다." />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">Disabled</h3>
              <Input label="읽기 전용" placeholder="수정할 수 없습니다" disabled />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-text-default opacity-40">No Label</h3>
              <Input placeholder="라벨 없는 인풋" />
            </div>
          </div>
          <CodeBlock code={`// Default
<Input label="이름" description="본명을 입력해 주세요" placeholder="홍길동" />

// Error
<Input label="이메일" hasError error="올바른 이메일 형식이 아닙니다." />

// Disabled
<Input label="읽기 전용" disabled />`} />
        </Section>

        {/* ── 6. Card ── */}
        <Section title="6. 카드 (Card)">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="flex flex-col gap-3">
                <Badge variant="brand">Brand</Badge>
                <h3 className="text-lg font-semibold text-text-default">기본 카드</h3>
                <p className="text-sm text-text-default opacity-60 leading-relaxed">
                  디자인 시스템의 카드 컴포넌트입니다. 내용을 담는 기본 컨테이너 역할을 합니다.
                </p>
                <Button variant="primary" size="small" className="self-start">자세히 보기</Button>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-3">
                <Badge variant="positive">Positive</Badge>
                <h3 className="text-lg font-semibold text-text-default">성공 카드</h3>
                <p className="text-sm text-text-default opacity-60 leading-relaxed">
                  성공 상태를 나타내는 카드입니다. positive 색상 시스템을 활용합니다.
                </p>
                <Button variant="neutral" size="small" className="self-start">확인</Button>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-3">
                <Badge variant="danger">Danger</Badge>
                <h3 className="text-lg font-semibold text-text-default">위험 카드</h3>
                <p className="text-sm text-text-default opacity-60 leading-relaxed">
                  위험 또는 오류 상태를 나타내는 카드입니다. danger 색상 시스템을 활용합니다.
                </p>
                <Button variant="subtle" size="small" className="self-start">닫기</Button>
              </div>
            </Card>
          </div>
          <CodeBlock code={`// Card 컴포넌트 (src/components/ui/의 패턴 참고)
<div className="rounded-2xl border border-border-default bg-background-default p-6 shadow-sm">
  <Badge variant="brand">Brand</Badge>
  <h3 className="text-lg font-semibold text-text-default">제목</h3>
  <p className="text-sm text-text-default opacity-60">설명 텍스트</p>
  <Button variant="primary" size="small">버튼</Button>
</div>`} />
        </Section>

        {/* ── 7. Badge ── */}
        <Section title="7. 뱃지 (Badge)">
          <div className="flex flex-wrap gap-3">
            <Badge variant="brand">Brand</Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="positive">Positive</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
          <CodeBlock code={`<Badge variant="brand">Brand</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="positive">Positive</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>`} />
        </Section>

        {/* ── 8. Token Usage Guide ── */}
        <Section title="8. 토큰 사용 가이드" description="Semantic 토큰을 우선적으로 사용하세요">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-danger-800">❌ 금지</p>
                <CodeBlock code={`// arbitrary value 금지
bg-[#2c2c2c]
text-[#1e1e1e]
border-[#d9d9d9]`} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-positive-800">✅ 권장</p>
                <CodeBlock code={`// Semantic 토큰 사용
bg-background-brand
text-text-default
border-border-default`} />
              </div>
            </Card>
          </div>
          <div className="rounded-xl bg-background-neutral-tertiary p-5 flex flex-col gap-3">
            <p className="text-sm font-semibold text-text-default">📁 파일 구조</p>
            <CodeBlock code={`src/
├── styles/
│   └── tokens.ts         # Primitive + Semantic 토큰 정의
├── components/
│   ├── ui/               # 원자 컴포넌트 (Button, Input 등)
│   └── sections/         # 레이아웃 섹션 (Header, Footer 등)
└── app/
    └── design-system/
        └── page.tsx       # 이 페이지`} />
          </div>
        </Section>

      </div>

      {/* ── Footer ── */}
      <div className="border-t border-border-default bg-background-default mt-20">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
          <p className="text-sm text-text-default opacity-40">Design System v1.0 — Built with tokens.ts</p>
          <Badge variant="neutral">Figma → Code</Badge>
        </div>
      </div>
    </div>
  )
}
