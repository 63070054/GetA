import '@mui/material/styles';

declare module '@mui/material/styles' {

  interface TypographyVariants {
    info?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    info?: React.CSSProperties;
  }

  interface TypographyOptions {
    info?: React.CSSProperties;
  }

}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    info: true;
  }
}