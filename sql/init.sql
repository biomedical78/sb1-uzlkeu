-- Enable RLS
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('admin', 'user')) default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create RLS policies
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create function to handle new user creation
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- Create trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to create profiles table
create or replace function create_profiles_table()
returns void
language plpgsql
as $$
begin
  if not exists (select from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    execute '
      create table public.profiles (
        id uuid references auth.users on delete cascade primary key,
        role text check (role in (''admin'', ''user'')) default ''user'',
        created_at timestamp with time zone default timezone(''utc''::text, now()) not null,
        updated_at timestamp with time zone default timezone(''utc''::text, now()) not null
      );
      
      alter table public.profiles enable row level security;
      
      create policy "Public profiles are viewable by everyone."
        on profiles for select
        using ( true );
      
      create policy "Users can insert their own profile."
        on profiles for insert
        with check ( auth.uid() = id );
      
      create policy "Users can update own profile."
        on profiles for update
        using ( auth.uid() = id );
    ';
  end if;
end;
$$;