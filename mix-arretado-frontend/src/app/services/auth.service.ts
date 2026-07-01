import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private currentSessionSubject = new BehaviorSubject<Session | null>(null);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public currentSession$ = this.currentSessionSubject.asObservable();

  constructor() {
    // Ideally these would be in environment.ts
    const supabaseUrl = 'https://norkuqtxwhelibidfkob.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcmt1cXR4d2hlbGliaWRma29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2ODEzMDgsImV4cCI6MjA5NDI1NzMwOH0.PlT8ypwizzvzC4ULf_C-rtx6FR0b8W7LUph-OLWSWk4';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);

    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.currentSessionSubject.next(session);
      this.currentUserSubject.next(session?.user ?? null);
    });

    this.supabase.auth.onAuthStateChange((_event, session) => {
      this.currentSessionSubject.next(session);
      this.currentUserSubject.next(session?.user ?? null);
    });
  }

  get session() {
    return this.currentSessionSubject.value;
  }

  get user() {
    return this.currentUserSubject.value;
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }
}
