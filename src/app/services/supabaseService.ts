import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { enviroment } from '../enviroment/enviroments';

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {

    private client: SupabaseClient;

    constructor() {
        const supaBaseURL = enviroment.supabaseUrl;
        const supaBaseKey = enviroment.supabaseKey;
        this.client = createClient(supaBaseURL, supaBaseKey);

    }

    getCliente(): SupabaseClient {
        return this.client;
    }


}
