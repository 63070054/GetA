import '@mui/material/styles';

declare module '@mui/material/styles' {

  interface TypographyVariants {
    info?: React.CSSProperties;
    primary?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    info?: React.CSSProperties;
    primary?: React.CSSProperties;
  }

  interface TypographyOptions {
    info?: React.CSSProperties;
    primary?: React.CSSProperties;
  }

}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    info: true;
    primary: true;
  }
}