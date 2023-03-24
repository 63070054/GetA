import '@mui/material/styles';

declare module '@mui/material/styles' {

  interface TypographyVariants {
    infoText?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    infoText?: React.CSSProperties;
  }

  interface TypographyOptions {
    infoText?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    infoText: true;
  }
}

