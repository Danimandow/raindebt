CREATE TABLE public.climate_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    precipitation_mm DOUBLE PRECISION,
    temperature_avg_c DOUBLE PRECISION,
    temperature_max_c DOUBLE PRECISION,
    temperature_min_c DOUBLE PRECISION,
    relative_humidity_pct DOUBLE PRECISION,
    spi_value DOUBLE PRECISION,
    data_source TEXT NOT NULL DEFAULT 'nasa_power'
        CHECK (data_source IN ('nasa_power', 'open_meteo', 'manual')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(property_id, record_date)
);

CREATE INDEX idx_climate_records_property_date
    ON public.climate_records(property_id, record_date DESC);
CREATE INDEX idx_climate_records_date_range
    ON public.climate_records(property_id, record_date)
    WHERE precipitation_mm IS NOT NULL;
