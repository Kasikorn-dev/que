-- Trigger to automatically create a public.users row when a new auth.users row is inserted

-- 1. Create the Function
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public."user" (id, email, name, image)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create the Trigger
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
