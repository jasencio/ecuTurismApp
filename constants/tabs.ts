export const TAB_INDICES = {
  APPOINTMENTS: 0,
  LOCATIONS: 1,
  PROFILE: 2,
} as const;

export type TabIndex = typeof TAB_INDICES[keyof typeof TAB_INDICES]; 