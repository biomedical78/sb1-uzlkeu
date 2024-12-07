export const SUPABASE_CONFIG = {
  TABLES: {
    PROFILES: 'profiles',
    COURSES: 'courses',
    MODULES: 'modules',
    LESSONS: 'lessons'
  },
  STORAGE: {
    BUCKETS: {
      COURSE_MATERIALS: 'course-materials'
    }
  },
  RLS_POLICIES: {
    PROFILES: {
      SELECT: 'profiles_select_policy',
      UPDATE: 'profiles_update_policy'
    },
    COURSES: {
      SELECT: 'courses_select_policy',
      INSERT: 'courses_insert_policy',
      UPDATE: 'courses_update_policy',
      DELETE: 'courses_delete_policy'
    }
  }
};

export const DB_SCHEMA = {
  FUNCTIONS: `
    -- Function to handle user creation
    create or replace function public.handle_new_user()
    returns trigger as $$
    begin
      insert into public.profiles (id, role)
      values (new.id, 'user');
      return new;
    end;
    $$ language plpgsql security definer;
  `,
  TRIGGERS: `
    -- Trigger for new user creation
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  `,
  POLICIES: `
    -- Profiles policies
    create policy "profiles_select_policy" on profiles
      for select using (auth.uid() = id);
      
    create policy "profiles_update_policy" on profiles
      for update using (auth.uid() = id);

    -- Courses policies
    create policy "courses_select_policy" on courses
      for select using (true);
      
    create policy "courses_insert_policy" on courses
      for insert with check (auth.uid() in (
        select id from profiles where role = 'admin'
      ));
      
    create policy "courses_update_policy" on courses
      for update using (auth.uid() in (
        select id from profiles where role = 'admin'
      ));
      
    create policy "courses_delete_policy" on courses
      for delete using (auth.uid() in (
        select id from profiles where role = 'admin'
      ));
  `
};