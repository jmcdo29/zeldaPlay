CREATE OR REPLACE FUNCTION createId(input text)
RETURNS VARCHAR(12)
AS $$
DECLARE
  result TEXT := '';
  chars TEXT[] := '{a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0}';
  i INTEGER := 0;
BEGIN
  FOR i IN i..8 LOOP
    result = result || chars[1 + random()*(array_length(chars, 1) -1)];
  END LOOP;
  result = input || result;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
