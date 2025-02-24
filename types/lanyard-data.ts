
export interface LanyardData {
    kv: Kv;
    discord_user: DiscordUser;
    activities: Activity[];
    discord_status: string;
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
    spotify: any;
}


export interface Kv {
    ustav: string;
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    clan: any;
    avatar_decoration_data: any;
    bot: boolean;
    global_name: string;
    primary_guild: any;
    display_name: string;
    public_flags: number;
}

export interface Activity {
    flags: number;
    id: string;
    name: string;
    type: number;
    state: string;
    session_id: string;
    details: string;
    application_id: string;
    timestamps: Timestamps;
    assets: Assets;
    buttons: string[];
    created_at: number;
}

export interface Timestamps {
    start: number;
}

export interface Assets {
    large_image: string;
    large_text: string;
    small_image: string;
    small_text: string;
}