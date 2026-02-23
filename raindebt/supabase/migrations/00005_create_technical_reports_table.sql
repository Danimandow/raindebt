CREATE TYPE public.report_status AS ENUM ('pending', 'generating', 'completed', 'failed');

CREATE TABLE public.technical_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    report_period_start DATE NOT NULL,
    report_period_end DATE NOT NULL,
    status public.report_status NOT NULL DEFAULT 'pending',
    file_url TEXT,
    file_size_bytes BIGINT,
    spi_summary JSONB,
    metadata JSONB,
    generated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_technical_reports_updated_at
    BEFORE UPDATE ON public.technical_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_reports_property ON public.technical_reports(property_id, created_at DESC);
CREATE INDEX idx_reports_user ON public.technical_reports(user_id, created_at DESC);
CREATE INDEX idx_reports_status ON public.technical_reports(status) WHERE status IN ('pending', 'generating');
