DROP FUNCTION IF EXISTS public.join_game_session (UUID, UUID, TEXT);

CREATE OR REPLACE FUNCTION public.join_game_session(
  UUID_PARAM UUID,
  PLAYER_UUID_PARAM UUID,
  USERNAME_PARAM TEXT
) RETURNS VOID AS $$
BEGIN
    -- Insert into players table
    INSERT INTO players (player_id, session_id, username, score, "isHost")
    VALUES (PLAYER_UUID_PARAM, UUID_PARAM, USERNAME_PARAM, 0, false);

    BEGIN
        UPDATE game_sessions
        SET total_players = total_players + 1
        WHERE session_id = UUID_PARAM;
    END;
END;
$$ LANGUAGE plpgsql;

