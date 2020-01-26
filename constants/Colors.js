import { sample } from "lodash";

// const tintColor = "#2f95dc";

// export default {
//   tintColor,
//   tabIconDefault: "#ccc",
//   tabIconSelected: tintColor,
//   tabBar: "#fefefe",
//   errorBackground: "red",
//   errorText: "#fff",
//   warningBackground: "#EAEB5E",
//   warningText: "#666804",
//   noticeBackground: tintColor,
//   noticeText: "#fff"
// };

const darkBlue = "#0B4F6C";
const brightBlue = "#2196F3";
const dullRed = "#BB4430";
const sageGreen = "#73877B";

export const theme = {
  primary: brightBlue,
  secondary: dullRed,
  appbar: darkBlue,
  other: sageGreen,
  background: "#FBFBFF",
  palette: {
    question: darkBlue,
    answer: dullRed,
    green: "#66A182",
    purple: "#AFA2B4",
    orange: "#F18805",
    red: "#D95D39",
    blue: "#4CB5AE",
    beige: "#F9D3A4"
  },
  randomColor: () => sample(theme.palette)
};
