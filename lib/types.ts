export const STATUSES = ["Applied", "Interview HR", "Technical Test", "Interview User", "Offering", "Not Suitable"] as const;
export type RecruitmentStatus = (typeof STATUSES)[number];
