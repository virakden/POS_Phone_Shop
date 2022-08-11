import { ChartType } from "./dashboard.model";

/**
 * Best Selling
 */
const BestSelling = [
  {
    image: "assets/images/products/img-1.png",
    pName: "Branded T-Shirts",
    date: "24 Apr 2021",
    price: "29.00",
    orders: "62",
    stock: "510",
    amount: "1,798",
  },
  {
    image: "assets/images/products/img-2.png",
    pName: "Bentwood Chair",
    date: "19 Mar 2021",
    price: "85.20",
    orders: "35",
    stock: "Out of stock",
    amount: "2982",
  },
  {
    image: "assets/images/products/img-3.png",
    pName: "Borosil Paper Cup",
    date: "01 Mar 2021",
    price: "14.00",
    orders: "80",
    stock: "749",
    amount: "1120",
  },
  {
    image: "assets/images/products/img-4.png",
    pName: "One Seater Sofa",
    date: "11 Feb 2021",
    price: "127.50",
    orders: "56",
    stock: "Out of stock",
    amount: "7140",
  },
  {
    image: "assets/images/products/img-5.png",
    pName: "Stillbird Helmet",
    date: "17 Jan 2021",
    price: "54",
    orders: "74",
    stock: "805",
    amount: "3996",
  },
];

/**
 * Top Selleing
 */
const TopSelling = [
  {
    image: "assets/images/companies/img-1.png",
    pName: "iTest Factory",
    subtitle: "Oliver Tyler",
    type: "Bags and Wallets",
    stock: "8547",
    percentage: "32",
  },
  {
    image: "assets/images/companies/img-2.png",
    pName: "Digitech Galaxy",
    subtitle: "John Roberts",
    type: "Watches",
    stock: "895", 
    percentage: "79",
  },
  {
    image: "assets/images/companies/img-3.png",
    pName: "Nesta Technologies",
    subtitle: "Harley Fuller",
    type: "Bike Accessories",
    stock: "3470",
    percentage: "90",
  },
  {
    image: "assets/images/companies/img-4.png",
    pName: "Zoetic Fashion",
    subtitle: "James Bowen",
    type: "Clothes",
    stock: "5488",
    
    percentage: "40",
  },
  {
    image: "assets/images/companies/img-5.png",
    pName: "Meta4Systems",
    subtitle: "Zoe Dennis",
    type: "Furniture",
    stock: "4100",
   
    percentage: "57",
  },
];

/**
 * Recent Selleing
 */
const RecentSelling = [
  {
    id: "#VR2112",
    image: "assets/images/users/avatar-1.jpg",
    product: "Iphone13",
    amount: "1300.00",
    seller: "Zoetic Fashion",
    status: "Adjust-add",
    date: "17 Jun, 2022",
    time: "1:24PM",
  },
  {
    id: "#VR2111",
    image: "assets/images/users/avatar-2.jpg",
    product: "Oppo reno8",
    amount: "149.00",
    seller: "Micro Design",
    status: "Adjust-deduct",
    date: "17 Jun, 2022",
    time: "2:00PM",

  },
  {
    id: "#VR2109",
    image: "assets/images/users/avatar-3.jpg",
    product: "ViVO",
    amount: "215.00",
    seller: "Nesta Technologies",
    status: "Sale",
    date: "17 Jun, 2022",
    time: "9:00AM",
  },
  {
    id: "#VR2112",
    image: "assets/images/users/avatar-1.jpg",
    product: "Case",
    amount: "9.00",
    seller: "Zoetic Fashion",
    status: "Adjust-add",
    date: "17 Jun, 2022",
    time: "9:30AM",
  },
  {
    id: "#VR2111",
    image: "assets/images/users/avatar-2.jpg",
    product: "Screen",
    amount: "5.00",
    seller: "Micro Design",
    status: "Adjust-deduct",
    date: "17 Jun, 2022",
    time: "11:30AM",
  },
  {
    id: "#VR2111",
    image: "assets/images/users/avatar-2.jpg",
    product: "Apater Oppo",
    amount: "10.00",
    seller: "Micro Design",
    status: "Adjust-deduct",
    date: "16 Jun, 2022",
    time: "10:30AM",
  },
  {
    id: "#VR2109",
    image: "assets/images/users/avatar-3.jpg",
    product: "Iphone 12 Pro",
    amount: "415.00",
    seller: "Nesta Technologies",
    status: "Sale",
    date: "16 Jun, 2022",
    time: "02:30PM",
  },
  {
    id: "#VR2109",
    image: "assets/images/users/avatar-3.jpg",
    product: "Ipad",
    amount: "215.00",
    seller: "Nesta Technologies",
    status: "Sale",
    date: "16 Jun, 2022",
    time: "03:30PM",
  },
];

/**
 * Stat Counder Data
 */
const statData = [
  {
    title: "No. of Sale",
    value: 1835,
    icon: "bx-user-circle",
  },
  {
    title: "LAST PROFIT",
    value: 559.25,
    icon: "bx-dollar-circle",
    persantage: "16.24",
    profit: "up",
  },
  {
    title: "NET PROFIT",
    value: 165.89,
    icon: "bx-wallet",
    persantage: "0.00",
    profit: "equal",
  },
  {
    title: "ITEM IN STOCKS",
    value: 25000,
    icon: "bx-shopping-bag",

  },
];

export { BestSelling, TopSelling, RecentSelling, statData };
