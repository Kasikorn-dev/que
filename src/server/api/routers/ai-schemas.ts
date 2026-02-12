import { z } from "zod";

/**
 * Schema สำหรับ Lesson ที่ AI จะ generate
 */
export const lessonSchema = z.object({
	title: z.string().describe("หัวข้อของบทเรียน"),
	description: z.string().describe("คำอธิบายสั้นๆ ของบทเรียน (1-2 ประโยค)"),
	content: z
		.string()
		.describe("เนื้อหาการเรียนรู้แบบ Markdown ที่มีรายละเอียดครบถ้วน (500-1000 คำ)"),
});

/**
 * Schema สำหรับ Course ที่ AI จะ generate
 * ประกอบด้วย title, description และ 5 lessons
 */
export const courseGenerationSchema = z.object({
	title: z.string().describe("ชื่อคอร์สที่สื่อความหมายชัดเจน"),
	description: z
		.string()
		.describe("คำอธิบายคอร์สที่บอกว่าจะได้เรียนรู้อะไรบ้าง (2-3 ประโยค)"),
	lessons: z
		.array(lessonSchema)
		.length(5)
		.describe("บทเรียนทั้งหมด 5 บท เรียงตามลำดับความยากง่าย"),
});

export type Lesson = z.infer<typeof lessonSchema>;
export type CourseGeneration = z.infer<typeof courseGenerationSchema>;
