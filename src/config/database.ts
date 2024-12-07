export const DB_CONFIG = {
  TABLES: {
    COURSES: 'courses',
    MODULES: 'modules',
    LESSONS: 'lessons',
    USER_PROGRESS: 'user_progress',
    FILES: 'files'
  },
  SCHEMAS: {
    COURSES: `
      create table courses (
        id uuid default uuid_generate_v4() primary key,
        title text not null,
        description text,
        category text not null,
        status text default 'draft',
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
        published_at timestamp with time zone
      );
    `,
    MODULES: `
      create table modules (
        id uuid default uuid_generate_v4() primary key,
        course_id uuid references courses on delete cascade,
        title text not null,
        description text,
        order_index integer not null,
        status text default 'draft',
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        updated_at timestamp with time zone default timezone('utc'::text, now()) not null
      );
    `,
    LESSONS: `
      create table lessons (
        id uuid default uuid_generate_v4() primary key,
        module_id uuid references modules on delete cascade,
        title text not null,
        description text,
        content_type text not null,
        content text,
        file_url text,
        order_index integer not null,
        duration integer default 0,
        status text default 'draft',
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        updated_at timestamp with time zone default timezone('utc'::text, now()) not null
      );
    `,
    USER_PROGRESS: `
      create table user_progress (
        id uuid default uuid_generate_v4() primary key,
        user_id uuid references auth.users on delete cascade,
        lesson_id uuid references lessons on delete cascade,
        status text default 'not_started',
        progress integer default 0,
        completed_at timestamp with time zone,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
        unique(user_id, lesson_id)
      );
    `
  }
};