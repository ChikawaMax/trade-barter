type materialObj = {
  name: string;
  number: number;
  skill: string;
};

type tradeObj = {
  praice: string;
  goods: string;
  number: number;
  material: materialObj[];
};

interface Trade {
  praice: string;
  goods: string;
  number: number;
  material: {
    name: string;
    number: number;
    skill: string;
  }[];
}
