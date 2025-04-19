"use client";

const SPOTIFY_CLIENT_ID = "5bf615754c0540fb91eb8e0bdd559530";
const SPOTIFY_CLIENT_SECRET = "0d4ff8da113d4f919708f89b4d932add";
const SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

const REFRESH_TOKEN = 'AQBcbskr8ow1vRkKHvUA-vQeyqt2TVrCR3iMD9XWn-lHS4oWZ2OqQe9FdNzqWB5l64UteQc4VP9E4Gsb3O45vp5wAF6iZS6zTb04Y4EZmRPUWwjw28H9oZ_FkdXYN7wn79Q';

// Store tokens in localStorage
const TOKEN_STORAGE_KEYS = {
  accessToken: "spotify_access_token",
  expiresAt: "spotify_token_expires_at",
};

export function getSpotifyAuthUrl() {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    scope: SCOPES.join(" "),
    show_dialog: "true",
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(code: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
    }),
  });

  const data = await response.json();
  
  // Store tokens
  localStorage.setItem(TOKEN_STORAGE_KEYS.accessToken, data.access_token);
  localStorage.setItem(
    TOKEN_STORAGE_KEYS.expiresAt,
    String(Date.now() + data.expires_in * 1000)
  );

  return data;
}

export async function refreshAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  
  // Update stored tokens
  localStorage.setItem(TOKEN_STORAGE_KEYS.accessToken, data.access_token);
  localStorage.setItem(
    TOKEN_STORAGE_KEYS.expiresAt,
    String(Date.now() + data.expires_in * 1000)
  );

  return data;
}

export function getStoredTokens() {
  if (typeof window === "undefined") return null;
  
  const accessToken = localStorage.getItem(TOKEN_STORAGE_KEYS.accessToken);
  const expiresAt = localStorage.getItem(TOKEN_STORAGE_KEYS.expiresAt);

  if (!accessToken || !expiresAt) return null;

  return {
    accessToken,
    expiresAt: Number(expiresAt),
  };
}

export async function ensureValidToken() {
  const tokens = getStoredTokens();
  
  // If no tokens or expired, refresh using the hardcoded refresh token
  if (!tokens || Date.now() + 60000 > tokens.expiresAt) {
    const newTokens = await refreshAccessToken();
    return newTokens.access_token;
  }

  return tokens.accessToken;
}

// Function to get currently playing track
export async function getCurrentlyPlaying() {
  try {
    const accessToken = await ensureValidToken();
    
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (response.status === 204) {
      return null; // No track playing
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    return null;
  }
}