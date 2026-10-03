-- 1. Habilitar a extensão para geração de UUID (caso não esteja ativa)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Criar a tabela 'products'
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT,
    image_url TEXT,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar RLS (Row Level Security) na tabela products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 4. Política RLS: Permitir leitura pública (SELECT) na tabela products
CREATE POLICY "Leitura pública de produtos" ON products
    FOR SELECT
    TO public
    USING (true);

-- ==========================================
-- Configuração do Storage (Bucket)
-- ==========================================

-- 5. Criar o bucket 'cosmetics-images' como público
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cosmetics-images', 'cosmetics-images', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Política RLS: Permitir leitura pública das imagens no bucket
CREATE POLICY "Leitura pública de imagens" ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'cosmetics-images');
