
CREATE OR REPLACE FUNCTION public.add_score(player_id_param UUID, score_param INT)
RETURNS VOID AS $$
BEGIN
    UPDATE players
    SET score = score + score_param
    WHERE player_id = player_id_param;
END;
$$ LANGUAGE plpgsql;
