DROP FUNCTION IF EXISTS public.random_questions_medium (UUID, INT);


CREATE OR REPLACE FUNCTION public.random_questions_medium(game_id_param UUID, limit_value INT)
RETURNS SETOF questions AS $$
BEGIN
    -- Generate a hash from the game_id_param
    -- This hash will be used in the ORDER BY clause to ensure consistency
    -- across sessions with the same game ID
    RETURN QUERY SELECT * FROM questions_medium
    ORDER BY md5(game_id_param::text || id::text) -- Combine game_id and question id
    LIMIT limit_value;
END;
$$ LANGUAGE plpgsql;
