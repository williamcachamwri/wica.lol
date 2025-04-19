import type { Metadata } from 'next';

import { metadata as creditPageMetadata } from './metadata';

import CreditsClient from './CreditsClient';

export const metadata: Metadata = creditPageMetadata;

export default function CreditsPage() {

  return <CreditsClient />;

}