import { supabase } from '../lib/supabase';
import { DEMO_COURSES } from '../data/demo-courses';
import type { Course } from '../types/course';

export async function initializeDemoCourses() {
  try {
    // Insert demo courses
    for (const course of DEMO_COURSES) {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .upsert({
          id: course.id,
          title: course.title,
          description: course.description,
          category: course.category,
          status: course.status,
          created_at: course.createdAt,
          updated_at: course.updatedAt,
          published_at: course.publishedAt
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Insert modules for each course
      for (const module of course.modules) {
        const { data: moduleData, error: moduleError } = await supabase
          .from('modules')
          .upsert({
            id: module.id,
            course_id: courseData.id,
            title: module.title,
            description: module.description,
            order_index: module.order,
            status: module.status
          })
          .select()
          .single();

        if (moduleError) throw moduleError;

        // Insert lessons for each module
        for (const lesson of module.lessons) {
          const { error: lessonError } = await supabase
            .from('lessons')
            .upsert({
              id: lesson.id,
              module_id: moduleData.id,
              title: lesson.title,
              description: lesson.description,
              content_type: lesson.contentType,
              content: lesson.content,
              file_url: lesson.metadata.videoUrl || lesson.metadata.fileUrl,
              order_index: lesson.order,
              duration: lesson.duration,
              status: lesson.status
            });

          if (lessonError) throw lessonError;
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error initializing demo courses:', error);
    return { success: false, error };
  }
}

export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules:modules (
        *,
        lessons:lessons (*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}