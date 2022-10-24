Bygge spillefladen:

Spillefladen består af et 5x4 grid.

Opret array med dataobjects som skal være de kortsider som starter med at ligge ned af og som skal matches

- Giv dem et ID så de kan matches
- Giv dem et titel
- Giv dem billedet

.concat på array for at dobbel op som f.eks array.concat(array) for at få 2 af det hele
.sort for at sortere det fordobblede array tilfældigt
.slice for at ændre størrelsen af array og dermed på mængden af kort / Evt lav en slider hvor brugeren kan ændrer størrelsen

Brug et loop der genere spillefladen igennem DOM

CSS:
Kortene skal alle have den samme bagside og skal kunne flippes rundt.
Alt det der foregår med bevægelse af kort skal have en transform.

Logikken:

Opræt javascript onclick på hvert kort der gør når man trykker på den så vender den.
Når 2 kort matcher så skal de forblive vendt og give et point
Man skal ikke kunne vende mere end 2 kort af gangen.
Tæl antal klik som der er blevet brugt
Samt have en timer der tæller op.

Når alle kort er blevet vendt rundt, så skal der vises en 'victory screen' hvor statistikkerne for spillet bliver vist
samt en knap der der genstarte spillet.

Koden skal laves modulært så kortene kan scales fra 2 og op, intet skal hardcodes.
