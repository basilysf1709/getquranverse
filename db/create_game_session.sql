CREATE OR REPLACE FUNCTION public.create_game_session(
    uuid_param UUID,
    player_uuid_param UUID,
    username_param TEXT
) RETURNS VOID AS $$
BEGIN
    -- Insert into game_sessions table
    INSERT INTO game_sessions (session_id, game_started)
    VALUES (uuid_param, false);

    -- Insert into players table
    INSERT INTO players (player_id, session_id, username, score, "isHost")
    VALUES (player_uuid_param, uuid_param, username_param, 0, true);
END;
$$ LANGUAGE plpgsql;
