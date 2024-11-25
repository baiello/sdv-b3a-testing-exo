import { transformDate } from "../../views/BillsUI";

test('Date conversion', () => {
    expect(transformDate('2 Nov. 2024')).toStrictEqual(new Date(2024, 10, 2)); // Le mois 0 est indexé donc les mois vont de 0 à 11
    expect(transformDate('1 jan. 1998')).toStrictEqual(new Date(1998, 0, 1));
    expect(transformDate('2002-3-28')).toStrictEqual(new Date(2002, 2, 28));
});
