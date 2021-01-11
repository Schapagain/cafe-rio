import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiCardContent: {
      root: {
        padding: 0,
        "&:last-child": {
          paddingBottom: 0,
        },
      },
    },
    MuiCardActions: {
      root: {
        padding: 0,
      },
    },
  },
});
