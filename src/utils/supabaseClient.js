import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjswablqegbtzaqyhqxc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqc3dhYmxxZWdidHphcXlocXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NzMwOTAsImV4cCI6MjAzODQ0OTA5MH0.AdLa7sPIdT2bHro1pfGIp4UsKu07anZU_g9MgfYmflU";

export const supabase = createClient(supabaseUrl, supabaseKey);
const {
  data: { user },
  error,
} = await supabase.auth.getUser();
