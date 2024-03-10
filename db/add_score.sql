DROP FUNCTION IF EXISTS public.add_score (UUID, UUID, INT);
CREATE OR REPLACE FUNCTION public.add_score(game_id_param UUID, player_id_param UUID, score_param INT)
RETURNS VOID AS $$
BEGIN
    UPDATE game_sessions
    SET total_turns = total_turns + 1
    WHERE session_id = game_id_param;
    
    UPDATE players
    SET score = score + score_param
    WHERE player_id = player_id_param;
END;
$$ LANGUAGE plpgsql;
