CREATE TYPE public.climate_event_type AS ENUM (
    'moderate_drought', 'severe_drought', 'extreme_drought',
    'excess_rainfall', 'dry_spell', 'heavy_rainfall'
);

CREATE TYPE public.event_severity AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TABLE public.climate_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    event_type public.climate_event_type NOT NULL,
    severity public.event_severity NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    spi_value DOUBLE PRECISION,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_climate_events_updated_at
    BEFORE UPDATE ON public.climate_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_climate_events_property ON public.climate_events(property_id, start_date DESC);
CREATE INDEX idx_climate_events_active ON public.climate_events(property_id, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_climate_events_type ON public.climate_events(event_type);
