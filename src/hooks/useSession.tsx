import {useEffect, useState} from 'react';
import {supabase} from "@/config/supabase.ts";
import {Session} from "@supabase/supabase-js";

class SessionListener extends EventTarget {
    constructor() {
        super();
    }
}

const sessionListener = new SessionListener();

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {

        sessionListener.addEventListener('SessionListener.session_change', async (e: Event) => {
            const session = (e as CustomEvent).detail.session;
            const {data, error} = await supabase
                .from('users')
                .select()
                .eq('email', session?.user.email)
                .single();
            if(error){
                console.log(error)
            }
            setUser(data)
        });

        const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
            console.log(`🔄 Session Auth State Change: ${event}`, session)
            if (event === 'INITIAL_SESSION') {
                setTimeout(() => {
                    sessionListener.dispatchEvent(new CustomEvent('SessionListener.session_change', {detail: {session}}));
                }, 0)
            } else if (event === 'SIGNED_IN') {
                setTimeout(() => {
                    localStorage.setItem('venus.user', JSON.stringify(session));
                    sessionListener.dispatchEvent(new CustomEvent('SessionListener.session_change', {detail: {session}}));
                }, 0);
            } else if (event === 'SIGNED_OUT') {
                setTimeout(() => {
                    setSession(null);
                    setUser(null)
                    localStorage.removeItem('venus.user');
                }, 0);
            } else if (event === 'PASSWORD_RECOVERY') {
                setTimeout(() => {
                    sessionListener.dispatchEvent(new CustomEvent('SessionListener.session_change', {detail: {session}}));
                }, 0)
            } else if (event === 'TOKEN_REFRESHED') {
                setTimeout(() => {
                    sessionListener.dispatchEvent(new CustomEvent('SessionListener.session_change', { detail: { session } }));
                }, 0)
            } else if (event === 'USER_UPDATED') {
                setTimeout(() => {
                    sessionListener.dispatchEvent(new CustomEvent('SessionListener.session_change', { detail: { session } }));
                }, 0)
            }
            setSession(session)
        });

        sessionListener.removeEventListener('SessionListener.session_change', null);

        return () => authListener.subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signInWithPassword({email, password});
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return {session, user, login, logout};
}
