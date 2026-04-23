import { supabase } from "@/lib/supabase"

export interface ContactInquiry {
  name: string
  message: string
}

export interface ContactInsertResult {
  success: boolean
  error?: string
}

/**
 * 고객 문의를 contact_inquiries 테이블에 저장합니다.
 */
export async function submitContactInquiry(
  data: ContactInquiry
): Promise<ContactInsertResult> {
  const { error } = await supabase
    .from("contact_inquiries")
    .insert({ name: data.name.trim(), message: data.message.trim() })

  if (error) {
    return {
      success: false,
      error: "제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    }
  }

  return { success: true }
}
