export interface CompanyLogo {
  name: string;
  logoSrc?: string;
}

// Add or update logos here. If a file exists in public/logos, set logoSrc to that path.
// If logoSrc is omitted or the file fails to load, the UI will fall back to rendering the name.
export const bankCompanies: CompanyLogo[] = [
  { name: 'Goldman Sachs', logoSrc: '/logos/goldman-sachs.svg' },
  { name: 'Morgan Stanley', logoSrc: '/logos/morgan-stanley.svg' },
  { name: 'J.P. Morgan', logoSrc: '/logos/jp-morgan.svg' },
  { name: 'Bank of America', logoSrc: '/logos/bank-of-america.svg' },
  { name: 'Citigroup', logoSrc: '/logos/citigroup.svg' },
  { name: 'Barclays', logoSrc: '/logos/barclays.svg' },
  { name: 'UBS', logoSrc: '/logos/ubs.svg' },
  { name: 'Lazard', logoSrc: '/logos/lazard.svg' },
  { name: 'Evercore', logoSrc: '/logos/evercore.svg' },
  { name: 'Moelis & Company', logoSrc: '/logos/moelis.svg' },
  { name: 'Anthropic', logoSrc: '/logos/Anthropic_logo.svg' },
  { name: 'Google', logoSrc: '/logos/Google_logo-11.svg' },
  { name: 'Meta', logoSrc: '/logos/Meta_Platforms_Inc._logo.svg' },
  { name: 'OpenAI', logoSrc: '/logos/OpenAI_Logo.svg' },
];
