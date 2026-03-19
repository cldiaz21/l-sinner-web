-- Buckets (crear en Storage):
-- - wallpaper (public)
-- - comic (public)
-- - gallery (public)
--
-- Rutas recomendadas (object keys):
-- wallpaper/<timestamp>_<filename>
-- comic/icon/<timestamp>_<filename>
-- comic/pages/<sort_order>_<timestamp>_<filename>
-- gallery/items/<type>/<timestamp>_<filename>

-- Extensiones
create extension if not exists "pgcrypto";

-- Tabla profiles (para rol admin)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Tabla site_config (key/value)
create table if not exists public.site_config (
  key text primary key,
  value text null
);

alter table public.site_config enable row level security;

-- Tabla comic_pages
create table if not exists public.comic_pages (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null,
  image_url text not null,
  created_at timestamptz not null default now()
);

create index if not exists comic_pages_sort_order_idx on public.comic_pages(sort_order);
alter table public.comic_pages enable row level security;

-- Tabla gallery_items
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('image','video')),
  url text not null,
  title text null,
  sort_order int not null,
  created_at timestamptz not null default now()
);

create index if not exists gallery_items_sort_order_idx on public.gallery_items(sort_order);
alter table public.gallery_items enable row level security;

-- Policies: lectura pública (web pública)
drop policy if exists "public read site_config" on public.site_config;
create policy "public read site_config"
on public.site_config
for select
to anon, authenticated
using (true);

drop policy if exists "public read comic_pages" on public.comic_pages;
create policy "public read comic_pages"
on public.comic_pages
for select
to anon, authenticated
using (true);

drop policy if exists "public read gallery_items" on public.gallery_items;
create policy "public read gallery_items"
on public.gallery_items
for select
to anon, authenticated
using (true);

-- Policies: escritura solo admin (si alguna vez escribes desde auth, no service role)
-- Nota: Service Role bypass RLS, pero dejamos RLS correcta igualmente.

drop policy if exists "admin write site_config" on public.site_config;
create policy "admin write site_config"
on public.site_config
for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
);

drop policy if exists "admin update site_config" on public.site_config;
create policy "admin update site_config"
on public.site_config
for update
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
);

drop policy if exists "admin write comic_pages" on public.comic_pages;
create policy "admin write comic_pages"
on public.comic_pages
for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
);

drop policy if exists "admin delete comic_pages" on public.comic_pages;
create policy "admin delete comic_pages"
on public.comic_pages
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
);

drop policy if exists "admin write gallery_items" on public.gallery_items;
create policy "admin write gallery_items"
on public.gallery_items
for insert
to authenticated
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
);

drop policy if exists "admin delete gallery_items" on public.gallery_items;
create policy "admin delete gallery_items"
on public.gallery_items
for delete
to authenticated
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  )
);

