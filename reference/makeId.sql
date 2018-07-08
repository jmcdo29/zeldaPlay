CREATE OR REPLACE FUNCTION makeId (base text)
  RETURNS text AS 
  $body$
  DECLARE
    base62array text ARRAY DEFAULT ARRAY['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    id_ text DEFAULT $1;
    loop_counter integer;
  BEGIN
    FOR loop_counter IN 0..9 LOOP
      id_ := concat(id_, base62array[mod(round(random() *100) :: int, 62)]);
    END LOOP;
    RETURN id_;
  END;
  $body$
  LANGUAGE plpgsql;