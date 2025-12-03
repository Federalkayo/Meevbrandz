// REAL SUPABASE CONNECTION
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your credentials
const SUPABASE_URL = "https://dcwmqnonfruqgrzaqbas.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjd21xbm9uZnJ1cWdyemFxYmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1ODc0NjAsImV4cCI6MjA4MDE2MzQ2MH0.vxHW-xZpbVuhjjaK66b5sOQkIHLamEB7KDE8j5eVFN8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// No more mock service — REAL SUPABASE
window.SupabaseService = {
    
    // ============================= AUTH =============================
    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    },

    async logout() {
        await supabase.auth.signOut();
    },

    // ============================= UPLOAD MEDIA =============================
    async uploadMedia(file) {
        const bucket = "portfolio";

        const ext = file.name.split(".").pop();
        const filePath = `${Date.now()}.${ext}`;

        const { data, error } = await supabase
            .storage
            .from(bucket)
            .upload(filePath, file);

        if (error) throw error;

        // Get public URL
        const { data: publicData } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(filePath);

        const publicURL = publicData.publicUrl;

        // Save to DB
        await supabase.from("gallery").insert({
            url: publicURL,
            file_name: file.name,
            type: file.type.startsWith("video") ? "video" : "image"
        });

        return publicURL;
    },

    // ============================= FETCH MEDIA =============================
    async getGalleryItems() {
        const { data, error } = await supabase
            .from("gallery")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data;
    },

    // ============================= DELETE =============================
    async deleteMedia(id) {
        // 1. Get row
        const { data } = await supabase.from("gallery").select("*").eq("id", id).single();

        // 2. Delete file from storage
        const fileName = data.url.split("/").pop();
        await supabase.storage.from("portfolio").remove([fileName]);

        // 3. Delete from DB
        await supabase.from("gallery").delete().eq("id", id);

        return true;
    }
};
