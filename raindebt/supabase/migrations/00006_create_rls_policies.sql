-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.climate_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.climate_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technical_reports ENABLE ROW LEVEL SECURITY;

-- USERS
CREATE POLICY "users_select_own" ON public.users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- PROPERTIES
CREATE POLICY "properties_select_own" ON public.properties FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "properties_insert_own" ON public.properties FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "properties_update_own" ON public.properties FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "properties_delete_own" ON public.properties FOR DELETE TO authenticated USING (user_id = auth.uid());

-- CLIMATE RECORDS
CREATE POLICY "climate_records_select_own" ON public.climate_records FOR SELECT TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE user_id = auth.uid()));
CREATE POLICY "climate_records_insert_own" ON public.climate_records FOR INSERT TO authenticated
    WITH CHECK (property_id IN (SELECT id FROM public.properties WHERE user_id = auth.uid()));
CREATE POLICY "climate_records_service_all" ON public.climate_records FOR ALL TO service_role USING (true) WITH CHECK (true);

-- CLIMATE EVENTS
CREATE POLICY "climate_events_select_own" ON public.climate_events FOR SELECT TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE user_id = auth.uid()));
CREATE POLICY "climate_events_update_own" ON public.climate_events FOR UPDATE TO authenticated
    USING (property_id IN (SELECT id FROM public.properties WHERE user_id = auth.uid()));
CREATE POLICY "climate_events_service_all" ON public.climate_events FOR ALL TO service_role USING (true) WITH CHECK (true);

-- TECHNICAL REPORTS
CREATE POLICY "reports_select_own" ON public.technical_reports FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "reports_insert_own" ON public.technical_reports FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid() AND property_id IN (SELECT id FROM public.properties WHERE user_id = auth.uid()));
CREATE POLICY "reports_service_all" ON public.technical_reports FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Auto-create user profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, full_name, email)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
