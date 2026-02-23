CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
    area_hectares DOUBLE PRECISION CHECK (area_hectares > 0),
    municipality TEXT,
    state TEXT,
    country TEXT NOT NULL DEFAULT 'BR',
    current_spi DOUBLE PRECISION,
    current_spi_category TEXT,
    last_data_fetch TIMESTAMPTZ,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_properties_user_id ON public.properties(user_id);
CREATE INDEX idx_properties_coords ON public.properties(latitude, longitude);
CREATE INDEX idx_properties_active ON public.properties(user_id, is_active);
