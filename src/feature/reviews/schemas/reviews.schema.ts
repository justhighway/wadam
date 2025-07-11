import { z } from 'zod';

import {
  AromaTypeEnumSchema,
  wineDetailReviewSchema,
  WineTypeEnumSchema,
} from '@/feature/wines/schema/wine.schema';
import {
  nonEmptyStringSchema,
  nonNegativeNumberSchema,
  positiveNumberSchema,
  urlSchema,
} from '@/shared/schemas/common.schema';

// --- 6. 내 리뷰 목록 조회: GET /{teamId}/users/me/reviews ---

/**
 * @description 내 리뷰 목록에서 사용되는 개별 리뷰 스키마입니다.
 * isLiked 필드가 제외된 버전입니다.
 */
export const myReviewItemSchema = wineDetailReviewSchema.omit({
  isLiked: true,
});

/**
 * @description 와인 정보가 포함된 내 리뷰 아이템 스키마입니다.
 * 클라이언트에서 데이터를 조합한 후 사용됩니다.
 */
export const myReviewWithWineSchema = myReviewItemSchema.extend({
  wine: z.object({
    id: positiveNumberSchema,
    name: nonEmptyStringSchema,
    region: nonEmptyStringSchema,
    image: urlSchema,
    price: nonNegativeNumberSchema,
    avgRating: nonNegativeNumberSchema,
    type: WineTypeEnumSchema,
  }),
});

/**
 * @description [응답] 내 리뷰 목록 조회 API의 전체 응답 객체를 검증합니다.
 */
export const getMyReviewResponseSchema = z.object({
  list: z.array(myReviewWithWineSchema),
  totalCount: nonNegativeNumberSchema,
  nextCursor: positiveNumberSchema.nullable(),
});

/**
 * @description 와인 리뷰 등록 API의 요청 객체를 검증합니다.
 */
export const createReviewRequestSchema = z.object({
  rating: nonNegativeNumberSchema,
  lightBold: nonNegativeNumberSchema,
  smoothTannic: nonNegativeNumberSchema,
  drySweet: nonNegativeNumberSchema,
  softAcidic: nonNegativeNumberSchema,
  aroma: z.array(AromaTypeEnumSchema),
  content: nonEmptyStringSchema,
  wineId: positiveNumberSchema,
});

/**
 * @description 와인 리뷰 수정 API의 요청 객체를 검증합니다.
 */
export const updateReviewRequestSchema = createReviewRequestSchema.omit({
  wineId: true,
});

/**
 * @description 와인 리뷰 수정 API의 응답 객체를 검증합니다.
 * `wine` 객체 없이 순수 리뷰 정보만 포함합니다.
 */
export const updateReviewResponseSchema = myReviewItemSchema;

export type GetMyReviewResponse = z.infer<typeof getMyReviewResponseSchema>;
export type MyReviewWithWine = z.infer<typeof myReviewWithWineSchema>;
export type MyReviewItem = z.infer<typeof myReviewItemSchema>;
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;
export type UpdateReviewRequest = z.infer<typeof updateReviewRequestSchema>;
export type UpdateReviewResponse = z.infer<typeof updateReviewResponseSchema>;
