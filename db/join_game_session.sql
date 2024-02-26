CREATE OR REPLACE FUNCTION public.join_game_session(
    uuid_param UUID,
    username_param TEXT
) RETURNS VOID AS $$
BEGIN
    -- Insert into players table
    INSERT INTO players (session_id, username, score, "isHost")
    VALUES (uuid_param, username_param, 0, false);
END;
$$ LANGUAGE plpgsql;
