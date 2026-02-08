export interface SkillGap {
  skill: string;
  priority: "critical" | "important" | "nice-to-have";
  currentLevel: "none" | "beginner" | "intermediate";
  targetLevel: string;
  estimatedHours: number;
}

export interface LearningResource {
  title: string;
  url: string;
  type: "course" | "documentation" | "tutorial" | "video";
  platform: string;
  isFree: boolean;
}

export interface AnalysisResult {
  skillGaps: SkillGap[];
  existingSkills: string[];
  learningResources: Record<string, LearningResource[]>;
  totalEstimatedHours: number;
  recommendedPath: string[];
}
